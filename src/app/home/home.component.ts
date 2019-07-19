import {Component, ViewChild} from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService, AuthenticationService } from '../_services';

import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'table-overview-example',
  styleUrls: ['table-overview-example.css'], 
  templateUrl: 'home.component.html' 
  })
export class HomeComponent {
    displayedColumns = ['id', 'name', 'progress', 'color'];
    loading = false;
    users: User[];

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
    }

    
}