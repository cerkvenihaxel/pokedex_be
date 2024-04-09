import { Router, Request, Response } from "express";
import * as pokemonController from "../../controllers/pokemon.controller";

const route = Router();


export default (app: Router) => {
    app.use('/pokemon', route);

    route.get('/', (req: Request, res: Response) => {
        res.send('Hello, Pokemon!');
    });

    // Get all Pokemon
    route.get('/list', async (req: Request, res: Response) => {
        try {
            const pokemon = await pokemonController.getPokemon();
            res.send(pokemon);
        } catch (error) {
            res.status(500).send('Error retrieving Pokemon data');
        }
    });

    // Get Pokemon by ID
    route.get('/:id', async (req: Request, res: Response) => {
        try {
            const pokemon = await pokemonController.getPokemonById(parseInt(req.params.id));
            res.send(pokemon);
        } catch (error) {
            res.status(500).send('Error retrieving Pokemon data');
        }
    });

    // Get Pokemon by Name
    
    
}