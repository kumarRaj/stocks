import axios from 'axios';

export const seed = (category?: string) => {
    let endpoint = `${import.meta.env.REACT_APP_SCRAPER_URL}/stock/seed`;
    return axios.post(endpoint, category && category !== 'ALL' ? {category} : {});
}

export const seedThis = (stockId: String, force = false) => {
    let endpoint = `${import.meta.env.REACT_APP_SCRAPER_URL}/stockDetails?stockId=${stockId}${force ? '&force=true' : ''}`;
    console.log(stockId)
    axios.post(endpoint, [])
        .then((response) => {   console.log(response)} )
        .catch((error) => { console.log(error) });
}

export const seedThese = (stockIds: string[]) => {
    let endpoint = `${import.meta.env.REACT_APP_SCRAPER_URL}/stockDetails`;
    return axios.post(endpoint, stockIds);
}
