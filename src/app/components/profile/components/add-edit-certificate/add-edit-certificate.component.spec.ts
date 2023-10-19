import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCertificateComponent } from './add-edit-certificate.component';

describe('AddEditCertificateComponent', () => {
  let component: AddEditCertificateComponent;
  let fixture: ComponentFixture<AddEditCertificateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditCertificateComponent]
    });
    fixture = TestBed.createComponent(AddEditCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
