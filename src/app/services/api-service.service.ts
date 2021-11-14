import { Vehicle } from './../models/vehicle';
import { Planet } from './../models/planet';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APILIST } from '../config';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor( private httpClient: HttpClient ) { }

  getAllPlanets() {
    return this.httpClient.get<Planet[]>(APILIST.planetsAPI);
  }

  getAllVehicles() {
    return this.httpClient.get<Vehicle[]>(APILIST.vehiclesAPI);
  }

  getToken() {
    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json'};
    return this.httpClient.post<any>(APILIST.tokenAPI, null, { headers });
  }

  getFinalResult(token: string, planets: string[], vehicles: string[]) {
    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json'};
    const requestBody = {
      token: token,
      planet_names: planets,
      vehicle_names: vehicles,
    };
    return this.httpClient.post<any>(APILIST.resultAPI, requestBody, { headers });
  }

}
