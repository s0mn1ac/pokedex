import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from 'src/app/shared/models/pokemon.model';
import { BaseService } from 'src/app/shared/services/base.service';
import { ConverterService } from 'src/app/shared/services/converter.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonListService extends BaseService {

  private url = 'https://pokeapi.co/api/v2';

  constructor(protected http: HttpClient, private converterService: ConverterService) {
    super(http);
  }

  public async getAllPokemon(): Promise<Pokemon[]> {
    const report = await this.getAllPokemonReport();
    return this.converterService.convertAllPokemonFromReport(report);
  }

  public async getPokemon(id: number): Promise<Pokemon> {
    const report = await this.getPokemonReport(id);
    return null;
  }

  // ---------------------------------------------------------------------------------------------------------------------------------------

  private async getAllPokemonReport(): Promise<any> {
    return this.serviceGet({
      url: `${this.url}/pokemon`,
      callback: (response: any) => response.body,
      result: null
    });
  }

  private async getPokemonReport(id: number): Promise<any> {
    return this.serviceGet({
      url: `${this.url}/pokemon/${id}`,
      callback: (response: any) => response.body,
      result: null
    });
  }

}
