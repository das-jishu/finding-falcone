import { APIService } from './api-service.mock.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Vehicle } from 'src/app/models/vehicle';
import { Planet } from 'src/app/models/planet';
//import { APIService } from './api-service.service';
import { LogService } from './log.service';
import { TestBed } from '@angular/core/testing';
import { pipe, Observable, of } from 'rxjs';
import { DataService } from './data-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DataService', () => {
  let service: DataService;
  let apiService = new APIService();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LogService, /* useValue: logService */ },
        { provide: APIService, useValue: apiService },
      ],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(DataService);

    service.allPlanets = [
      { name: 'Test Planet', distance: 100, selected: false }
    ]
    service.allVehicles = [
      { name: 'Test Vehicle', max_distance: 100, total_no: 2, total_used: 1, speed: 5 }
    ]
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a planet object when planet name is passed', () => {
    let planet: Planet | undefined = service.getPlanetFromName('Test Planet')

    let expectedResult: Planet = { name: 'Test Planet', distance: 100, selected: false }
    expect(planet).toEqual(expectedResult)
  })

  it('should return undefined when invalid planet name is passed', () => {
    let planet: Planet | undefined = service.getPlanetFromName('No such Planet')

    expect(planet).toEqual(undefined)
  })

  it('should return a vehicle object when vehicle name is passed', () => {
    let vehicle: Vehicle | undefined = service.getVehicleFromName('Test Vehicle')

    let expectedResult: Vehicle = { name: 'Test Vehicle', max_distance: 100, total_no: 2, total_used: 1, speed: 5 }
    
    expect(vehicle).toEqual(expectedResult)
  })

  it('should return undefined when an invalid vehicle name is passed', () => {
    let vehicle: Vehicle | undefined = service.getVehicleFromName('No such Vehicle')

    expect(vehicle).toEqual(undefined)
  })

  it('should add planet to selected and give return code as 1 for successful insertion', () => {
    let returnCode: number = service.addPlanetToSelected('Test Planet')

    expect(service.allPlanets[0].selected).toBeTruthy();
    expect(service.selectedPlanets).toContain('Test Planet')
    expect(returnCode).toBe(1)
  })

  it('should not add planet to selected and give return code as 0 for unsuccessful insertion', () => {
    let returnCode: number = service.addPlanetToSelected('No such Planet')

    expect(service.selectedPlanets).not.toContain('No such Planet')
    expect(returnCode).toBe(0)
  })

  it('should remove planet from selected and give return code as 1 for successful deletion', () => {
    service.allPlanets[0].selected = true
    service.selectedPlanets = ['Test Planet']
    let returnCode: number = service.removePlanetFromSelected('Test Planet')

    expect(service.allPlanets[0].selected).toBeFalsy();
    expect(service.selectedPlanets).not.toContain('Test Planet')
    expect(returnCode).toBe(1)
  })

  it('should not remove planet from selected for invalid planet name and give return code as 0 for unsuccessful deletion', () => {
    let returnCode: number = service.removePlanetFromSelected('No such Planet')

    expect(returnCode).toBe(0)
  })

  it('should not remove planet from selected for blank name but give return code as 1', () => {
    let returnCode: number = service.removePlanetFromSelected('')

    expect(returnCode).toBe(1)
  })

  it('should add vehicle to selected and give return code as 1 for successful insertion', () => {
    let returnCode: number = service.addVehicleToSelected('Test Vehicle', 'Test Planet')

    expect(service.allVehicles[0].total_used).toBe(2);
    expect(service.selectedVehicles).toContain('Test Vehicle')
    expect(returnCode).toBe(1)
  })

  it('should not add vehicle to selected and give return code as 0 for unsuccessful insertion', () => {
    let returnCode: number = service.addVehicleToSelected('No such Vehicle', 'Test Planet')

    expect(service.selectedVehicles).not.toContain('No such Vehicle')
    expect(returnCode).toBe(0)
  })

  it('should not add vehicle to selected for valid vehicle but invalid planet and give return code as 0 for unsuccessful insertion', () => {
    let returnCode: number = service.addVehicleToSelected('Test Vehicle', 'No such planet')

    expect(service.selectedVehicles).not.toContain('No such Vehicle')
    expect(returnCode).toBe(0)
  })

  it('should not add vehicle to selected for blank vehicle name but give return code as 1', () => {
    let returnCode: number = service.addVehicleToSelected('', 'Test Planet')

    expect(service.selectedVehicles).not.toContain('No such Vehicle')
    expect(returnCode).toBe(1)
  })

  it('should remove vehicle from selected and give return code as 1 for successful deletion', () => {
    service.selectedVehicles = ['Test Vehicle']
    let returnCode: number = service.removeVehicleFromSelected('Test Vehicle', 'Test Planet')

    expect(service.allVehicles[0].total_used).toBe(0);
    expect(service.selectedVehicles).not.toContain('Test Vehicle')
    expect(returnCode).toBe(1)
  })

  it('should not remove vehicle from selected for invalid vehicle name and give return code as 0 for unsuccessful deletion', () => {
    let returnCode: number = service.removeVehicleFromSelected('No such Vehicle', 'Test Planet')

    expect(returnCode).toBe(0)
  })

  it('should not remove vehicle from selected for valid vehicle but invalid planet and give return code as 0 for unsuccessful insertion', () => {
    let returnCode: number = service.removeVehicleFromSelected('Test Vehicle', 'No such planet')

    expect(service.selectedVehicles).not.toContain('No such Vehicle')
    expect(returnCode).toBe(0)
  })

  it('should not remove vehicle from selected for blank vehicle name but give return code as 1', () => {
    let returnCode: number = service.removeVehicleFromSelected('', 'Test Planet')

    expect(service.selectedVehicles).not.toContain('No such Vehicle')
    expect(returnCode).toBe(1)
  })

  it('should increase total time taken', () => {
    service.updateTimeTaken(service.allPlanets[0], service.allVehicles[0], true)

    expect(service.timeTaken.time).toBe(20)
  })

  it('should decrease total time taken', () => {
    service.timeTaken.time = 20
    service.updateTimeTaken(service.allPlanets[0], service.allVehicles[0], false)

    expect(service.timeTaken.time).toBe(0)
  })

  it('should return true if vehicle is eligible', () => {
    expect(service.checkVehicleEligibility(service.allVehicles[0], 'Test Planet')).toBeTruthy();
  })

  it('should return false if vehicle is not eligible', () => {
    service.allVehicles[0].total_used = 2
    expect(service.checkVehicleEligibility(service.allVehicles[0], 'Test Planet')).toBeFalsy();
  })

  it('should return true if it is ready for result', () => {
    service.selectedPlanets = ['', '', '', '']
    service.selectedVehicles = ['', '', '', '']
    expect(service.isReadyForResult()).toBeTruthy();
  })

  it('should return false if it is not ready for result', () => {
    expect(service.isReadyForResult()).toBeFalsy();
  })

  it('should return total time taken', () => {
    expect(service.getTotalTimeTaken()).toBe(0)
  })

  it('should return an observable of all planets', () => {
    expect(typeof(service.getPlanets())).toBe('object')
  })

  it('should return an observable of all vehicles', () => {
    expect(typeof(service.getVehicles())).toBe('object')
  })

  it('should return an observable of all selected planets', () => {
    expect(typeof(service.getSelectedPlanets())).toBe('object')
  })

  it('should return an observable of all selected vehicles', () => {
    expect(typeof(service.getSelectedVehicles())).toBe('object')
  })

  it('should return an observable of time taken', () => {
    expect(typeof(service.getTimeTaken())).toBe('object')
  })

  it('should call planets and vehicles API', () => {
    spyOn(service, 'getAllPlanets')
    spyOn(service, 'getAllVehicles')
    service.initializeAll();
    expect(service.getAllPlanets).toHaveBeenCalled();
    expect(service.getAllVehicles).toHaveBeenCalled();
  }) 

  it('should return observable of all planets', () => {
    expect(service.getPlanets()._subscribe.length).toBe(1)
  })

  it('should return observable of all vehicles', () => {
    expect(service.getVehicles()._subscribe.length).toBe(1)
  })

  it('should return observable of selected planets', () => {
    expect(service.getSelectedPlanets()._subscribe.length).toBe(1)
  })

  it('should return observable of selecetd vehicles', () => {
    expect(service.getSelectedVehicles()._subscribe.length).toBe(1)
  })

  it('should return observable of time taken', () => {
    expect(service.getTimeTaken()._subscribe.length).toBe(1)
  })
  
});
