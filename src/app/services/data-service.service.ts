import { LogLevel, LogService } from './log.service';
import { Vehicle } from './../models/vehicle';
import { APIService } from './api-service.service';
import { Injectable } from '@angular/core';
import { Planet } from '../models/planet';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  allPlanets: Planet[] = []
  allVehicles: Vehicle[] = []

  selectedPlanets: string[] = []
  selectedVehicles: string[] = []

  timeTaken = { time: 0 }

  constructor( private _apiService: APIService, private _logService: LogService ) { }

  initializeAll() {
    this.getAllPlanets();
    this.getAllVehicles();
  }

  getAllPlanets() {
    this._apiService.getAllPlanets().pipe(
      catchError(error => {
        return this.errorHandler(error, false);
      })
    ).subscribe( response => 
    {
      this.allPlanets = response;
    }, (error) => {
      console.log(error);
    });
  }

  getAllVehicles() {
    this._apiService.getAllVehicles().pipe(
      catchError(error => {
        return this.errorHandler(error, false);
      })
    ).subscribe( response => {
      this.allVehicles = response;
    }, (error) => {
      console.log(error);
    });
  }

  getPlanets(): Observable<Planet[]> {
    return of(this.allPlanets)
  }

  getSelectedPlanets(): Observable<string[]> {
    return of(this.selectedPlanets)
  }

  getVehicles(): Observable<Vehicle[]> {
    return of(this.allVehicles)
  }

  getSelectedVehicles(): Observable<string[]> {
    return of(this.selectedVehicles)
  }

  getTimeTaken(): Observable<any> {
    return of(this.timeTaken)
  }

  addPlanetToSelected(planetName: string): number {
    let planet = this.getPlanetFromName(planetName)
    if (!planet)
      return 0
    planet.selected = true

    // Adding planet to selectedPlanets
    this.selectedPlanets.push(planetName)
    return 1
  }

  removePlanetFromSelected(planetName: string): number {
    if (planetName === "")
      return 1

    let planet = this.getPlanetFromName(planetName)
    if (!planet)
      return 0
    
    planet.selected = false

    // Removing planet from selectedPlanets
    const index = this.selectedPlanets.findIndex(planet => planet === planetName);
    if (index === -1)
      return 0

    this.selectedPlanets.splice(index, 1)
    return 1
  }

  getVehicleFromName(vehicleName: string): Vehicle | undefined {
    return this.allVehicles.find( vehicle => vehicle.name === vehicleName )
  }

  getPlanetFromName(planetName: string): Planet | undefined {
    return this.allPlanets.find(planet => planet.name === planetName)
  }

  addVehicleToSelected(vehicleName: string, planetName: string): number {
    // If fields are empty, it signifies a corner case where a planet or a vehicle is unselected.
    if (vehicleName === "")
      return 1

    let vehicle = this.getVehicleFromName(vehicleName)
    let planet = this.getPlanetFromName(planetName)
    if (!vehicle || !planet)
      return 0

    vehicle.total_used = (vehicle.total_used || 0) + 1

    // Adding vehicle to selectedVehicles
    this.selectedVehicles.push(vehicleName)
    this.updateTimeTaken(planet, vehicle, true)
    return 1
  }

  removeVehicleFromSelected(vehicleName: string, planetName: string): number {
    // If field is empty, it signifies a corner case where a vehicle is unselected.
    if (vehicleName === "")
      return 1

    let vehicle = this.getVehicleFromName(vehicleName)
    let planet = this.getPlanetFromName(planetName)
    if (!vehicle || !planet)
      return 0

    vehicle.total_used = (vehicle.total_used || 0) - 1
    
    // Removing vehicle from selectedVehicles
    const index = this.selectedVehicles.findIndex(vehicle => vehicle === vehicleName)
    if (index === -1)
      return 0

    this.selectedVehicles.splice(index, 1)

    this.updateTimeTaken(planet, vehicle, false)
    return 1
  }

  updateTimeTaken(planet: Planet, vehicle: Vehicle, increase: boolean) {
    if (increase === true)
      this.timeTaken.time += (planet.distance / vehicle.speed)
    else
      this.timeTaken.time -= (planet.distance / vehicle.speed)
    
    this._logService.log(LogLevel.INFO, "Updated time taken to " + this.timeTaken.time + '.')
  }

  checkVehicleEligibility(vehicle: Vehicle, planetName: string): boolean {
    let requiredPlanet = this.getPlanetFromName(planetName)
    if (!requiredPlanet)
      return false

    let distance = requiredPlanet.distance
    return (vehicle.total_used || 0) < vehicle.total_no && vehicle.max_distance >= distance
  }

  isReadyForResult() {
    return this.selectedVehicles.length === 4 && this.selectedPlanets.length === 4
  }

  getResults() {
    return this._apiService.getToken().pipe(mergeMap(data => this._apiService.getFinalResult(data.token, this.selectedPlanets, this.selectedVehicles)))
  }

  getTotalTimeTaken() {
    return this.timeTaken.time
  }

  errorHandler(error: any, useFallBackObservable: boolean) {
    const errorMessage = `API call failed with status: ${error.status} and error message: ${error.message}`
    this._logService.log(LogLevel.ERROR, errorMessage)

    const fallBackObservable = of([])
    if (useFallBackObservable) {
      this._logService.log(LogLevel.WARN, 'Using a Fallback Observable to continue.')
      return fallBackObservable
    }
    else {
      this._logService.log(LogLevel.WARN, 'Terminating observable.')
      return throwError(error)
    }
  }
}
