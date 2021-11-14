import { LogLevel, LogService } from './../../services/log.service';
import { DataService } from './../../services/data-service.service';
import { Component, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { Planet } from 'src/app/models/planet';
import { Vehicle } from 'src/app/models/vehicle';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'select-card',
  templateUrl: './select-card.component.html',
  styleUrls: ['./select-card.component.css'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition('void => *', [
        animate(320)
      ]),
      transition('* => void', [
        animate(100)
      ]),
    ])
  ]
})
export class SelectCardComponent implements OnChanges {

  @Input() cardNumber!: number;
  planets: Planet[] = [];
  vehicles: Vehicle[] = [];
  selectedPlanet: string = "";
  selectedVehicle: string = "";
  vehicleImagePath: string = "";
  planetImagePath: string = '../../../assets/none.png';

  constructor( private _dataService: DataService, private _logService: LogService ) { }

  ngOnChanges() {
    this._dataService.getPlanets().subscribe( data => {
      this.planets = data
      this._logService.log(LogLevel.INFO, 'Planets loaded and subscribed for selection for CARD ' + this.cardNumber + '.')
    });

    this._dataService.getVehicles().subscribe( data => {
      this.vehicles = data
      this._logService.log(LogLevel.INFO, 'Vehicles loaded and subscribed for selection for CARD ' + this.cardNumber + '.')
    });
  }

  changePlanetSelection(planetName: string) {
    // Removing vehicle selection to allow fresh selection once planet selection is changed
    this.changeVehicleSelection({ value: '' })

    // Removing previously selected planet
    let returnCode1: number = this._dataService.removePlanetFromSelected(this.selectedPlanet);

    // Adding new selected planet
    let returnCode2: number = this._dataService.addPlanetToSelected(planetName)

    this.selectedPlanet = planetName
    this.updatePlanetImagePath(planetName)

    if ( returnCode1 === 1 && returnCode2 === 1) 
      this._logService.log(LogLevel.SUCCESS, 'Successfully changed planet selection for CARD ' + this.cardNumber + '.')
    else
      this._logService.log(LogLevel.ERROR, 'Planet selection for CARD ' + this.cardNumber + ' failed.')

  }

  updatePlanetImagePath(planetName: string) {
    if (planetName === '')
      this.planetImagePath = '../../../assets/none.png'
    else
      this.planetImagePath = '../../../assets/planets/' + planetName + '.PNG'
  }

  getEligiblePlanetsForSelection() {
    return this.planets.filter( planet => planet.selected !== true )
  }

  changeVehicleSelection(event: any) {
    // Removing previously selected vehicle
    let returnCode1: number = this._dataService.removeVehicleFromSelected(this.selectedVehicle, this.selectedPlanet);

    // Adding new selected vehicle
    let returnCode2: number = this._dataService.addVehicleToSelected(event.value, this.selectedPlanet)
    
    this.selectedVehicle = event.value
    this.updateVehicleImagePath(event.value)

    if (returnCode1 === 1 && returnCode2 === 1) 
      this._logService.log(LogLevel.SUCCESS, 'Successfully changed vehicle selection for CARD ' + this.cardNumber + '.')
    else
      this._logService.log(LogLevel.ERROR, 'Vehicle selection for CARD ' + this.cardNumber + ' failed.')
  }

  updateVehicleImagePath(vehicleName: string) {
    if (vehicleName === '') {
      this.vehicleImagePath = ''
      return
    }

    let indexOfSpace = vehicleName.indexOf(' ')
    let imageName = vehicleName[0].toLowerCase() + vehicleName.substring(1, indexOfSpace) + '-' + vehicleName[indexOfSpace + 1] + vehicleName.substring(indexOfSpace + 2)

    this.vehicleImagePath = '../../../assets/vehicles/' + imageName + '.PNG'
  }

  checkVehicleEligibility(vehicle: Vehicle): boolean {
    return this._dataService.checkVehicleEligibility(vehicle, this.selectedPlanet)
  }

}
