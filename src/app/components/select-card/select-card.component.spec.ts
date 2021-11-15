import { Observable, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LogService } from './../../services/log.service';
import { DataService } from './../../services/data-service.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCardComponent } from './select-card.component';

describe('SelectCardComponent', () => {
  let component: SelectCardComponent;
  let fixture: ComponentFixture<SelectCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectCardComponent ],
      providers: [ DataService, LogService ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load planets and vehicles on ngChange hook', () => {
    let service = TestBed.get(DataService)
    spyOn(service, 'getPlanets').and.returnValue(of([{ name: 'Test', distance: 10 }]))
    spyOn(service, 'getVehicles').and.returnValue(of([{ name: 'Test', max_distance: 10, speed: 30, total_no: 2 }]))

    fixture.detectChanges()
    component.ngOnChanges()
    expect(component.planets.length).toBe(1)
    expect(component.vehicles.length).toBe(1)
  })

  it('should execute when planet selection is changed and operation is successful', () => {
    spyOn(component, 'changeVehicleSelection')
    spyOn(component, 'updatePlanetImagePath')

    let service = TestBed.get(DataService)
    spyOn(service, 'addPlanetToSelected').and.returnValue(1)
    spyOn(service, 'removePlanetFromSelected').and.returnValue(1)

    component.changePlanetSelection('Test Planet')
    expect(component.changeVehicleSelection).toHaveBeenCalledWith({ value: '' })
    expect(component.updatePlanetImagePath).toHaveBeenCalledWith('Test Planet')
    expect(component.selectedPlanet).toEqual('Test Planet')
  })

  it('should execute when planet selection is changed and operation failed', () => {
    spyOn(component, 'changeVehicleSelection')
    spyOn(component, 'updatePlanetImagePath')

    let service = TestBed.get(DataService)
    spyOn(service, 'addPlanetToSelected').and.returnValue(0)
    spyOn(service, 'removePlanetFromSelected').and.returnValue(1)

    component.changePlanetSelection('Test Planet')
    expect(component.changeVehicleSelection).toHaveBeenCalledWith({ value: '' })
    expect(component.updatePlanetImagePath).toHaveBeenCalledWith('Test Planet')
    expect(component.selectedPlanet).toEqual('Test Planet')
  })

  it('should update planet image path when valid name is passed', () => {
    component.updatePlanetImagePath('Test')
    expect(component.planetImagePath).toEqual('../../../assets/planets/Test.PNG')
  })

  it('should update planet image path when invalid name is passed', () => {
    component.updatePlanetImagePath('')
    expect(component.planetImagePath).toEqual('../../../assets/none.png')
  })

  it('should return eligible planets for selection', () => {
    component.planets = [{
      name: 'Test1',
      distance: 10,
      selected: false,
      },
      {
        name: 'Test2',
        distance: 20,
        selected: true,
      }
    ]

    let expectedResult = [{
      name: 'Test1',
      distance: 10,
      selected: false,
    }]

    expect(component.getEligiblePlanetsForSelection()).toEqual(expectedResult)
  })

  it('should execute when vehicle selection is changed for successful operation', () => {
    spyOn(component, 'updateVehicleImagePath')

    let service = TestBed.get(DataService)
    spyOn(service, 'addVehicleToSelected').and.returnValue(1)
    spyOn(service, 'removeVehicleFromSelected').and.returnValue(1)

    component.changeVehicleSelection({ value: 'New Vehicle' })
    expect(component.updateVehicleImagePath).toHaveBeenCalledWith('New Vehicle')
    expect(component.selectedVehicle).toEqual('New Vehicle')
  })

  it('should execute when vehicle selection is changed for unsuccessful operation', () => {
    spyOn(component, 'updateVehicleImagePath')

    let service = TestBed.get(DataService)
    spyOn(service, 'addVehicleToSelected').and.returnValue(1)
    spyOn(service, 'removeVehicleFromSelected').and.returnValue(0)

    component.changeVehicleSelection({ value: 'New Vehicle' })
    expect(component.updateVehicleImagePath).toHaveBeenCalledWith('New Vehicle')
    expect(component.selectedVehicle).toEqual('New Vehicle')
  })

  it('should update vehicle image path when valid name is passed', () => {
    component.updateVehicleImagePath('Test vehicle')
    expect(component.vehicleImagePath).toEqual('../../../assets/vehicles/test-vehicle.PNG')
  })

  it('should update vehicle image path when invalid name is passed', () => {
    component.updateVehicleImagePath('')
    expect(component.vehicleImagePath).toEqual('')
  })

  it('should return true if vehicle is eligible', () => {
    let service = TestBed.get(DataService)
    spyOn(service, 'checkVehicleEligibility').and.returnValue(true)

    fixture.detectChanges();
    expect(component.checkVehicleEligibility(component.vehicles[0])).toBeTruthy();
  })

  it('should return false if vehicle is not eligible', () => {
    let service = TestBed.get(DataService)
    spyOn(service, 'checkVehicleEligibility').and.returnValue(false)

    fixture.detectChanges();
    expect(component.checkVehicleEligibility(component.vehicles[0])).toBeFalsy();
  })
});
