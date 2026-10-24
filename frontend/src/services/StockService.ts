import axios from 'axios';

export const seed = (category?: string) => {
    let endpoint = `${import.meta.env.REACT_APP_SCRAPER_URL}/stock/seed`;
    return axios.post(endpoint, category && category !== 'ALL' ? {category} : {});
}

export const seedThis = (stockId: String) => {
    let endpoint = `${import.meta.env.REACT_APP_SCRAPER_URL}/stockDetails?stockId=${stockId}`;
    console.log(stockId)
    axios.post(endpoint, [])
        .then((response) => {   console.log(response)} )
        .catch((error) => { console.log(error) });
}
