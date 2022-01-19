import { PokemonStat } from './pokemon-stat.model';
import { Pokemon } from './pokemon.model';

export class PokemonInfo extends Pokemon {
    height: number;
    weight: number;
    genera: string;
    description: string;
    stats: PokemonStat[];
}
