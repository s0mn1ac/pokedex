import { PokemonType } from '../enums/pokemon-type.enum';

export class Pokemon {
    id: number;
    name: string;
    image: string;
    types: PokemonType[];
}
