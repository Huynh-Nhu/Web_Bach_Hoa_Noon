import axios from "axios";
import {getAllBrandFailed, getAllBrandStart, getAllBrandSuccess} from "./brandSlice"
import { addCategorySuccess, getAllCateFailed, getAllCateStart, getAllCateSuccess } from "./categorySlice";
import { getAllProductFailed, getAllProductStart, getAllProductSuccess } from "./productSlice";

export const getAllBrand = async (dispatch) => {
    dispatch(getAllBrandStart())
    try {
        const res = await axios.get("http://localhost:8080/brand/allBrand")
        console.log(res.data);
        dispatch(getAllBrandSuccess(res.data))
    } catch (error) {
        dispatch(getAllBrandFailed())
        console.log(error);
    }
}
export const addCategory = async (category,dispatch) =>{
    try {
        const res = await axios.post("http://localhost:8080/category/addCategory", category)
        dispatch(addCategorySuccess(res.data.saveCategory))
        return res.data.message

    } catch (error) {
        console.log(error);
    }
}
export const getAllCategory = async (dispatch) =>{
    dispatch(getAllCateStart())
    try {
        const res = await axios.get("http://localhost:8080/category/getAllCategory")
        dispatch(getAllCateSuccess(res.data));

    } catch (error) {
        dispatch(getAllCateFailed())
        console.log(error);
    }
}

export const addProduct = async (product) => {
    try {
        const res =await axios.post("http://localhost:8080/products/addProduct", product)
        return res.data.message
    } catch (error) {
        console.log(error);
    }
}

export const getAllProducts = async (categoryId, dispatch) => {
    dispatch(getAllProductStart())
    try {
        const res = await axios.get("http://localhost:8080/products/allProducts", {
            params: {categoryId}
        })
        dispatch(getAllProductSuccess(res.data))
        return res.data
    } catch (error) {
        dispatch(getAllProductFailed())
        console.log(error);
    }
}

export const getBrandOfProduct = async (categoryId) => {
    try {
        const res = await axios.get("http://localhost:8080/products/getBrandProduct", {
            params: {categoryId}
        })
        return res.data
    } catch (error) {
        console.log(error);
    }
}

export const updateProduct = async (productId) => {
    console.log(productId);
    try {
        const res = await axios.get("http://localhost:8080/products/getOnProduct",{
            params: {productId}
        })
        // console.log(res.data);
    } catch (error) {
        console.log(error);
    }

}