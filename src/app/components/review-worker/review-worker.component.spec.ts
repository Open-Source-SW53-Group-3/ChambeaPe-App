import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewWorkerComponent } from './review-worker.component';

describe('ReviewWorkerComponent', () => {
  let component: ReviewWorkerComponent;
  let fixture: ComponentFixture<ReviewWorkerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewWorkerComponent]
    });
    fixture = TestBed.createComponent(ReviewWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
