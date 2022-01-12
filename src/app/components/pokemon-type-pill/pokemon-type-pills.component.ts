import { Component, Input, OnInit } from '@angular/core';
import { PokemonInfo } from 'src/app/shared/models/pokemon-info.model';
import { PokemonType } from 'src/app/shared/models/pokemon-type.model';
import { Pokemon } from 'src/app/shared/models/pokemon.model';

@Component({
  selector: 'app-pokemon-type-pills',
  templateUrl: './pokemon-type-pills.component.html',
  styleUrls: ['./pokemon-type-pills.component.scss']
})
export class PokemonTypePillComponent implements OnInit {

  @Input() pokemonTypes: PokemonType[];

  constructor() { }

  ngOnInit(): void {
  }

}
