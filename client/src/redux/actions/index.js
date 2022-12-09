import axios from 'axios';

//RUTAS GET
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS"
export const GET_ALL_COMMENTS = "GET_ALL_COMMENTS"
export const GET_USER = "GET_USER"
export const GET_ALL_USERS = "GET_ALL_USERS"
export const GET_PRODUCT_DETAIL = "GET_PRODUCT_DETAIL"
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES"
export const GET_ALL_BRANDS = "GET_ALL_BRANDS"
export const GET_AUTHTOKENROUTER = "GET_AUTHTOKENROUTER"
export const GET_AUTHTOKENROUTERPERF = "GET_AUTHTOKENROUTERPERF"
export const GET_FAVORITES = "GET_FAVORITES"
export const GET_PURCHASE_DETAIL = "GET_PURCHASE_DETAIL"
export const GET_ALL_PURCHASES = "GET_ALL_PURCHASES"
export const GET_USER_PURCHASES = "GET_USER_PURCHASES"

//RUTAS POST
export const ADD_FAVORITE = "ADD_FAVORITE"
export const CREATE_USER = "CREATE_USER"
export const CREATE_PRODUCT = "CREATE_PRODUCT"
export const CREATE_COMMENT = "CREATE_COMMENT"
export const CREATE_PURCHASE = "CREATE_PURCHASE"
export const POST_AUTHTOKENROUTERLOG = "GET_AUTHTOKENROUTERLOG"
export const SEND_MAIL = "SEND_MAIL"
export const PP_PURCHASE = "PP_PURCHASE"


//RUTAS PUT
export const UPDATE_USER = "UPDATE_USER"
export const UPDATE_PRODUCT = "UPDATE_PRODUCT"
export const UPDATE_COMMENT = "UPDATE_COMMENT"
export const UPDATE_RATING = "UPDATE_RATING"

//RUTAS DELETE
export const DELETE_COMMENT = "DELETE_COMMENT"
export const DELETE_PRODUCT = "DELETE_PRODUCT"
export const REMOVE_FAVORITE = "REMOVE_FAVORITE"

//FILTRADOS
export const FILTER_BY_BRAND = "FILTER_BY_BRAND"
export const FILTER_BY_PRICE = "FILTER_BY_PRICE"
export const FILTER_BY_CATEGORY = "FILTER_BY_CATEGORY"
export const FILTER_BY_RATING = "FILTER_BY_RATING"
export const SEARCH_BY_NAME = "SEARCH_BY_NAME"
export const SEARCH_BY_NAME2 = "SEARCH_BY_NAME2"
export const ORDER_BY = "ORDER_BY"
export const RESET_DETAIL = "RESET_DETAIL"
export const REMOVE_ALL_FILTERS = "REMOVE_ALL_FILTERS"
export const NEW_SEARCH = "NEW_SEARCH"

//LocalStorage
export const LOCALSTORAGE = "LOCALSTORAGE"

//RUTAS GET
export function getAllPurchases() {
    return async function (dispatch) {
        const purchasesInfo = await axios.get(`http://localhost:3001/purchase`)
        dispatch({
            type: GET_ALL_PURCHASES,
            payload: purchasesInfo.data
        })
    }
}

export function getUserPurchases(id) {
    return async function (dispatch) {
        const purchasesInfo = await axios.get(`http://localhost:3001/purchase/${id}`)
        dispatch({
            type: GET_USER_PURCHASES,
            payload: purchasesInfo.data
        })
    }
}

export function getAllProducts() {
    return async function (dispatch) {
        const productsInfo = await axios.get(`http://localhost:3001/products`)
        dispatch({
            type: GET_ALL_PRODUCTS,
            payload: productsInfo.data
        })
    }
}

export function getAllComments(id) {
    return async function (dispatch) {
        const commentsInfo = await axios.get(`http://localhost:3001/comments/${id}`)
        dispatch({
            type: GET_ALL_COMMENTS,
            payload: commentsInfo.data
        })
    }
}

export function getAllUsers() {
    return async function (dispatch) {
        const allUsers = await axios.get('http://localhost:3001/users')
        dispatch({
            type: GET_ALL_USERS,
            payload: allUsers.data
        })
    }
}

