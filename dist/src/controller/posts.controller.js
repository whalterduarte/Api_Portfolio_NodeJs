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
exports.newPost = exports.getPostInCategory = exports.getPostsByCategory = exports.getAllPosts = void 0;
const prisma_1 = __importDefault(require("../libs/prisma"));
//Get list all Posts
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield prisma_1.default.post.findMany({ orderBy: { date: 'desc' } });
        if (posts.length === 0) {
            return res
                .status(404)
                .json({ error: 'Não a nenhum post cadastrado' });
        }
        return res.json({ success: true, posts });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ server: 'Erro interno', error });
    }
});
exports.getAllPosts = getAllPosts;
//Get all posts in the category
const getPostsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.params;
        const category = yield prisma_1.default.category.findUnique({
            where: {
                name
            }
        });
        if (!category) {
            return res.status(404).json({ error: 'Categoria não encontrada' });
        }
        const posts = yield prisma_1.default.post.findMany({
            where: {
                categoryId: category.id
            },
            orderBy: { date: 'desc' }
        });
        if (posts.length === 0) {
            return res.status(404).json({ error: 'Não há nenhum post cadastrado para esta categoria' });
        }
        return res.json({ success: true, posts });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ server: 'Erro interno', error });
    }
    finally {
        yield prisma_1.default.$disconnect();
    }
});
exports.getPostsByCategory = getPostsByCategory;
//Get Post in category
const getPostInCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, slug } = req.params;
        const category = yield prisma_1.default.category.findUnique({
            where: {
                name: name,
            },
        });
        if (!category) {
            return res.status(404).json({ error: 'Categoria não encontrada' });
        }
        const post = yield prisma_1.default.post.findUnique({
            where: {
                slug: slug,
                categoryId: category.id,
            },
        });
        if (!post) {
            return res.status(404).json({ error: 'Post não encontrado nesta categoria' });
        }
        return res.json({ success: true, post });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ server: 'Erro interno', error });
    }
    finally {
        yield prisma_1.default.$disconnect();
    }
});
exports.getPostInCategory = getPostInCategory;
const newPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    //Accpts only image
    if (req.file) {
        const file = req.file;
    }
    else {
        res.status(404).json({ error: 'File not sent' });
        return;
    }
    //New Post
    try {
        const { title, slug, content, body, url, author, categoryId } = req.body;
        const photo = `${process.env.BASE}/myposts/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.filename}`;
        if (!title || !slug || !content || !body || !author || !categoryId || !photo) {
            return res.json({ Sever: 'Todos os campos são obrigatorios' });
        }
        else {
            yield prisma_1.default.post.create({
                data: {
                    title,
                    slug,
                    url: photo,
                    content,
                    body,
                    author,
                    categoryId: parseInt(categoryId, 10),
                },
            });
            return res.json({ success: 'Post criado com sucesso' });
        }
    }
    catch (error) {
        console.log('Erro ao criar post:', error);
        return res.status(500).json({ Server: 'Erro interno do servidor' });
    }
});
exports.newPost = newPost;
