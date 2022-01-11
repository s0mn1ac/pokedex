import { PokemonSprites } from './pokemon-sprites.model';
import { PokemonType } from './pokemon-type.model';
import { Pokemon } from './pokemon.model';

export class PokemonInfo extends Pokemon {
    sprites: PokemonSprites;
    height: number;
    weight: number;
}
