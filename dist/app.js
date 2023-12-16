"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_routes_1 = __importDefault(require("./src/routes/login.routes"));
const projects_routes_1 = __importDefault(require("./src/routes/projects.routes"));
const blog_routes_1 = __importDefault(require("./src/routes/blog.routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
require('dotenv').config();
const app = (0, express_1.default)();
const port = process.env.PORT;
// Configuração do CORS
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 200,
};
//Public
app.use(express_1.default.static(path_1.default.join(__dirname, './public')));
app.use((0, cors_1.default)());
//Body Parser
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
//Rotas
//Home
app.use('/', login_routes_1.default);
//Project
app.use('/project', projects_routes_1.default);
//Blog
app.use('/blog', blog_routes_1.default);
//Para rotas não encotradas
app.use((req, res) => {
    res.status(404).send('Pagina não encontrada');
});
app.listen(port, () => console.log(`Servidor rodando na porta : ${port}!`));
