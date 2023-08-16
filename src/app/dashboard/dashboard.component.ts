import { Component, OnInit } from '@angular/core';
import { UserApi } from '../api/user.api';
import { User } from '../models/user';
import { Subject, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searchTerm$ = new Subject<string>();
  subscription: Subscription;
  constructor(private userApi: UserApi) {
    this.subscription =   this.searchTerm$
      .pipe(switchMap(first => this.userApi.searchUser(first)))
      .subscribe(users => (this.users = users));
  }
  users = [];
  ngOnInit() {}

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  search(first) {
    this.userApi.searchUser(first).subscribe(users => (this.users = users));
  }

  onKeyUp(first) {
    this.searchTerm$.next(first);
  }
}
