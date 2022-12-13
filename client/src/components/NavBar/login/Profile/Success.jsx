import s from './Profile.module.css';

const Success = () => {
	return (
		<div className={s.container}>
			<div className={s.contenS}>
				<h2 className={s.message}>The user was successfully created</h2>
			</div>
		</div>
	);
};
export default Success;
