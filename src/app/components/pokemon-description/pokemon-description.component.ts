import { Component, Input, OnInit } from '@angular/core';
import { PokemonInfo } from 'src/app/shared/models/pokemon-info.model';

@Component({
  selector: 'app-pokemon-description',
  templateUrl: './pokemon-description.component.html',
  styleUrls: ['./pokemon-description.component.scss']
})
export class PokemonDescriptionComponent implements OnInit {

  @Input() pokemonInfo: PokemonInfo;

  constructor() { }

  ngOnInit(): void {
  }

}
