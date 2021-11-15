import { HomeComponent } from './../components/home/home.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { APIService } from './api-service.service';
import { DataService } from './data-service.service';
import { TestBed } from '@angular/core/testing';

import { AuthGuardService } from './authguard.service';
import { Router } from '@angular/router';

const router = {
  navigate: jasmine.createSpy('navigate')
}

describe('AuthGuardService', () => {
  let service: AuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService, APIService, HttpClient, HttpHandler, {
        provide: Router, useValue: router
      }
      ],
      imports: [],
      declarations: [HomeComponent]
    });
    service = TestBed.inject(AuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false and change path', () => {
    let dataService = TestBed.get(DataService)
    spyOn(dataService, 'isReadyForResult').and.returnValue(false)
    expect(service.canActivate()).toBeFalsy();
    expect(router.navigate).toHaveBeenCalledWith(['/home'])
  })

  it('should return true', () => {
    let dataService = TestBed.get(DataService)
    spyOn(dataService, 'isReadyForResult').and.returnValue(true)
    expect(service.canActivate()).toBeTruthy();
  })
});
