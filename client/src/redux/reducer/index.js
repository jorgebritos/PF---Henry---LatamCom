import {
    GET_ALL_PRODUCTS, GET_PRODUCT_DETAIL, GET_ALL_CATEGORIES, GET_ALL_COMMENTS, GET_USER, GET_ALL_BRANDS, GET_PURCHASE_DETAIL, GET_GEOPOSITION,
    FILTER_BY_CATEGORY, SEARCH_BY_NAME, SEARCH_BY_NAME2, ORDER_BY, RESET_DETAIL, FILTER_BY_BRAND, FILTER_BY_PRICE, FILTER_BY_RATING, REMOVE_ALL_FILTERS, NEW_SEARCH,
    CREATE_PRODUCT, CREATE_COMMENT, CREATE_PURCHASE, PP_PURCHASE, ADD_FAVORITE,
    UPDATE_USER, UPDATE_PRODUCT, UPDATE_COMMENT,
    DELETE_COMMENT, CREATE_USER,
    GET_ALL_USERS, GET_AUTHTOKENROUTERPERF, POST_AUTHTOKENROUTERLOG,
    UPDATE_RATING,
    SEND_MAIL,
    LOCALSTORAGE,
    GET_FAVORITES,
    REMOVE_FAVORITE,
    DELETE_PRODUCT,
    SET_USER_DATA,
    // LOCALSTORAGEUSERINFO,
    GET_ALL_PURCHASES,
    GET_USER_PURCHASES,
    GET_ALL_REPORTED,
    CREATE_CATEGORIES
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
    filRating: [],
    pruchase: {},
    createdPurchase: {},
    login: [],
    userPurchases: [],
    geoposition: [],
    //LOCALSTORAGE
    localstorage: [],

    // ADMIN
    purchasesAdmin: [],
    reportedComments: []
}


export default function rootReducer(state = initialState, action) {
    const allProducts = state.allProducts;
    //let actualProducts = state.products;
    let fillCategory = state.filCategory;
    let filBrands = state.filBrands;
    let result = [];
    let ratingResults = []
    let allUsers = state.allUsers;

    switch (action.type) {
        case SET_USER_DATA:
            // console.log("action", action    )
            return {
                ...state,
                login: action.payload.jwt,
                user: { id: action.payload.id, username: action.payload.username, picture: action.payload.picture, name: action.payload.name, email: action.payload.email, admin: action.payload.admin }
            }
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                allProducts: action.payload,
                filCategory: action.payload
            }
        case GET_ALL_COMMENTS:
            return {
                ...state,
                productComments: action.payload,
            }
        case GET_ALL_REPORTED:
            return {
                ...state,
                reportedComments: action.payload
            }
        case GET_ALL_USERS:
            return {
                ...state,
                allUsers: action.payload,
            }
        case GET_ALL_PURCHASES: {
            return {
                ...state,
                purchasesAdmin: action.payload
            }
        }
        case GET_USER:
            return {
                ...state,
                user: action.payload,
            }
        case GET_USER_PURCHASES:
            return {
                ...state,
                userPurchases: action.payload
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
        case GET_GEOPOSITION:
            return {
                ...state,
                geoposition: action.payload,
            }
        case ADD_FAVORITE:
            return {
                ...state,
                favorites: action.payload.favorites
            }
        case CREATE_PRODUCT:
            return action.payload
        case CREATE_USER:
            return {
                ...state,
                allUsers: [...allUsers, action.payload]
            }
        case CREATE_COMMENT:
            return action.payload
        case CREATE_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
        case CREATE_PURCHASE:
            return {
                ...state,
                createdPurchase: action.payload,
            }
        case POST_AUTHTOKENROUTERLOG:
            let user = action.payload.data.user
            let logueo = action.payload.data.jwt || action.payload.data
            // console.log(user);
            // console.log(logueo);
            let name;
            if (user) {
                name = user.firstname + " " + user.lastname;
                return {
                    ...state,
                    login: logueo,
                    user: { id: user.id, username: user.username, picture: user.profile_image, name: name, email: user.email, admin: user.admin },
                    favorites: action.payload.data.favorites
                }
            } else {
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
            return {
                ...state,
                productComments: action.payload
            }
        case DELETE_COMMENT:
            return {
                ...state,
                productComments: action.payload
            }
        case DELETE_PRODUCT:
            return action.payload
        case REMOVE_FAVORITE:
            return {
                ...state,
                favorites: action.payload
            }
        case RESET_DETAIL:
            return {
                ...state,
                productDetail: {},
                productComments: []
            }
        case FILTER_BY_BRAND:
            result = [];
            if (action.payload.length > 0) {
                for (let i = 0; i < fillCategory.length; i++) {
                    let product = fillCategory[i];
                    for (let b = 0; b < action.payload.length; b++) {
                        let brand = action.payload[b];
                        if (product.brand === brand) result.push(product);
                    }
                }
                return {
                    ...state,
                    products: result,
                    filBrands: action.payload
                }
            } else {
                return {
                    ...state,
                    filBrands: []
                }
            }
        case FILTER_BY_PRICE:
            result = [];
            let theProducts = fillCategory.length === 0 ? allProducts : fillCategory
            let { min, max } = action.payload
            if (min < max && min !== 0) {
                for (const p of theProducts) {
                    if (p.price >= min && p.price <= max) result.push(p)
                }
            } else if (min > 0 && max === 0) {
                for (const p of theProducts) {
                    if (min <= p.price) result.push(p)
                }
            } else if (max > 0 && min === 0) {
                for (const p of theProducts) {
                    if (p.price <= max) {
                        result.push(p)
                    }
                }
            } else {
                result = theProducts;
            }

            let marcasPrice = result.map((p) => {
                return p.brand
            })

            if (filBrands.length > 0) {
                let newResult = [];
                for (const p of result) {
                    for (const b of filBrands) {
                        if (p.brand === b) {
                            newResult.push(p)
                        }
                    }
                }
                result = newResult;
            }



            // if (filBrands.length > 0 && filBrands == marcasPrice) {
            //     for (const p of result) {
            //         for (const b of filBrands) {
            //             if (p.brand === b) newResult.push(p)
            //         }
            //     }

            // }
            marcasPrice = marcasPrice.filter((m) => m != null)

            return {
                ...state,
                products: result,
                filBrands: [...new Set(marcasPrice)]
            }
        case FILTER_BY_CATEGORY:
            result = [];
            let marcas;

            if (action.payload === "All") {
                result = allProducts
                marcas = result.map((p) => {
                    return p.brand
                })

                marcas = marcas.filter((m) => m != null)

                return {
                    ...state,
                    products: result,
                    filCategory: result,
                    filBrands: [...new Set(marcas)]
                }
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
            marcas = result.map((p) => {
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
            ratingResults = action.payload.sort((a, b) => b.rating - a.rating)
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
        // case LOCALSTORAGEUSERINFO:
        // return {
        //     ...state,
        //     localstorage: [action.payload]

        // }
        default:
            return state;
    }
}