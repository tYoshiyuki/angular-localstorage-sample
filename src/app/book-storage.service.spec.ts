import { TestBed } from '@angular/core/testing';

import { BookStorageService } from './book-storage.service';

describe('BookStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookStorageService = TestBed.get(BookStorageService);
    expect(service).toBeTruthy();
  });
});
