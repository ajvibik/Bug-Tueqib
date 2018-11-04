import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

constructor() { }
 

// Returns a stored logo (false if none is stored)
getLogo() {
  if (this.hasLogo()) {
    return localStorage['logo'];
  } else {
    return false;
  }
};

 // Returns true if there is a logo stored
 hasLogo() {
  return !!localStorage['logo'];
};

setLogo(logo) {
  localStorage['logo'] = logo;
};

// Checks to see if an invoice is stored
hasInvoice() {
  return !(localStorage['invoice'] == '' || localStorage['invoice'] == null);
};

// Returns a stored invoice (false if none is stored)
getInvoice() {
  if (this.hasInvoice()) {
    return JSON.parse(localStorage['invoice']);
  } else {
    return false;
  }
};

setInvoice(invoice) {
  localStorage['invoice'] = JSON.stringify(invoice);
};

// Clears a stored logo
clearLogo() {
  localStorage['logo'] = '';
};

// Clears a stored invoice
clearinvoice() {
  localStorage['invoice'] = '';
};

// Clears all local storage
clear() {
  localStorage['invoice'] = '';
  this.clearLogo();
};

}
