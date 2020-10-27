exports.localsMiddleware = (req, res, next) => {
    res.locals.userId = 1 || null;
    // TODO : temp user
    next();
}