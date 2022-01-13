import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokemonInfo } from 'src/app/shared/models/pokemon-info.model';
import { BaseService } from 'src/app/shared/services/base.service';
import { ConverterService } from 'src/app/shared/services/converter.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonInfoService extends BaseService {

  private url = 'https://pokeapi.co/api/v2';

  constructor(protected http: HttpClient, private converterService: ConverterService) {
    super(http);
  }

  public async getPokemonInfo(id: number): Promise<PokemonInfo> {
    const infoReport = await this.getPokemonInfoReport(id);
    const speciesReport = await this.getDataByCustomUrl(infoReport?.species?.url);
    const evolutionChainReport = await this.getDataByCustomUrl(speciesReport?.evolution_chain?.url);
    return this.converterService.convertPokemonInfoFromReport(infoReport, speciesReport, evolutionChainReport);
  }

  // ---------------------------------------------------------------------------------------------------------------------------------------

  private async getPokemonInfoReport(id: number): Promise<any> {
    return this.serviceGet({
      url: `${this.url}/pokemon/${id}`,
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
