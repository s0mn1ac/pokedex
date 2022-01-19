import { Component, Input } from '@angular/core';
import { PokemonInfo } from 'src/app/shared/models/pokemon-info.model';

@Component({
  selector: 'app-pokemon-description',
  templateUrl: './pokemon-description.component.html',
  styleUrls: ['./pokemon-description.component.scss']
})
export class PokemonDescriptionComponent {

  @Input() pokemonInfo: PokemonInfo;

}
