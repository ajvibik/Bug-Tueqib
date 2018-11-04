import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firebaseDatabase: AngularFireDatabase) { }
  userList: AngularFireList<any>;

  form = new FormGroup({
    $key: new FormControl(null),
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    phone: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password: new FormControl('', Validators.required)
  });

  //GET
  getUsers() {
    this.userList = this.firebaseDatabase.list('user');
    return this.userList.snapshotChanges();
  }

  //POST
  addUser(user) {
    this.userList.push({
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password
    });
  }

  //PUT
  updateUser(data) {
    this.userList.update(data.$key,
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password
      });
  }

  //DELETE
  deleteRow($key: string) {
    this.userList.remove($key);
  }

  //inlineEditTable
  editRow(data) {
    this.form.setValue(data);
  }


}
