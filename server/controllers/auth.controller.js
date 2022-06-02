const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../db')
const config = require('../config')

class AuthController {
    async getPersonClient(req, res) {
        const id = req.params.id;
        let candidate = await db.query('SELECT * FROM CLIENT WHERE id = $1', [id])
        if (candidate.rowCount > 0) {
            res.status(200).json({
                id: candidate.rows[0].id,
                first_name: candidate.rows[0].firstname,
                last_name: candidate.rows[0].lastname,
                email: candidate.rows[0].email,
                password: candidate.rows[0].pass
            })
        } else {
            res.status(401).json({
                message: "Пользователь не найден."
            })
        }
    }

    async login(req, res) {
        const {email, pass } = req.body
        console.log(req.body)
        let candidate = await db.query('SELECT * FROM CLIENT WHERE email = $1', [email])
        if (candidate.rowCount > 0) {
            const isMatch = (pass === candidate.rows[0].pass)
                if (isMatch) {
                    const token = jwt.sign({
                        email: candidate.rows[0].email,
                        userId: candidate.rows[0].id
                    }, config.jwtKey, {expiresIn: config.ttl})
                    res.status(200).json({
                        status: "client",
                        user_id: candidate.rows[0].id,
                        user: candidate.rows[0],
                        token: token
                    })
                } else {
                    res.status(401).json({
                        message: "Пароли не совпадают."
                    })
                }
        } else if ((await db.query('SELECT * FROM ANALYST WHERE email = $1', [email])).rowCount > 0){
            let candidate = await db.query('SELECT * FROM ANALYST WHERE email = $1', [email])
            const isMatch = (pass === candidate.rows[0].pass)
                if (isMatch) {
                    const token = jwt.sign({
                        email: candidate.rows[0].email,
                        userId: candidate.rows[0].id
                    }, config.jwtKey, {expiresIn: config.ttl})
                    res.status(200).json({
                        status: "analyst",
                        user_id: candidate.rows[0].id,
                        user: candidate.rows[0],
                    })
                } else {
                    res.status(401).json({
                        message: "Пароли не совпадают."
                    })
                }
        } else
          {
            res.status(409).json({
                message: "Пользователя с таким email не существует."
            })
        }
        
    }

    async register(req, res) {
        const {first_name, last_name, email, pass, code} = req.body
        let candidate = await db.query('SELECT * FROM CLIENT WHERE email = $1', [email])
        if (candidate.rowCount == 0) candidate = await db.query('SELECT * FROM ANALYST WHERE email = $1', [email])
        console.log()
        if (candidate.rowCount > 0) {
            res.status(409).json({
                message: 'Пользователь с таким email уже зарегистрирован'
            })
        } else {
            let newUser;
            console.log(code);
            if (code.length > 0) {
                console.log(email)
                newUser = await db.query(`INSERT INTO ANALYST (firstName, lastName, email, pass, code) values ($1, $2, $3, $4, $5) RETURNING * `, [first_name, last_name, email, pass, code])
            } else {
                newUser = await db.query(`INSERT INTO CLIENT (firstName, lastName, email, pass) values ($1, $2, $3, $4) RETURNING * `, [first_name, last_name, email, pass])
            }             
            newUser.rows.length > 0 ? res.status(201).json({status: "ok"}) : res.status(400).json("Error");
        }
    }


}

module.exports = new AuthController()
