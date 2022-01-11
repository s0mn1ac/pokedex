import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route } from '@angular/router';
import { PokemonInfo } from 'src/app/shared/models/pokemon-info.model';
import { Pokemon } from 'src/app/shared/models/pokemon.model';
import { PokemonInfoService } from './pokemon-info.service';

@Component({
  selector: 'app-pokemon-info',
  templateUrl: './pokemon-info.page.html',
  styleUrls: ['./pokemon-info.page.scss'],
})
export class PokemonInfoPage implements OnInit {

  public pokemonInfo: PokemonInfo;

  public isSpinnerEnabled: boolean;

  constructor(private activatedRoute: ActivatedRoute, private okemonInfoService: PokemonInfoService) { }

  ngOnInit() {
    this.initParamsSubscription();
  }

  private initParamsSubscription(): void {
    this.activatedRoute.params.subscribe((params: Params) => this.getPokemon(params?.id));
  }

  private async getPokemon(id: number): Promise<void> {
    this.isSpinnerEnabled = true;
    this.pokemonInfo = await this.okemonInfoService.getPokemonInfo(id);
    this.isSpinnerEnabled = false;
  }

}
