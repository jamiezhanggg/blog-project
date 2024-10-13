const errorMiddleWare = (err, req, res, next) => {
    console.log("err mid ware");

    const status = err.status || 500;
    const message = err.message || 'server error';
    const error = err.error || 'server error';

    res
    .status(status)
    .json({
        code: 0,
        message: message,
        error: error
    })
}

module.exports = errorMiddleWare;