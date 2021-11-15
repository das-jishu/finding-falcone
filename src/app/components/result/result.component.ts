import { Router } from '@angular/router';
import { LogLevel, LogService } from './../../services/log.service';
import { DataService } from './../../services/data-service.service';
import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  result: any; 
  timeTaken: number = 0
  isLoading: boolean = true

  constructor( private _dataService: DataService, private _logService: LogService, private router: Router ) { 
    
  }

  ngOnInit() {
    this._dataService.getResults().pipe(
      catchError(error => {
        this.router.navigate(['/error', (error.status || 404)])
        return this._dataService.errorHandler(error, false);
      })
    ).subscribe(data => {
      this.result = data;
      this.isLoading = false
      this._logService.log(LogLevel.SUCCESS, 'Final result loaded successfully.')
    });

    this.timeTaken = this._dataService.getTotalTimeTaken()
  }

  reset() {
    this._logService.log(LogLevel.WARN, 'Resetting application.')
    this.reloadPage()
  }

  reloadPage() {
    location.reload()
  }

}
