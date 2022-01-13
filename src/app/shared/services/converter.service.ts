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

    public convertPokemonInfoFromReport(infoReport: any, speciesReport: any, evolutionChainReport: any): PokemonInfo {

        console.log(infoReport);
        console.log(speciesReport);
        console.log(evolutionChainReport);

        const pokemonInfo: PokemonInfo = new PokemonInfo();

        pokemonInfo.id = infoReport?.id;
        pokemonInfo.name = infoReport?.name;
        pokemonInfo.sprites = this.getPokemonSprites(infoReport?.sprites);
        pokemonInfo.image = pokemonInfo.sprites.officialArtwork;
        pokemonInfo.types = this.getTypes(infoReport?.types);
        pokemonInfo.color = this.getPokemonColorByMainType(pokemonInfo.types);
        pokemonInfo.height = (infoReport?.height / 10);
        pokemonInfo.weight = (infoReport?.weight / 10);
        pokemonInfo.order = this.getOrderOnNationalDex(speciesReport?.pokedex_numbers);
        pokemonInfo.genera = this.getPokemonGenera(speciesReport?.genera);
        pokemonInfo.description = this.getPokemonDescription(speciesReport?.flavor_text_entries);

        return pokemonInfo;
    }

    private getTypes(rawTypes: any[]): PokemonType[] {
        return rawTypes.map((rawType: any) => ({
            id: rawType?.slot,
            type: PokemonTypeEnum[rawType?.type?.name as keyof typeof PokemonTypeEnum],
            color: this.getPokemonTypeColor(PokemonTypeEnum[rawType?.type?.name as keyof typeof PokemonTypeEnum])
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

    private getPokemonTypeColor(pokemonTypeEnum: PokemonTypeEnum): string {

        switch (pokemonTypeEnum) {
            case (PokemonTypeEnum.normal):
                return '#A8A77A';
            case (PokemonTypeEnum.fighting):
                return '#C22E28';
            case (PokemonTypeEnum.flying):
                return '#A98FF3';
            case (PokemonTypeEnum.poison):
                return '#A33EA1';
            case (PokemonTypeEnum.ground):
                return '#E2BF65';
            case (PokemonTypeEnum.rock):
                return '#B6A136';
            case (PokemonTypeEnum.bug):
                return '#A6B91A';
            case (PokemonTypeEnum.ghost):
                return '#735797';
            case (PokemonTypeEnum.steel):
                return '#B7B7CE';
            case (PokemonTypeEnum.fire):
                return '#EE8130';
            case (PokemonTypeEnum.water):
                return '#6390F0';
            case (PokemonTypeEnum.grass):
                return '#7AC74C';
            case (PokemonTypeEnum.electric):
                return '#F7D02C';
            case (PokemonTypeEnum.psychic):
                return '#F95587';
            case (PokemonTypeEnum.ice):
                return '#96D9D6';
            case (PokemonTypeEnum.dragon):
                return '#6F35FC';
            case (PokemonTypeEnum.dark):
                return '#705746';
            case (PokemonTypeEnum.fairy):
                return '#D685AD';
            case (PokemonTypeEnum.shadow):
                return '#000000';
            case (PokemonTypeEnum.unknown):
                return '#000000';
            default:
                return '#000000';
        }
    }

    private getOrderOnNationalDex(pokedexNumbers: any[]): number {
        const pokedexNumber: any =  pokedexNumbers?.find((pokedexEntry: any) => pokedexEntry?.pokedex?.name === 'national');
        return pokedexNumber?.entry_number;
    }

    private getPokemonGenera(pokemonGeneras: any[]): string {
        const pokemonGenera: any =  pokemonGeneras?.find((genera: any) => genera?.language?.name === 'es');
        return pokemonGenera?.genus;
    }

    private getPokemonDescription(pokemonDescriptions: any[]): string {
        const descriptions: any[] = pokemonDescriptions?.filter((pokemonDescription: any) => pokemonDescription?.language?.name === 'es');
        return descriptions?.pop()?.flavor_text;
    }

}
