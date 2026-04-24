import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { geustGuard } from './geust-guard';

describe('geustGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => geustGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
