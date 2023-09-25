import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerPostComponent } from './employer-post.component';

describe('EmployerPostComponent', () => {
  let component: EmployerPostComponent;
  let fixture: ComponentFixture<EmployerPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployerPostComponent]
    });
    fixture = TestBed.createComponent(EmployerPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
