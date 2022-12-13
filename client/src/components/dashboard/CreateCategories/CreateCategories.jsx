import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAllCategories,
	createCategories,
	deleteCategory,
	updateCategory,
} from '../../../redux/actions/index';
import s from './CreateCategories.module.css';

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
import { Delete, Edit } from '@mui/icons-material';

function CreateCategory() {
	const dispatch = useDispatch();

	const categories = useSelector((state) => state.categories);
	const [data, setData] = useState([]);
	const [modalInsertar, setModalInsertar] = useState(false);
	const [modalEditar, setModalEditar] = useState(false);
	const [modalEliminar, setModalEliminar] = useState(false);
	const [categoriaSeleccionado, setCategoriaSeleccionado] = useState({
		name: '',
	});

	const abrirCerrarModalEditar = () => {
		setModalEditar(!modalEditar);
	};
	const abrirCerrarModalEliminar = () => {
		setModalEliminar(!modalEliminar);
	};

	const handleSubmit = () => {
		let newProduct = data;
		newProduct.forEach((categoria) => {
			if (categoriaSeleccionado.id === categoria.id) {
				categoria.nombre = categoriaSeleccionado.nombre;
				categoria.lanzamiento = categoriaSeleccionado.lanzamiento;
				categoria.empresa = categoriaSeleccionado.empresa;
				categoria.unidades_vendidas = categoriaSeleccionado.unidades_vendidas;
			}
		});
		setData(newProduct);
		dispatch(updateCategory(categoriaSeleccionado));
		// dispatch(getAllProducts());
		abrirCerrarModalEditar();
		window.location.reload();
		// window.scrollTo(0, 0);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCategoriaSeleccionado((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const seleccionarCategoria = (e, caso) => {
		setCategoriaSeleccionado(e);
		caso === 'Editar' ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
	};

	const handleCreate = () => {
		if (categoriaSeleccionado.name.length >= 1) {
			dispatch(createCategories(categoriaSeleccionado));
			alert('Se ha creado la categoria');
			abrirCerrarModalInsertar();
			window.location.reload();
		} else {
			alert('Debe rellenar los campos');
		}
	};

	const handleDelete = () => {
		setData(
			data.filter((categoria) => categoria.id !== categoriaSeleccionado.id),
		);
		dispatch(deleteCategory(categoriaSeleccionado.id));
		abrirCerrarModalEliminar();
		window.location.reload();
		// window.scrollTo(0, 0);
	};

	useEffect(() => {
		dispatch(getAllCategories());
	}, [dispatch]);

	const abrirCerrarModalInsertar = () => {
		setModalInsertar(!modalInsertar);
	};

	const bodyInsertar = (
		<div className={s.modal}>
			<h3>Agregar Nueva Categoria</h3>
			<TextField
				name='name'
				className={s.inputmaterial}
				label='Nombre'
				onChange={handleChange}
			/>
			<br />
			<br />
			<div align='right'>
				<Button color='primary' onClick={() => handleCreate()}>
					Crear
				</Button>
				<Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
			</div>
		</div>
	);

	const bodyEliminar = (
		<div className={s.modal}>
			<p>
				Estás seguro que deseas eliminar la categoria
				<b> {categoriaSeleccionado && categoriaSeleccionado.name}</b> ?
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

	const bodyEditar = (
		<div className={s.modal}>
			<h3>Agregar Nueva Categoria</h3>
			<TextField
				name='name'
				className={s.inputmaterial}
				label='Nombre'
				onChange={handleChange}
				value={categoriaSeleccionado && categoriaSeleccionado.name}
			/>
			<br />
			<br />
			<div align='right'>
				<Button color='primary' onClick={() => handleSubmit()}>
					Crear
				</Button>
				<Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
			</div>
		</div>
	);

	return (
		<div className={s.back_ground}>
			<br />
			<button className={s.btn} onClick={() => abrirCerrarModalInsertar()}>
				Crear
			</button>
			<br />
			<br />
			<div className={s.contenedor}>
				<TableContainer className={s.border}>
					<Table>
						<TableHead className={s.thead}>
							<TableRow>
								<TableCell className={s.text}>Id</TableCell>
								<TableCell className={s.text}>Nombre</TableCell>
								<TableCell className={s.text}>Acciones</TableCell>
							</TableRow>
						</TableHead>

						{/* informacion de la  Tabla */}

						<TableBody className={s.table}>
							{categories &&
								categories.map((e) => (
									<TableRow key={e.id}>
										<TableCell className={s.text1}>{e.id}</TableCell>
										<TableCell className={s.text1}>{e.name}</TableCell>
										<Edit
											className={s.iconos}
											onClick={() => seleccionarCategoria(e, 'Editar')}
										/>
										&nbsp;&nbsp;&nbsp;&nbsp;
										<Delete
											className={s.iconos}
											onClick={() => seleccionarCategoria(e, 'Eliminar')}
										/>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>

			<Modal open={modalInsertar} onClose={() => abrirCerrarModalInsertar()}>
				{bodyInsertar}
			</Modal>

			<Modal open={modalEditar} onClose={() => abrirCerrarModalEditar()}>
				{bodyEditar}
			</Modal>

			<Modal open={modalEliminar} onClose={() => abrirCerrarModalEliminar()}>
				{bodyEliminar}
			</Modal>
		</div>
	);
}

export default CreateCategory;
