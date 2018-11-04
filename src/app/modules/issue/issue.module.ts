import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
  MatButtonModule,
  MatProgressBarModule,
  MatSelectModule,
  MatGridListModule,
  MatToolbarModule,
  MatChipsModule,
  MatListModule,
  MatCheckboxModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { TreeModule } from 'angular-tree-component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FlexLayoutModule } from '@angular/flex-layout';

import { issueRoute } from './issue.routing';
import { CreateIssueComponent } from './create-issue/create-issue.component';
import { IssueListComponent } from './issue-list/issue-list.component';
import { TaskBoardComponent } from './task-board/task-board.component';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { DragulaModule, DragulaService } from "ng2-dragula/ng2-dragula";
import { NgDragDropModule } from 'ng-drag-drop';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(issueRoute),
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatProgressBarModule,
    MatToolbarModule,
    FlexLayoutModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    MatSelectModule,
    MatGridListModule,
    TreeModule,
    MatChipsModule,
    DragulaModule,
    MatListModule,
    MatCheckboxModule,
    NgDragDropModule
  ],
  declarations: [
    CreateIssueComponent,
    IssueListComponent,
    TaskBoardComponent,
    DetailViewComponent
  ]
})
export class IssueModule { }
