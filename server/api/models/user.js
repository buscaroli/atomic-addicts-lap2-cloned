const db = require('../dbConfig');
const jwt_decode = require('jwt-decode');

class User {
    constructor(data){
        this.id = data.id
        this.username = data.username
        this.email = data.email
        this.passwordDigest = data.password_digest
    }
    
    static get all(){
        return new Promise(async (resolve, reject) => {
            try {
                const result = await db.query('SELECT * FROM users;');
                const users = result.rows.map(r => new User(r))
                resolve(users)
            } catch (err) {
                reject(`Error retrieving users: ${err}`)
            }
        })
    }
    static create({ username, email, password }){
        return new Promise(async (resolve, reject) => {
            try {
                console.log(username)
                const result = await db.query('INSERT INTO users (username, email, password_digest) VALUES ($1, $2, $3) RETURNING *;', [ username, email, password ]);
                const user = new User(result.rows[0]);
                resolve(user)
            } catch (err) {
                reject(`Error creating user: ${err}`)
            }
        })
    }
    static findByUsername(username){
        return new Promise (async (resolve, reject) => {
            try {
                // const decoded = jwt_decode(token)
                // const username = decoded.username
                let userData = await db.query('SELECT * FROM users WHERE username = $1;', [ username ]);
                let user = new User(userData.rows[0]);
                resolve(user);
            } catch (err) {
                reject('User not found');
            };
        });
    };
    // static findById(id){
    //     return new Promise (async (resolve, reject) => {
    //         try {
    //             let userData = await db.query('SELECT * FROM users WHERE id = $1;', [ id ]);
    //             let user = new User(userData.rows[0]);
    //             resolve(user);
    //         } catch (err) {
    //             reject('User not found');
    //         };
    //     });
    // };
    static findByEmail(email){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query('SELECT * FROM users        WHERE email = $1;', [ email ]);
                let user = new User(result.rows[0])
                res(user)
            } catch (err) {
                rej(`Error retrieving user: ${err}`)
            }
        })
    }
}


module.exports = User
