"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projects = __importStar(require("../controller/projects.controller"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
//Multer
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const absolutePath = path_1.default.join(__filename, '..', '..', '..', 'public', 'myprojects');
        cb(null, absolutePath);
    },
    filename: (req, file, cb) => {
        let randomNamePhoto = Math.floor(Math.random() * 9999999);
        cb(null, file.fieldname + randomNamePhoto + Date.now() + '.jpg');
    }
});
const upload = (0, multer_1.default)({
    storage,
    //Filter
    fileFilter: (req, file, cb) => {
        const allowed = ['image/jpg', 'image/jpeg', 'image/png'];
        if (allowed.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(null, false);
            return;
        }
    }
});
const router = (0, express_1.Router)();
//Projects
router.get('/', projects.getProjects);
router.get('/:slug', projects.descProject);
router.post('/add', upload.single('photo'), projects.addProject);
exports.default = router;
