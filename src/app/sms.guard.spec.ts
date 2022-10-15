import { TestBed } from '@angular/core/testing';

import { SmsGuard } from './sms.guard';

describe('SmsGuard', () => {
  let guard: SmsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SmsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
