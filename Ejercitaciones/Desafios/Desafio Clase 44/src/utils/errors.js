export class CustomError {
    static createError({statusCode = 500, name= "Error", cause, message, code = 1}) {
        const error = new Error(message, {cause});
        error.status = statusCode;
        error.name = name;
        error.code = code;
        throw error;
    }
}

export const errorCodes = {
    INVALID_TYPES_ERROR: 2,
    DATABASE_ERROR: 3,
    MISSING_DATA: 4,
    RENDERING_ERROR: 5,
    ROUTING_ERROR: 6
}

export class generateErrorInfo {
    static getId(id) {
        return `ID was ${id} and is not valid`;
    }

    static idNotFound() {
        return 'The ID doesnt exist';
    }

    static getEmptyDatabase() {
        return "Data was {}";
    }

    static unauthorized() {
        return "The user was unauthorized"
    }

    static dbNotChanged() {
        return "Database didnt register the changes";
    }
}

/*
Propiedades:
    statusCode
    name
    cause: generate
    message
    code
*/