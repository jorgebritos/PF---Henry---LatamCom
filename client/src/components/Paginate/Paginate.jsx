import React from "react";
import "../Css/Paginate.css";

export default function Paginado({videogamesPerPage, allVideogames, paginado,value}){
    const pageNumbers=[]

    for (let i=1; i <= Math.ceil(allVideogames/videogamesPerPage); i++){
        pageNumbers.push(i)
    }

    return(
        <nav>   
            <ul >
                {pageNumbers && pageNumbers.map(number =>(
                    <li className="Paginate" key={number}>
                        <button className={number === value? "actual" : "ButPaginate"} onClick={()=> paginado(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
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