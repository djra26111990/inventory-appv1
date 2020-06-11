import React, { Component } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';

const Producto = props => (
  <tr>
     <td>{props.producto.nombreproducto}</td>
     <td>{props.producto.marca}</td>
     <td>{props.producto.modelo}</td>
     <td>{props.producto.precio}</td>
    <td>{props.producto.cantidad}</td>
    <td>{props.producto.date.substring(0,10)}</td>
    <td>
      <Button variant="success" href={"/edit/"+props.producto._id}>Edit</Button> | <Button variant="danger" onClick={() => { props.deleteProducto(props.producto._id) }}>Delete</Button>
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
    axios.get('http://127.0.0.1:5000/productos/')
      .then(response => {
        this.setState({ productos: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteProducto(id) {
    axios.delete('http://127.0.0.1:5000/productos/'+id)
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
         <Table responsive hover striped borderless>
           <thead>
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
        </Table>
      </div>
    )
  }
}