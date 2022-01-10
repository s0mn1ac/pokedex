import { Component, OnInit } from '@angular/core';
import { PokedexData, Result } from 'src/app/shared/models/pokedex-data.model';
import { Pokemon } from 'src/app/shared/models/pokemon.model';
import { PokemonListService } from './pokemon-list.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.page.html',
  styleUrls: ['./pokemon-list.page.scss'],
})
export class PokemonListPage implements OnInit {

  public allPokemon: Pokemon[] = [];

  public counter = 0;

  private results: Result[] = [];

  constructor(private pokemonListService: PokemonListService) { }

  ngOnInit() {
    this.initPokedex();
  }

  private async initPokedex(): Promise<void> {

    this.allPokemon = JSON.parse(localStorage.getItem('allPokemon')) ?? [];

    // if (this.allPokemon?.length !== 0) {
    //   return;
    // }

    await this.getPokedexData();
    await this.getAllPokemon();
  }

  private async getPokedexData(url?: string): Promise<void> {
    const pokedexData: PokedexData = await this.pokemonListService.getPokedexData(url);
    this.results = this.results.concat(pokedexData.results);
    // if (pokedexData?.next != null) {
    //   await this.getPokedexData(pokedexData?.next);
    // }
    if (pokedexData?.next != null && this.counter < 1) {
      this.counter = this.counter + 1;
      await this.getPokedexData(pokedexData?.next);
    }
  }

  private async getAllPokemon(): Promise<void> {
    const promises: Promise<Pokemon>[] = this.results?.map((result: Result) => this.pokemonListService.getPokemon(result.url));
    this.allPokemon = await Promise.all(promises);
    localStorage.setItem('allPokemon', JSON.stringify(this.allPokemon));
  }

}
