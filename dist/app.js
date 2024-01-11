"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.ts
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 5500;
app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
