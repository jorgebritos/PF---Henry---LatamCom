import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {deleteProduct, getAllProducts, updateProduct} from '../../redux/actions/index';
import './UpdateProduct.css'

//Material UI
import {Table, TableContainer, TableHead, TableBody, TableCell, TableRow, Modal, Button, TextField} from '@mui/material';
import {Edit, Delete} from '@mui/icons-material';


function UpdateProduct() {

    const dispatch = useDispatch();
    
    const products = useSelector((state) => state.allProducts);
    const [data, setData]=useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState({
        name: '',
        description: '',
        image: '',
        price: '',
        stock: '',
        amountSold: '',
        categories: '',
    });

    const handleSubmit = () => {
        let newProduct=data;
      newProduct.map(producto=>{
        if(productoSeleccionado.id===producto.id){
          producto.nombre=productoSeleccionado.nombre;
          producto.lanzamiento=productoSeleccionado.lanzamiento;
          producto.empresa=productoSeleccionado.empresa;
          producto.unidades_vendidas=productoSeleccionado.unidades_vendidas;
        }
      })
        setData(newProduct);
        dispatch(updateProduct(productoSeleccionado))
        alert("Se ha actualizado el producto")
        abrirCerrarModalEditar()
    }

    const handleDelete = () => {
        setData(data.filter(producto=>producto.id!==productoSeleccionado.id));
        dispatch(deleteProduct(productoSeleccionado.id))
        alert("Se ha eliminado el producto")
        abrirCerrarModalEditar()
    }

    const handleChange = e => {
        const {name, value} = e.target;
        setProductoSeleccionado(prevState => ({
            ...prevState,
            [name]: value
        }))
        console.log(productoSeleccionado)
    }

    const seleccionarProducto=(e, caso)=>{
        setProductoSeleccionado(e);
        (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
      }


    useEffect(() => {
        dispatch(getAllProducts());
      }, [dispatch]);

    const abrirCerrarModalInsertar = () => {
        setModalInsertar(!modalInsertar);
    }
    const abrirCerrarModalEditar = () => {
        setModalEditar(!modalEditar);
    }
    const abrirCerrarModalEliminar = () => {
        setModalEliminar(!modalEliminar);
    }

    //Para Crear

    const bodyInsertar = (
        <div className='modal'>
            <h3>Crear Nuevo Producto</h3>
            <TextField name='name' className='inputMaterial' label='Producto' onChange={handleChange}/>
            <br />
            <TextField name='description' className='inputMaterial' label='Descripcion' onChange={handleChange}/>
            <br />
            <TextField name='image' className='inputMaterial' label='Imagen' onChange={handleChange}/>
            <br />
            <TextField name='price' className='inputMaterial' label='Precio' onChange={handleChange}/>
            <br />
            <TextField name='stock' className='inputMaterial' label='Stock' onChange={handleChange}/>
            <br />
            <TextField name='amountSold' className='inputMaterial' label='Unidades Vendidas' onChange={handleChange}/>
            <br />
            <TextField name='categories' className='inputMaterial' label='Categorias' onChange={handleChange}/>
            <br /><br />
            <div align='rigth'>
                <Button color = 'primary'>Insertar</Button>
                <Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
            </div>
        </div>
    )

        //Para editar

    const bodyEditar = (
        <div className='modal'>
            <h3>Editar Nuevo Producto</h3>
            <TextField name='name' className='inputMaterial' label='Producto' onChange={handleChange} value={productoSeleccionado&&productoSeleccionado.name}/>
            <br />
            <TextField name='description' className='inputMaterial' label='Descripcion' onChange={handleChange} value={productoSeleccionado&&productoSeleccionado.description}/>
            <br />
            <TextField name='image' className='inputMaterial' label='Imagen' onChange={handleChange} value={productoSeleccionado&&productoSeleccionado.image}/>
            <br />
            <TextField name='stock' className='inputMaterial' label='Stock' onChange={handleChange} value={productoSeleccionado&&productoSeleccionado.stock}/>
            <br />
            <TextField name='price' className='inputMaterial' label='Precio' onChange={handleChange}/>
            <br />
            <TextField name='amountSold' className='inputMaterial' label='Unidades Vendidas' onChange={handleChange} value={productoSeleccionado&&productoSeleccionado.amountSold}/>
            <br />
            <TextField name='categories' className='inputMaterial' label='Categorias' onChange={handleChange} value={productoSeleccionado&&productoSeleccionado.categories}/>
            <br /><br />
            <div align='rigth'>
                <Button color = 'primary' onClick={()=> handleSubmit()}>Editar</Button>
                <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
            </div>
        </div>
    )

    const bodyEliminar=(
        <div className='modal'>
          <p>Estás seguro que deseas eliminar el producto <b>{productoSeleccionado && productoSeleccionado.name}</b> ? </p>
          <div align="right">
            <Button color="secondary" onClick={()=>handleDelete()} >Sí</Button>
            <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>
          </div>
    
        </div>
      )

  return (

    <div>UpdateProduct
        <br />
        <Button onClick={abrirCerrarModalInsertar}>Crear Producto</Button>
        <br /><br />
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Producto</TableCell>
                        <TableCell>Descripcion</TableCell>
                        <TableCell>Imagen</TableCell>
                        <TableCell>Precio</TableCell>
                        <TableCell>Stock</TableCell>
                        <TableCell>Unidades Vendidas</TableCell>
                        <TableCell>Categorias</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>

                {/* informacion de la  Tabla */}

                <TableBody>
                    {products&&products.map(e=>(
                        <TableRow key={e.id}>
                            <TableCell>{e.name}</TableCell>
                            <TableCell>{e.description}</TableCell>
                            <TableCell>{e.image}</TableCell>
                            <TableCell>{e.price}</TableCell>
                            <TableCell>{e.stock}</TableCell>
                            <TableCell>{e.amountSold}</TableCell>
                            <TableCell>{e.categories}</TableCell>
                            <Edit className='iconos' onClick={() => seleccionarProducto(e, 'Editar')}/>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Delete className='iconos' onClick={()=>seleccionarProducto(e, 'Eliminar')}/>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

        <Modal
        open = {modalInsertar}
        onClose = {() => abrirCerrarModalInsertar()}>
            {bodyInsertar}
        </Modal>

        <Modal
        open = {modalEditar}
        onClose = {() => abrirCerrarModalEditar()}>
            {bodyEditar}
        </Modal>

        <Modal
        open={modalEliminar}
        onClose={() => abrirCerrarModalEliminar()}>
        {bodyEliminar}
        </Modal>
    </div>
  )
}

export default UpdateProduct