import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { createComment, deleteComment, getAllComments, updateComment, updateRatingProduct, } from '../../../../redux/actions';
import s from './CreateComment.module.css';
import star from '../../../../asset/puntajes.png';

const CreateComment = () => {
	const { isAuthenticated } = useAuth0();
	const dispatch = useDispatch();
	const [flag, setFlag] = useState(true)

	const product = useSelector((state) => state.productDetail);
	let comments = useSelector((state) => state.productComments);
	const user = useSelector((state) => state.user);
	const ratings = useSelector((state) => state.productDetail.rating);

	const userComment = comments.filter((c) => {
		return c.users[0].username === user.username
	})

	const [comment, setComment] = useState({
		comment: '',
		rating: 1,
	});

	function handleComment(e) {
		e.preventDefault();
		setComment({
			...comment,
			[e.target.name]: e.target.value,
		});
		return comment;
	}

	const calculateRating= useCallback(() =>{
		let newRating = 0;
		for (const c of comments) {
			newRating += c.rating;
		}
		newRating /= comments.length;
		if (newRating > 0) {
			dispatch(updateRatingProduct({ rating: newRating, id: product.id }));
			dispatch(getAllComments(product.id))
		}
		return newRating
	},[comments, product.id, dispatch])

	async function sendComment(e, idUser) {
		e.preventDefault();
		setFlag(!flag)
		let idProduct = product.id;
		dispatch(
			createComment({
				...comment,
				idUser,
				idProduct,
			}),
		);
		setComment({ ...comment, comment: '' });
		calculateRating()
	}

	async function deleteComments(e, idUser) {
		e.preventDefault()
		setFlag(!flag);
		let idProduct = product.id;
		dispatch(deleteComment(idUser, idProduct))
		dispatch(getAllComments(idProduct))
		setComment({ ...comment, comment: '' });
		calculateRating()
	}

	async function editComment(e, idUser) {
		e.preventDefault()
		setFlag(!flag);
		let idProduct = product.id;
		dispatch(updateComment({
			...comment,
			idUser,
			idProduct,
		}))
		dispatch(getAllComments(idProduct))
		setComment({ ...comment, comment: '' });
		calculateRating()
	}

	useEffect(() => {
		if (product.id) {
			dispatch(getAllComments(product.id))
			
		};
	}, [dispatch, comments.length,product.id]);



	return (
		<div className={s.conten}>
			{ratings > 0 ? (
				<label>
					Rating General del Producto: {ratings.toFixed(1)} (
					{comments.length})
				</label>
			) : (
				''
			)}
			<>
				{(isAuthenticated || user.username) ? (userComment.length === 0 && flag) ? (
					<div>
						<div className={s.rating}>
							<label>Rating:</label>
							<br />
							<select
								className={s.select}
								name='rating'
								onChange={(e) => handleComment(e)}>
								<option value='1'>1</option>
								<option value='2'>2</option>
								<option value='3'>3</option>
								<option value='4'>4</option>
								<option value='5'>5</option>
							</select>
							<br />
						</div>
						<div className={s.comment}>
							<textarea
								className={s.textarea}
								cols={50}
								name='comment'
								rows={10}
								placeholder={'Please, write a comment'}
								value={comment.comment}
								onChange={(e) => handleComment(e)}
							/>
							<button className={s.btn} onClick={(e) => sendComment(e, user.id)}>
								Send Comment
							</button>
						</div>
					</div>
				) : (
					<div>
						<p className={s.parafo}>You Already made a comment!</p>
						<div style={{ visibility: !flag }}>
							<div className={s.rating}>
								<label>Rating:</label>
								<br />
								<select
									className={s.select}
									name='rating'
									onChange={(e) => handleComment(e)}>
									<option value='1'>1</option>
									<option value='2'>2</option>
									<option value='3'>3</option>
									<option value='4'>4</option>
									<option value='5'>5</option>
								</select>
								<br />
							</div>
							<div className={s.comment}>
								<textarea
									className={s.textarea}
									cols={50}
									name='comment'
									rows={10}
									placeholder={'Please, write a comment'}
									value={comment.comment}
									onChange={(e) => handleComment(e)}
								/>
								<button className={s.btn} onClick={(e) => editComment(e, user.id)}>
									Edit Comment
								</button>
							</div>
						</div>
						<button className={s.btn} onClick={e => deleteComments(e, user.id)}>Delete Comment</button>
					</div>
				) : (
					<p className={s.parafo}>Must Log in to make a comment!</p>
				)}
			</>

			<div>
				{comments.length ? (
					<div>
						<h3 className={s.h3}>Comments:</h3>
						{comments.map((c, index) => {
							return (
								<div className={s.contenComments} key={index}>
									<p>{c.users.length ? c.users[0].username : ''}</p>
									<div className={s.divrow}>
										<h4 className={s.h3}>Rating:</h4>
										<div className={s.divrow}>
											<p className={s.par}>{c.rating}</p>
											<img
												src={star}
												alt=''
												height={'10px'}
												className={s.immg}
											/>
										</div>
									</div>

									<p className={s.parafo}>{c.comment}</p>
								</div>
							);
						})}
					</div>
				) : (
					<p className={s.parafo}>Without comentaries</p>
				)}
			</div>
		</div>
	);
};

export default CreateComment;
