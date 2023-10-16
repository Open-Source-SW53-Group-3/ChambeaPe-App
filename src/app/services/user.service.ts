import { Injectable } from '@angular/core';
import { UserRoles } from '../enums/user-roles.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userRoles: UserRoles[] = [];

  constructor() {}

  setUserRoles(roles: UserRoles[]) {
    this.userRoles = roles;
  }

  hasRole(role: UserRoles): boolean {
    return this.userRoles.includes(role);
  }
}
