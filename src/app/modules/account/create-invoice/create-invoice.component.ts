import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, FormControlName } from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { InvoiceService } from '../../../core/services/invoice.service';
import * as jspdf from 'jspdf'; 
import { html2canvas } from 'html2canvas'; 

export interface Incharge {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})

export class CreateInvoiceComponent implements OnInit {

  @ViewChild('invoice') invoice :ElementRef;
  // form : FormGroup;
  // orderForm: FormArray;
  // customer_info : FormGroup;
  // company_info : FormGroup;
  // bank_details :FormGroup;
  // items: FormArray;

  rows = [];
  showSuccessMsg: boolean;
  formcontrols = this.invoiceService.form.controls;


  // Standard tabs demo
  tabs = [
    {
      label: 'Tax Invoice',
      show: 'invoice'
    }, {
      label: 'Delivery Note',
      show: 'note'
    }
  ];

  incharge: Incharge[] = [
    { value: 1, viewValue: 'Bhuram' },
    { value: 2, viewValue: 'Rafi' },
    { value: 3, viewValue: 'Salam' },
    { value: 4, viewValue: 'Thowsif' }
  ];


  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private invoiceService: InvoiceService) {
    this.invoiceService.form.valueChanges.subscribe(data => this.updateForm(data));
  }

  ngOnInit() {
    this.invoiceService.getAll();
  }


  getSubTotal() {
    return this.invoiceService.getSubTotal();
  }

  getCalculatedTax() {
    return this.invoiceService.getCalculatedTax();
  }

  getTotal() {
    return this.invoiceService.getTotal();
  }

  printInvoice() {
    this.invoiceService.printInvoice();
  }

  removeItem(item) {
    this.removeItem(item);
  }

  updateForm(data) {
    this.invoiceService.updateForm(data);
  }

  addItem() {
    this.invoiceService.addItem();
  }

  clearInvoice(){
    this.invoiceService.form.reset();
  }

  addInvoice() {
    if (this.invoiceService.form.valid) {
      if (this.invoiceService.form.get('$key').value == null) {
        this.invoiceService.add(this.invoiceService.form.value);
        this.toastr.success('Submitted Succcessfully', 'Invoice Added');
      }
    }
  }

  public generatePDF() 
 { 
//  var data = document.getElementById('contentToConvert'); 
//  html2canvas(data).then(canvas => { 
//  var imgWidth = 208; 
//  var pageHeight = 295; 
//  var imgHeight = canvas.height * imgWidth / canvas.width; 
//  var heightLeft = imgHeight; 
 
//  const contentDataURL = canvas.toDataURL('image/png') 
//  let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF 
//  var position = 0; 
//  pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight) 
//  pdf.save('MYPdf.pdf'); // Generated PDF  
//  }); 

let doc = new jspdf;
 } 

}
