import axios from 'axios';

const endpoint = `${import.meta.env.REACT_APP_BACKEND_URL}/holdings`;

export const getHoldings = () => axios.get<Record<string, number>>(endpoint);
export const saveHolding = (stockId: string, quantity: number) =>
    axios.put<Record<string, number>>(`${endpoint}/${encodeURIComponent(stockId)}`, {quantity});
