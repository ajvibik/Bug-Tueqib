import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor() { }
  all() {
    return [{
      name: 'United Arab Emirates (dirham)',
      symbol: 'د.إ'
    },
    {
      name: 'British Pound (£)',
      symbol: '£'
    },
    {
      name: 'Canadian Dollar ($)',
      symbol: 'CAD $ '
    },
    {
      name: 'Euro (€)',
      symbol: '€'
    },
    {
      name: 'Indian Rupee (₹)',
      symbol: '₹'
    },
    {
      name: 'Norwegian krone (kr)',
      symbol: 'kr '
    },
    {
      name: 'US Dollar ($)',
      symbol: '$'
    }
    ]
  }
}
