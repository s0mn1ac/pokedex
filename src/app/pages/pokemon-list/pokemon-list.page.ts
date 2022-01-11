import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar } from '@ionic/angular';
import { PokedexData, Result } from 'src/app/shared/models/pokedex-data.model';
import { Pokemon } from 'src/app/shared/models/pokemon.model';
import { PokemonListService } from './pokemon-list.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.page.html',
  styleUrls: ['./pokemon-list.page.scss'],
})
export class PokemonListPage implements OnInit {

  @ViewChild('customSearchbar') customSearchbar: IonSearchbar;

  public allAvailablePokemon: Pokemon[] = [];
  public displayedPokemon: Pokemon[] = [];

  public counter = 0;

  public isSpinnerEnabled: boolean;
  public isSearchbarVisible: boolean;

  private results: Result[] = [];

  constructor(private pokemonListService: PokemonListService) { }

  ngOnInit() {
    this.initPokedex();
  }

  public showSearchbar() {
    this.isSearchbarVisible = true;
    setTimeout(() => this.customSearchbar.setFocus(), 1);
  }

  public hideSearchbar() {
    this.isSearchbarVisible = false;
    this.displayedPokemon = this.allAvailablePokemon;
  }

  public onSearch(event: any): void {
    const value: string = event?.target?.value;
    this.displayedPokemon = this.allAvailablePokemon.filter((pokemon: Pokemon) => pokemon.name.startsWith(value));
  }

  private async initPokedex(): Promise<void> {

    this.isSpinnerEnabled = true;

    this.allAvailablePokemon = JSON.parse(localStorage.getItem('allPokemon')) ?? [];

    if (this.allAvailablePokemon?.length !== 0) {
      this.displayedPokemon = this.allAvailablePokemon;
      this.isSpinnerEnabled = false;
      return;
    }

    await this.getPokedexData();
    await this.getAllPokemon();

    this.isSpinnerEnabled = false;
  }

  private async getPokedexData(url?: string): Promise<void> {
    const pokedexData: PokedexData = await this.pokemonListService.getPokedexData(url);
    this.results = this.results.concat(pokedexData.results);
    if (pokedexData?.next != null) {
      await this.getPokedexData(pokedexData?.next);
    }
    // if (pokedexData?.next != null && this.counter < 5) {
    //   this.counter = this.counter + 1;
    //   await this.getPokedexData(pokedexData?.next);
    // }
  }

  private async getAllPokemon(): Promise<void> {
    const promises: Promise<Pokemon>[] = this.results?.map((result: Result) => this.pokemonListService.getPokemon(result.url));
    this.allAvailablePokemon = await Promise.all(promises);
    this.displayedPokemon = this.allAvailablePokemon;
    localStorage.setItem('allPokemon', JSON.stringify(this.allAvailablePokemon));
  }

}
