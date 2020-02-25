import { TestBed } from '@angular/core/testing';

import { RequestToSmartReportingBatch } from './RequestToSmartReportingBatch.service';

describe('AuthentificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestToSmartReportingBatch = TestBed.get(RequestToSmartReportingBatch);
    expect(service).toBeTruthy();
  });
});
