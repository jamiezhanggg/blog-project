module.exports.createUser = async (req, res) => {
    res.json({
        status: 200,
        message: "success",
        data: {
            code:1,
            message: "user succssfully added!",
            data:{}
        }
    })
}

module.exports.getUser = async (req, res) => {
    res.json({
        status: 200,
        message: "success",
        data: {
            code:1,
            message:"getting user request succeed!",
            data: {
                name:"Jamie",
                age: 23
            }
        }
    })
}