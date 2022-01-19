import { Component, Input } from '@angular/core';
import { PokemonInfo } from 'src/app/shared/models/pokemon-info.model';

@Component({
  selector: 'app-pokemon-stats',
  templateUrl: './pokemon-stats.component.html',
  styleUrls: ['./pokemon-stats.component.scss']
})
export class PokemonStatsComponent {

  @Input() pokemonInfo: PokemonInfo;

}
