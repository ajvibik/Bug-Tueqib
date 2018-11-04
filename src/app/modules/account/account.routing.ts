import { Routes } from '@angular/router';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { UploadInvoiceComponent } from './upload-invoice/upload-invoice.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';

export const accountRouter : Routes = [
    {
        path: '',
        children: [{
          path: 'createInvoice',
          component: CreateInvoiceComponent
        }, {
          path: 'invoiceList',
          component: InvoiceListComponent
        },
        {
            path: 'uploadInvoice',
            component: UploadInvoiceComponent
          },
        {
          path: 'invoiceDetail/:id',
          component : InvoiceDetailsComponent
        }]
      }
]