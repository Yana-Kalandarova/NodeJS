export class NotFoundError extends Error {
    constructor(message) {
        super();
        this.message = message;
    }
}
