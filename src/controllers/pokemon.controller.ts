// pokemon.controller.ts
import axios from 'axios';
import config from "../config";
import { Pokemon } from '../interfaces/Pokemon';

export async function getPokemon() {
    const url = config.pokeApi.url;
    const response = await axios.get(`${url}/pokemon`);
    return response.data;
}

export async function getPokemonById(id: number): Promise<Pokemon> {
    const url = config.pokeApi.url;
    const response = await axios.get(`${url}/pokemon/${id}`);
    const pokeData = response.data;
    const pokemon = pokeConstructor(pokeData);
    return pokemon;
}



// Pokemon constructor 

function pokeConstructor(pokeData: any){
    const pokeConstructed: Pokemon = {
        id: pokeData.id,
        name: pokeData.name,
        order: pokeData.order,
        species: pokeData.species,
        types: pokeData.types,
        abilities: pokeData.abilities,
        officialArtwork: pokeData.sprites.other['official-artwork'].front_default,
        stats: pokeData.stats,
        height: pokeData.height,
        weight: pokeData.weight
    };
    return pokeConstructed;
}