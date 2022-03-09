"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const registration_1 = require("../types/registration");
const uuid_1 = require("uuid");
const create = async (req, res, next) => {
    const data = registration_1.CreateRegistrationPayload.parse(req.body);
    const registration = {
        id: (0, uuid_1.v4)(),
        accepted: false,
        closed: false,
        ...data,
    };
};
exports.create = create;
//# sourceMappingURL=registration.js.map