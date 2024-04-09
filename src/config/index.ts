import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV ?? 'development';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {

    port: process.env.PORT ?? 3000,
    
    logs: {
        level: process.env.LOG_LEVEL ?? 'silly',
    },

    jwtSecret: process.env.JWT_SECRET,
    jwtAlgorithm: process.env.JWT_ALGO,
    
    api: {
        prefix: '/api',
    },
    
    pokeApi: {
        url: process.env.POKEMON_API_URL,
    },
    

}