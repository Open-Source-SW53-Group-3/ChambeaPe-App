import { EventEmitter, Injectable } from '@angular/core';
import { UserRoles } from '../enums/user-roles.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userRoles: UserRoles[] = [];
  userRolesChanged: EventEmitter<UserRoles[]> = new EventEmitter();

  constructor() {}

  setUserRoles(roles: UserRoles[]) {
    this.userRoles = roles;
    this.userRolesChanged.emit(this.userRoles);
  }

  hasRole(role: UserRoles): boolean {
    return this.userRoles.includes(role);
  }
}
