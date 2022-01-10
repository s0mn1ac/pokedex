import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route } from '@angular/router';
import { Pokemon } from 'src/app/shared/models/pokemon.model';
import { PokemonListService } from '../pokemon-list/pokemon-list.service';

@Component({
  selector: 'app-pokemon-info',
  templateUrl: './pokemon-info.page.html',
  styleUrls: ['./pokemon-info.page.scss'],
})
export class PokemonInfoPage implements OnInit {

  public pokemon: Pokemon;

  public isSpinnerEnabled: boolean;

  constructor(private activatedRoute: ActivatedRoute, private pokemonListService: PokemonListService) { }

  ngOnInit() {
    this.initParamsSubscription();
  }

  private initParamsSubscription(): void {
    this.activatedRoute.params.subscribe((params: Params) => this.getPokemon(params?.id));
  }

  private async getPokemon(id: number): Promise<void> {
    this.isSpinnerEnabled = true;
    this.pokemon = await this.pokemonListService.getPokemon(`https://pokeapi.co/api/v2/pokemon/${id}`);
    this.isSpinnerEnabled = false;
  }

}
