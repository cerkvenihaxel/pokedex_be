// pokemon.controller.ts
import axios from 'axios';
import config from "../config";
import { Pokemon, PokemonList } from '../interfaces/Pokemon';



export async function getAllPokemon(name?: string, type?: string, offset?: number, limit?:number): Promise<Pokemon[]> {
    let list: PokemonList = await getPokemon(offset, limit);
    const pokemonPromises = list.results.map(pokemon => getPokemonById(getPokemonIdFromUrl(pokemon.url)));
    const pokemons = await Promise.all(pokemonPromises);

    if (name) {
        return pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(name.toLowerCase()));
    }
    else if(type){
        return pokemons.filter(pokemon => pokemon.types.some(t => t.type.name.toLowerCase().includes(type.toLowerCase())));
    }
    return pokemons;
}

// Get all pokemon logic
export async function getPokemon(offset?: number, limit?:number): Promise<PokemonList> {
    const url = config.pokeApi.url;
    limit = limit ?? 9;
    offset = offset ?? 0;
    const response = await axios.get(`${url}/pokemon?limit=${limit}&offset=${offset}`);
    return response.data as PokemonList;
}

function getPokemonIdFromUrl(url: string): number {
    const idMatch = RegExp(/\/(\d+)\/$/).exec(url);
    if (idMatch) {
        return parseInt(idMatch[1]);
    } else {
        throw new Error('URL de Pokémon inválida');
    }
}

export async function getPokemonByListUrl(listUrl: string): Promise<Pokemon> {
    const id = getPokemonIdFromUrl(listUrl);
    return await getPokemonById(id);
}

// Get pokemon by ID 
export async function getPokemonById(id: number): Promise<Pokemon> {
    const url = config.pokeApi.url;
    const response = await axios.get(`${url}/pokemon/${id}`);
    const responseFlavor = await axios.get(`${url}/pokemon-species/${id}`);
    const pokeData = {
        ...response.data,
        description: responseFlavor.data.flavor_text_entries[1].flavor_text
    };
    const pokemon = pokeConstructor(pokeData);
    return pokemon;
}

// Get Pokemon by Name
export async function getPokemonByName(name: string):Promise<Pokemon> {
    const url = config.pokeApi.url;
    const response = await axios.get(`${url}/pokemon/${name}`);
    const pokeData = response.data;
    const pokemon = pokeConstructor(pokeData);
    return pokemon;
}


// Pokemon constructor by ID
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
        weight: pokeData.weight,
        description: pokeData.description
    };
    return pokeConstructed;
}