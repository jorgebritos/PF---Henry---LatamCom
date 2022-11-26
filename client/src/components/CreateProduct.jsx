import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { createProduct, getAllCategories, res } from "../redux/actions/index"



// Input Validate /////////////////////////////
const validateInput = (input) => {

    let errors = {}

    // Error name ////////////////////////////////////////////
    if (!input.name) {
        errors.name = "Introduce a name"
    }
    //////////////////////////////////////////////////////////

    // Error Image ///////////////////////////////////////
    if (!input.image) {
        errors.image = "Introduce an image"
    }
    //////////////////////////////////////////////////////////

    // Error Price ////////////////////////////////////////
    if (!input.price) {
        errors.price = "Introduce a price"
    }
    else if (typeof parseInt(input.price) !== "number") {
        errors.price = "You must introduce only number"
    }
    else if (input.price < 0) {
        errors.price = "It must be a positive number"
    }
    //////////////////////////////////////////////////////////

    // Error Categories //////////////////////////////////////
    if (!input.categories.length) {
        errors.categories = "Introduce categories"
    }
    //////////////////////////////////////////////////////////

    // Enable/disable button ////////////////////////////////
    const sendButton = document.getElementById("sendButtom")

    if (Object.entries(errors).length) {
        sendButton.disabled = true
    }
    else {
        sendButton.disabled = false
    }
    //////////////////////////////////////////////////////////



    return errors
}
///////////////////////////////////////////////


const CreateProduct = () => {

    //Hooks and states ///////////////////////
    const dispatch = useDispatch()
    const categories = useSelector((state) => state.categories)
    const history = useHistory()

    const [input, setInput] = useState({
        name: "",
        description: "",
        image: "",
        price: "",
        stock: 0,
        brand: "",
        categories: []

    })

    const [errors, setErrors] = useState({
        name: "",
        description: "",
        image: "",
        price: "",
        stock: "",
        brand: "",
        categories: []

    })

    const [loading, setLoading] = useState(false)

    useEffect(() => {

        dispatch(getAllCategories())

    }, [])
    ////////////////////////////////////////

    // Cloudinary ////////////////////////////////////////////////////////

    const uploadImage = async (e) => {

        const files = e.target.files
        const data = new FormData()
        data.append("file", files[0])
        data.append("upload_preset", "LatamCom")
        setLoading(true)
        const res = await fetch("https://api.cloudinary.com/v1_1/drruxw6zi/image/upload",
            {
                method: "POST",
                body: data,
            }
        )
        const file = await res.json()
        setInput({ ...input, image: file.secure_url })
        setLoading(false)
        setErrors(validateInput({ ...input, image: file.secure_url }))

    }

    ///////////////////////////////////////////////////////////////////////

    // Change Local States //////////////////////
    const introduceData = (event) => {
        event.preventDefault();
        const value = event.target.value
        const property = event.target.name

        setInput({ ...input, [property]: value })
        setErrors(validateInput({ ...input, [property]: value }))

    }
    /////////////////////////////////////////////

    // Functions of Categories ///////////////////////////
    const introduceCategories = (event) => {
        event.preventDefault();
        const catSelected = event.target.value

        if (!input.categories.includes(catSelected) && catSelected !== "") {

            setInput({ ...input, categories: [...input.categories, catSelected] })
            setErrors(validateInput({ ...input, categories: catSelected }))

        }

    }

    const deleteCategories = (event) => {
        event.preventDefault()
        setInput({ ...input, categories: [] })
        setErrors(validateInput({ ...input, categories: event.target.value }))

    }
    ///////////////////////////////////////////////////////

    // Post Product /////////////////////////////
    const submitData = async (event) => {
        event.preventDefault();
        await dispatch(createProduct(input))
        alert("se ha creado el producto")
        //history.push("/enviado") enviar a otro componente para dar el mensaje de "Enviado"
    }
    /////////////////////////////////////////////

    return (
        <div>
            <h2>CREAR PRODUCTO</h2>

            <div>

                <form onSubmit={(e) => submitData(e)}>

                    <div>
                        <label>P. Name: </label>
                        <input name="name" value={input.name} onChange={introduceData} autoComplete="off"  ></input>
                        {errors.name && <p>{errors.name}</p>}
                    </div>

                    <div>
                        <label>P. Description: </label>
                        <input name="description" value={input.description} onChange={introduceData} autoComplete="off"  ></input>
                    </div>

                    <div>
                        <label>P. Image: </label>
                        <input name="file" onChange={uploadImage} autoComplete="off" type="file"  ></input>
                        {errors.image && <p>{errors.image}</p>}
                        {loading ? (<h4>Uploading image...</h4>) : (<img src={input.image} style={{ width: "300px" }} ></img>)}
                    </div>

                    <div>
                        <label>P. Price: </label>
                        <input name="price" value={input.price} onChange={introduceData} autoComplete="off" type="number" min="0" ></input>
                        {errors.price && <p>{errors.price}</p>}
                    </div>

                    <div>
                        <label>P. Stock: </label>
                        <input name="stock" value={input.stock} onChange={introduceData} autoComplete="off" type="number" min="0"  ></input>
                    </div>

                    <div>
                        <label>P. Brand: </label>
                        <input name="brand" value={input.brand} onChange={introduceData} autoComplete="off"  ></input>
                    </div>


                    <div>

                        {categories.length &&
                            <div>
                                <select name="categories" onChange={introduceCategories} >
                                    <option value="" >Chose yours categories...</option>
                                    {categories.map((cat) => {
                                        return (
                                            <option key={cat.name}>{cat.name}</option>
                                        )
                                    })}

                                </select>
                            </div>
                        }


                    </div>

                    <div>
                        {/* Opcion 1 */}
                        <label>Categories Selected</label>
                        <input value={input.categories} disabled ></input>

                        {/* Opcion 2 */}
                        {input.categories.map((e) => {
                            return (
                                <p key={e}>{e}</p>
                            )
                        })}
                        {errors.categories && <p>{errors.categories}</p>}

                        {/* Seleccionar el mas deseado y comodo para poder visualizar y acomodar con CSS */}

                    </div>

                    <div>
                        <button onClick={deleteCategories} >Delete Categories</button>
                    </div>


                    <button id="sendButtom" type="submit" disabled>SEND</button>

                </form>

            </div>
        </div>
    )
}

export default CreateProduct


