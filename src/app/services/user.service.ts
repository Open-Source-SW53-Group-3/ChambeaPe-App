import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, retry } from 'rxjs';
import { UserRoles } from '../enums/user-roles.enum';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userRoles: UserRoles[] = [];
  userRolesChanged: EventEmitter<UserRoles[]> = new EventEmitter();

  constructor(private http: HttpClient) {}

  setUserRoles(roles: UserRoles[]) {
    this.userRoles = roles;
    this.userRolesChanged.emit(this.userRoles);
  }

  hasRole(role: UserRoles): boolean {
    return this.userRoles.includes(role);
  }

  getUserById(id: any): Observable<User> {
    return this.http.get<User>(environment.baseUrl + '/users/' + id)
      .pipe(
        retry(1),
        catchError(error => {
          console.error('Error getting user:', error);
          throw error;
        })
    );
  }


}
