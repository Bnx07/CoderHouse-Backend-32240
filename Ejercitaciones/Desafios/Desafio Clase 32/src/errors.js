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
    // static user(user) {
    //     return `Algunas propiedades no están completas
    //             * primer nombre era necesario ${user.first_name}
    //             * apellido era necesario ${user.last_name}
    //             * email era necesario ${user.email}`;
    // }

    // static getProductsQuery() {
    //     return `Soy una query fallida :D`;
    // }

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
}

/*
    statusCode
    name
    cause: generate
    message
    code
*/