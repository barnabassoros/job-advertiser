"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAll = exports.create = void 0;
const zod_1 = require("zod");
const prisma_1 = __importDefault(require("../lib/prisma"));
const CreateAdPayload = zod_1.z.object({
    time: zod_1.z.date(),
    location: zod_1.z.string(),
    duration: zod_1.z.string(),
    payment: zod_1.z.number(),
    description: zod_1.z.string(),
});
const create = async (req, res, next) => {
    const data = CreateAdPayload.parse(req.body);
    await prisma_1.default.ad.create({
        data: {
            ...data,
        },
    });
    res.json({ message: "succesful_creation" });
};
exports.create = create;
const listAll = async (req, res, next) => {
    const ads = await prisma_1.default.ad.findMany();
    res.json(ads);
};
exports.listAll = listAll;
//# sourceMappingURL=ad.js.map