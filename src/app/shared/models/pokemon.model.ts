import { PokemonSprites } from './pokemon-sprites.model';
import { PokemonType } from './pokemon-type.model';

export class Pokemon {
    id: number;
    name: string;
    sprites: PokemonSprites;
    image: string;
    types: PokemonType[];
    color: string;
}
