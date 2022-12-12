import s from './CreateProduct.module.css';

const ProductSended = () => {
	return (
		<div className={s.divC}>
			<div className={s.container}>
				<h2 className={s.message}>The product was successfully created</h2>
			</div>
		</div>
	);
};

export default ProductSended;
