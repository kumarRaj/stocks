package com.project.stocks.service;

import com.project.stocks.dto.Category;
import com.project.stocks.dto.Stock;
import com.project.stocks.dto.Unit;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

class DataMapperTest {

    @Test
    void testMapMethodInCaseOfNullInputShouldReturnNull() {
        DataMapper<Stock> dataMapper = DataMapper.getInstance();
        assertNull(dataMapper.map(null, Stock.class));
    }

    @Test
    void testMapMethodInCaseOfEmptyInputShouldReturnNull() {
        DataMapper<Stock> dataMapper = DataMapper.getInstance();
        assertNull(dataMapper.map("", Stock.class));
    }

    @Test
    void testMapMethodInCaseValidDataShouldReturnStockObjectWithValidValues() {
        String input = "{\"stockId\":\"INFY\",\"MarketCap\":{\"unit\":\"Cr\",\"value\":711430},\"PE\":{\"unit\":\"\",\"value\":34}" +
                ",\"Dividend\":{\"unit\":\"%\",\"value\":1},\"FaceValue\":{\"unit\":\"\",\"value\":5},\"OPM\":{\"data\":" +
                "[{\"year\":2010,\"value\":34},{\"year\":2011,\"value\":33},{\"year\":2012,\"value\":32},{\"year\":2013,\"value\":29}," +
                "{\"year\":2014,\"value\":27},{\"year\":2015,\"value\":28},{\"year\":2016,\"value\":27},{\"year\":2017,\"value\":27}," +
                "{\"year\":2018,\"value\":27},{\"year\":2019,\"value\":24},{\"year\":2020,\"value\":25},{\"year\":2021,\"value\":28}]," +
                "\"TTM\":27,\"unit\":\"%\"},\"NPM\":{\"data\":[{\"year\":2010,\"value\":6266},{\"year\":2011,\"value\":6835},{\"year\":2012," +
                "\"value\":8332},{\"year\":2013,\"value\":9429},{\"year\":2014,\"value\":10656},{\"year\":2015,\"value\":12372},{\"year\":2016," +
                "\"value\":13489},{\"year\":2017,\"value\":14353},{\"year\":2018,\"value\":16029},{\"year\":2019,\"value\":15404},{\"year\":2020," +
                "\"value\":16594},{\"year\":2021,\"value\":19351}],\"TTM\":20889,\"unit\":\"Cr\"},\"Debt\":{\"Revenue\":{\"data\":[{\"year\":2010," +
                "\"value\":22763},{\"year\":2011,\"value\":25690},{\"year\":2012,\"value\":31046},{\"year\":2013,\"value\":37708},{\"year\":2014,\"value" +
                "\":44244},{\"year\":2015,\"value\":50164},{\"year\":2016,\"value\":60600},{\"year\":2017,\"value\":67838},{\"year\":2018,\"value\":63835}," +
                "{\"year\":2019,\"value\":62778},{\"year\":2020,\"value\":63328},{\"year\":2021,\"value\":74227},{\"year\":2021,\"value\":67842}]," +
                "\"unit\":\"Cr\"},\"Borrowings\":{\"data\":[{\"year\":2010,\"value\":0},{\"year\":2011,\"value\":0},{\"year\":2012,\"value\":0}," +
                "{\"year\":2013,\"value\":0},{\"year\":2014,\"value\":0},{\"year\":2015,\"value\":0},{\"year\":2016,\"value\":0},{\"year\":2017,\"value\":0}," +
                "{\"year\":2018,\"value\":0},{\"year\":2019,\"value\":0},{\"year\":2020,\"value\":4633},{\"year\":2021,\"value\":5325},{\"year\":2021,\"value\":5146}]," +
                "\"unit\":\"Cr\"},\"OtherLiabilities\":{\"data\":[{\"year\":2010,\"value\":4455},{\"year\":2011,\"value\":5317},{\"year\":2012,\"value\":7025}," +
                "{\"year\":2013,\"value\":8281},{\"year\":2014,\"value\":12436},{\"year\":2015,\"value\":15553},{\"year\":2016,\"value\":13354},{\"year\":2017" +
                ",\"value\":14166},{\"year\":2018,\"value\":14426},{\"year\":2019,\"value\":19118},{\"year\":2020,\"value\":21717},{\"year\":2021,\"value\":25835}," +
                "{\"year\":2021,\"value\":31025}],\"unit\":\"Cr\"}}}";

        DataMapper<Stock> dataMapper = DataMapper.getInstance();
        Stock stock = dataMapper.map(input, Stock.class);

        assertEquals("INFY", stock.getId());
        assertEquals(34, stock.getPe().getValue());
        assertEquals(Unit.Percentage, stock.getOpmDetails().getUnit());
        assertEquals(27, stock.getOpmDetails().getTtm());
        assertEquals(Unit.Crore, stock.getNpmDetails().getUnit());
    }

    @Test
    void testMapCategoryMethodInCaseOfNullInputShouldReturnNull() {
        DataMapper<Category> dataMapper = DataMapper.getInstance();
        assertNull(dataMapper.map(null, Category.class));
    }

    @Test
    void testMapCategoryMethodInCaseOfEmptyInputShouldReturnNull() {
        DataMapper<Category> dataMapper = DataMapper.getInstance();
        assertNull(dataMapper.map("", Category.class));
    }

    @Test
    void testMapCategoryMethodInCaseValidDataShouldReturnCategoryObjectWithValidValues() {
        String input = "{\"name\":\"ABC\",\"company\":[\"AB\",\"BC\",\"CD\"]}";
        DataMapper<Category> dataMapper = DataMapper.getInstance();
        Category category = dataMapper.map(input, Category.class);

        assertEquals("ABC", category.getName());
        assertEquals(3, category.getCompanies().size());
    }

    @Test
    void testMapCategoryNamesInCaseValidDataShouldReturnValidValues() {
        String input = "[\"A\",\"B\",\"C\"]";
        DataMapper<List> dataMapper = DataMapper.getInstance();
        List<String> companyNames = dataMapper.map(input, List.class);

        assertEquals(3, companyNames.size());
    }
}