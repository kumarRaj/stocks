import axios from 'axios';

export const getAllSectors = () => {
    let endpoint = 'http://localhost:8081/stock/categories';
    return axios.get(endpoint);
}

export const getStocksBySector = (sectorName: string) => {
    let endpoint = `http://localhost:8081/stock/categories/${sectorName}`;
    return axios.get(endpoint);
}
