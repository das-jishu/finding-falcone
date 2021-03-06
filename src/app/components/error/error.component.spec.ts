import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { ErrorComponent } from './error.component';

const router = {
  navigate: jasmine.createSpy('navigate')
}

let route = {
  params: of({errorCode: 404})
}


describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorComponent ],
      providers: [ {
        provide: ActivatedRoute,
        useValue: route
      }, {
        provide: Router, useValue: router
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should print 404 as return code', () => {
    let element = fixture.debugElement.query(By.css('.error-code')).nativeElement

    expect(element.innerText).toContain(404)
  })

  it('should print 400 as return code', () => {
    route.params = of({errorCode: -1})
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.error-code')).nativeElement

    expect(element.innerText).toContain(404)
  })

  it('should redirect to home', () => {
    fakeAsync(() => {
      fixture.detectChanges();
      spyOn(component, 'redirectToHome'); 
      let btn = fixture.debugElement.query(By.css('.try-again')).nativeElement;
      btn.triggerEventHandler('click', null);
      tick(); 
      fixture.detectChanges();
      expect(component.redirectToHome).toHaveBeenCalled();
    })
  })

  /* it('should redirect to home', () => {
    component.redirectToHome();
    expect(router.navigate).toHaveBeenCalledWith(['/home'])
  }) */
});
