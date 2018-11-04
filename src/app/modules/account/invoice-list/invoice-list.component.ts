import { Component, Input, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InvoiceService } from '../../../core/services/invoice.service'
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent {

  invoiceList : AngularFireList<any>;
  deleteUserMsg : boolean;
  rows = [];
  temp = [];
  selected = [];


  constructor(private invoiceService: InvoiceService,private firebaseDatabase: AngularFireDatabase,private router : Router,private tostr: ToastrService) {
  }

  ngOnInit() {
    this.invoiceService.getAll().subscribe(
      list => {
        this.rows = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
        this.temp = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
  }
}
