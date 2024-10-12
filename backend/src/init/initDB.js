const dbConnection = require('../db/connection');

const initDB = ()=>{
    return new Promise(async (resolve, reject) => {
        try{
            await dbConnection();
            // init model 
            // init relation
            resolve();
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
};

module.exports = initDB;