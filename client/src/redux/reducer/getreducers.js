import { GET_ALL_BRANDS, GET_ALL_CATEGORIES, GET_ALL_COMMENTS, GET_ALL_PRODUCTS, GET_PRODUCT_DETAIL, GET_USER } from "../actions"

let initialState={
  products:[],
  productComments:[],
  user:[],
  productDetail:[],
  productComments:[],
  categories:[],
  brands:[],
  filBrands:[]
}

export default function getReducer(state = initialState, action) {
switch (action.type) {
  case GET_ALL_PRODUCTS:
      return {
          ...state,
          products: action.payload,
          
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
    default:
      return state
    }
  }