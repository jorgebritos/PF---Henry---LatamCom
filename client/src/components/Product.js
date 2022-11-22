import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {getProductDetail , resetDetail} from "../redux/actions/index"



const Product = (props)=>{


    const {id} = useParams()
    const dispatch = useDispatch()
    const product =  useSelector((state)=> state.productDetail)
    

    useEffect(()=>{

        dispatch(getProductDetail(id))
        return(
            dispatch(resetDetail())
        )
        
    },[])

    
    
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



    else{
        
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
                    
                </div>
                
            </div>
        )
    }

    
}

export default Product