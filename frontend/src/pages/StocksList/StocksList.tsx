import React, { useEffect, useState } from 'react';
import { getAllSectors, getStocksBySector } from '../../services/SectorService';
import { getAllStockScores } from '../../services/ScoreService';

export const StocksList: React.FC = () => {
    let [sectors, setSectors] = useState([]);
    let [stockScores, setStockScores] = useState([]);
    let [currentStocks, setCurrentStocks] = useState([]);
    let [currentSector, setCurrentSector] = useState('NIFTY50');

    // on component mount
    useEffect(() => {
        Promise.all(
            [
                getAllSectors(),
                getAllStockScores(),
                getStocksBySector(currentSector)
            ]
        ).then(response => {
            let [sectors, stockScores, stocksBySector] = response;
            setSectors(sectors.data);
            setStockScores(stockScores.data);
            setCurrentStocks(filterStocksBasedOnCurrentSector(stockScores.data, stocksBySector.data.company));
        });
    }, []);

    useEffect(() => {
        getStocksBySector(currentSector)
            .then(response => {
                let companies = response.data.company;
                setCurrentStocks(filterStocksBasedOnCurrentSector(stockScores, companies));
            })
    }, [currentSector]);

    const filterStocksBasedOnCurrentSector = (stockScores: any, stocksBySector: any) => {
        return stockScores.filter((stock: any) => stocksBySector.includes(stock.stockId));
    }

    return (
        <div>
            <div className='sectors-main'>
                {
                    sectors.map(sector => {
                        return (
                            <div onClick={() => setCurrentSector(sector)} key={sector} className='sector-item'>
                                {sector}
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
