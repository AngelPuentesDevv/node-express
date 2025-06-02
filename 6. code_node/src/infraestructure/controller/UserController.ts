import { UserApplicationService } from "../../application/UserApplicationService";
import { User } from "../../domain/User"
import { Request, Response } from "express";

export class UserController {
    private app: UserApplicationService;

    constructor(app: UserApplicationService) {
        this.app = app;
    }

    async createUser(req: Request, res: Response) {
        try {
            const { name, email, password, status } = req.body;
            //Validación con regex
            if(!/^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñ]+)?$/.test(name.trim()))  
                return res.status(400).json({
            error: "El nombre debe contener solo letras y espacios, sin números ni caracteres especiales"});  
        } catch (error) {

        }
    }
}