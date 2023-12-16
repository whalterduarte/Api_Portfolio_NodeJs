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
exports.login = void 0;
const prisma_1 = __importDefault(require("../libs/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = yield req.body;
    if (!email || !password) {
        return res.status(404).json({ error: 'Preencha os campos' });
    }
    try {
        const existingUser = yield prisma_1.default.user.findUnique({
            where: { email }
        });
        if (!existingUser) {
            return res.status(404).json({ error: 'Usuario não encontrado' });
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, existingUser.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }
        else {
            const jwtKey = process.env.JWT_KEY || 'whalter';
            const token = jsonwebtoken_1.default.sign({ userId: existingUser.id, email }, jwtKey, { expiresIn: '2h' });
            return res.json({ success: true, userId: existingUser.id, email, token });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro durante o login' });
    }
});
exports.login = login;
