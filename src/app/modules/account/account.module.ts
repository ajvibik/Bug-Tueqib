import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatTabsModule,
  MatListModule,
  MatSlideToggleModule,
  MatSelectModule, 
  MatGridListModule,
  MatDatepickerModule,
  MatProgressBarModule,
  MatNativeDateModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { accountRouter  } from './account.routing';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component'
import { InvoiceListComponent } from './invoice-list/invoice-list.component'
import { UploadInvoiceComponent } from './upload-invoice/upload-invoice.component'
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component'
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(accountRouter),
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatListModule,
    MatSlideToggleModule,
    MatSelectModule,
    FlexLayoutModule,
    FormsModule,
    NgxDatatableModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    HttpClientModule,
    FileUploadModule,
    MatProgressBarModule,
  ],
  declarations: [
    CreateInvoiceComponent,
    InvoiceListComponent,
    UploadInvoiceComponent,
    InvoiceDetailsComponent
  ]
})

export class AccountModule { }
