const { constants } = require("../constants")

const errorHandeler = (err, req, resp, next) => {
    const statusCode = resp.statusCode ? resp.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            resp.json({ title: "Validation failed", message: err.message, stackTrace: err.stack });
            break;
        case constants.NOT_FOUND:
            resp.json({ title: "Not Found", message: err.message, stackTrace: err.stack });
            break;
        case constants.FORBIDDEN:
            resp.json({ title: "Forbidden", message: err.message, stackTrace: err.stack });
            break;
        case constants.UNAUTHORAIZED:
            resp.json({ title: "Unauthoraized", message: err.message, stackTrace: err.stack });
            break;
        case constants.SERVER_ERROR:
            resp.json({ title: "Server error", message: err.message, stackTrace: err.stack });
            break;
        default:
            console.log("no error! All good")
            break;
    }


};


module.exports = errorHandeler;