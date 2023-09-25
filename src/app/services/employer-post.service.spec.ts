import { TestBed } from '@angular/core/testing';

import { EmployerPostService } from './employer-post.service';

describe('EmployerPostService', () => {
  let service: EmployerPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployerPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
