import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private _baseUrl:string = 'https://superheroapi.com/api';
  private _token:string = '10227007384797615';
  private _api:string = `${ this._baseUrl }/${ this._token }`

  constructor() { }

  getHeroes( busqueda: string) {
    return axios.get<any>( `${this._api}/search/${ busqueda }`)
         
  }

  getHeroesId( id: string ) {
    return axios.get<any>( `${this._api}/${ id }`);
  }

  getPowerStatsId( id: string ) {
      return axios.get<any>( `${ this._api }/${ id }/powerstats`);
  }
}
