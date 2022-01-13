import { PokemonSprites } from './pokemon-sprites.model';
import { PokemonType } from './pokemon-type.model';

export class Pokemon {
    id: number;
    order: number; // TODO: ¿Cómo se usa?
    name: string;
    sprites: PokemonSprites;
    image: string;
    types: PokemonType[];
    color: string;
}
