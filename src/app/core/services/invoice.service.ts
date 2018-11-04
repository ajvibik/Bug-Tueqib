import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, FormControlName } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private firebaseDatabase: AngularFireDatabase,private formBuilder: FormBuilder,private toastr : ToastrService) { }

invoiceList: AngularFireList<any>;

// form : FormGroup;
// orderForm: FormArray;
// customer_info : FormGroup;
// company_info : FormGroup;
// bank_details :FormGroup;
// items: FormArray;

customer_info = new FormGroup({
  customer_PO: new FormControl('', Validators.required),
  payment_Terms: new FormControl(''),
  contact_Person : new FormControl(''),
  sales_Incharge : new FormControl('', Validators.required),
  address1: new FormControl(''),
  address2: new FormControl('Abu Dhabi'),
  address3 : new FormControl('U.A.E.'),
  trn_no: new FormControl('', Validators.required)
});

company_info = new FormGroup({
  customer_PO: new FormControl(''),
  payment_Terms: new FormControl(''),
  contact_Person : new FormControl(''),
  sales_Incharge : new FormControl(''),
  address1: new FormControl(''),
  address2: new FormControl('Abu Dhabi'),
  address3 : new FormControl('U.A.E.'),
  trn_no: new FormControl('')
});

bank_details = new FormGroup({
  trn_no: new FormControl(''),
  account_name : new FormControl(''),
  account_no : new FormControl(''),
  banker_name : new FormControl(''),
  AED_IBAN : new FormControl('')
});


form = new FormGroup({
  $key: new FormControl(null),
  invoice_no: new FormControl('', Validators.required),
  invoice_date : new FormControl(moment()),
  page_no : new FormControl(1),
  customer_info : this.customer_info,
  bank_details : this.bank_details,
  items :  new FormArray([
    this.createItems()
  ]),
  subTotal:new FormControl(0),
  taxPercent:new FormControl(5),
  tax: new FormControl(0),
  grantTotal:new FormControl(0)
})

  createItems(){ 
    return  new FormGroup({
       name : new FormControl(''),
       qty : new FormControl(0),
       cost : new FormControl(0),
       total : new FormControl(0)
     })
 }

   getSubTotal() {
    let total = 0.00;
    var items = this.form.get('items') as FormArray;
    for (let i = 0; i < items.length; i++) {
      total += (this.form.get('items').value[i].cost * this.form.get('items').value[i].qty);
      var itemsControl = items.controls[0] as FormArray;
     // itemsControl.controls.total.setValue(total);
    }
    this.form.get('subTotal').setValue(total);
    return total;
  }

  getCalculatedTax() {
    var tax = (this.form.get('taxPercent').value * this.getSubTotal()) / 100;
     this.form.get('tax').setValue(tax);
    return tax;
  }

  getTotal() {
    var total = this.getSubTotal() + this.getCalculatedTax();
    this.form.get('grantTotal').setValue(total);
    return total;
  }

  printInvoice() {
    window.print();
  }

   //Get All
   getAll() {
    this.invoiceList = this.firebaseDatabase.list('/invoice');
    return this.invoiceList.snapshotChanges();
  }  

  //Get by ID
  get(id) {
    
     return this.firebaseDatabase.database.ref('/invoice').orderByChild("invoice_no").equalTo("asdc").on("child_added", function (data) {
       console.log(data.val());
      return data.val();
    });
   
  }


  updateForm(data) {
    const item = data.items.value;
    let sub = 0;
    for (let i of item) {
      i.total += (this.form.get('items')[i].cost * this.form.get('items')[i].qty)
      this.form.get('items')[i].total.setValue(i.total);
    }
    this.form.value.subTotal = sub;
    const tax = sub * (this.form.value.taxPercent / 100);
    this.form.value.tax = tax;
    this.form.value.grantTotal = sub + tax;
  }

  addItem() {
    let item = this.form.get('items') as FormArray;
    item.push(this.createItems());
  }

  //POST
  add(invoice) {
    this.invoiceList.push({
      invoice_no: invoice.invoice_no,
      invoice_date : invoice.invoice_date,
      page_no : invoice.page_no,
      customer_info : invoice.customer_info,
      bank_details : invoice.bank_details,
      items : invoice.items,
      subTotal:invoice.subTotal,
      taxPercent:invoice.taxPercent,
      tax: invoice.tax,
      grantTotal:invoice.grantTotal
    });
  }

  //PUT
  update(invoice) {
    this.invoiceList.update(invoice.$key, invoice);
  }

  //DELETE
  deleteRow($key: string) {
    this.invoiceList.remove($key);
  }

  edit(data) {
    this.form.setValue(data);
  }

}
