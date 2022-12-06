import {
    GET_ALL_PRODUCTS, GET_PRODUCT_DETAIL, GET_ALL_CATEGORIES, GET_ALL_COMMENTS, GET_USER, GET_ALL_BRANDS, GET_PURCHASE_DETAIL,
    FILTER_BY_CATEGORY, SEARCH_BY_NAME,SEARCH_BY_NAME2, ORDER_BY, RESET_DETAIL, FILTER_BY_BRAND, FILTER_BY_PRICE, FILTER_BY_RATING, REMOVE_ALL_FILTERS, NEW_SEARCH,
    CREATE_PRODUCT, CREATE_COMMENT, CREATE_PURCHASE, PP_PURCHASE, ADD_FAVORITE,
    UPDATE_USER, UPDATE_PRODUCT, UPDATE_COMMENT,
    DELETE_COMMENT, CREATE_USER,
    GET_ALL_USERS, GET_AUTHTOKENROUTERPERF, POST_AUTHTOKENROUTERLOG,
    UPDATE_RATING,
    SEND_MAIL,
    LOCALSTORAGE,
    GET_FAVORITES,
    REMOVE_FAVORITE,
    DELETE_PRODUCT
} from "../actions"

const initialState = {
    products: [],
    user: {},
    favorites: [],
    allUsers: [],
    // ESTE ES PARA APLICAR LOS FILTROS, ASÍ NO SE PIERDE EL STATE
    allProducts: [],
    productDetail: {},
    productComments: [],
    categories: [],
    searchedProducts: [],
    searchedProducts2: [],
    brands: [],
    filBrands: [],
    filCategory: [],
    filRating:[],
    pruchase: {},
    createdPurchase: {},
    login: [],
    //LOCALSTORAGE
    localstorage: [],
}


export default function rootReducer(state = initialState, action) {
    const allProducts = state.allProducts;
    let actualProducts = state.products;
    let result = [];
    let ratingResults=[]

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
        case GET_FAVORITES:
            return {
                ...state,
                favorites: action.payload,
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
        case GET_AUTHTOKENROUTERPERF:
            return {
                ...state,
                allUsers: action.payload,
            }
        case GET_ALL_BRANDS:
            return {
                ...state,
                brands: action.payload,
                filBrands: action.payload
            }
        case GET_PURCHASE_DETAIL:
            return {
                ...state,
                purchase: action.payload,
            }
        case ADD_FAVORITE:
            return {
                ...state,
                favorites: action.payload.favorites
            }
        case CREATE_PRODUCT:
            return action.payload
        case CREATE_USER:
            return action.payload
        case CREATE_COMMENT:
            return action.payload
        case CREATE_PURCHASE:
            return {
                ...state,
                createdPurchase: action.payload,
            }
        case POST_AUTHTOKENROUTERLOG:
            let user = action.payload.data.user 
            let logueo = action.payload.data.jwt || action.payload.data
            console.log(logueo);
            let name;
            if(user) {
            name = user.firstname + " " + user.lastname;
            console.log(action.payload);
            return {
                ...state,
                login: logueo ,
                user: {id: user.id, username: user.username, picture: user.profile_image, name: name, email: user.email, admin: user.admin}
            }
            }else{
                return {
                    ...state,
                    login: logueo
                }
            }
        case SEND_MAIL:
            return action.payload
        case PP_PURCHASE:
            return action.payload
        case UPDATE_RATING:
            return action.payload
        case UPDATE_USER:
            return action.payload
        case UPDATE_PRODUCT:
            return action.payload
        case UPDATE_COMMENT:
            return action.payload
        case DELETE_COMMENT:
            return action.payload
        case DELETE_PRODUCT:
            return action.payload
        case REMOVE_FAVORITE:
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
            let marcasPrice = result.map((p) => {
                return p.brand
            })
            marcasPrice = marcasPrice.filter((m) => m != null)
            return {
                ...state,
                products: result,
                filBrands: [...new Set(marcasPrice)]
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
            let marcas = result.map((p) => {
                return p.brand
            })
            marcas = marcas.filter((m) => m != null)
            return {
                ...state,
                products: result,
                filCategory: result,
                filBrands: [...new Set(marcas)]
            }
        case FILTER_BY_RATING:
            ratingResults = [];
                ratingResults = action.payload.sort((a,b)=> a.rating - b.rating)
            console.log(action.payload);
            return {
                ...state,
                filRating: ratingResults,
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
        case SEARCH_BY_NAME2:
            return {
                ...state,
                searchedProducts2: action.payload
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

        case LOCALSTORAGE:
            return {
                ...state,
                localstorage: [action.payload]

            }
        default:
            return state;
    }
}