import { Component, Input } from '@angular/core';
import { PokemonStat } from 'src/app/shared/models/pokemon-stat.model';

@Component({
  selector: 'app-pokemon-progress-bar',
  templateUrl: './pokemon-progress-bar.component.html',
  styleUrls: ['./pokemon-progress-bar.component.scss']
})
export class PokemonProgressBarComponent {

  @Input() stat: PokemonStat;

}
