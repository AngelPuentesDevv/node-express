import { User as UserDomain } from "../../domain/User"; //Modelo de DOminio
import { User as UserEntity} from "../entities/User";
import { UserPort } from "../../domain/UserPort";
import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-base";

export class UserAdapter implements UserPort {
    
    //declarar atributos o propiedades
    private userRepository: Repository<UserEntity>;

    constructor(){
        this.userRepository = AppDataSource.getRepository(UserEntity);
    }
  //Transforma la entidad de infraestructura(entidad User.ts) al modelo de dominio (interface User.ts)
  private toDomain(user: UserEntity): UserDomain {
    return {
      id: user.id_user,
      name: user.name_user,
      email: user.email_user,
      password: user.password_user,
      status: user.status_user
    };
  }
  //Transforma el modelo de dominio a la entidad de infraestructura
  private toEntity(user: Omit<UserDomain, "id">): UserEntity {
    const userEntity = new UserEntity();
    userEntity.name_user = user.name;
    userEntity.email_user = user.email;
    userEntity.password_user = user.password;
    userEntity.status_user = user.status;
    return userEntity;
  }

  async createUser(user: Omit<UserDomain, "id">): Promise<number> {
    try {
        const newUser = this.toEntity(user);
        const savedUser = await this.userRepository.save(newUser);
        return savedUser.id_user; 
    }  catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Error creating user");
    }
  }
    
    updateUser(id: number, user: Partial<UserDomain>): Promise<boolean> {
        try {
            const existingUser = await this.userRepository.findOne({ where: {id_user:id}});
            if (!existingUser) return false;
            Object.assign(existingUser,{
                name_user: user.name ?? existingUser.name_user,
                email_user: user.email ?? existingUser.email_user.
                password_user: user.password ?? existingUser.password_user,
                status_user: user.status ?? existingUser.status_user
            });
            await this.userRepository.save(existingUser);
            return true;
        } catch (error) {
            console.error("Error updating user:", error);
            throw new Error("Error updating user");
        }
    }
    deleteUser(id: number): Promise<boolean> {
        try {
            const existingUser = await this.userRepository.findOne({ where: {id_user:id}});
            if (!existingUser) return false;
            Object.assign(existingUser,{
                status_user: 0,
            });
            await this.userRepository.save(existingUser);
            return true;
        } catch (error) {
            console.error("Error deleting user:", error);
            throw new Error("Error deleting user");
        }
    }
    getUserById(id: number): Promise<UserDomain | null> {
        try {
            const user = await this.userRepository.findOne({ where: { id_user: id}});
            return user ? this.toDomain(user) : null;
        } catch (error) {
            console.error("Error getting user by ID:", error);
            throw new Error("Error getting user by ID");
        }
    }

    getUserByEmail(email: string): Promise<UserDomain | null> {
        try {
            const user = await this.userRepository.findOne({ where: { email_user : email }});
            return user ? this.toDomain(user) : null;
        } catch (error) {
            console.error("Error getting user by email:", error);
            throw new Error("Error getting user by email");
        }
    }
    
    getAllUsers(): Promise<UserDomain[]> {
        try {
            const user = await this.userRepository.find();
            return this.user.map(this.toDomain);
        } catch (error) {
            console.error("Error getting all users:", error);
            throw new Error("Error getting all users");
        }
    }
 

}