import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Producto = props => (
  <tr>
    <td>{props.producto.nombreproducto}</td>
    <td>{props.producto.marca}</td>
    <td>{props.producto.modelo}</td>
    <td>{props.producto.precio}</td>
    <td>{props.producto.cantidad}</td>
    <td>{props.producto.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.producto._id}>edit</Link> |  <a href="#" onClick={() => { props.deleteProducto(props.producto._id) }}>delete</a>
    </td>
  </tr>
)

export default class ProductosList extends Component {
  constructor(props) {
    super(props);

    this.deleteProducto = this.deleteProducto.bind(this)

    this.state = {productos: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/productos/')
      .then(response => {
        this.setState({ productos: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteProducto(id) {
    axios.delete('http://localhost:5000/productos/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      productos: this.state.productos.filter(el => el._id !== id)
    })
  }

  productoList() {
    return this.state.productos.map(currentproducto => {
      return <Producto producto={currentproducto} deleteProducto={this.deleteProducto} key={currentproducto._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Listado de productos en inventario</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Nombre de producto</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Date</th>
              <th>Accciones</th>
            </tr>
          </thead>
          <tbody>
            { this.productoList() }
          </tbody>
        </table>
      </div>
    )
  }
}