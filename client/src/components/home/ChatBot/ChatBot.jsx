import React from 'react'
import ChatBot from 'react-simple-chatbot'
//import { ThemeProvider } from 'styled-components' //La documentación recomienda usar style components


//const theme = {} //tambien recomienda usar un objeto para añadir los estilos

export default function MyChatBot() {

      return (
        <div>
          {/*/<ThemeProvider theme={theme}>*/}
              <ChatBot 
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
                            { value: "somos", label: "¿Quienes somos?", trigger: "3"},
                            { value: 1, label: 'Medios de pago', trigger: '4' },
                            { value: 2, label: 'Reportar un problema', trigger: '5' },
                            { value: 3, label: 'Tengo hambre 😔', trigger: '6' },
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
                        message: "De malas papá", //Esta respuesta solo es momentanea 😂
                        trigger: "1a"
                      },
                      {
                        id:"6",
                        message: "Buen provecho: 🍕",
                        trigger: "1a"
                      },
                      {
                        id: "1a",
                        message: "¿Algo más?",
                        trigger: "2"
                      }

                  ]}
              />
          {/*</ThemeProvider>*/}
        </div>
      )
  }