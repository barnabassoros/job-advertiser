"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const errorHandler = (error, req, res, next) => {
    if (error instanceof zod_1.ZodError) {
        // type validation failed
        res.status(400).json({
            message: "type_validation_failed",
            data: error.message,
        });
    }
    else {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map