export function authTokenRouterPerf() {
    return async function (dispatch) {
        const allUsers = await axios.get('http://localhost:3001/profile')
        dispatch({
            type: GET_AUTHTOKENROUTERPERF,
            payload: allUsers.data.token
        })
    }
}

export function getUser(id) {
    return async function (dispatch) {
        const user = await axios.get(`http://localhost:3001/users/${id}`)
        dispatch({
            type: GET_USER,
            payload: user.data
        })
    }
}

export function getFavorites(id) {
    return async function (dispatch) {
        const favorites = await axios.get(`http://localhost:3001/favorites/${id}`)
        dispatch({
            type: GET_FAVORITES,
            payload: favorites.data
        })
    }
}

export function getAllCategories() {
    return async function (dispatch) {
        const categoriesInfo = await axios.get('http://localhost:3001/categories')
        dispatch({
            type: GET_ALL_CATEGORIES,
            payload: categoriesInfo.data
        })
    }
}

export function getAllBrands(payload) {
    return async function (dispatch) {
        if (payload.length > 0) {
            const products = payload
            let brands = [];
            for (let p of products) {
                if (p.brand) brands.push(p.brand)
            }

            brands = new Set(brands)
            brands = [...brands]
            await dispatch({
                type: GET_ALL_BRANDS,
                payload: brands
            })
        } else {
            const products = await axios.get('http://localhost:3001/products')
            let brands = [];
            for (const p of products.data) {
                if (p.brand) brands.push(p.brand)
            }
            brands = new Set(brands)
            brands = [...brands]
            dispatch({
                type: GET_ALL_BRANDS,
                payload: brands
            })
        }
    }
}

export function getProductDetail(id) {
    return async function (dispatch) {
        const productDetail = await axios.get(`http://localhost:3001/products/${id}`)
        dispatch({
            type: GET_PRODUCT_DETAIL,
            payload: productDetail.data
        })
    }
}

export function getPurchaseDetail(payload) {
    return async function (dispatch) {
        const productDetail = await axios.get(`http://localhost:3001/buyings/acceptpayment${payload}`)
        dispatch({
            type: GET_PURCHASE_DETAIL,
            payload: productDetail
        })
    }
}

//RUTAS POST
export function authTokenRouterLog(payload) {
    return async function (dispatch) {
        const json = await axios.post('http://localhost:3001/login/loginForm', payload)
        console.log(json);
        dispatch({
            type: POST_AUTHTOKENROUTERLOG,
            payload: json
        })
    }
}

export function createUser(payload) {
    return async function (dispatch) {
        const info = await axios.post('http://localhost:3001/users', payload)
        dispatch({
            type: CREATE_USER,
            payload: info.data
        })
    }
}

export function createProduct(payload) {
    return async function (dispatch) {
        const info = await axios.post('http://localhost:3001/products', payload)
        dispatch({
            type: CREATE_PRODUCT,
            payload: info.data
        })
    }
}

export function createComment(payload) {
    return async function (dispatch) {
        const info = await axios.post('http://localhost:3001/comments', payload)
        dispatch({
            type: CREATE_COMMENT,
            payload: info.data
        })
    }
}

export function createPurchase(payload) {
    return async function (dispatch) {
        const info = await axios.post('http://localhost:3001/purchase', payload)
        dispatch({
            type: CREATE_PURCHASE,
            payload: info.data
        })
    }
}

export function sendMail(payload) {
    return async function (dispatch) {
        const info = await axios.post('http://localhost:3001/send-mail', payload)
        dispatch({
            type: SEND_MAIL,
            payload: info.data
        })
    }
}

export function buyShoppingCart(payload) {
    return async function (dispatch) {
        const info = await axios.post('http://localhost:3001/buyings/createpayment', payload)
        console.log(info.data);
        window.location.href = info.data
        dispatch({
            type: PP_PURCHASE,
            payload: info
        })
    }
}

//RUTAS PUT

export function updateUser(payload) {
    return async function (dispatch) {
        const info = await axios.put('http://localhost:3001/users', payload)
        dispatch({
            type: UPDATE_USER,
            payload: info.data
        })
    }
}

