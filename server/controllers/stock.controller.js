const db = require('../db')
class StockController {
    async createStock(req, res) {
        const {stock_name, stock_desc, stock_price} = req.body
        const newStock = await db.query(`INSERT INTO stock (stockName, stockDesc, price) values ($1, $2, $3) RETURNING * `, [stock_name, stock_desc, stock_price])
        newStock.rows.length > 0 ? res.json(newStock.rows[0]) : res.status(400).json("Error");
    }
    async getStock(req, res) {
        const id = req.params.id;
        const stock = await db.query(`SELECT * FROM stock where id = $1`, [id])
        stock.rows.length > 0 ? res.json(stock.rows[0]) : res.status(400).json("Stock doesn't exist");
    }

    async getStocks(req, res) {
        const stocks = await db.query(`SELECT * FROM stock`)
        stocks.rows.length > 0 ? res.status(200).json({
            status: 'ok',
            data: stocks.rows
        }) : res.status(400).json("Stocks doesn't exist");
    }

    async updateStock(req, res) {
        const {id, stock_name, stock_desc} = req.body;
        const stock = await db.query(`UPDATE stock set stockName = $1, stockDesc = $2 where id = $3 RETURNING *`, [stock_name, stock_desc, id])
        stock.rows.length > 0 ? res.json(stock.rows[0]) : res.status(400).json("Stock doesn't exist");
    }

    async deleteStock(req, res) {
        const id = req.params.id;
        const stock = await db.query(`DELETE from stock where id = $1 RETURNING *`, [id])
        stock.rows.length > 0 ? res.json(stock.rows[0]) : res.status(400).json("Stock doesn't exist or already deleted");
    }

    async putStocks(req, res) {
        var request = require('request');
        var symbols = ['RE', 'IVZ', 'GOLD', 'CCJ', 'MGA','NTR', 'PAAS','SHOP', 'WPM', 'CB', 'RIG', 'TEL', 'FTI', 'NLSN', 'ICLR', 'ACN', 'ETN', 'PRTA', 'ALLE','STE', 'TT', 'STX', 'MDT', 'CHKP', 'FVRR', 'MNDY', 'NVCR', 'FTCH', 'AMBA', 'BYSI', 'NU', 'STNE', 'XP', 'RCL', 'SPOT', 'AER', 'LYB', 'NXPI', 'AFMD', 'RACE', 'QGEN', 'AAON', 'AIR', 'AGCO', 'ACMR', 'AGNC', 'AES', 'AMN', 'ANIP', 'T', 'ATNI', 'AAN', 'ABT', 'ABBV', 'ABMD', 'ACIW', 'ATVI', 'AYI', 'ADUS', 'ADBE']
        symbols.forEach((item, index) => {
            var url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${item}&apikey=TXQHRTAANYRF47MR`;
            request.get({
                url: url,
                json: true,
                headers: {'User-Agent': 'request'}
            }, (err, res, data) => {
                if (err) {
                    console.log('Error:', err);
                } else if (res.statusCode !== 200) {
                    console.log('Status:', res.statusCode);
                } else {
                    db.query(`INSERT INTO stock (stockName, stockDesc, price) values ($1, $2, $3) RETURNING * `, [data.Name, data.Description, data.AnalystTargetPrice])
                }
            });
        })

    }
}

module.exports = new StockController()