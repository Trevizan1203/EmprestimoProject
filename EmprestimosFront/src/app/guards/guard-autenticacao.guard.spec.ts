import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guardAutenticacaoGuard } from './guard-autenticacao.guard';

describe('guardAutenticacaoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guardAutenticacaoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
