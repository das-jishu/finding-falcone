import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor() { }

  getAllPlanets() {
    return of([
        { 
            name: 'Test Planet', distance: 150 
        }
    ]);
  }

  getAllVehicles() {
    return of([
        { 
            name: 'Test Vehicle',
            speed: 5,
            max_distance: 200,
            total_no: 5
        }
    ]);
  }

  getToken() {
    return of({
        token: 'testtoken123456'
    })
  }

  getFinalResult() {
    return of({
        status: 'success',
        planet_name: 'Test Planet'
    })
  }

}
