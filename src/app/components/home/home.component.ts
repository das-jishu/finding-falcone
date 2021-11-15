import { APIService } from './../../services/api-service.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LogLevel, LogService } from './../../services/log.service';
import { Router } from '@angular/router';
import { DataService } from './../../services/data-service.service';
import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeIn', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1000)
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  isLoading: boolean = true
  ready: boolean = false
  planetsSelected: string[] = []
  vehiclesSelected: string[] = []
  timeTaken: { time: number } = { time: 0 }

  constructor( private _apiService: APIService, private _dataService: DataService, private router: Router, private _logService: LogService ) { 
  }

  ngOnInit(): void {
    this._logService.log(LogLevel.INFO, 'Home Component initialized.')

    this._dataService.initializeAll();

    this._apiService.getAllPlanets().pipe(
      catchError( error => {
        this.router.navigate(['/error', (error.status || 404)])
        return throwError(error)
      })
    ).subscribe(() => {
      this.isLoading = false
    });

    this._apiService.getAllVehicles().pipe(
      catchError( error => {
        this.router.navigate(['/error', (error.status || 404)])
        return throwError(error)
      })
    ).subscribe(() => {
      this.isLoading = false
    });
  }

  readyAll() {
    this.ready = true;
    this._logService.log(LogLevel.INFO, 'Status is changed to Ready.')

    this._dataService.getTimeTaken().pipe(
      catchError( error => {
        this.router.navigate(['/error', (error.status || 404)])
        return throwError(error)
      })
    ).subscribe((data) => {
      this.timeTaken = data
      this._logService.log(LogLevel.INFO, 'Total time taken loaded and subscribed.')
    });

    this._dataService.getSelectedPlanets().pipe(
      catchError( error => {
        this.router.navigate(['/error', (error.status || 404)])
        return throwError(error)
      })
    ).subscribe((data) => {
      this.planetsSelected = data
      this._logService.log(LogLevel.INFO, 'Selected planets loaded and subscribed.')
    });

    this._dataService.getSelectedVehicles().pipe(
      catchError( error => {
        this.router.navigate(['/error', (error.status || 404)])
        return throwError(error)
      })
    ).subscribe((data) => {
      this.vehiclesSelected = data
      this._logService.log(LogLevel.INFO, 'Selected vehicles loaded and subscribed.')
    }); 
  }

  generateResults() {
    this.router.navigate(['/result'])
    this._logService.log(LogLevel.INFO, 'Navigated to Result Component.')
  }

  reset() {
    location.reload();
  }

}
