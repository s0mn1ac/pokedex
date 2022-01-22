import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokemonInfo } from 'src/app/shared/models/pokemon-info.model';
import { BaseService } from 'src/app/shared/services/base.service';
import { ConverterService } from 'src/app/shared/services/converter.service';
import { PokedexData, Result } from '../models/pokedex-data.model';
import { PokemonAbility } from '../models/pokemon-ability.model';

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

  public async getPokedexData(url: string = `${this.url}/pokemon`): Promise<PokedexData> {
    const report = await this.getPokedexDataReport(url);
    return this.converterService.convertPokedexDataFromReport(report);
  }

  public async getPokemonInfoById(id: number): Promise<PokemonInfo> {
    const infoReport = await this.getPokemonInfoByIdReport(id);
    const speciesReport = await this.getPokemonInfoByUrlReport(infoReport?.species?.url);
    const evolutionChainReport = await this.getPokemonInfoByUrlReport(speciesReport?.evolution_chain?.url);
    console.log('infoReport', infoReport);
    console.log('speciesReport', speciesReport);
    console.log('evolutionChainReport', evolutionChainReport);
    return this.converterService.convertPokemonInfoFromReport(infoReport, speciesReport, evolutionChainReport);
  }

  public async getPokemonInfoByUrl(url: string): Promise<PokemonInfo> {
    const infoReport = await this.getPokemonInfoByUrlReport(url);
    const speciesReport = await this.getPokemonInfoByUrlReport(infoReport?.species?.url);
    const evolutionChainReport = await this.getPokemonInfoByUrlReport(speciesReport?.evolution_chain?.url);
    return this.converterService.convertPokemonInfoFromReport(infoReport, speciesReport, evolutionChainReport);
  }

  public async getAllPokemonAbilities(url: string = `${this.url}/ability`): Promise<PokemonAbility[]> {
    const report = await this.getPokedexDataReport(url);
    const promises: Promise<PokemonAbility>[] = report?.results?.map((result: Result) => this.getPokemonAbilityByUrl(result.url));
    const allPokemonAbilities: PokemonAbility[] = await Promise.all(promises);
    console.log('allPokemonAbilities', allPokemonAbilities);
    return allPokemonAbilities;
  }

  public async getPokemonAbilityByUrl(url: string): Promise<PokemonAbility> {
    const report = await this.getDataByUrlReport(url);
    return this.converterService.convertAbilityFromReport(report);
    console.log('report', report);
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

  private async getDataByUrlReport(url: string): Promise<any> {
    return this.serviceGet({
      url,
      callback: (response: any) => response.body,
      result: null
    });
  }

}
