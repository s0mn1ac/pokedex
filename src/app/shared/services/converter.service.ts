import { Injectable } from '@angular/core';
import { PokemonTypeEnum } from '../enums/pokemon-type.enum';
import { PokedexData } from '../models/pokedex-data.model';
import { PokemonInfo } from '../models/pokemon-info.model';
import { PokemonSprites } from '../models/pokemon-sprites.model';
import { PokemonType } from '../models/pokemon-type.model';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
    providedIn: 'root'
})
export class ConverterService {

    public convertPokedexDataFromReport(report: any): PokedexData {

        const pokedexData: PokedexData = new PokedexData();

        pokedexData.next = report?.next;
        pokedexData.results = report?.results;

        return pokedexData;
    }

    public convertPokemonFromReport(report: any): Pokemon {

        const pokemon: Pokemon = new Pokemon();

        pokemon.id = report?.id;
        pokemon.name = report?.name;
        pokemon.image = report?.sprites?.other?.['official-artwork'].front_default;
        pokemon.types = this.getTypes(report?.types);

        return pokemon;
    }

    public convertPokemonInfoFromReport(report: any): PokemonInfo {

        console.log(report);

        const pokemonInfo: PokemonInfo = new PokemonInfo();

        pokemonInfo.id = report?.id;
        pokemonInfo.name = report?.name;
        pokemonInfo.image = report?.sprites?.other?.['official-artwork'].front_default;
        pokemonInfo.types = this.getTypes(report?.types);
        pokemonInfo.sprites = this.getPokemonSprites(report?.sprites);
        pokemonInfo.height = (report?.height / 10);
        pokemonInfo.weight = (report?.weight / 10);

        return pokemonInfo;
    }

    private getTypes(rawTypes: any[]): PokemonType[] {
        return rawTypes.map((rawType: any) => (
            { id: rawType?.slot, type: PokemonTypeEnum[rawType?.type?.name as keyof typeof PokemonTypeEnum] }
        ));
    }

    private getPokemonSprites(rawSprites: any): PokemonSprites {
        const pokemonSprites: PokemonSprites = new PokemonSprites();
        pokemonSprites.frontDefault = rawSprites.front_default;
        pokemonSprites.backDefault = rawSprites.back_default;
        pokemonSprites.frontFemale = rawSprites.front_female;
        pokemonSprites.backFemale = rawSprites.back_female;
        pokemonSprites.frontDefaultShiny = rawSprites.front_shiny_default;
        pokemonSprites.backDefaultShiny = rawSprites.back_shiny_default;
        pokemonSprites.frontFemaleShiny = rawSprites.front_shiny_female;
        pokemonSprites.backFemaleShiny = rawSprites.back_shiny_female;
        return pokemonSprites;
    }

}
