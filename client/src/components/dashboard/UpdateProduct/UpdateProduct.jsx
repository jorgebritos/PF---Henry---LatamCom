import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteProduct,
	getAllProducts,
	updateProduct,
} from '../../../redux/actions/index';
import s from './UpdateProduct.module.css';

//Material UI
import {
	Table,
	TableContainer,
	TableHead,
	TableBody,
	TableCell,
	TableRow,
	Modal,
	Button,
	TextField,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
//import { Link } from 'react-router-dom';

function UpdateProduct() {
	const dispatch = useDispatch();

	const products = useSelector((state) => state.allProducts);
	const [data, setData] = useState([]);
	//const [modalInsertar, setModalInsertar] = useState(false);
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
		let newProduct = data;
		newProduct.forEach((producto) => {
			if (productoSeleccionado.id === producto.id) {
				producto.nombre = productoSeleccionado.nombre;
				producto.lanzamiento = productoSeleccionado.lanzamiento;
				producto.empresa = productoSeleccionado.empresa;
				producto.unidades_vendidas = productoSeleccionado.unidades_vendidas;
			}
		});
		setData(newProduct);
		dispatch(updateProduct(productoSeleccionado));
		dispatch(getAllProducts());
		abrirCerrarModalEditar();
		window.location.reload();
		// window.scrollTo(0, 0);
	};

	const handleDelete = () => {
		setData(data.filter((producto) => producto.id !== productoSeleccionado.id));
		dispatch(deleteProduct(productoSeleccionado.id));
		dispatch(getAllProducts());
		abrirCerrarModalEliminar();
		window.location.reload();
		// window.scrollTo(0, 0);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setProductoSeleccionado((prevState) => ({
			...prevState,
			[name]: value,
		}));
		console.log(productoSeleccionado);
	};

	const seleccionarProducto = (e, caso) => {
		setProductoSeleccionado(e);
		caso === 'Editar' ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
	};

	useEffect(() => {
		dispatch(getAllProducts());
	}, [dispatch]);

	// const abrirCerrarModalInsertar = () => {
	// 	setModalInsertar(!modalInsertar);
	// };
	const abrirCerrarModalEditar = () => {
		setModalEditar(!modalEditar);
	};
	const abrirCerrarModalEliminar = () => {
		setModalEliminar(!modalEliminar);
	};

	//Para editar

	const bodyEditar = (
		<div className={s.modal}>
			<h3 className={s.h3}>Editar Nuevo Producto</h3>
			<TextField
				name='name'
				className={s.inputmaterial}
				label='Producto'
				onChange={handleChange}
				value={productoSeleccionado && productoSeleccionado.name}
			/>
			<br />
			<TextField
				name='description'
				className={s.inputmaterial}
				label='Descripcion'
				onChange={handleChange}
				value={productoSeleccionado && productoSeleccionado.description}
			/>
			<br />
			<TextField
				name='image'
				className={s.inputmaterial}
				label='Imagen'
				onChange={handleChange}
				value={productoSeleccionado && productoSeleccionado.image}
			/>
			<br />
			<TextField
				name='stock'
				className={s.inputmaterial}
				label='Stock'
				onChange={handleChange}
				value={productoSeleccionado && productoSeleccionado.stock}
			/>
			<br />
			<TextField
				name='price'
				className={s.inputmaterial}
				label='Precio'
				onChange={handleChange}
				value={productoSeleccionado && productoSeleccionado.price}
			/>
			<br />
			<TextField
				name='amountSold'
				className={s.inputmaterial}
				label='Unidades Vendidas'
				onChange={handleChange}
				value={productoSeleccionado && productoSeleccionado.amountSold}
			/>
			<br />
			<TextField
				name='categories'
				className={s.inputmaterial}
				label='Categorias'
				onChange={handleChange}
				value={
					productoSeleccionado.categories
						? productoSeleccionado.categories[0].name
						: ''
				}
			/>
			<br />
			<br />
			<div>
				<Button className={s.color1} onClick={() => handleSubmit()}>
					Editar
				</Button>
				<Button className={s.color2} onClick={() => abrirCerrarModalEditar()}>
					Cancelar
				</Button>
			</div>
		</div>
	);

	const bodyEliminar = (
		<div className={s.modal}>
			<p>
				Estás seguro que deseas eliminar el producto
				<b>{productoSeleccionado && productoSeleccionado.name}</b> ?
			</p>
			<div>
				<Button className={s.color1} onClick={() => handleDelete()}>
					Sí
				</Button>
				<Button className={s.color2} onClick={() => abrirCerrarModalEliminar()}>
					No
				</Button>
			</div>
		</div>
	);

	return (
		<div className={s.back_ground}>
			<h1 className={s.h1}>UpdateProduct</h1>
			<div className={s.contenedor}>
				<TableContainer>
					<Table className={s.table}>
						<TableHead>
							<TableRow className={s.thead}>
								<TableCell className={s.thead}>Producto</TableCell>
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
							{products &&
								products.map((e) => (
									<TableRow key={e.id}>
										<TableCell>{e.name}</TableCell>
										<TableCell>{e.description}</TableCell>
										<TableCell width={'20px'}>{e.image}</TableCell>
										<TableCell>{e.price}</TableCell>
										<TableCell>{e.stock}</TableCell>
										<TableCell>{e.amountSold}</TableCell>
										<TableCell>{e.categories[0].name}</TableCell>
										<Edit
											className={s.iconos}
											onClick={() => seleccionarProducto(e, 'Editar')}
										/>
										&nbsp;&nbsp;&nbsp;&nbsp;
										<Delete
											className={s.iconos}
											onClick={() => seleccionarProducto(e, 'Eliminar')}
										/>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</TableContainer>
				<Modal open={modalEditar} onClose={() => abrirCerrarModalEditar()}>
					{bodyEditar}
				</Modal>
				<Modal open={modalEliminar} onClose={() => abrirCerrarModalEliminar()}>
					{bodyEliminar}
				</Modal>
			</div>
		</div>
	);
}

export default UpdateProduct;
