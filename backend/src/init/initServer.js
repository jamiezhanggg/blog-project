const initServer = (app) => {
    return new Promise(async(resolve, reject)=> {
        const PORT = process.env.PORT || 8000;
        app.listen(PORT, ()=>{
            console.log(`Server running on http://localhost:${PORT}`);
            resolve();
        }).on('error', (err) => {
            console.log(err);
            reject();
        })
    })
}

module.exports = initServer;

