import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAllCategories,
	createCategories,
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

function CreateCategory() {
	const dispatch = useDispatch();

	const categories = useSelector((state) => state.categories);
	const [modalInsertar, setModalInsertar] = useState(false);
	const [categoriaSeleccionado, setCategoriaSeleccionado] = useState({
		name: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCategoriaSeleccionado((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleCreate = () => {
		if (categoriaSeleccionado.name.length >= 1) {
			dispatch(createCategories(categoriaSeleccionado));
			alert('Se ha creado la categoria');
			window.location.reload();
			abrirCerrarModalInsertar();
		} else {
			alert('Debe rellenar los campos');
		}
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

	return (
		<div className={s.back_ground}>
			<button className={s.btn} onClick={() => abrirCerrarModalInsertar()}>
				Crear
			</button>{' '}
			<br />
			<div className={s.contenedor}>
				<br />
				<br />
				<TableContainer>
					<Table>
						<TableHead className={s.thead}>
							<TableRow>
								<TableCell className={s.text}>Id</TableCell>
								<TableCell className={s.text}>Nombre</TableCell>
							</TableRow>
						</TableHead>

						{/* informacion de la  Tabla */}

						<TableBody>
							{categories &&
								categories.map((e) => (
									<TableRow key={e.id}>
										<TableCell className={s.text}>{e.id}</TableCell>
										<TableCell className={s.text}>{e.name}</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</TableContainer>

				<Modal open={modalInsertar} onClose={() => abrirCerrarModalInsertar()}>
					{bodyInsertar}
				</Modal>
			</div>
		</div>
	);
}

export default CreateCategory;
