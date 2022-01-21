import { Component, Input } from '@angular/core';
import { PokemonInfo } from 'src/app/shared/models/pokemon-info.model';

@Component({
  selector: 'app-pokemon-card-mini',
  templateUrl: './pokemon-card-mini.component.html',
  styleUrls: ['./pokemon-card-mini.component.scss']
})
export class PokemonCardMiniComponent {

  @Input() pokemonInfo: PokemonInfo;

}
