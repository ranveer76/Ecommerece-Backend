const log = require('../models/logs');

const logger = (req, res, next) => {
    const start = Date.now();
    const method = req.method;
    const url = req.originalUrl;
    const ip = req.ip;
    res.on('finish', async() => {
        const ms = Date.now() - start;
        const user = req.user ? req.user?._id : null;
        const status = res.statusCode;
        const logData = new log({
            user,
            method,
            url,
            ip,
            status,
            duration: ms
        });
        await logData.save();
    });
    next();
}

module.exports = logger;