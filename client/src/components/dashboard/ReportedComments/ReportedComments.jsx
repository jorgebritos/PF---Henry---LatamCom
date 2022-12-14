import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteComment,
	dismissReport,
	getAllReported,
} from '../../../redux/actions';
import {  NavLink } from 'react-router-dom';
import s from './ReportedComments.module.css';

export default function ReportedComments() {
	const dispatch = useDispatch();
	const reportedComments = useSelector((state) => state.reportedComments);

	useEffect(() => {
		dispatch(getAllReported());
	}, [reportedComments,dispatch]);

	const dismissedReport = (id) => {
		dispatch(dismissReport(id));
	};

	return (
		<div className={s.conten}>
			<div className={s.conte_row}>
				<div>
					<h2 className={s.h2}>REPORTED COMMENTS</h2>
					<div className={s.cads}>
						{reportedComments.length > 0 ? (
							reportedComments.map((c) => {
								return (
									<div className={s.Card} key={c.id}>
										<p>User: {c.users[0].username}</p>
										<p>Comment: {c.comment}</p>
										<p>Inside Of: {c.products[0].name}</p>
										<h5>Actions:</h5>
										<button
											className={s.btn}
											onClick={(e) =>
												dispatch(deleteComment(c.users[0].id, c.products[0].id))
											}>
											Delete Comment
										</button>{' '}
										Or{' '}
										<button
											className={s.btn}
											onClick={(e) => dismissedReport(c.id)}>
											Dismiss
										</button>
										<br />
										<NavLink
											className={s.link}
											to={`/product/${c.products[0].id}`}>
											Click Here to Follow the Comment
										</NavLink>
									</div>
								);
							})
						) : (
							<h3>All Good for now!</h3>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
