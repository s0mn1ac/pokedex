import { PokemonType } from './pokemon-type.model';

export class Pokemon {
    id: number;
    name: string;
    image: string;
    types: PokemonType[];
}
