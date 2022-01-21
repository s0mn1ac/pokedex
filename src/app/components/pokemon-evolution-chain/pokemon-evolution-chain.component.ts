import { Component, Input, OnInit } from '@angular/core';
import { PokemonInfo } from 'src/app/shared/models/pokemon-info.model';

@Component({
  selector: 'app-pokemon-evolution-chain',
  templateUrl: './pokemon-evolution-chain.component.html',
  styleUrls: ['./pokemon-evolution-chain.component.scss']
})
export class PokemonEvolutionChainComponent implements OnInit {

  @Input() pokemonInfo: PokemonInfo;
  @Input() allAvailablePokemon: PokemonInfo[];

  public evolutionChain: PokemonInfo[];

  ngOnInit(): void {
    console.log(this.pokemonInfo);
    console.log(this.allAvailablePokemon);
    this.buildEvolutionChain();
  }

  private buildEvolutionChain(): void {
    this.evolutionChain = [];
    this.pokemonInfo?.evolutionChain?.forEach((pokemonName: string) => {
      const pokemonInfo: PokemonInfo = this.allAvailablePokemon?.find((pokemonToFind: PokemonInfo) =>
        pokemonToFind.name === pokemonName);
      if (pokemonInfo != null) {
        this.evolutionChain.push(pokemonInfo);
      }
    });
  }

}
