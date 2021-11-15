import { LogService } from './../../services/log.service';
import { DataService } from './../../services/data-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { ResultComponent } from './result.component';
import { of } from 'rxjs';

const router = {
  navigate: jasmine.createSpy('navigate')
}

describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [{
        provide: Router, useValue: router
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load result when created', () => {
    let service = TestBed.get(DataService)
    spyOn(service, 'getResults').and.returnValue(of({status: 'success', planet_name: 'Test'}))
    spyOn(service, 'getTotalTimeTaken').and.returnValue(10)

    fixture.detectChanges();
    component.ngOnInit();
    expect(component.isLoading).toBeFalsy();
    expect(component.timeTaken).toBe(10)
    expect(component.result).toEqual({status: 'success', planet_name: 'Test'})
  })

  it('should call reset when button is clicked', () => {
    fakeAsync(() => {
      fixture.detectChanges();
      spyOn(component, 'reset'); 
      let btn = fixture.debugElement.query(By.css('.reset-button')).nativeElement;
      btn.triggerEventHandler('click', null);
      tick(); 
      fixture.detectChanges();
      expect(component.reset).toHaveBeenCalled();
    })
  })

  it('should print success when result has status as success', () => {
    fakeAsync(() => {
      component.result = {
        status: 'success',
        planet_name: 'Test'
      }
      fixture.detectChanges();
      let element = fixture.debugElement.query(By.css('.planet-name')).nativeElement;
      expect(element.innerText).toContain('Test')
    })
  })

  it('should print failure when result has status as false', () => {
    fakeAsync(() => {
      component.result = {
        status: 'false',
      }
      fixture.detectChanges();
      let element = fixture.debugElement.query(By.css('.failure')).nativeElement;
      expect(element.innerText).toContain('Alas! You could not find Queen Falcone. However, King Shan will allow you to try again. Better luck this time!')
    })
  })
  
  it('should print time taken', () => {
    fakeAsync(() => {
      component.timeTaken = 200
      fixture.detectChanges();
      let element = fixture.debugElement.query(By.css('.time-taken')).nativeElement;
      expect(element.innerText).toContain('200')
    })
  })

  it('should reset', () => {
    spyOn(component, 'reloadPage').and.callFake(function() {})
    let service = TestBed.get(LogService)
    spyOn(service, 'log')
    component.reset()
    expect(component.reloadPage).toHaveBeenCalled();
    expect(service.log).toHaveBeenCalled();
  })

});
