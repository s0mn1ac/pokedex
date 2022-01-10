import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/shared/models/pokemon.model';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {

  @Input() pokemon: Pokemon;

  constructor() { }

  ngOnInit(): void {
  }

}
