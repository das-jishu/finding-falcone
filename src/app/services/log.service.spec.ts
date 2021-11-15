import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { LogLevel, LogService } from './log.service';

describe('LogService', () => {
  let service: LogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogService);
    service.colorCode = '#000000'
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not change color if showLogs is false', () => {
    environment.showLogs = false
    service.log(LogLevel.ERROR, '')
    expect(service.colorCode).toBe('#000000')
  })

  it('should set color to red for ERROR logs', () => {
    environment.showLogs = true
    service.log(LogLevel.ERROR, '')
    expect(service.colorCode).toEqual('red')
  })

  it('should set color to yellow for WARNING logs', () => {
    environment.showLogs = true
    service.log(LogLevel.WARN, '')
    expect(service.colorCode).toEqual('#ddd60b')
  })

  it('should set color to green for SUCCESS logs', () => {
    environment.showLogs = true
    service.log(LogLevel.SUCCESS, '')
    expect(service.colorCode).toEqual('green')
  })

  it('should set color to blue for INFO logs', () => {
    environment.showLogs = true
    service.log(LogLevel.INFO, '')
    expect(service.colorCode).toEqual('blue')
  }) 

});
