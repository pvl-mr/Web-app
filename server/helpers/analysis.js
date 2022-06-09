class Analysis {
    constructor(stocks, bonds) {
        this.stocks = stocks;
        this.bonds = bonds;
    }
    evaluate_realized_return = () => {
        let amount_stocks = 0
        //подсчёт реализованной доходности
        //считаем общий капитал портфеля
        this.stocks.rows.forEach((item, index) => {
            amount_stocks += parseFloat(item.result)
        })
        //считаем веса акций
        let weights = []
        this.stocks.rows.forEach((item, index) => {
            weights.push({
                id: item.id,
                name: item.stockname,
                weight: parseFloat(item.result)/amount_stocks,
                stock_return: item.annual_return
            })
        })
        let overall_return = 0
        //высчитываем общую доходность порфтеля
        weights.forEach((item, index) => {
            overall_return += item.weight * item.stock_return
        })
        return overall_return
    }

    get_probability_dist(overall_return){
        let probability_distribution_return = []
        probability_distribution_return.push({
            weights: [
                {
                    weight: 50,
                    stock_return: overall_return
                },
                {
                    weight: 25,
                    stock_return: overall_return*1.5
                },
                {
                    weight: 25,
                    stock_return: 0
                }
            ]
        })

        return probability_distribution_return
    }

    evaluate_predicted_return(overall_return){
        //расчёт прогнозируемой доходности
        let probability_distribution_return = this.get_probability_dist(overall_return)
        //ожидаемая доходность портфеля
        let expected_return = 0
        probability_distribution_return[0].weights.forEach((item, index) => {
            expected_return += item.stock_return * item.weight/100
        })

        return expected_return
    }

    evaluate_standard_deviation(overall_return, expected_return){
        //высчитываем риск портфеля как дисперсию доходности, равняется корню из стандартного отклонения
        //высчитываем дисперсию
        let probability_distribution_return = this.get_probability_dist(overall_return)
        var dispersion = 0
        probability_distribution_return[0].weights.forEach((item, index) => {
            // dispersion += item.weight/100 * Math.pow(item.stock_return-0, 2)
            dispersion += item.weight/100 * Math.pow(item.stock_return-expected_return, 2)
        })
        return Math.sqrt(dispersion);
    }

    async evaluate_portfolio(){
        return new Promise((resolve, reject) => {
            try {
                let amount_stocks = 0
                this.stocks.rows.forEach((item, index) => {
                    amount_stocks += parseFloat(item.result)
                })
                let amount_bonds = 0
                this.bonds.rows.forEach((item, index) => {
                    amount_bonds += parseFloat(item.result)
                })
                let usd_rub = 0
                var request = require('request');
                var url = `https://currate.ru/api/?get=rates&pairs=USDRUB&key=cf03acf4bd07529e4f84089001b62488`;
                var type = ''

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
                        // data is successfully parsed as a JSON object
                        usd_rub = data.data.USDRUB
                        amount_bonds = amount_bonds/usd_rub
                        let overall = amount_bonds+amount_stocks
                        let bond_proportion = amount_bonds/overall
                        let stock_proportion = 1-bond_proportion
                        if (bond_proportion < 0.40) {
                            type = 'Агрессивный'
                        } else if (bond_proportion < 0.60) {
                            type = 'Умеренный'
                        } else if (bond_proportion < 0.85) {
                            type = 'Консервативный'
                        } else {
                            type = 'Осторожный'
                        }
                        resolve({
                            type,
                            bond_proportion,
                            stock_proportion,
                        })
                    }
                    reject(null)
                });
            } catch (err) {
                console.log('e', err);
                reject(err);
            }
        })
    }
}

module.exports = Analysis