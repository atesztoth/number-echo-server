const createErrorResponse = (code, message) => ({status: code, message: message});

module.exports.createErrorResponse = createErrorResponse;