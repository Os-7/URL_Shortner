import { TestBed } from '@angular/core/testing';

import { ShortLinkService } from './short-link.service';

describe('ShortLinkService', () => {
  let service: ShortLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShortLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
