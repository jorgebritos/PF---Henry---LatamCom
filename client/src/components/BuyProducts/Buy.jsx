import {useState} from "react"
import { useHistory } from 'react-router-dom'

const Buy = ()=>{

    const [products, setProducts] = useState()
    const [total, setTotal] = useState()
    
    const seeProducts = () => {
		let cart = [];
        let price = []

		if (localStorage.getItem('cart')) {
			cart = JSON.parse(localStorage.getItem('cart'));
		}

        if(localStorage.getItem("total")){
            price = JSON.parse(localStorage.getItem("total"))
        }
        setTotal(price)
		setProducts(cart);
	};
    
    return(
        
        <div>
            {!products ? seeProducts() : ""}
            <div>
                
                <div>
                    {products && products.map((p)=>{
                        return(
                            <div key={p.id}>
                                {p.name}
                                
                            </div>
                        )
                        
                    })}
                </div>
                
                <div>
                    {total}
                </div>
                
            </div>
            <p>COMPRANDO</p>
        </div>
    )
}
export default Buy