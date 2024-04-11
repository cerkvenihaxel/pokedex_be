import swaggerJsdoc from 'swagger-jsdoc';
import {version} from '../../package.json';
import path from 'path';


const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Pokedexel API Documentation',
            version,
            description:
                'This is a simple express APP for the Pokedexel API',
            license: {
                name: 'MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            }, 
            contact: {
                name: 'Axel Cerkvenih',
                url: 'https://axelcrkv.dev.ar',
            },
        },
    },
    apis: [`${path.join(__dirname, '../api/routes')}/*`],
};

const swaggerDocs = swaggerJsdoc(options);


export default swaggerDocs;