const sequelize = require('./sequelize');

const dbConnection = () => {
    return new Promise(async (resolve, reject) => {
        try {
            await sequelize.authenticate();
            console.log("mysql connect succeed.");
            resolve();
        } catch (err) {
            console.log("connect fail: " + err);
            reject(err);
        }
    })
}

module.exports = dbConnection;