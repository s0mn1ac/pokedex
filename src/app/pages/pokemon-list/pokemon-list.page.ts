import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar } from '@ionic/angular';
import { PokedexData, Result } from 'src/app/shared/models/pokedex-data.model';
import { PokemonInfo } from 'src/app/shared/models/pokemon-info.model';
import { Pokemon } from 'src/app/shared/models/pokemon.model';
import { PokemonService } from 'src/app/shared/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.page.html',
  styleUrls: ['./pokemon-list.page.scss'],
})
export class PokemonListPage implements OnInit {

  @ViewChild('customSearchbar') customSearchbar: IonSearchbar;

  public allAvailablePokemon: PokemonInfo[] = [];
  public displayedPokemon: PokemonInfo[] = [];

  public counter = 0;

  public isSpinnerEnabled: boolean;
  public isSearchbarVisible: boolean;

  private results: Result[] = [];

  constructor(private pokemonService: PokemonService) { }

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

    this.allAvailablePokemon = this.pokemonService.getAllAvailablePokemon();

    if (this.allAvailablePokemon?.length !== 0) {
      this.displayedPokemon = this.allAvailablePokemon;
      this.isSpinnerEnabled = false;
      return;
    }

    await this.getPokedexData();
    await this.getAllPokemonInfo();
    await this.getAllPokemonInfo();

    this.isSpinnerEnabled = false;
  }

  private async getPokedexData(url?: string): Promise<void> {
    const pokedexData: PokedexData = await this.pokemonService.getPokedexData(url);
    this.results = this.results.concat(pokedexData.results);
    if (pokedexData?.next != null) {
      await this.getPokedexData(pokedexData?.next);
    }
  }

  private async getAllPokemonInfo(): Promise<void> {
    const promises: Promise<PokemonInfo>[] = this.results?.map((result: Result) => this.pokemonService.getPokemonInfoByUrl(result.url));
    this.allAvailablePokemon = await Promise.all(promises);
    this.updatePokemonInfo();
    this.displayedPokemon = this.allAvailablePokemon;
    this.pokemonService.setAllAvailablePokemon(this.allAvailablePokemon);
  }

  private updatePokemonInfo(): void {
    this.allAvailablePokemon?.forEach((pokemonInfo: PokemonInfo) => {
      const preEvolution: PokemonInfo = this.allAvailablePokemon?.find((pokemonToFind: PokemonInfo) =>
        pokemonToFind.name === pokemonInfo.evolvesFrom);
      if (preEvolution != null) {
        preEvolution.evolvesTo.push(pokemonInfo.name);
      }
    });
  }

}
