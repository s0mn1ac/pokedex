import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPokemonNumber'
})
export class FormatPokemonNumberPipe implements PipeTransform {

  transform(pokemonNumber: number): string {
    return String(pokemonNumber).padStart(3, '0');
  }

}
