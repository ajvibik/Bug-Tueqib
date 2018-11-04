import { Routes } from '@angular/router';
import { CreateIssueComponent } from './create-issue/create-issue.component';
import { IssueListComponent } from './issue-list/issue-list.component';
import { TaskBoardComponent } from './task-board/task-board.component';
import { DetailViewComponent } from './detail-view/detail-view.component';

export const issueRoute : Routes=[
    {
        path: '',
        children: [{
          path: 'createIssue',
          component: CreateIssueComponent
        }, {
          path: 'issueList',
          component: IssueListComponent
        },
        {
            path: 'taskBoard',
            component: TaskBoardComponent
          },
        {
          path: 'detailpage/:id',
          component : DetailViewComponent
        }]
      }
]

