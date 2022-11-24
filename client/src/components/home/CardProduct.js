import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import  { getAllProducts} from "../../redux/actions/index"



const CardProduct = (props)=>{

    // Hooks y estados ////////////////////////////////
    
    const dispatch = useDispatch()
    const product =  useSelector((state)=> state.products)
    
    ///////////////////////////////////////////////////

    // Hook de ciclo de vida //////////////////////////
    useEffect(()=>{

        dispatch(getAllProducts())
  
        
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
        
        
        return(

            <div>

                <div>
                    {product.map((p)=>{
                        return(
                            <div>
                                <p>{p.name}</p>
                                <p>Price: {p.price}</p>
                                <img src={p.image}></img> <br/>
                                Categories: {p.categories.map((e)=>{
                                return(
                                    <div key={e.name}>
                                        <p>{e.name}</p>
                                    </div>
                                )
                        })
                    }
                            </div>
                        )
                    })}
   
                    
                </div>
                
            </div>
        )
    }

    
}

export default CardProduct