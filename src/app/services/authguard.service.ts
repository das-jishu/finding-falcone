import { DataService } from './data-service.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor( private router: Router, private _dataService: DataService ) { }

  canActivate(): boolean {
    if (this._dataService.isReadyForResult())
      return true;
    
    this.router.navigate(['/home']);
    return false;
  }
}
