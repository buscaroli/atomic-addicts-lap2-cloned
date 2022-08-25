const express = require('express');
const cors = require('cors');
const schedule = require('node-schedule');

const server = express();
server.use(cors());
server.use(express.json());

const db = require('./dbConfig');

const usersRoutes = require('./routes/users')
const trackingsRoutes = require('./routes/trackings')
const entriesRoutes = require('./routes/entries')
const authRoutes = require('./routes/auths');
server.use('/users', usersRoutes)
server.use('/trackings', trackingsRoutes)
server.use('/entries', entriesRoutes)
server.use('/auth', authRoutes);

server.get('/', (req, res) => res.send('Welcome to your habit tracker'))


//CREATE NEW ENTRY FOR EACH USER EVERYDAY

  
async function addUserEntryForEveryUser() {
    return new Promise (async (resolve, reject) => {
        try {
            const dateEntry = new Date().toISOString().slice(0, 10);
            const users = await db.query(`SELECT * FROM users;`)
            for (i = 0; i < users.rowCount; i++) {
                await db.query(`INSERT INTO entries (user_id, date_entry) VALUES ($1, $2);`, [users.rows[i].id, dateEntry]);
            }
            console.log(`user entries created ${dateEntry}`)
            resolve(`User entries created for ${dateEntry}`);
        } catch (err) {
            console.log(err);
            reject('Entry could not be created');
        }
    })
}

const job = schedule.scheduleJob('* 0 * * *', function(){
    addUserEntryForEveryUser()
});



module.exports = server