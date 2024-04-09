export interface Pokemon {
    id: number;
    name: string;
    order: number;
    species: {
        name: string;
        url: string;
    };
    types: {
        type: {
            name: string;
            url: string;
        }
    }[];
    abilities: {
        ability: {
            name: string;
        }
    }[];
    officialArtwork: {
        front_default: string;
    };
    stats : {
        base_stat: number;
        effort: number;
        stat: {
            name: string;
        }
    }[];
    height: number;
    weight: number;
    
}