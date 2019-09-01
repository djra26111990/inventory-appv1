import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import ProductosList from "./components/productos-list.component";
import EditProducto from "./components/edit-producto.component";
import CreateProducto from "./components/crear-producto.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={ProductosList} />
      <Route path="/edit/:id" component={EditProducto} />
      <Route path="/create" component={CreateProducto} />
      <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
