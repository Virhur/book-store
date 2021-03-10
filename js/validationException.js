class ValidationException extends Error {
    constructor(error, ...params) {
        super(...params)
        this.error = error;
    }
}