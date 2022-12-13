import React from 'react';
import ChatBot from 'react-simple-chatbot'
import s from './ChatBot.module.css'
import { ThemeProvider } from 'styled-components' //La documentación recomienda usar style components
import { Link } from 'react-router-dom'



//const theme = {} //tambien recomienda usar un objeto para añadir los estilos
const theme = {
  background: '#f5f8fb',
  fontFamily: 'Arial',
  headerBgColor: '#17abda',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#17abda',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

export default function MyChatBot() {

      return (
        <div>
          <ThemeProvider theme={theme}>
              <ChatBot 
              //botAvatar='https://cdn-icons-png.flaticon.com/512/4712/4712035.png' //para cambiar el avatar del chat
              floatingIcon='https://cdn-icons-png.flaticon.com/512/4711/4711987.png'
                floating='true'
                width='300px'
                botDelay={2000}
                  steps={[
                    {
                        id: '0',
                        message: 'Hola!, Latamcom te manda un saludo 👋',
                        trigger: '1',
                    },
                      {
                          id: "1",
                          message: "¿En qué podemos ayudarte?",
                          trigger: "2"
                      },
                      {
                          id: "2",
                          options: [
                            { value: "somos", label: "¿Quienes son?", trigger: "3"},
                            { value: 1, label: 'Medios de pago', trigger: '4' },
                            { value: 2, label: 'Reportar un problema', trigger: '5' },
                            { value: 3, label: 'Quiero comprar algo', trigger: '6' },
                            { value: 4, label: 'Estoy bien, gracias', trigger: 'responseNo' },
                            ],
                          
                      },
                      {
                          id: "3",
                          message: "Somos una tienda virtual, en la que puedes encontrar productos a precios muy accesibles",
                          trigger: "1a"
                      },
                      {
                        id: "4",
                        message: "Puedes efectuar tus compras con PayPal, en el futuro agregaremos más medios de pago 😉",
                        trigger: "1a"
                      },
                      {
                        id: "5",
                        message: "Puedes contarnos qué pasa haciendo click en el 'Contact' de la parte inferior de la página o en el siguiente botón", //Esta respuesta solo es momentanea 😂
                        trigger: "5a"
                      },
                      {
                        id: "5a",
                        component:(<div><Link to="/contact"><button className={s.btn}>Contact</button></Link> </div>),
                        trigger: "1a"
                      },
                      {
                        id:"6",
                        message: "Genial, primero debes iniciar sesión ",
                        trigger: "6a"
                      },
                      {
                        id:"6a",
                        message: `Puedes disfrutar de toda la experiencia después de ingresar tus datos para iniciar sesión haciendo click en el 'Login' de la parte superior de nuestra página o en el siguiente botón🤗`,
                        trigger: "6b"
                      },
                      {
                        id:"6b",
                        component: (<div><Link to="/LoginForm"><button className={s.btn}>Login</button></Link> </div>),
                        trigger: "1a"
                      },
                      {
                        id: "1a",
                        message: "¿Algo más?",
                        trigger: "2"
                      },
                      {
                        id: "responseNo",
                        message: "Está bien...",
                        trigger: "avisoEspera"
                      },
                      {
                        id: "avisoEspera",
                        message: "Escribenos cualquier cosa si nos necesitas 👋😉",
                        trigger: "espera"
                      },
                      {
                        id: "espera",
                        user: true,
                        trigger: "Dinos"
                      },
                      {
                        id: "Dinos",
                        message: "Dinos...",
                        trigger: "1"
                      }
                     
                  ]}
                  />
          </ThemeProvider>
        </div>
      )
  }