export function updateRatingProduct(payload) {
    let id = payload.id;
    return async function (dispatch) {
        const info = await axios.put(`http://localhost:3001/products/${id}`, payload)
        dispatch({
            type: UPDATE_RATING,
            payload: info.data
        })
    }
}

export function updateProduct(payload) {
    let id = payload.id;
    return async function (dispatch) {
        const info = await axios.put(`http://localhost:3001/products/${id}`, payload)
        dispatch({
            type: UPDATE_PRODUCT,
            payload: info.data
        })
    }
}

export function updateComment(payload) {
    return async function (dispatch) {
        const info = await axios.put('http://localhost:3001/comments', payload)
        dispatch({
            type: UPDATE_COMMENT,
            payload: info.data
        })
    }
}

//RUTAS DELETE
export function deleteComment(idUser, idProduct) {
    return async function (dispatch) {
        const deletedComment = await axios.delete(`http://localhost:3001/comments/${idUser}/${idProduct}`)
        dispatch({
            type: DELETE_COMMENT,
            payload: deletedComment.data
        })
    }
}

export function deleteProduct(id) {
    return async function (dispatch) {
        const deletedProduct = await axios.delete(`http://localhost:3001/products/${id}`)
        dispatch({
            type: DELETE_PRODUCT,
            payload: deletedProduct.data
        })
    }
}

export function removeFavorite(id, idProduct) {
    return async function (dispatch) {
        const deletedFavorite = await axios.delete(`http://localhost:3001/favorites/${id}/${idProduct}`)
        dispatch({
            type: REMOVE_FAVORITE,
            payload: deletedFavorite.data
        })
    }
}

export function removeAllFavorites(id) {
    return async function (dispatch) {
        const noFavorites = await axios.delete(`http://localhost:3001/favorites/${id}`)
        dispatch({
            type: REMOVE_FAVORITE,
            payload: noFavorites.data
        })
    }
}

//FILTRADOS

export function resetDetail() {
    return async function (dispatch) {
        dispatch({
            type: RESET_DETAIL
        })
    }
}

export function filterByBrand(payload) {
    return {
        type: FILTER_BY_BRAND,
        payload
    }
}

export function filterByPrice(payload) {
    if (!payload.min) payload.min = 0
    if (!payload.max) payload.max = 0
    return {
        type: FILTER_BY_PRICE,
        payload
    }
}

export function filterByCategory(payload) {
    return {
        type: FILTER_BY_CATEGORY,
        payload
    }
}

export function filterByRating(payload) {
    return {
        type: FILTER_BY_RATING,
        payload,
    }
}

export function removeFilters() {
    return {
        type: REMOVE_ALL_FILTERS
    }
}

export function newSearch(productName) {
    return async function (dispatch) {
        const productsInfo = await axios.get('http://localhost:3001/products')

        if (productsInfo.data !== "Please Create Categories First") {
            const searchedProducts = productsInfo.data.filter(product => product.name.toLowerCase().includes(productName.toLowerCase()))
            dispatch({
                type: NEW_SEARCH,
                payload: searchedProducts
            })
        } else {
            return 0
        }
    }
}

export function searchByName(productName, typeR) {
    return async function (dispatch) {
        const productsInfo = await axios.get(`http://localhost:3001/products`)

        if (productsInfo.data !== "Please Create Categories First" && productName) {
            const searchedProducts = productsInfo.data.filter(product => product.name.toLowerCase().includes(productName.toLowerCase()))
            dispatch({
                type: typeR,
                payload: searchedProducts
            })
        } else {
            return 0
        }
    }
}

export function addFavorites(payload) {
    return async function (dispatch) {
        const info = await axios.post('http://localhost:3001/favorites', payload)
        dispatch({
            type: ADD_FAVORITE,
            payload: info.data
        })
    }
}

export function orderBy(payload) {
    return {
        type: ORDER_BY,
        payload
    }
}

// LocalStorage

export function putLocalstorage() {
    if (localStorage.getItem('cart')) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        return {
            type: LOCALSTORAGE,
            payload: cart
        }
    }
    else {
        let cart = []
        return {
            type: LOCALSTORAGE,
            payload: cart
        }
    }

}