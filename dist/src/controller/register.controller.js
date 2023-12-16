"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newUser = void 0;
const prisma_1 = __importDefault(require("../libs/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, password } = yield req.body;
    if (!email || !password || !name) {
        return res.status(404).json({ error: 'Preencha os campos' });
    }
    try {
        const existingUser = yield prisma_1.default.user.findUnique({
            where: {
                email: email,
            },
        });
        if (existingUser) {
            return res.json({ Server: 'Usuario ja cadastrado' });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield prisma_1.default.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });
        const jwtKey = process.env.JWT_KEY || 'whalter';
        const token = jsonwebtoken_1.default.sign({ userId: newUser.id, email, name }, jwtKey, { expiresIn: '2h' });
        res.json({ success: true, userId: newUser.id, name, email, token });
    }
    catch (error) {
        console.log(error);
        res.json({ error, Server: 'Error interno' });
    }
});
exports.newUser = newUser;
