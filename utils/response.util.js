module.exports = {
    badRequest: (errors) => {
        return {
            code: 400,
            data: {
                status: 400,
                data: [],
                errors: errors
            }
        }
    },
    serverError: () => {
        return {
            code: 500,
            data: {
                status: 500,
                data: [],
                errors: "Server error"
            }
        }
    },
    created: (newObject) => {
        return {
            code: 201,
            data: {
                status: 201,
                data: newObject
            }
        }
    },
    getSuccess: (listObject) => {
        return {
            code: 200,
            data: {
                status: 200,
                data: listObject
            }
        }
    }
}