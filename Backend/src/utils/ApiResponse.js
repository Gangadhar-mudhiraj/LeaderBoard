export class FailApiResponse {
    constructor({ message = 'Something went wrong', errors = null } = {}) {
        this.success = false;
        this.message = message;
        if (errors !== null) this.errors = errors;
    }
}

export class SuccessApiResponse {
    constructor({ message = 'Success', data = null, meta = null } = {}) {
        this.success = true;
        this.message = message;
        if (data !== null) this.data = data;
        if (meta !== null) this.meta = meta;
    }
}