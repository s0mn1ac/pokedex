import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokedexData } from 'src/app/shared/models/pokedex-data.model';
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

  public async getPokedexData(url = `${this.url}/pokemon`): Promise<PokedexData> {
    const report = await this.getPokedexDataReport(url);
    return this.converterService.convertPokedexDataFromReport(report);
  }

  public async getPokemon(url: string): Promise<Pokemon> {
    const report = await this.getDataByCustomUrl(url);
    const speciesReport = await this.getDataByCustomUrl(report?.species?.url);
    return this.converterService.convertPokemonFromReport(report, speciesReport);
  }

  // ---------------------------------------------------------------------------------------------------------------------------------------

  private async getPokedexDataReport(url: string): Promise<any> {
    return this.serviceGet({
      url,
      callback: (response: any) => response.body,
      result: null
    });
  }

  private async getDataByCustomUrl(url: string): Promise<any> {
    return this.serviceGet({
      url,
      callback: (response: any) => response.body,
      result: null
    });
  }

}
