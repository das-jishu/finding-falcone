import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export enum LogLevel {
  'ALL' = 0,
  'SUCCESS' = 1,
  'INFO' = 2,
  'WARN' = 3,
  'ERROR' = 4,
}

@Injectable({
  providedIn: 'root'
})
export class LogService {

  colorCode: string = '#000000';

  constructor() { 
    this.log(LogLevel.INFO, 'STARTING LOGS.')
  }

  log(type: LogLevel, message: string) {
    if (environment.showLogs === false)
      return

    switch(type) {
      case LogLevel.SUCCESS:
        this.colorCode = 'green'
        break;
      case LogLevel.INFO:
        this.colorCode = 'blue'
        break;
      case LogLevel.WARN:
        this.colorCode = '#ddd60b'
        break;
      case LogLevel.ERROR:
        this.colorCode = 'red'
        break;
    }

    const date = new Date().toString();
    const text = date + " : " + message;
    console.log('%c'+text, 'color: '+this.colorCode+';')
  }
}
