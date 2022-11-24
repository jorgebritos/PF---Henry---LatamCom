import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import  {getProductDetail, getAllComments , resetDetail, getAllProducts, getAllCategories} from "../redux/actions/index"



const Product = (props)=>{

    // Hooks y estados ////////////////////////////////
    const {id} = useParams()
    const dispatch = useDispatch()
    const product =  useSelector((state)=> state.productDetail)
    const comments = useSelector((state)=> state.productComments)
    ///////////////////////////////////////////////////

    // Hook de ciclo de vida //////////////////////////
    useEffect(async ()=>{
        await dispatch(resetDetail())
        await dispatch(getAllCategories())
        await dispatch(getAllProducts())
        await dispatch(getProductDetail(id))
        await dispatch(getAllComments())
    },[])
    //////////////////////////////////////////////////
    
    
    // Comprobacion renderizado //////////////////////

    if(!Object.keys(product).length){
        return(
            <div>
                <h2>Cargando...</h2>
            </div>
        )
    }
    // Esta es una comprobacion de renderizado el cual solo al verificar que el estado que tiene la informacion la posea
    // procese a renderizar los componentes. En vez de "Cargando..." puede ser una imagen o lo que ustedes prefieran
    // Borrar este mensaje una vez corregido
    //////////////////////////////////////////////////

    else{
        
        // Filtrado de comentarios ////////////////////

        const productComments = comments.filter((com)=>{
            return com.products[0].name === product.name
        })
        ///////////////////////////////////////////////
        
        return(

            <div>

                <div>
                    
                    {product.name} <br/>
                    Price: {product.price} <br/>
                    <img src={product.image}></img> <br/>
                    Description: {product.description} <br/>                    
                    Categories: {product.categories.map((e)=>{
                        return(
                            <div key={e.name}>
                                <p>{e.name}</p>
                            </div>
                        )
                        })
                    }
                    
                    {productComments.length? 
                        <div>
                        Comments: {productComments.map((com)=>{
                            return(
                                <div key={com.id}>
                                    <p>{com.comment}</p>
                                    <p>Rating: {com.rating}</p>
                                </div>
                            )
                        })}
                    </div>:<p>Without comentaries</p>
                    }
                    
                    
                </div>
                
            </div>
        )
    }

    
}

export default Product