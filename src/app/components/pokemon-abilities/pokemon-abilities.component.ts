import { Component, Input } from '@angular/core';
import { PokemonInfo } from 'src/app/shared/models/pokemon-info.model';

@Component({
  selector: 'app-pokemon-abilities',
  templateUrl: './pokemon-abilities.component.html',
  styleUrls: ['./pokemon-abilities.component.scss']
})
export class PokemonAbilitiesComponent {

  @Input() pokemonInfo: PokemonInfo;

}
