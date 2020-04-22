import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

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
    <div>
      <h3>Editar Listado de productos</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Producto: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.nombreproducto}
              onChange={this.onChangeNombreproducto}
              />
        </div>
        <div className="form-group"> 
          <label>Marca: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.marca}
              onChange={this.onChangeMarca}
              />
        </div>
        <div className="form-group"> 
          <label>Modelo: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.modelo}
              onChange={this.onChangeModelo}
              />
        </div>
        <div className="form-group">
          <label>Precio $: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.precio}
              onChange={this.onChangePrecio}
              />
        </div>
        <div className="form-group">
          <label>Cantidad: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.cantidad}
              onChange={this.onChangeCantidad}
              />
        </div>
        <div className="form-group">
          <label>Fecha: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Editar producto" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}