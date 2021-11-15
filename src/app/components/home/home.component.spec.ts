import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router, RouterModule } from '@angular/router';
import { LogService } from './../../services/log.service';
import { DataService } from './../../services/data-service.service';
import { APIService } from './../../services/api-service.mock.service';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

const router = {
  navigate: jasmine.createSpy('navigate')
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {    

    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [ APIService,
        DataService,
        LogService,
        { provide: Router, useValue: router }
      ],
      imports: [ RouterModule, HttpClientTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    let service = TestBed.get(DataService)
    spyOn(service, 'initializeAll').and.returnValue('')
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should set ready to true', () => {
    fixture.detectChanges();
    component.ready = false
    component.readyAll();
    fixture.detectChanges();
    expect(component.ready).toBeTruthy();
  });

  it('should generate results when button is clicked', () => {
    fakeAsync(() => {
      fixture.detectChanges();
      spyOn(component, 'generateResults'); 
      let btn = fixture.debugElement.query(By.css('.search-button')).nativeElement;
      btn.triggerEventHandler('click', null);
      tick(); 
      fixture.detectChanges();
      expect(component.generateResults).toHaveBeenCalled();
    })
  })

  it('should navigate to Result component', () => {
    component.generateResults();
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['/result'])
  })

  it('should call reset method when reset button is clicked', () => {
    fakeAsync(() => {
      fixture.detectChanges();
      spyOn(component, 'reset'); 
      let btn = fixture.debugElement.query(By.css('.start-button')).nativeElement[1];
      btn.triggerEventHandler('click', null);
      tick(); 
      fixture.detectChanges();
      expect(component.reset).toHaveBeenCalled();
    })
  })

  /* it('should set isLoading to false', () => {
    let service = TestBed.get(APIService)
    spyOn(service, 'getAllPlanets').and.returnValue(of([{name: 'Test', distance: 10}]))
    spyOn(service, 'getAllVehicles').and.returnValue(of([]))
    fixture.detectChanges();
    component.ngOnInit()
    expect(component.isLoading).toBeFalsy()
  }) */

});