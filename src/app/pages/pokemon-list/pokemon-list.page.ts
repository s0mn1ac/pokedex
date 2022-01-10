import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/shared/models/pokemon.model';
import { PokemonListService } from './pokemon-list.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.page.html',
  styleUrls: ['./pokemon-list.page.scss'],
})
export class PokemonListPage implements OnInit {

  public allPokemon: Pokemon[] = [];

  constructor(private pokemonListService: PokemonListService) { }

  ngOnInit() {
    this.getAllPokemon();
  }

  private async getAllPokemon(): Promise<void> {
    this.allPokemon = await this.pokemonListService.getAllPokemon();
  }

}
