import React from 'react';
import s from './Loadin.module.css';

export default function Loading() {
	return (
		<div className={s.loader}>
			<span>L</span>
			<span>O</span>
			<span>A</span>
			<span>D</span>
			<span>I</span>
			<span>N</span>
			<span>G</span>
		</div>
	);
}
