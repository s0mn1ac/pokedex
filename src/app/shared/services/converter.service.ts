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
        pokemon.sprites = this.getPokemonSprites(report?.sprites);
        pokemon.image = pokemon.sprites.officialArtwork;
        pokemon.types = this.getTypes(report?.types);
        pokemon.color = this.getPokemonColorByMainType(pokemon.types);

        return pokemon;
    }

    public convertPokemonInfoFromReport(report: any): PokemonInfo {

        console.log(report);

        const pokemonInfo: PokemonInfo = new PokemonInfo();

        pokemonInfo.id = report?.id;
        pokemonInfo.name = report?.name;
        pokemonInfo.sprites = this.getPokemonSprites(report?.sprites);
        pokemonInfo.image = pokemonInfo.sprites.officialArtwork;
        pokemonInfo.types = this.getTypes(report?.types);
        pokemonInfo.color = this.getPokemonColorByMainType(pokemonInfo.types);
        pokemonInfo.height = (report?.height / 10);
        pokemonInfo.weight = (report?.weight / 10);

        return pokemonInfo;
    }

    private getTypes(rawTypes: any[]): PokemonType[] {
        return rawTypes.map((rawType: any) => ({
            id: rawType?.slot,
            type: PokemonTypeEnum[rawType?.type?.name as keyof typeof PokemonTypeEnum]
        }));
    }

    private getPokemonSprites(rawSprites: any): PokemonSprites {
        const pokemonSprites: PokemonSprites = new PokemonSprites();
        pokemonSprites.officialArtwork = rawSprites.other?.['official-artwork'].front_default;
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

    private getPokemonColorByMainType(pokemonTypes: PokemonType[]): string {

        const mainType: PokemonTypeEnum = pokemonTypes[0].type;

        switch (mainType) {
            case (PokemonTypeEnum.normal):
                return '#DFDECE';
            case (PokemonTypeEnum.fighting):
                return '#EA9C99';
            case (PokemonTypeEnum.flying):
                return '#F1EDFD';
            case (PokemonTypeEnum.poison):
                return '#D897D7';
            case (PokemonTypeEnum.ground):
                return '#F5EACC';
            case (PokemonTypeEnum.rock):
                return '#E8DEB0';
            case (PokemonTypeEnum.bug):
                return '#E5F094';
            case (PokemonTypeEnum.ghost):
                return '#C0B1D2';
            case (PokemonTypeEnum.steel):
                return '#DBDBE6';
            case (PokemonTypeEnum.fire):
                return '#F9D2B4';
            case (PokemonTypeEnum.water):
                return '#B5CAF8';
            case (PokemonTypeEnum.grass):
                return '#D1EBC1';
            case (PokemonTypeEnum.electric):
                return '#FBE89D';
            case (PokemonTypeEnum.psychic):
                return '#FDC4D5';
            case (PokemonTypeEnum.ice):
                return '#D2EFED';
            case (PokemonTypeEnum.dragon):
                return '#C5AFFE';
            case (PokemonTypeEnum.dark):
                return '#C8B4A7';
            case (PokemonTypeEnum.fairy):
                return '#EBC2D6';
            case (PokemonTypeEnum.shadow):
                return '#CCCCCC';
            case (PokemonTypeEnum.unknown):
                return '#CCCCCC';
            default:
                return '#CCCCCC';
        }
    }

}
