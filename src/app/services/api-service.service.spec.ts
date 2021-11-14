import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { APIService } from './api-service.service';

describe('APIService', () => {
  let service: APIService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(APIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call planets API', () => {
    spyOn(service, 'getAllPlanets').and.callFake(() => {
      return of([])
    })
    
    expect(service.getAllPlanets()._subscribe.length).toEqual(1)
    expect(service.getAllPlanets()._subscribe.name).toEqual("")
  })

  it('should call vehicles API', () => {
    spyOn(service, 'getAllVehicles').and.callFake(() => {
      return of([])
    })
    
    expect(service.getAllVehicles()._subscribe.length).toEqual(1)
    expect(service.getAllVehicles()._subscribe.name).toEqual("")
  })

  it('should call token API', () => {
    spyOn(service, 'getToken').and.callFake(() => {
      return of([])
    })
    
    expect(service.getToken()._subscribe.length).toEqual(1)
    expect(service.getToken()._subscribe.name).toEqual("")
  })

  it('should call results API', () => {
    spyOn(service, 'getFinalResult').and.callFake(() => {
      return of([])
    })
    
    expect(service.getFinalResult('', [], [])._subscribe.length).toEqual(1)
    expect(service.getFinalResult('', [], [])._subscribe.name).toEqual("")
  })
});
