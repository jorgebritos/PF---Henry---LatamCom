import {useState} from "react"
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { buyShoppingCart, getPurchaseDetail } from '../../redux/actions';
import s from './Buy.module.css'


const structuringProducts = (products)=>{
	let ppProducts= products.map((p)=>{
		let pp = {
			amount:{
				currency_code:"USD",
				value:p.price*p.amount,
			},
			description: `Purchasing ${p.amount} item(s) of ${p.name}`,
			reference_id : p.id,
		}
		return pp
	})
	return ppProducts

}

const Buy = ()=>{
	const dispatch = useDispatch()
    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)
    
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
        return total
	};
    const handleClick = (e,products)=>{
        e.preventDefault()
        console.log(products);
        dispatch(buyShoppingCart(structuringProducts(products)))
    }
    
    
    return(
        
        <div className={s.container}>
                <div className={s.title}>Payment Method</div>
            <div className={s.content}>

                <div className={s.description}>
                    <div>
                        {!total?seeProducts():<>Total: ${total} USD</>}
                    </div>
                    
                </div>
                <div className={s.paywith}>Pay with</div>
                <div className={s.paypal}>
                    <button onClick={(e)=>handleClick(e,products)} className={s.paypalbutton}><img src="https://cdn-icons-png.flaticon.com/512/174/174861.png" alt="paypal" className={s.paypalimg}/>
                    <span>Pay Now!</span>
                    </button> 
                </div>
            </div>
        </div>
    )
}
export default Buy