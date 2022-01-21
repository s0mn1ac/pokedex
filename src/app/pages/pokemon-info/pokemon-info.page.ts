import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { PokemonInfo } from 'src/app/shared/models/pokemon-info.model';
import { PokemonService } from 'src/app/shared/services/pokemon.service';

@Component({
  selector: 'app-pokemon-info',
  templateUrl: './pokemon-info.page.html',
  styleUrls: ['./pokemon-info.page.scss'],
})
export class PokemonInfoPage implements OnInit {

  public pokemonInfo: PokemonInfo;
  public allAvailablePokemon: PokemonInfo[];

  public isSpinnerEnabled: boolean;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private pokemonService: PokemonService) { }

  ngOnInit() {
    this.initParamsSubscription();
  }

  private initParamsSubscription(): void {
    this.activatedRoute.params.subscribe((params: Params) => this.getPokemonInfo(parseInt(params?.id, 10)));
  }

  private async getPokemonInfo(id: number): Promise<void> {

    this.allAvailablePokemon = this.pokemonService.getAllAvailablePokemon();
    this.pokemonInfo = this.allAvailablePokemon?.find((pokemonInfo: PokemonInfo) => pokemonInfo.id === id);

    if (this.pokemonInfo != null) {
      return;
    }

    this.router.navigate(['/']);
  }

}
