import { AppModule } from './../../app.module';
import { Router, RouterModule } from '@angular/router';
import { LogService } from './../../services/log.service';
import { DataService } from './../../services/data-service.service';
import { APIService } from './../../services/api-service.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

/* describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    let logService = new LogService();
    let apiservice = new APIService(null as any);
    let dataService = new DataService(apiservice, logService);
    

    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [ { provide: APIService, useValue: apiservice },
        { provide: DataService, useValue: dataService },
        { provide: LogService, useValue: logService },
      ],
      imports: [ RouterModule, AppModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
});
 */

/* describe('HomeComponent', () => {
  let logService = new LogService();
    let apiservice = new APIService(null as any);
    let dataService = new DataService(apiservice, logService);
  let component = new HomeComponent(apiservice, dataService, logService)

  it('should set ready to true', () => {

  });
}) */