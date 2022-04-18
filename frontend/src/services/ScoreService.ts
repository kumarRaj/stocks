import axios from 'axios';

export const getAllStockScores = () => {
    let endpoint = 'http://localhost:8081/stock/scores';
    return axios.get(endpoint);    
}
