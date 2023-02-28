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
exports.parseForm = exports.FormidableError = void 0;
const mime_1 = require("mime");
const path_1 = require("path");
const dateFn = __importStar(require("date-fns"));
const formidable_1 = __importDefault(require("formidable"));
const promises_1 = require("fs/promises");
exports.FormidableError = formidable_1.default.errors.FormidableError;
const parseForm = (req) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const uploadDir = (0, path_1.join)(process.env.ROOT_DIR || process.cwd(), `/uploads/${dateFn.format(Date.now(), "dd-MM-Y")}`);
        try {
            yield (0, promises_1.stat)(uploadDir);
        }
        catch (e) {
            if (e.code === "ENOENT") {
                yield (0, promises_1.mkdir)(uploadDir, { recursive: true });
            }
            else {
                console.error(e);
                reject(e);
                return;
            }
        }
        const form = (0, formidable_1.default)({
            maxFiles: 2,
            maxFileSize: 1024 * 1024,
            uploadDir,
            filename: (_name, _ext, { name = "unknown", mimetype = "" }) => {
                const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                const filename = `${name}-${uniqueSuffix}.${(0, mime_1.getExtension)(String(mimetype)) || "unknown"}`;
                return filename;
            },
            filter: ({ name, mimetype }) => {
                return (name === "image" && ((mimetype === null || mimetype === void 0 ? void 0 : mimetype.includes("image")) || false));
            },
        });
        form.parse(req, function (err, fields, files) {
            if (err)
                reject(err);
            else
                resolve({ fields, files });
        });
    }));
});
exports.parseForm = parseForm;
