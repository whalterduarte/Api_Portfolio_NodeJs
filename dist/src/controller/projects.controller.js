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
exports.addProject = exports.descProject = exports.getProjects = void 0;
const prisma_1 = __importDefault(require("../libs/prisma"));
//Get list Projects
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield prisma_1.default.project.findMany({});
    try {
        if (projects.length === 0) {
            return res
                .status(404)
                .json({ error: 'Não a nenhum projeto cadastrado' });
        }
        return res.json({ success: true, projects });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ server: 'Erro interno', error });
    }
});
exports.getProjects = getProjects;
//Routes dynamics project
const descProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    const project = yield prisma_1.default.project.findFirst({
        where: {
            slug
        }
    });
    try {
        if (!project) {
            return res.status(404).json({ status: false, Server: 'Nenhum projeto encontrado' });
        }
        return yield res.json({ status: true, project });
    }
    catch (error) {
        console.log(error);
        return res.status(404).json({ Server: 'Error interno' });
    }
});
exports.descProject = descProject;
//Add new project 
const addProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    //Accpts only image
    if (req.file) {
        const file = req.file;
    }
    else {
        res.status(404).json({ error: 'File not sent' });
        return;
    }
    try {
        const { linkgit, descproject, url, desc, title, body, slug, linkproject } = req.body;
        const photo = `${process.env.BASE}/myprojects/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.filename}`;
        if (!linkgit || !descproject || !desc || !title || !body || !slug || !linkproject || !photo) {
            return res.json({ Sever: 'Todos os campos são obrigatorios' });
        }
        else {
            yield prisma_1.default.project.create({
                data: {
                    linkgit,
                    descproject,
                    url: photo,
                    desc,
                    title,
                    body,
                    slug,
                    linkproject,
                },
            });
            return res.json({ success: 'Projeto criado com sucesso' });
        }
    }
    catch (error) {
        console.log('Erro ao criar projeto:', error);
        return res.status(500).json({ Server: 'Erro interno do servidor' });
    }
});
exports.addProject = addProject;
