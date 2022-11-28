import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { filterByBrand, filterByCategory, filterByPrice, getAllBrands, getAllCategories, getAllProducts, removeFilters } from "../../redux/actions";


export default function Filtros({setCurrentPage}) {

    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories);
    const products = useSelector((state) => state.products);
    const brands = useSelector((state) => state.brands)

    const [priceFilter, setPriceFilter] = useState({
        minPrice: 0,
        maxPrice: 0
    });
    
    useEffect(async () => {
        await dispatch(getAllCategories())
        await dispatch(getAllProducts())
        dispatch(getAllBrands([]))
    }, [])

    

    function handlePriceFilter(e) {
        e.preventDefault();
        setPriceFilter({
            ...priceFilter,
            [e.target.name]: e.target.value
        })
        return priceFilter
    }

    const filterPrice = function (e) {
        e.preventDefault();
        dispatch(filterByPrice({ min: priceFilter.minPrice, max: priceFilter.maxPrice }))
        dispatch(getAllBrands(products))
        setCurrentPage(1)
    }

    const [categoryFilter, setCategoryFilter] = useState("All");

    function handleCategoryFilter(category) {
        setCategoryFilter(category)
    }

    const filterCategory = function (e) {
        e.preventDefault();
        dispatch(filterByCategory(categoryFilter))
        dispatch(getAllBrands(products))
        setCurrentPage(1)
    }

    const [checkedState, setCheckedState] = useState(
        new Array(15).fill(false)
    );

    const [isChecked, setIsChecked] = useState([]);

    const handleOnChange = (position, e) => {
        //SETEAR CAMPOS QUE ESTAN CHECKED
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        //GUARDAR LOS VALORES O QUITARLOS DE LA LISTA DE DIETAS DEPENDIENDO DEL VALOR
        if (e.target.checked) {
            setIsChecked([...isChecked, e.target.value])
        } else {
            let newArray = isChecked.filter(i => i !== e.target.value)
            setIsChecked(newArray)
        }

        setCheckedState(updatedCheckedState);
    };

    const filterBrands = function (e) {
        e.preventDefault();
        dispatch(filterByBrand([...isChecked]))
        setCurrentPage(1)
    }

    const quitarFiltros = function (e) {
        e.preventDefault();
        dispatch(removeFilters())
        setCheckedState(new Array(15).fill(false))
        setCategoryFilter("All")
    }

    return (
        <form id="formFilter">
            <div>
                Filtro Por Precio
                <hr />
                <div>
                    <label htmlFor={"minPrice"}>Minimo</label>
                    <input type={"number"} name={"minPrice"} value={priceFilter.minPrice} onChange={e => handlePriceFilter(e)}></input>
                    <label htmlFor={"maxPrice"}>Maximo</label>
                    <input type={"number"} name={"maxPrice"} value={priceFilter.maxPrice} onChange={e => handlePriceFilter(e)}></input>
                </div>
                <button onClick={e => filterPrice(e)}>Filtrar</button>
            </div>
            <hr />
            <div>
                Filtro Por Categoria
                <hr />
                <div>
                    <ul>
                        {
                            categories?.map((c) => {
                                return (
                                    <li key={c.name}>
                                        <input type={"radio"} value={c.name} name={"category"} checked={categoryFilter == "All"?false:true} onChange={e => handleCategoryFilter(c.name)} />{c.name}
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <button onClick={e => filterCategory(e)}>Filtrar</button>
                </div>
            </div>
            <div>
                Filtro Por Marca
                <hr />
                <div>
                    <ul>
                        {
                            brands.length > 0 ? brands.map((b, index) => {
                                return (
                                    <li key={b}><input type={"checkbox"} checked={checkedState[index]} value={b} onChange={(e) => handleOnChange(index, e)} />{b}</li>
                                )
                            }) : null
                        }
                    </ul>
                </div>
                <button onClick={e => filterBrands(e)}>Filtrar</button>
            </div>
            <button onClick={e => quitarFiltros(e)}>Quitar Filtros</button>
        </form>
    )
}