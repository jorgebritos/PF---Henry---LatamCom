import {
    GET_ALL_PRODUCTS, GET_PRODUCT_DETAIL, GET_ALL_CATEGORIES, GET_ALL_COMMENTS, GET_USER,
    FILTER_BY_CATEGORY, SEARCH_BY_NAME, ORDER_ALPHABETICALLY, RESET_DETAIL,
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
    categories: []
}

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
        case FILTER_BY_CATEGORY:
            const allProducts = state.allProducts
            let result = [];

            if (action.payload === "All") {
                result = allProducts
            } else {
                for (const r of allProducts) {
                    for (const k in r.categories) {
                        if (Object.hasOwnProperty.call(r.categories, k)) {
                            const element = r.categories[k];
                            if (element.name === action.payload) result.push(r)
                        }
                    }
                }
            }
            return {
                ...state,
                products: result
            }
        case SEARCH_BY_NAME:
            const allRecipes2 = state.allProducts
            const searchedRecipes = allRecipes2.filter(recipe => recipe.name.toLowerCase().includes(action.payload.toLowerCase()))
            return {
                ...state,
                products: searchedRecipes
            }
        case ORDER_ALPHABETICALLY:
            const sortRecipes = action.payload === "asc" ?
                state.products.sort((a, b) => a.name.localeCompare(b.name)) :
                action.payload === "desc" ? state.products.sort((a, b) => b.name.localeCompare(a.name)) :

                    action.payload === "hs+" ? state.products.sort((a, b) => b.healthScore - a.healthScore) :
                        state.products.sort((a, b) => a.healthScore - b.healthScore)

            return {
                ...state,
                products: sortRecipes
            }
        default:
            return state;
    }
}