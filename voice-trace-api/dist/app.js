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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("./User"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.listen(3000, () => {
    console.log("j'écoute sur le port 3000");
});
mongoose_1.default.connect("mongodb+srv://rimmazz:PASsw@cluster0.gmr2pwc.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
    console.log(" j'arrive à bien établir une connexion et à me lier avec le serveur de base de données.");
})
    .catch((error) => {
    console.error(" je n'arrive pas à me lier avec le serveur de base de données", error);
});
app.post("/createUser/:role/:firstname/:lastname/:email/:password", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = new User_1.default({
            firstname: req.params.firstname,
            lastname: req.params.lastname,
            email: req.params.email,
            password: req.params.password,
            role: req.params.role,
        });
        yield newUser.save();
        console.log("un user cree avec succes");
        res.json(newUser);
        return;
    }
    catch (error) {
        console.log("erreur lors de la creation de user", error);
        res.send("erreur lors de la creation de user");
        return;
    }
}));
app.get("/getAllEmployees", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield User_1.default.find({ role: 'employee' });
        res.json(employees);
        return;
    }
    catch (error) {
        console.log("erreur lors de la recuperation des employees ", error);
        res.send("erreur lors de la recuperation des employees ");
        return;
    }
}));
app.get("/getSpecificEmployees/:firstname", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const firstname = req.params.firstname;
        const employees = yield User_1.default.find({ firstname, role: 'employee' });
        if (employees.length === 0) {
            res.json({ message: "Aucun employé trouvé avec ce prénom." });
            return;
        }
        res.json(employees);
        return;
    }
    catch (error) {
        console.log("erreur lors de la recuperation des employees ", error);
        res.send("erreur lors de la recuperation des employees ");
        return;
    }
}));
app.get("/getAdmin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield User_1.default.find({ role: 'admin' });
        res.json(admin);
        return;
    }
    catch (error) {
        console.log("erreur lors de la recuperation de l admin ", error);
        res.send("erreur lors de la recuperation de l admin ");
        return;
    }
}));
