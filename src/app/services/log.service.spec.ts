import { TestBed } from '@angular/core/testing';

import { LogLevel, LogService } from './log.service';

describe('LogService', () => {
  let service: LogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set color to red for ERROR logs', () => {
    service.log(LogLevel.ERROR, '')
    expect(service.colorCode).toEqual('red')
  })

  it('should set color to yellow for WARNING logs', () => {
    service.log(LogLevel.WARN, '')
    expect(service.colorCode).toEqual('#ddd60b')
  })

  it('should set color to green for SUCCESS logs', () => {
    service.log(LogLevel.SUCCESS, '')
    expect(service.colorCode).toEqual('green')
  })

  it('should set color to blue for INFO logs', () => {
    service.log(LogLevel.INFO, '')
    expect(service.colorCode).toEqual('blue')
  }) 

});
