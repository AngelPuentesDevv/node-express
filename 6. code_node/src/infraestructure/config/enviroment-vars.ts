/*
Este módulo se encarga de:
    Cargar variables de entorno desde un archivo .env usando dotenv.
    Validarlas con joi para asegurarse de que tengan los formatos esperados.
    Exportarlas como un objeto tipado para su uso en la aplicación.

*/
import * as joi from 'joi';
import "dotenv/config";

//ReturnEnvironmentVars: Define el tipo de las variables de entorno que la aplicación utilizará.
export type ReturnEnvironmentVars = {
    PORT: number;
    
}
/**
 * ValidationEnvironmentVars: Estructura que almacena el resultado de la validación de las variables de entorno.
 */

type ValidationEnvironmentVars = {
    error: joi.ValidationError | undefined;
    value: ReturnEnvironmentVars;
}

function validateEnvVars(vars:NodeJS.ProcessEnv):ValidationEnvironmentVars{
    const envSchema = joi.object({
        PORT: joi.number().required()
    }).unknown(true);
    const { error, value } = envSchema.validate(vars);

    return {error,value}
}

const loadEnvVars = (): ReturnEnvironmentVars => {
    const result = validateEnvVars(process.env);
    if(result.error){
        throw new Error(`Error validating environment variables: ${result.error.message}`); 

    }
    const value = result.value;
    return {
        PORT: value.PORT
    }
}
const envs = loadEnvVars();
export default envs;