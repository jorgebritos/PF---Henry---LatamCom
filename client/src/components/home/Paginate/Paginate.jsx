import React from 'react';
import s from './Paginate.module.css';

export default function Paginado({
	producPrePage,
	totalProducts,
	paginado,
	page,
}) {
	const pageNumbers = [];
	const numOfPages = Math.ceil(totalProducts / producPrePage);

	for (let i = 1; i <= numOfPages; i++) {
		pageNumbers.push(i);
	}

	return (
		<nav className={s.nav}>
			<ul>
				{page === 1 || !numOfPages ? (
					<></>
				) : (
					<li className={s.Paginate}>
						<button
							className={s.ButPaginate}
							key='-1'
							onClick={() => paginado('-')}>
							◄
						</button>
					</li>
				)}

				{pageNumbers &&
					pageNumbers.map((number) => (
						<li className={s.Paginate} key={number}>
							<button
								className={number === page ? s.actual : s.ButPaginate}
								//className={s.ButPaginate}
								onClick={() => paginado(number)}>
								{number}
							</button>
						</li>
					))}

				{page === numOfPages || !numOfPages ? (
					<></>
				) : (
					<li className={s.Paginate}>
						<button
							className={s.ButPaginate}
							key='+1'
							onClick={() => paginado('+')}>
							►
						</button>
					</li>
				)}
			</ul>
		</nav>
	);
}
//Una vez montado el Home:
// const allVideogames = useSelector((state)=> state.videogames) //en nuestro caso seria allProducts
// const [order, setOrder]= useState('');
// const [currentPage, setCurrentPage]= useState(1);//seteo mi estado local inicial en la pagina 1
// const [videogamesPerPage,setVideogamesPerPage]=useState(15);
// const indexOfLastVideogame = currentPage * videogamesPerPage//15
// const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage//0
// const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)

//  const paginado= (pageNumber)=>{
//     setCurrentPage(pageNumber)
// }

//  <Paginado
//value={currentPage}
//videogamesPerPage={videogamesPerPage}
//allVideogames={allVideogames.length}
//paginado= {paginado}/>
