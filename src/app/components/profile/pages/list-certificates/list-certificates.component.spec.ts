import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCertificatesComponent } from './list-certificates.component';

describe('ListCertificatesComponent', () => {
  let component: ListCertificatesComponent;
  let fixture: ComponentFixture<ListCertificatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCertificatesComponent]
    });
    fixture = TestBed.createComponent(ListCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
