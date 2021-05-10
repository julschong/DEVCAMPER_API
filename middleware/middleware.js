export const logger = (req, res, next) => {
    console.log(
        `${req.method} ${req.protocol}://${req.get('host')}${
            req.originalUrl
        } - ${JSON.stringify(req.body)}`
    )
    next()
}
