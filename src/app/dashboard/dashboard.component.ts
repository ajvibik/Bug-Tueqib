import { Component, OnInit } from '@angular/core';
import { IssueService } from '../core/services/issue.service'
import { weather } from 'weather-js';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers : [IssueService]
})
export class DashboardComponent implements OnInit{
  card1;
  card2;
  card3;

  rows = [];

  // Shared chart options
  globalChartOptions: any = {
    responsive: true,
    legend: {
      display: false,
      position: 'bottom'
    }
  };

   // Bar
   barChartLabels: string[] = ['1 Oct', '2 Oct', '3 Oct', '4 Oct', '5 Oct', '6 Oct', '7 Oct'];
   barChartType = 'bar';
   barChartLegend = true;
   barChartData: any[] = [{
     data: [6, 5, 8, 8, 5, 5, 4],
     label: 'Total Issue',
     borderWidth: 0
   }, {
     data: [5, 4, 4, 2, 6, 2, 5],
     label: 'Fixed Issue',
     borderWidth: 0
   }];
   barChartOptions: any = Object.assign({
     scaleShowVerticalLines: false,
     tooltips: {
       mode: 'index',
       intersect: false
     },
     responsive: true,
     scales: {
       xAxes: [{
         gridLines: {
           color: 'rgba(0,0,0,0.02)',
           defaultFontColor: 'rgba(0,0,0,0.02)',
           zeroLineColor: 'rgba(0,0,0,0.02)'
         },
         stacked: true,
         ticks: {
           beginAtZero: true
         }
       }],
       yAxes: [{
         gridLines: {
           color: 'rgba(0,0,0,0.02)',
            defaultFontColor: 'rgba(0,0,0,0.02)',
           zeroLineColor: 'rgba(0,0,0,0.02)'
         },
         stacked: true
       }]
     }
   }, this.globalChartOptions);

   // combo chart
  comboChartLabels: Array <any> = ['1', '2', '3', '4', '5', '6', '7'];
  chartColors: Array <any> = [{ // grey
    backgroundColor: '#7986cb',
    borderColor: '#3f51b5',
    pointBackgroundColor: '#3f51b5',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }, { // dark grey
    backgroundColor: '#eeeeee',
    borderColor: '#e0e0e0',
    pointBackgroundColor: '#e0e0e0',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(77,83,96,1)'
  }, { // grey
    backgroundColor: 'rgba(148,159,177,0.2)',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }];
  comboChartLegend = true;
  ComboChartData: Array <any> = [{
    data: [6, 5, 8, 8, 5, 5, 4],
    label: 'Series A',
    borderWidth: 1,
    type: 'line',
    fill: false
  }, {
    data: [5, 4, 4, 2, 6, 2, 5],
    label: 'Series B',
    borderWidth: 1,
    type: 'bar',
  }];
  ComboChartOptions: any = Object.assign({
    animation: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        }
      }],
      yAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        },
        ticks: {
          beginAtZero: true,
          suggestedMax: 9,
        }
      }]
    }
  }, this.globalChartOptions);

  

  constructor(private issueService : IssueService) {
   // this.fetch((data) => { this.rows = data; });
}

    ngOnInit() {
      this.issueService.getAll().subscribe(
        list => {
          this.rows = list.map(item => {
            return {
              $key: item.key,
              ...item.payload.val()
            };
          });
        });

        // weather.find({search: 'Abu Dhabi, UAE', degreeType: 'F'}, function(err, result) {
        //   if(err) console.log(err);
        //   console.log(JSON.stringify(result, null, 2));
        // });
    }

  // project table
  // fetch(cb) {
  //   const req = new XMLHttpRequest();
  //   req.open('GET', `assets/data/projects.json`);
  //   req.onload = () => {
  //     cb(JSON.parse(req.response));
  //   };
  //   req.send();
  // }
}
