import React, { useEffect, useState } from 'react';
import { getAllCategories, getStocksByCategory } from '../../services/CategoriesService';
import { getAllStockScores } from '../../services/ScoreService';

export const StocksList: React.FC = () => {
    let [categories, setCategories] = useState([]);
    let [stockScores, setStockScores] = useState([]);
    let [categoryStocks, setCategoryStocks] = useState<string[]>([]);
    let [currentStocks, setCurrentStocks] = useState([]);
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
            setCurrentStocks(filterStocksBasedOnCurrentCategory(stockScores.data, stocksByCategory.data.company));
        });
    }, []);

    useEffect(() => {
        getStocksByCategory(currentCategory)
            .then(response => {
                let companies = response.data.company;
                setCategoryStocks(companies);
                setCurrentStocks(filterStocksBasedOnCurrentCategory(stockScores, companies));
            })
    }, [currentCategory]);

    const filterStocksBasedOnCurrentCategory = (stockScores: any, categoryStocks: any) => {
        return stockScores.filter((stock: any) => categoryStocks.includes(stock.stockId));
    }

    return (
        <div>
            <div className='categories-main'>
                {
                    categories.map(category => {
                        return (
                            <div onClick={() => setCurrentCategory(category)} key={category} className='category-item'>
                                {category}
                            </div>
                        )
                    })
                }
            </div>

            <div>
                {
                    currentStocks.map((currentStock: any) => {
                        let {stockId, scoreBreakdown, score} = currentStock;
                        return (
                            <div>
                                <p>{stockId}</p>
                                <p>{score}</p>

                                <div>
                                    <p>Breakdown:</p>
                                    <p>Borrowings: {scoreBreakdown.borrowings}</p>
                                    <p>Liabilities: {scoreBreakdown.liabilities}</p>
                                    <p>Net Profit Margin: {scoreBreakdown.netProfitMargin}</p>
                                    <p>Operating Profit Margin: {scoreBreakdown.operatingProfitMargin}</p>
                                    <p>PE Ratio: {scoreBreakdown.pe}</p>
                                    <p>Revenue: {scoreBreakdown.revenue}</p>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}
