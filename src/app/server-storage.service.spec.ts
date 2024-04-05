import { TestBed } from '@angular/core/testing';

import { ServerStorageService } from './server-storage.service';

describe('ServerStorageService', () => {
  let service: ServerStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
