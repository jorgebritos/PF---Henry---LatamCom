import './App.css';
import { Route } from "react-router-dom";

import Product from "./components/Product"

function App() {
  return (
    <div className="App">
      
      
      <Route path="/product/:id" component={Product} />
      {/* a modificar para conseguir un mejor enrutado */}

    </div>
  );
}

export default App;
