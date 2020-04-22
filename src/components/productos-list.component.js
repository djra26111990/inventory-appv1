import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { StickyTable, Row, Cell } from 'react-sticky-table';



const Producto = props => (
   <Row>
     <Cell>{props.producto.nombreproducto}</Cell>
     <Cell>{props.producto.marca}</Cell>
     <Cell>{props.producto.modelo}</Cell>
     <Cell>{props.producto.precio}</Cell>
    <Cell>{props.producto.cantidad}</Cell>
    <Cell>{props.producto.date.substring(0,10)}</Cell>
    <Cell>
      <Link to={"/edit/"+props.producto._id}>edit</Link> |  <a href="#" onClick={() => { props.deleteProducto(props.producto._id) }}>delete</a>
    </Cell>
  </Row>
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
         <StickyTable>
           <thead className="thead-light">
             <Row>
               <Cell>Nombre de producto</Cell>
               <Cell>Marca</Cell>
               <Cell>Modelo</Cell>
               <Cell>Precio</Cell>
               <Cell>Cantidad</Cell>
               <Cell>Date</Cell>
              <Cell>Accciones</Cell>
            </Row>
          </thead>
          <tbody>
            { this.productoList() }
          </tbody>
        </StickyTable>
      </div>
    )
  }
}