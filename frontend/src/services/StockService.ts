import axios from 'axios';

export const seed = () => {
    let endpoint = `${process.env.REACT_APP_SCRAPER_URL}/stock/seed`;
    axios.post(endpoint, {})
        .then((response) => {   console.log(response)} )
        .catch((error) => { console.log(error) });
}
