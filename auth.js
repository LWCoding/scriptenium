const auth = (req, res, next) => {
    const fullURL = req.protocol + '://' + req.get('host') + req.originalUrl;
    if (req.get("Referer") != fullURL) {
        return next(new Error("You are not allowed to access this information!"))
    }
    next()
}

module.exports = auth