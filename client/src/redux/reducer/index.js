import {
    GET_ALL_PRODUCTS, GET_PRODUCT_DETAIL, GET_ALL_CATEGORIES, GET_ALL_COMMENTS, GET_USER, GET_ALL_BRANDS,
    FILTER_BY_CATEGORY, SEARCH_BY_NAME, ORDER_ALPHABETICALLY, RESET_DETAIL, FILTER_BY_BRAND, FILTER_BY_PRICE, REMOVE_ALL_FILTERS,
    CREATE_PRODUCT, CREATE_COMMENT, CREATE_PURCHASE,
    UPDATE_USER, UPDATE_PRODUCT, UPDATE_COMMENT,
    DELETE_COMMENT
} from "../actions"

const initialState = {
    products: [],
    user: {},
    // ESTE ES PARA APLICAR LOS FILTROS, ASÍ NO SE PIERDE EL STATE
    allProducts: [],
    productDetail: {},
    productComments: [],
    categories: [],
    searchedProducts: [],
    brands: []
}


export default function rootReducer(state = initialState, action) {
    const allProducts = state.allProducts;
    let actualProducts = state.products;
    let result = [];

    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                allProducts: action.payload
            }
        case GET_ALL_COMMENTS:
            return {
                ...state,
                productComments: action.payload,
            }
        case GET_USER:
            return {
                ...state,
                user: action.payload,
            }
        case GET_PRODUCT_DETAIL:
            return {
                ...state,
                productDetail: action.payload
            }
        case GET_ALL_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
            }
        case GET_ALL_BRANDS:
            return {
                ...state,
                brands: action.payload
            }
        case CREATE_PRODUCT:
            return action.payload
        case CREATE_COMMENT:
            return action.payload
        case CREATE_PURCHASE:
            return action.payload
        case UPDATE_USER:
            return action.payload
        case UPDATE_PRODUCT:
            return action.payload
        case UPDATE_COMMENT:
            return action.payload
        case DELETE_COMMENT:
            return action.payload
        case RESET_DETAIL:
            return {
                ...state,
                productDetail: {}
            }
        case FILTER_BY_BRAND:
            if (action.payload.length > 0) {
                result = [];
                for (const p of actualProducts) {
                    action.payload.forEach(b => {
                        if (p.brand === b) result.push(p)
                    });
                }
                return {
                    ...state,
                    products: result
                }
            } else {
                console.log("sin products")
            }
        case FILTER_BY_PRICE:
            result = [];
            for (const p of actualProducts) {
                if (p.price > action.payload.min && p.price < action.payload.max) result.push(p)
            }

            if (Number(action.payload.min) === 0 && Number(action.payload.max) === 0) return { ...state, products: allProducts }
            return {
                ...state,
                products: result
            }
        case FILTER_BY_CATEGORY:
            result = [];
            if (action.payload === "All") {
                result = allProducts
            } else {
                for (const p of allProducts) {
                    for (const k in p.categories) {
                        if (Object.hasOwnProperty.call(p.categories, k)) {
                            const element = p.categories[k];
                            if (element.name === action.payload) result.push(p)
                        }
                    }
                }
            }
            return {
                ...state,
                products: result
            }
        case REMOVE_ALL_FILTERS:
            return {
                ...state,
                products: allProducts
            }
        case SEARCH_BY_NAME:
            return {
                ...state,
                searchedProducts: action.payload
            }
        case ORDER_ALPHABETICALLY:
            const sortProducts = action.payload === "asc" ?
                state.products.sort((a, b) => a.name.localeCompare(b.name)) :
                state.products.sort((a, b) => b.name.localeCompare(a.name))
            return {
                ...state,
                products: sortProducts
            }
        default:
            return state;
    }
}