import {Component, ViewChild} from '@angular/core';
import { first } from 'rxjs/operators';
import {MatTabsModule} from '@angular/material/tabs';
import { User } from '../_models';
import { UserService, AuthenticationService } from '../_services';
import data from './data.json';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'table-overview-example',
  styleUrls: ['table-overview-example.css'], 
  templateUrl: 'home.component.html' 
  })
export class HomeComponent {
    displayedColumns = ['id', 'name', 'phone', 'email', 'company','date_entry','org_num','address_1','city','zip','geo','pan','pin','status','fee','date_exit','date_first','date_recent','url', 'actions'];
    dataSource: MatTableDataSource<UserData>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    loading = false;
    users: User[];

    //constructor(private userService: UserService) { }
    constructor() {
      // Create 100 users
      console.log(data[0]);
      const users: UserData[] = data;
      //for (let i = 0; i <= data.length; i++) { users.push(); }

      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(users);
    }

    ngOnInit() {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
    
}

export interface UserData {
  id: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  date_entry: Date;
  org_num: string;
  address_1: string;
  city: string;
  zip: string;
  geo: string;
  pan: string;
  pin: string;
  status: string;
  fee: string;
  date_exit: Date;
  date_first: Date;
  date_recent: Date;
  url: string;
}