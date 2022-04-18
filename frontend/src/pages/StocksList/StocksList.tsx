import React, { useEffect, useState } from 'react';
import { getAllCategories, getStocksByCategory } from '../../services/CategoriesService';
import { getAllStockScores } from '../../services/ScoreService';

export const StocksList: React.FC = () => {
    let [categories, setCategories] = useState([]);
    let [stockScores, setStockScores] = useState([]);
    let [categoryStocks, setCategoryStocks] = useState([]);
    let [currentCategory, setCurrentCategory] = useState('NIFTY50');

    // on component mount
    useEffect(() => {
        Promise.all(
            [
                getAllCategories(),
                getAllStockScores(),
                getStocksByCategory(currentCategory)
            ]
        ).then(response => {
            let [categories, stockScores, stocksByCategory] = response;
            setCategories(categories.data);
            setStockScores(stockScores.data);
            setCategoryStocks(stocksByCategory.data.company);
        });
    }, []);

    return (
        <div>
            Stocks List Page
        </div>
    );
}
