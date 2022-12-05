const axios = require("axios");
const paypal = require("./config.js")
const { CLIENT_URL } = process.env

// La idea todavia está en plan mejora. 

// Flujo de Paypal:
// Esto se maneja por el momento con Postman para poder hacer las peticiones POST, las cuales por el momento uso
// el link: http://localhost:3001/buyings/createpayment.
// Ahí te da una serie de links, el cual el segundo es el que se utiliza ("rel": "approve") y ese redirecciona
// a un nuevo link para hacer la compra o cancelarla. Al aceptarla nos envia a un nuevo link que está definido
// primeramente en return_url: "http://localhost:3001/buyings/acceptpayment" y en el mismo, por ahora, tiene un 
// console.log que muetra la informacion de la compra realizada con sus respectivos datos

// A realizar:
// . La idea es colocar una interfaz para que le usuario en un componente elija el metodo de pago, que sería Paypal,
// y con este al aceptar lo redirija a estos codigos que hemos hecho, los cuales debemos extraer la informacion
// necesaria para el pago a travez de localStorage, como la posible moneda, o no, el valor, que se cobra, y podemos
// agregar mas informacion pero habria que leer la documentacion de Paypal para agregar estos datos, como una direccion
// a donde va a llegar el paquete.
// . Tambien, despues de concretar todo lo necesario, hay que hacer cambios en la base de datos para que dependiendo
// de la cantidad que disponga un producto sea el limitante en la compra, y asi tambien si se acaba el stock el mismo
// desaparezca (pero no eliminarlo)
// . Las rutas a renderizar serian las de createOrder, acceptOrder y cancelOrder
// . El archivo config.js hay que cambiarlo para que las credenciales que aparecen en el mismo no se vean en el 
// proyecto, por lo que hay que agregar ,SOLO una vez al terminar todo, en el archivo .env y avisarles a los demas

// Dato:
// . La version de axios para que no salieran errores de cifrado es la "0.27.2", aviso para que los demas la cambien
// y no posean errores.
// . Para hacer las pruebas hay que crearse una cuenta en paypal comun y despues ir al apartado de paypal developer
// y mirar las cuentas que haya de prueba para poder usar sus ID y contraseñas, tanto del comprador como del vendedor
// . Todo lo que sea nombres de las modularizaciones, rutas y demas se pueden cambiar, pero avisar en caso de hacerlo


const createOrder = async (req,res)=>{
    
    try {
        const toPurchase=req.body;
        const order = {
            intent: "CAPTURE",
            purchase_units:toPurchase,
            application_context: {
                brand_name: "LatamCom", // nombre de la empresa que cobra
                landing_page: "LOGIN",  // pagina que redirije el link emitido
                user_action: "PAY_NOW", 
                return_url: `${CLIENT_URL}/SuccessPayment`, // si acepta el pago va a este link
                cancel_url: "http://localhost:3001/buyings/cancelpayment" // si rechaza el pago va a este link
            }
        };


        const params = new URLSearchParams()
        params.append("grant_type","client_credentials")

        const {data : {access_token}} = await axios.post("https://api-m.sandbox.paypal.com/v1/oauth2/token",params, {
            headers:{
                'Content_Type': 'application/x-www-form-urlencoded'
            },  
            auth:{
                username: paypal.PAYPAL_API_CLIENT,
                password: paypal.PAYPAL_API_SECRET,   
            },
        })

        const response = await axios.post("https://api-m.sandbox.paypal.com/v2/checkout/orders", order,{
            headers:{
                Authorization : `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            },
        })
        
        res.status(200).send(response.data.links[1].href)
    } catch (error) {
        res.status(400).send(error.message)
    }

}

const acceptOrder = async (req,res) =>{
    try {
        const {token, PayerID} = req.query

        const response = await axios.post(`${paypal.PAYPAL_API}/v2/checkout/orders/${token}/capture`, {},{
            auth:{
                username: paypal.PAYPAL_API_CLIENT,
                password: paypal.PAYPAL_API_SECRET,
            }
        })

        res.status(200).send(response.data)
    } catch (error) {
        res.status(400).send(error)
    }
}

const cancelOrder = async (req,res) =>{
    try {
        res.redirect(`${CLIENT_URL}/shoppingcart`)
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = {
    createOrder,
    acceptOrder,
    cancelOrder
};