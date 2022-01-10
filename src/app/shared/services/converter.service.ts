import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
    providedIn: 'root'
})
export class ConverterService {

    public convertAllPokemonFromReport(report: any): Pokemon[] {

        if (report?.results == null || report?.results?.length === 0) {
            return;
        }

        const allPokemon: Pokemon[] = report?.results?.map((reportItem: any) => {
            const pokemon: Pokemon = new Pokemon();
            pokemon.name = reportItem.name;
            pokemon.url = reportItem.url;
            return pokemon;
        });

        return allPokemon;
    }

}
