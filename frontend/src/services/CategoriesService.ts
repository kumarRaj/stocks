import axios from 'axios';

export const getAllCategories = () => {
    let endpoint = 'http://localhost:8081/stock/categories';
    return axios.get(endpoint);
}

export const getStocksByCategory = (category: string) => {
    let endpoint = `http://localhost:8081/stock/categories/${category}`;
    return axios.get(endpoint);
}
