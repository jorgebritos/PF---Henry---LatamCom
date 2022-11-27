import axios from 'axios';

//RUTAS GET
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS"
export const GET_ALL_COMMENTS = "GET_ALL_COMMENTS"
export const GET_USER = "GET_USER"
export const GET_PRODUCT_DETAIL = "GET_PRODUCT_DETAIL"
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES"

//RUTAS POST
export const CREATE_PRODUCT = "CREATE_PRODUCT"
export const CREATE_COMMENT = "CREATE_COMMENT"
export const CREATE_PURCHASE = "CREATE_PURCHASE"

//RUTAS PUT
export const UPDATE_USER = "UPDATE_USER"
export const UPDATE_PRODUCT = "UPDATE_PRODUCT"
export const UPDATE_COMMENT = "UPDATE_COMMENT"

//RUTAS DELETE
export const DELETE_COMMENT = "DELETE_COMMENT"

//FILTRADOS
export const FILTER_BY_BRAND = "FILTER_BY_BRAND"
export const FILTER_BY_PRICE = "FILTER_BY_PRICE"
export const FILTER_BY_CATEGORY = "FILTER_BY_CATEGORY"
export const SEARCH_BY_NAME = "SEARCH_BY_NAME"
export const ORDER_ALPHABETICALLY = "ORDER_ALPHABETICALLY"
export const RESET_DETAIL = "RESET_DETAIL"

export function getAllProducts() {
    return async function (dispatch) {
        const productsInfo = await axios.get('http://localhost:3001/products')
        dispatch({
            type: GET_ALL_PRODUCTS,
            payload: productsInfo.data
        })
    }
}

//RUTAS GET

export function getAllComments() {
    return async function (dispatch) {
        const commentsInfo = await axios.get('http://localhost:3001/comments')
        dispatch({
            type: GET_ALL_COMMENTS,
            payload: commentsInfo.data
        })
    }
}

export function getAllUsers() {
    return async function (dispatch) {
        const users = await axios.get('http://localhost:3001/users')
        return users
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

export function getAllCategories() {
    return async function (dispatch) {
        const categoriesInfo = await axios.get('http://localhost:3001/categories')
        dispatch({
            type: GET_ALL_CATEGORIES,
            payload: categoriesInfo.data
        })
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

//RUTAS POST

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

export function updateProduct(payload) {
    return async function (dispatch) {
        const info = await axios.put('http://localhost:3001/products', payload)
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
export function deleteComment(id) {
    return async function (dispatch) {
        const deletedComment = await axios.delete(`http://localhost:3001/comments/${id}`)
        dispatch({
            type: DELETE_COMMENT,
            payload: deletedComment.data
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

export function searchByName(productName) {
    return async function (dispatch) {
        const productsInfo = await axios.get('http://localhost:3001/products')

        if (productsInfo.data !== "Please Create Categories First") {
            const searchedProducts = productsInfo.data.filter(product => product.name.toLowerCase().includes(productName.toLowerCase()))
            // console.log(searchedProducts);
            dispatch({
                type: SEARCH_BY_NAME,
                payload: searchedProducts
            })
        } else {
            return 0
        }
    }
}

export function orderBy(payload) {
    return {
        type: ORDER_ALPHABETICALLY,
        payload
    }
}