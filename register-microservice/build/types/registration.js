"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRegistrationPayload = void 0;
const zod_1 = require("zod");
exports.CreateRegistrationPayload = zod_1.z.object({
    adId: zod_1.z.string().uuid(),
    username: zod_1.z.string(),
});
//# sourceMappingURL=registration.js.map