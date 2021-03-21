const referer = (req, res, next) => {
    const fullURL = req.protocol + '://' + req.get('host') + "/";
    if (!req.get("Referer") || !req.get("Referer").startsWith(fullURL)) {
        return next(new Error("You are not allowed to access this information!"))
    }
    next()
}

module.exports = referer