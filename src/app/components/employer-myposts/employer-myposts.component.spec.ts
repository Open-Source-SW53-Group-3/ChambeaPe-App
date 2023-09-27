import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerMypostsComponent } from './employer-myposts.component';

describe('EmployerMypostsComponent', () => {
  let component: EmployerMypostsComponent;
  let fixture: ComponentFixture<EmployerMypostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployerMypostsComponent]
    });
    fixture = TestBed.createComponent(EmployerMypostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
