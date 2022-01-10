import { Injectable } from '@angular/core';
import { PokemonTypeEnum } from '../enums/pokemon-type.enum';
import { PokedexData } from '../models/pokedex-data.model';
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

    private getTypes(rawTypes: any[]): PokemonType[] {
        return rawTypes.map((rawType: any) => (
            { id: rawType?.slot, type: PokemonTypeEnum[rawType?.type?.name as keyof typeof PokemonTypeEnum] }
        ));
    }

}
