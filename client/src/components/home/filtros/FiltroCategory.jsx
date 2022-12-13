export default function FiltroCategory({
	s,
	categories,
	handleCategoryFilter,
	filterCategory,
}) {
	return (
		<div className={s.filtro}>
			<h4 className={s.h4}>Filter By Category</h4>
			<ul>
				<li className={s.li} key={'All'}>
					<label className={s.label}>
						<input
							className={s.input}
							type={'radio'}
							value={'All'}
							name={'category'}
							id='categoria'
							onInput={(e) => handleCategoryFilter('All')}
						/>
						<span className={s.span}>All</span>
					</label>
				</li>

				{categories?.map((c) => {
					return (
						<li className={s.li} key={c.name}>
							<label className={s.label}>
								<input
									className={s.input}
									type={'radio'}
									value={c.name}
									name={'category'}
									id='categoria'
									onInput={(e) => handleCategoryFilter(c.name)}
								/>
								<span className={s.span}>{c.name}</span>
							</label>
						</li>
					);
				})}
			</ul>
			<button className={s.btn} onClick={(e) => filterCategory(e)}>
				Filter
			</button>
		</div>
	);
}
