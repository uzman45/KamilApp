import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public isAuthenticated = new BehaviorSubject<boolean>(false);
  constructor(private db: AngularFirestore) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentKamil'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  checkAuthenticated() {
    var authenticated: boolean;
    this.currentUser.subscribe(user => {
      authenticated = user.username ? true : false;
    })

    this.isAuthenticated.next(authenticated);
    return authenticated;
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  setCurrentUserValue(user) {
    if (user) {
      localStorage.setItem('currentKamil', JSON.stringify(user));
      this.isAuthenticated.next(true);
      this.currentUserSubject.next(user);
    }
  }
  // checkUser(username: string, password: string) {

  //   this.db.collection('/users',
  //     ref => ref.where('username', '==', username)
  //       .where('password', '==', password)).valueChanges()
  //     .subscribe(user => {
  //       this.user = user;

  //     });
  //   return this.user;
  // }
  login(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {

      this.db.collection('/users',
        ref => ref.where('username', '==', username)
          .where('password', '==', password)).valueChanges()
        .subscribe(user => {
          if (user.length > 0) {
            this.user = user[0];
            this.isAuthenticated.next(true);
          }
          this.isAuthenticated.next(false);
          resolve(this.user);
        });
    });
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentKamil');
    this.isAuthenticated.next(false);
    this.currentUserSubject.next(null);
  }
}

