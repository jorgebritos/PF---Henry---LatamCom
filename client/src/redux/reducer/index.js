import {
    GET_ALL_PRODUCTS, GET_PRODUCT_DETAIL, GET_ALL_CATEGORIES, GET_ALL_COMMENTS, GET_USER, GET_ALL_BRANDS,
    FILTER_BY_CATEGORY, SEARCH_BY_NAME, ORDER_BY, RESET_DETAIL, FILTER_BY_BRAND, FILTER_BY_PRICE, REMOVE_ALL_FILTERS, NEW_SEARCH,
    CREATE_PRODUCT, CREATE_COMMENT, CREATE_PURCHASE, ADD_FAVORITE,
    UPDATE_USER, UPDATE_PRODUCT, UPDATE_COMMENT,
    DELETE_COMMENT
} from "../actions"

const initialState = {
    products: [],
    user: {},
    favorites: [],
    // ESTE ES PARA APLICAR LOS FILTROS, ASÍ NO SE PIERDE EL STATE
    allProducts: [],
    productDetail: {},
    productComments: [],
    categories: [],
    searchedProducts: [],
    brands: [],
    filBrands: [],
    filCategory: []
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
                productDetail: action.payload,
                productComments: [...action.payload.comments]
            }
        case GET_ALL_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
            }
        case GET_ALL_BRANDS:
            return {
                ...state,
                brands: action.payload,
                filBrands: action.payload
            }
        case ADD_FAVORITE:
            return action.payload
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
                productDetail: {},
                productComments: []
            }
        case FILTER_BY_BRAND:
            result = [];
            if (action.payload.length > 0) {
                for (let i = 0; i < actualProducts.length; i++) {
                    let product = actualProducts[i];
                    for (let b = 0; b < action.payload.length; b++) {
                        let brand = action.payload[b];
                        if (product.brand === brand) result.push(product);
                    }
                }
                return {
                    ...state,
                    products: result
                }
            }
            return state
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
                console.log("actualProducts:", allProducts);
                for (const p of allProducts) {
                    for (const k in p.categories) {
                        if (Object.hasOwnProperty.call(p.categories, k)) {
                            const element = p.categories[k];
                            if (element.name === action.payload) result.push(p)
                        }
                    }
                }
            }
            let marcas = result.map((p) => {
                return p.brand
            })
            marcas = marcas.filter((m) => m != null)
            console.log("actualProducts2:", [...new Set(marcas)]);
            return {
                ...state,
                products: result,
                filCategory: result,
                filBrands: [...new Set(marcas)]
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
        case NEW_SEARCH:
            return {
                ...state,
                products: action.payload
            }
        case ORDER_BY:
            const sortProducts = action.payload === "asc" ?
                state.products.sort((a, b) => a.name.localeCompare(b.name)) :
                action.payload === "desc" ? state.products.sort((a, b) => b.name.localeCompare(a.name)) :

                    action.payload === "ascP" ? state.products.sort((a, b) => b.price - a.price) :
                        state.products.sort((a, b) => a.price - b.price)

            return {
                ...state,
                products: sortProducts
            }
        default:
            return state;
    }
}