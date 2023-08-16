import { Component, OnInit } from '@angular/core';
import { UserApi } from '../api/user.api';
import { User } from '../models/user';
import { Subject, Subscription, asyncScheduler } from 'rxjs';
import { debounceTime, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users = [];
  searchTerm$ = new Subject<string>();
  debounce = 500;
  scheduler = asyncScheduler;
  subscription: Subscription;
  searchUserSubscription: Subscription;

  constructor(private userApi: UserApi) {
    // this.subscription =   this.searchTerm$
    //   .pipe(switchMap(first => this.userApi.searchUser(first)))
    //   .subscribe(users => (this.users = users));
  }
  ngOnInit() {
    this.searchUserSubscription =   this.searchTerm$
      .pipe(
        tap(s => console.log('going to debounce for, ', this.debounce)),
        debounceTime(this.debounce, this.scheduler),
        switchMap(first => {
          console.log('searching via Api');
          return this.userApi.searchUser(first);
        })
      )
      .subscribe(users => (this.users = users));
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  search(first) {
    this.userApi.searchUser(first).subscribe(users => (this.users = users));
  }

  onKeyUp(first) {
    console.log('doing next on searchTearm$');
    this.searchTerm$.next(first);
  }
}
