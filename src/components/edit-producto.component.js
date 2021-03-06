import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Form, Button, Col } from 'react-bootstrap'

export default class EditProducto extends Component {
  constructor(props) {
    super(props);

    this.onChangeNombreproducto = this.onChangeNombreproducto.bind(this);
    this.onChangeMarca = this.onChangeMarca.bind(this);
    this.onChangeModelo = this.onChangeModelo.bind(this);
    this.onChangePrecio = this.onChangePrecio.bind(this);
    this.onChangeCantidad = this.onChangeCantidad.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      nombreproducto: '',
      marca: '',
      modelo: '',
      precio: 0,
      cantidad: 0,
      date: new Date()
    }
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:5000/productos/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          nombreproducto: response.data.nombreproducto,
          marca: response.data.marca,
          modelo: response.data.modelo,
          precio: response.data.precio,
          cantidad: response.data.cantidad,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  onChangeNombreproducto(e) {
    this.setState({
      nombreproducto: e.target.value
    })
  }

  onChangeMarca(e) {
    this.setState({
      marca: e.target.value
    })
  }

  onChangeModelo(e) {
    this.setState({
      modelo: e.target.value
    })
  }

  onChangePrecio(e) {
    this.setState({
      precio: e.target.value
    })
  }

  onChangeCantidad(e) {
    this.setState({
      cantidad: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const producto = {
      nombreproducto: this.state.nombreproducto,
      marca: this.state.marca,
      modelo: this.state.modelo,
      precio: this.state.precio,
      cantidad: this.state.cantidad,
      date: this.state.date
    }

    console.log(producto);

    axios.post('http://127.0.0.1:5000/productos/update/' + this.props.match.params.id, producto)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
      <>
      <h3>Editar producto</h3>
      <Form onSubmit={this.onSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridProducto">
            <Form.Label>Producto:</Form.Label>
            <Form.Control 
            type="text" 
            placeholder="Nombre de producto" 
            value={this.state.nombreproducto}
            onChange={this.onChangeNombreproducto}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridMarca">
            <Form.Label>Marca del producto:</Form.Label>
            <Form.Control 
            type="text" 
            placeholder="Marca" 
            value={this.state.marca}
            onChange={this.onChangeMarca} />
          </Form.Group>
        </Form.Row>

        <Form.Row>
        <Form.Group as={Col} controlId="formGridModelo">
            <Form.Label>Modelo del producto:</Form.Label>
            <Form.Control 
            type="text" 
            placeholder="Modelo" 
            value={this.state.modelo}
            onChange={this.onChangeModelo} />
          </Form.Group>{' '}

          <Form.Group as={Col} controlId="formGridPrecio">
            <Form.Label>Precio del producto $:</Form.Label>
            <Form.Control 
            type="text" 
            placeholder="$Precio" 
            value={this.state.precio}
            onChange={this.onChangePrecio} />
          </Form.Group>
        </Form.Row>

        <Form.Row>
        <Form.Group as={Col} controlId="formGridCantidad">
            <Form.Label>Cantidad del producto:</Form.Label>
            <Form.Control 
            type="text" 
            placeholder="Cantidad" 
            value={this.state.cantidad}
            onChange={this.onChangeCantidad} />
          </Form.Group>
        </Form.Row>

        <Form.Row>
        <Form.Group controlId="formGridFecha">
            <Form.Label>Fecha de Ingreso:</Form.Label>{' '}
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </Form.Group>
        </Form.Row>

        <Button variant="primary" type="submit">
          Actualizar producto en inventario
        </Button>
    </Form>
    </>
    )
  }
}