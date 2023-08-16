import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { UserApi } from '../api/user.api';
import { FormsModule } from '@angular/forms';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from '../models/user';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let userApi: UserApi;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        {
          provide: UserApi,
          useValue: {
            getAllUsers: jest.fn(),
            searchUser: jest.fn()
          }
        }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    userApi = TestBed.get(UserApi);
  });

  it('should create', () => {

  });

  it('can search user by first name', () => {
    const user: User = { first: 'Reza', id: '23' };
    const users = [user];
    const response$ = cold('-----a|', {a: users });
    userApi.searchUser = jest.fn(() => response$);
    component.search('Reza');
    getTestScheduler().flush();
    expect(component.users).toEqual(users);
  });

  it('RACE CONDITION: can search user by first name', () => {

  });

  it('RACE CONDITION FIXED: can search user by first name', () => {
   
  });
});

