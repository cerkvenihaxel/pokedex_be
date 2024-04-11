import { Router, Request, Response } from "express";
import * as pokemonController from "../../controllers/pokemon.controller";

const route = Router();

/**
 * Registers the Pokemon routes on the provided Express app.
 * @param app The Express app.
 */
export default (app: Router) => {
    app.use('/pokemon', route);

    /**
     * GET /api/pokemon
     * Returns a greeting message.
     */
    route.get('/', (req: Request, res: Response) => {
        res.send('Gotta Catch em all!');
    });

    /**
     * GET /api/pokemon/list
     * Returns a list of Pokemon based on the provided query parameters.
     * @queryParam {string} name - The name of the Pokemon.
     * @queryParam {string} type - The type of the Pokemon.
     * @queryParam {number} offset - The offset for pagination.
     * @queryParam {number} limit - The maximum number of Pokemon to return.
     * @response {Array} - An array of Pokemon objects.
     */
    route.get('/list', async (req: Request, res: Response) => {
        try {
            const name = req.query.name as string | undefined;
            const type = req.query.type as string | undefined;
            const offset = req.query.offset as number | undefined;
            const limit = req.query.limit as number | undefined;
            const pokemon = await pokemonController.getAllPokemon(name, type, offset, limit);
            res.send(pokemon);
        } catch (error) {
            res.status(500).send('Error retrieving Pokemon data');
        }
    });

    /**
     * GET /api/pokemon/:id
     * Returns a Pokemon object based on the provided ID.
     * @param {number} id - The ID of the Pokemon.
     * @response {Object} - The Pokemon object.
     */
    route.get('/:id', async (req: Request, res: Response) => {
        try {
            const pokemon = await pokemonController.getPokemonById(parseInt(req.params.id));
            res.send(pokemon);
        } catch (error) {
            res.status(500).send('Error retrieving Pokemon data');
        }
    });

    /**
     * GET /api/pokemon/name/:name
     * Returns a Pokemon object based on the provided name.
     * @param {string} name - The name of the Pokemon.
     * @response {Object} - The Pokemon object.
     */
    route.get('/name/:name', async (req: Request, res: Response) => {
        try {
            const pokemon = await pokemonController.getPokemonByName(req.params.name);
            res.send(pokemon);
        } catch (error) {
            res.status(500).send('Error retrieving Pokemon data');
        }
    });
}


/** 
 * @swagger
 * 
 * /api/pokemon:
 *   get:
 *     summary: Returns a greeting message.
 *     responses:
 *       200:
 *         description: A greeting message.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 * 
 * /api/pokemon/list:
 *   get:
 *     summary: Returns a list of Pokemon based on the provided query parameters.
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: The name of the Pokemon.
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: The type of the Pokemon.
 *       - in: query
 *         name: offset
 *         schema:
 *           type: number
 *         description: The offset for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         description: The maximum number of Pokemon to return.
 *     responses:
 *       200:
 *         description: A list of Pokemon objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pokemon'
 * 
 * /api/pokemon/{id}:
 *   get:
 *     summary: Returns a Pokemon object based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The ID of the Pokemon.
 *     responses:
 *       200:
 *         description: A Pokemon object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pokemon'
 * 
 * /api/pokemon/name/{name}:
 *   get:
 *     summary: Returns a Pokemon object based on the provided name.
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the Pokemon.
 *     responses:
 *       200:
 *         description: A Pokemon object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pokemon'
 * 
 * components:
 *   schemas:
 *     Pokemon:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         name:
 *           type: string
 *         type:
 *           type: string
 *         abilities:
 *           type: array
 *           items:
 *             type: string
 */