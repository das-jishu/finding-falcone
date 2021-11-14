import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { APIService } from './api-service.mock.service';

describe('APIMockService', () => {
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

  it('should call mock planets API', () => {
    expect(service.getAllPlanets()._subscribe.length).toEqual(1)
  })

  it('should call mock vehicles API', () => {
    expect(service.getAllVehicles()._subscribe.length).toEqual(1)
  })

  it('should call mock token API', () => {
    expect(service.getToken()._subscribe.length).toEqual(1)
  })

  it('should call mock results API', () => {
    expect(service.getFinalResult()._subscribe.length).toEqual(1)
  })
});
