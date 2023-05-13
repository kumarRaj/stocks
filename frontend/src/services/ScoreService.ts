import axios from 'axios';

export const getAllStockScores = () => {
    let endpoint = `${process.env.REACT_APP_BACKEND_URL}/stock/scores`;
    return axios.get(endpoint);    
}
