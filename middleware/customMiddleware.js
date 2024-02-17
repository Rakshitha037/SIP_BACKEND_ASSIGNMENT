function applicationLevelMiddleware(req, res, next) {
    console.log('Application-level middleware');
    next();
}

function routerLevelMiddleware(req, res, next) {
    console.log('Router-level middleware');
    next();
}

module.exports = { applicationLevelMiddleware, routerLevelMiddleware };
