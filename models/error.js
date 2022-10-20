class HttpError extends Error {
    constructor(message,err){
        super(message)
        this.code = err
    }
}

module.exports = HttpError