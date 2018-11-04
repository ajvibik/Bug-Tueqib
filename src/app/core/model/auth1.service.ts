import { Injectable } from '@angular/core';
import { Router  } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/observable';
import { switchMap } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import { User } from './user';
import { observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth1Service {
  private userDoc: AngularFirestoreDocument<User>
  user$ : Observable<User>;

  constructor( private fireAuth:AngularFireAuth, private fireStore:AngularFirestore, private router : Router) {
    this.user$ = this.fireAuth.authState
    .pipe(switchMap((user) =>{
      if(user){
          return this.fireStore.doc<User>(`users/${user.uid}`).valueChanges();
      }
      else{
        return Observable.of(null);
      }
    }))
   }

   
    ///// Login/Signup //////

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.fireAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user)
      })
  }

  signOut() {
    this.fireAuth.auth.signOut()
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.fireStore.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      roles: {
        subscriber: true
      }
    }
    return userRef.set(data, { merge: true })
  }
}
