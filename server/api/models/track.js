const db = require('../dbConfig');
const User = require('./user');
const Entry = require('./entry')
const jwt_decode = require('jwt-decode');

class Tracking {
    constructor(data){
        this.id = data.id
        this.user_id = data.user_id
        this.sleep = data.sleep_track
        this.sleep_goal = data.sleep_goal
        this.exercise = data.exercise_track
        this.exercise_goal = data.exercise_goal
        this.exercise_freq = data.exercise_freq
        this.water = data.water_track
        this.water_goal = data.water_goal
        this.smoking = data.smoking_track
        this.smoking_goal = data.smoking_goal
        this.money = data.money_track
        this.money_goal = data.money_goal
        this.money_begin_date = data.money_begin_date
        this.money_end_date = data.money_end_date
    }
    
    static get all(){
        return new Promise(async (resolve, reject) => {
            try {
                const result = await db.query('SELECT * FROM tracking;');
                const trackings = result.rows.map(r => new Tracking(r))
                resolve(trackings)
            } catch (err) {
                reject(`Error retrieving trackings: ${err}`)
            }
        })
    }
    static findTrackingByUsername(token){
        return new Promise (async (resolve, reject) => {
            try {
                const decoded = jwt_decode(token)
                const username = decoded.username
                let user = await User.findByUsername(username);
                let result = await db.query('SELECT * FROM tracking WHERE user_id = $1;', [ user.id ]);
                resolve (result.rows[0]);
            } catch (err) {
                reject('User not found');
            };
        });
    };
    static async create( token, {sleep_track, sleep_goal, exercise_track, exercise_goal, exercise_freq, water_track, water_goal, smoking_track, smoking_goal, money_track, money_goal, money_begin_date, money_end_date}  ){
        return new Promise (async (resolve, reject) => {
            try {
                const decoded = jwt_decode(token)
                const username = decoded.username
                let user = await User.findByUsername(username);
                let result = await db.query(`INSERT INTO tracking (user_id, sleep_track, sleep_goal, exercise_track, exercise_goal, exercise_freq, water_track, water_goal, smoking_track, smoking_goal, money_track, money_goal, money_begin_date, money_end_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *;`, [ user.id, sleep_track, sleep_goal, exercise_track, exercise_goal, exercise_freq, water_track, water_goal, smoking_track, smoking_goal, money_track, money_goal, money_begin_date, money_end_date ])
                resolve (result.rows[0]);
            } catch (err) {
                reject('Tracking could not be created');
            }
        });
    };
    static async update( token, {sleep_track, sleep_goal, exercise_track, exercise_goal, exercise_freq, water_track, water_goal, smoking_track, smoking_goal, money_track, money_goal, money_begin_date, money_end_date} ){
        return new Promise (async (resolve, reject) => {
            try {
                const decoded = jwt_decode(token)
                const username = decoded.username
                console.log(username)
                let user = await User.findByUsername(username);
                let result = await db.query(`UPDATE tracking SET sleep_track = $1, sleep_goal = $2, exercise_track = $3, exercise_goal = $4, exercise_freq = $5, water_track = $6, water_goal = $7, smoking_track = $8, smoking_goal = $9, money_track = $10, money_goal = $11, money_begin_date = $12, money_end_date = $13 WHERE user_id = $14 RETURNING *;`, [ sleep_track, sleep_goal, exercise_track, exercise_goal, exercise_freq, water_track, water_goal, smoking_track, smoking_goal, money_track, money_goal, money_begin_date, money_end_date, user.id ])
                resolve (result.rows[0]);
            } catch (err) {
                reject(`Tracking could not be created: ${err}`);
            }
        });
    };

    static async getCurrentTrackingData(token){
        return new Promise(async (resolve, reject) => {
            try {
                const decoded = jwt_decode(token)
                const username = decoded.username
                let user = await User.findByUsername(username);
                const result = await db.query('SELECT tracking.*, entries.* FROM tracking JOIN entries ON tracking.user_id = entries.user_id WHERE tracking.user_id = $1 ORDER BY (date_entry) DESC;', [user.id]);
                resolve (result.rows[0]);
            } catch (err) {
                reject(`Error retrieving trackings: ${err}`)
            }
        })
    };
}
module.exports = Tracking



