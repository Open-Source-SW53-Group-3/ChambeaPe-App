import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.scss']
})
export class JobPostComponent {

  formData: any = {
    title: '',
    area: '',
    description: '',
    amount: null,
    address: '',
    department: '',
    district: '',
    references: '', // Agregamos 'references' aquí
    location: '',
    space: '',
    isMessages: false,
    isTownChambeador: false,
    isPremium: false,
  };

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  premiumGroup: FormGroup;
  settingGroup: FormGroup;
  notificationGroup: FormGroup;

  isLinear = false;
  selectedFile: File | null = null;

  constructor(private _formBuilder: FormBuilder,  private _snackBar: MatSnackBar) {
    this.firstFormGroup = this._formBuilder.group({
      title: ['', Validators.required], 
      area: ['', Validators.required], 
      description: ['', Validators.required], 
      amount: [null, [Validators.required, Validators.min(1)]] 
    });

    this.secondFormGroup = this._formBuilder.group({
      address: ['', Validators.required], 
      department: ['', Validators.required], 
      district: ['', Validators.required],      
      references: ['', Validators.required],
      space: ['', Validators.required]
    });

    this.premiumGroup = this._formBuilder.group({
      isPremium: [false],
    });

    this.settingGroup = this._formBuilder.group({
      isTownChambeador: [false],
    });

    this.notificationGroup = this._formBuilder.group({
      isMessages: [false],
    });
  }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] || null;
  }

  uploadFile(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      const uploadUrl = 'your-upload-endpoint';
      const xhr = new XMLHttpRequest();
      xhr.open('POST', uploadUrl, true);
      xhr.onload = () => {
        if (xhr.status === 200) {
          console.log('File uploaded:', xhr.responseText);
        } else {
          console.error('Error uploading file:', xhr.statusText);
        }
      };
      xhr.send(formData);
    } else {
      console.log('No file selected.');
    }
  }

  public GetFileOnLoad(event: any) {
    const file = event.target.files[0];
    const element = document.getElementById("fakeFileInput") as HTMLInputElement | null;
    if (element) {
      element.value = file?.name;
    }
  }

  enviarDatos() {
    // Verifica si el formulario es válido
    if (
      this.firstFormGroup.valid &&
      this.secondFormGroup.valid
      // Agrega otras condiciones si es necesario
    ) {
      const datos = {
        title: this.firstFormGroup.value.title,
        area: this.firstFormGroup.value.area,
        description: this.firstFormGroup.value.description,
        amount: this.firstFormGroup.value.amount,
        address: this.secondFormGroup.value.address,
        department: this.secondFormGroup.value.department,
        district: this.secondFormGroup.value.district,
        location: this.formData.location,
        references: this.secondFormGroup.value.references,
        space: this.secondFormGroup.value.space,
        isMessages: this.notificationGroup.value.isMessages,
        isTownChambeador: this.settingGroup.value.isTownChambeador,
        isPremium: this.premiumGroup.value.isPremium,
      };
  
      console.log('Datos a enviar:', datos);
      this._snackBar.open('Datos enviados con éxito', 'Cerrar', {
        duration: 3000, // Duración en milisegundos del mensaje
      });
    } else {
      // El formulario no es válido, muestra un mensaje de error
      this._snackBar.open('Por favor, complete todos los campos requeridos', 'Cerrar', {
        duration: 3000,
      });
    }
  }
}
