import {
    GET_ALL_PRODUCTS, GET_PRODUCT_DETAIL, GET_ALL_CATEGORIES, GET_ALL_COMMENTS, GET_USER,
    FILTER_BY_CATEGORY, SEARCH_BY_NAME, ORDER_ALPHABETICALLY, RESET_DETAIL, FILTER_BY_BRAND,FILTER_BY_PRICE,
    CREATE_PRODUCT, CREATE_COMMENT, CREATE_PURCHASE,
    UPDATE_USER, UPDATE_PRODUCT, UPDATE_COMMENT,
    DELETE_COMMENT,CREATE_USER,
    GET_ALL_USERS,
} from "../actions"

const initialState = {
    products: [],
    user: {},
    allUsers: {},
    // ESTE ES PARA APLICAR LOS FILTROS, ASÍ NO SE PIERDE EL STATE
    allProducts: [],
    productDetail: {},
    productComments: [],
    categories: [],
}

const allProducts = initialState.allProducts;
let result = [];

export default function rootReducer(state = initialState, action) {
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
            case GET_ALL_USERS:
            return {
                ...state,
                allUsers: action.payload,
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
        case CREATE_PRODUCT:
            return action.payload
        case CREATE_USER:
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
            result = [];
            for (const p of allProducts) {
                if (p.brand === action.payload) result.push(p)
            }
            return {
                ...state,
                products: result
            }
        case FILTER_BY_PRICE:
            result = [];
            for (const p of allProducts) {
                if (p.price > action.payload.min && p.price < action.payload.max) result.push(p)
            }
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
        case SEARCH_BY_NAME:

        return {
                ...state,
                products: action.payload
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