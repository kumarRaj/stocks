import axios from 'axios';

export const getAllSectors = () => {
    let endpoint = `${process.env.REACT_APP_BACKEND_URL}/stock/categories`;
    return axios.get(endpoint);
}

export const getStocksBySector = (sectorName: string) => {
    let endpoint = `${process.env.REACT_APP_BACKEND_URL}/stock/categories/${sectorName}`;
    return axios.get(endpoint);
}
