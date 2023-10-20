import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkerProfileService } from 'src/app/services/worker-profile.service';
import { Worker } from 'src/app/models/worker';
import { UserService } from 'src/app/services/user.service';
import { UserRoles } from 'src/app/enums/user-roles.enum';
import { Router } from '@angular/router';
import  { MatDialog } from '@angular/material/dialog';
import { CertificateDialogComponent } from '../profile/components/certificate-dialog/certificate-dialog.component';

@Component({
  selector: 'app-worker-profile',
  templateUrl: './worker-profile.component.html',
  styleUrls: ['./worker-profile.component.scss']
})
export class WorkerProfileComponent {


}
