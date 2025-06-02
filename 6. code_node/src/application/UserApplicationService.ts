import { UserPort } from "../domain/UserPort";
import { User } from "../domain/User"

export class UserApplicationService {
    //declarar atributos o propiedades
    private userPort: UserPort;
   //Constructor
   //inicializar las propiedades
    constructor(port:UserPort){
        this.userPort = port;
    }
    //Métodos-> no tienen que tener el mismo nombre que los del puerto
    async createUser(user: Omit<User, "id">): Promise<number> {
        const existingUser = await this.userPort.getUserByEmail(user.email);
      if (!existingUser) {
        return this.userPort.createUser(user);
      } 
      throw new Error("User already exists");
    }

    async getUserById(id: number): Promise<User | null> {
        return await this.userPort.getUserById(id);
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await this.userPort.getUserByEmail(email);
    }

    async getAllUsers(): Promise<User[]> {
        return await this.userPort.getAllUsers();
    }

    async updateUser(id: number, user: Partial<User>): Promise<boolean> {
        const existingUser = await this.userPort.getUserById(id);
        if (!existingUser) {
            throw new Error("User not found");
        }
        if (user.email){
            const emailTaken = await this.userPort.getUserByEmail(user.email);
            if (emailTaken && emailTaken.id !== id) {
                throw new Error("Email already taken");
            }
        }
        return await this.userPort.updateUser(id, user);
    }

    async deleteUser(id: number): Promise<boolean> {
        return await this.userPort.deleteUser(id);
    }
}