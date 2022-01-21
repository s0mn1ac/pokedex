import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokemonInfo } from 'src/app/shared/models/pokemon-info.model';
import { BaseService } from 'src/app/shared/services/base.service';
import { ConverterService } from 'src/app/shared/services/converter.service';
import { PokedexData } from '../models/pokedex-data.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService extends BaseService {

  public allAvailablePokemon: PokemonInfo[];

  private url = 'https://pokeapi.co/api/v2';

  constructor(protected http: HttpClient, private converterService: ConverterService) {
    super(http);
    this.allAvailablePokemon = JSON.parse(localStorage.getItem('allAvailablePokemon')) ?? [];
  }

  public async getPokedexData(url = `${this.url}/pokemon`): Promise<PokedexData> {
    const report = await this.getPokedexDataReport(url);
    return this.converterService.convertPokedexDataFromReport(report);
  }

  public async getPokemonInfoById(id: number): Promise<PokemonInfo> {
    const infoReport = await this.getPokemonInfoByIdReport(id);
    const speciesReport = await this.getPokemonInfoByUrlReport(infoReport?.species?.url);
    const evolutionChainReport = await this.getPokemonInfoByUrlReport(speciesReport?.evolution_chain?.url);
    return this.converterService.convertPokemonInfoFromReport(infoReport, speciesReport, evolutionChainReport);
  }

  public async getPokemonInfoByUrl(url: string): Promise<PokemonInfo> {
    const infoReport = await this.getPokemonInfoByUrlReport(url);
    const speciesReport = await this.getPokemonInfoByUrlReport(infoReport?.species?.url);
    const evolutionChainReport = await this.getPokemonInfoByUrlReport(speciesReport?.evolution_chain?.url);
    return this.converterService.convertPokemonInfoFromReport(infoReport, speciesReport, evolutionChainReport);
  }

  // ---------------------------------------------------------------------------------------------------------------------------------------

  public setAllAvailablePokemon(allAvailablePokemon: PokemonInfo[]): void {
    this.allAvailablePokemon = allAvailablePokemon;
    localStorage.setItem('allAvailablePokemon', JSON.stringify(this.allAvailablePokemon));
  }

  public getAllAvailablePokemon(): PokemonInfo[] {
    return this.allAvailablePokemon;
  }

  // ---------------------------------------------------------------------------------------------------------------------------------------

  private async getPokedexDataReport(url: string): Promise<any> {
    return this.serviceGet({
      url,
      callback: (response: any) => response.body,
      result: null
    });
  }

  private async getPokemonInfoByIdReport(id: number): Promise<any> {
    return this.serviceGet({
      url: `${this.url}/pokemon/${id}`,
      callback: (response: any) => response.body,
      result: null
    });
  }

  private async getPokemonInfoByUrlReport(url: string): Promise<any> {
    return this.serviceGet({
      url,
      callback: (response: any) => response.body,
      result: null
    });
  }

}
