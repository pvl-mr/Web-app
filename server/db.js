const Pool = require('pg').Pool

const pool = new Pool({
    // user: "ujijuwsflalnki",
    // password: "3476149f8c3e6081da13d7e910798f558d82650b9a41507b389272b6e4eee749",
    // host: "ec2-3-226-163-72.compute-1.amazonaws.com",
    // port: 5432,
    // database: "d19gmt00veifl8",
    connectionString : "postgres://yqgmxdetrbmpcb:2237e543e8d56afcd3114b0947ec4fb6bc73aa25e1e8d2552350fdd0ab79134c@ec2-52-86-115-245.compute-1.amazonaws.com:5432/d51i0pc3mighc6",
    ssl: {
        rejectUnauthorized: false,
    }
})

module.exports = pool
//
// postgres://ujijuwsflalnki:3476149f8c3e6081da13d7e910798f558d82650b9a41507b389272b6e4eee749@ec2-3-226-163-72.compute-1.amazonaws.com:5432/d19gmt00veifl8