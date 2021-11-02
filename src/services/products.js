import request from "./api";

export const getProducts = () => {
    return request.get('products').then((response) => response.data.products)
}

// export const createProduct = (title) => {
//     return request.post('products', { title }).then((response) => response.data.product)
// }

// export const removeProduct = (id) => {
//     return request.delete(`products/${id}`).then((response) => response.data.product)
// }

