import { Injectable } from '@angular/core';
import { PokemonStatEnum } from '../enums/pokemon-stat.enum';
import { PokemonTypeEnum } from '../enums/pokemon-type.enum';
import { PokedexData } from '../models/pokedex-data.model';
import { PokemonEvolutionChain } from '../models/pokemon-evolution-chain.model';
import { PokemonInfo } from '../models/pokemon-info.model';
import { PokemonSprites } from '../models/pokemon-sprites.model';
import { PokemonStat } from '../models/pokemon-stat.model';
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

    public convertPokemonFromReport(report: any, speciesReport: any): Pokemon {

        const pokemon: Pokemon = new Pokemon();

        pokemon.id = report?.id;
        pokemon.name = report?.name;
        pokemon.sprites = this.getPokemonSprites(report?.sprites);
        pokemon.image = pokemon.sprites.officialArtwork;
        pokemon.types = this.getTypes(report?.types);
        pokemon.color = this.getPokemonColorByMainType(pokemon.types);
        pokemon.order = this.getOrderOnNationalDex(speciesReport?.pokedex_numbers);

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
        pokemonInfo.stats = this.getPokemonStats(infoReport?.stats);
        pokemonInfo.evolutionChain = this.getPokemonEvolutionChain(evolutionChainReport?.chain);

        console.log(pokemonInfo);

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

    private getPokemonStats(rawPokemonStats: any[]): PokemonStat[] {

        const pokemonStats: PokemonStat[] = [];

        rawPokemonStats?.forEach((rawStat: any) => {

            const pokemonStat: PokemonStat = new PokemonStat();

            switch (rawStat?.stat?.name) {
                case 'hp':
                    pokemonStat.stat = PokemonStatEnum.hp;
                    pokemonStat.color = '#D90429';
                    break;
                case 'attack':
                    pokemonStat.stat = PokemonStatEnum.attack;
                    pokemonStat.color = '#FB5607';
                    break;
                case 'defense':
                    pokemonStat.stat = PokemonStatEnum.defense;
                    pokemonStat.color = '#FFBE0B';
                    break;
                case 'special-attack':
                    pokemonStat.stat = PokemonStatEnum.specialAttack;
                    pokemonStat.color = '#3A86FF';
                    break;
                case 'special-defense':
                    pokemonStat.stat = PokemonStatEnum.specialDefense;
                    pokemonStat.color = '#00916E';
                    break;
                case 'speed':
                    pokemonStat.stat = PokemonStatEnum.speed;
                    pokemonStat.color = '#8338EC';
                    break;
                default:
                    break;
            }

            pokemonStat.value = rawStat?.base_stat / 2;
            pokemonStats.push(pokemonStat);
        });

        return pokemonStats;
    }

    private getPokemonEvolutionChain(rawPokemonEvolutionChain: any): PokemonEvolutionChain[] {

        console.log(rawPokemonEvolutionChain);

        const pokemonEvolutionChain: PokemonEvolutionChain[] = [];

        // const pokemonEvolution: PokemonEvolutionChain = new PokemonEvolutionChain();
        // pokemonEvolution.pokemonName = rawPokemonEvolutionChain?.species?.name;

        // pokemonEvolutionChain.push(pokemonEvolution);

        // if (rawPokemonEvolutionChain?.evolves_to?.length > 0) {
        //     this.getPokemonEvolution()
        // }



        return pokemonEvolutionChain;
    }

    private getPokemonEvolution(rawPokemonEvolution): PokemonEvolutionChain {
        const pokemonEvolution: PokemonEvolutionChain = new PokemonEvolutionChain();
        // pokemonEvolution.pokemonName = rawPokemonEvolution?.species?.name;
        return pokemonEvolution;
    }

}
