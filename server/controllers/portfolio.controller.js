const db = require('../db')
const request = require("request");
const Analysis = require("../helpers/analysis");
class PortfolioController {
    async createPortfolio(req, res) {
        const {years, goal, client_id} = req.body
        const getRandomIntInclusive = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
          }
        let analystid = await db.query(`select id from analyst`)
        let size = analystid.rows.length - 1
        let i = getRandomIntInclusive(0, size)
        let analyst_id = analystid.rows[i].id

        const newPortfolio = await db.query(`INSERT INTO portfolio (years, goal, clientid, analystid) values ($1, $2, $3, $4) RETURNING * `, [years, goal, client_id, analyst_id])

        newPortfolio.rows.length > 0 ? res.status(201).json(newPortfolio.rows[0]) : res.status(400).json("Error");
    }
    async getPortfolio(req, res) {
        const id = req.params.id;
        const portfolio = await db.query(`SELECT * FROM portfolio where clientid = $1`, [id])
        portfolio.rows.length > 0 ? res.status(200).json({
            status: 'ok',
            data: portfolio.rows
        }) : res.status(400).json("Portfolios doesn't exist");
    }

    async getPortfolioDetails(req, res) {
        const id = req.params.id;
        const portfolio = await db.query(`SELECT * FROM portfolio where id = $1`, [id])
        portfolio.rows.length > 0 ? res.status(200).json({
            status: 'ok',
            data: portfolio.rows[0]
        }) : res.status(400).json("Portfolio doesn't exist");
    }

    async getPortfolios(req, res) {
        const id = req.params.id;
        const portfolios = await db.query(`SELECT * FROM portfolio where clientid = $1`, [id])
        portfolios.rows.length > 0 ? res.json(portfolios.rows) : res.status(200).json([]);
    }

    async updatePortfolio(req, res) {
        const {id, years, goal, analyst_id} = req.body;
        const portfolio = await db.query(`UPDATE portfolio set years = $1, goal = $2, analystid = $3 where id = $4 RETURNING *`, [years, goal, analyst_id, id])
        portfolio.rows.length > 0 ? res.json(portfolio.rows[0]) : res.status(400).json("Portfolio doesn't exist");
    }

    async deletePortfolio(req, res) {
        const id = req.params.id;
        const portfolio = await db.query(`DELETE from portfolio where id = $1 RETURNING *`, [id])
        portfolio.rows.length > 0 ? res.json(portfolio.rows[0]) : res.status(400).json("Portfolio doesn't exist or already deleted");
    }

    async sendPortfolio(req, res) {
        const id = req.params.id
        const portfolio = await db.query(`UPDATE portfolio set sendstatus = $1 WHERE id = $2 RETURNING *`, ["send", id])
        portfolio.rows.length > 0 ? res.json(portfolio.rows[0]) : res.status(400).json("Portfolio was send to analytics");
    }

    async getPortfoliosForAnalyst(req, res) {
        const analyst_id = req.params.id
        const portfolios = await db.query(`SELECT * FROM portfolio where (sendstatus = $1 and analystid = $2)`, ["send", analyst_id])
        if (portfolios.rows.length > 0) {
            res.status(200).json({
                data: portfolios.rows
            });
        } else {
            res.status(200).json({
                data: []
            });
        }
    }

    async sendMessage(req, res) {
        const {portfolio_id, message} = req.body
        const portfolio = await db.query(`UPDATE portfolio set message = $1 WHERE id = $2 RETURNING *`, [message, portfolio_id])
        portfolio.rows.length > 0 ? res.json(portfolio.rows[0]) : res.status(400).json("Message not send");
    }

    async getAnalysis(req, res) {
        const id = req.params.id;
        const stocks = await db.query(`SELECT 
                                        stock.stockname,
                                        stock.price * portfolio_stock.count as result, 
                                        stock.annual_return
                                        FROM portfolio_stock
                                        JOIN stock on stock.id = portfolio_stock.stockid
                                        WHERE portfolio_stock.portfolioid = $1`, [id])
        const bonds = await db.query(`SELECT
                                        bond.bondname,
                                        bond.price * portfolio_bond.count as result
                                        FROM portfolio_bond
                                        JOIN bond on bond.id = portfolio_bond.bondid
                                        WHERE portfolio_bond.portfolioid = $1`, [id])

        const analysis = new Analysis(stocks, bonds);
        const rounded = function (number) {
            return +number.toFixed(2)
        }

        let overall_return = analysis.evaluate_realized_return()
        let expected_return = analysis.evaluate_predicted_return(overall_return)
        let standard_deviation = analysis.evaluate_standard_deviation(overall_return, expected_return)
        let {type,bond_proportion, stock_proportion } = await analysis.evaluate_portfolio()

        let formated_overall_return = rounded(overall_return)
        let formated_expected_return = rounded(expected_return)
        let formated_standard_deviation = rounded(standard_deviation)

        stocks.rows.length > 0 ? res.status(200).json({
                status: 'ok',
                data: {
                    overall_return: formated_overall_return,
                    expected_return: formated_expected_return,
                    standard_deviation: formated_standard_deviation,
                    type: {
                        type,
                        stock_proportion,
                        bond_proportion,
                    }
                }
            }) : res.status(400).json("Portfolio doesn't exist");


    }
}

module.exports = new PortfolioController()