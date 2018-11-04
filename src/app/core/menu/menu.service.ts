import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const MENUITEMS: Menu[] = [
  {
    state: 'dashboard',
    name: 'HOME',
    type: 'link',
    icon: 'explore'
  },
  {
    state: 'issues',
    name: 'ISSUES',
    type: 'sub',
    icon: 'build',
    badge: [
      {
        type: 'blue-grey', value: '8'
      }
    ],
    children: [
      { state: 'createIssue', name: 'CREATE TASK' },
      { state: 'issueList', name: 'TASK LIST' },
      { state: 'taskBoard', name: 'Task Board' }
    ]
  },
  {
    state: 'account',
    name: 'ACCOUNTS',
    type: 'sub',
    icon: 'pages',
    children: [
      { state: 'createInvoice', name: 'CREATE INVOICE' },
      { state: 'invoiceList', name: 'INVOICE LIST' },
      { state: 'uploadInvoice', name: 'UPLOAD INVOICE' }
    ]
  },
  {
    state: 'apps',
    name: 'Apps',
    type: 'sub',
    icon: 'apps',
    children: [
      { state: 'calendar', name: 'Calendar' },
      { state: 'messages', name: 'Messages' },
      { state: 'chat', name: 'Chat' },
      { state: 'social', name: 'Social' }
    ]
  }
];

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  add(menu: Menu) {
    MENUITEMS.push(menu);
  }
}
