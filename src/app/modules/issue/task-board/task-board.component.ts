import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula/components/dragula.provider';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { IssueService } from '../../../core/services/issue.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})

export class TaskBoardComponent implements OnInit {
  val = 500;
  isDropAllowed = (dragData: any) => {
    return dragData > this.val;
  }
  droppedItems =[];
 
  items = [
    {name: "Apple", type: "fruit",test:1},
    {name: "Carrot", type: "vegetable",test:1},
    {name: "Orange", type: "fruit",test:2}];
    
onItemDrop(e: any) {
// Get the dropped data here
this.droppedItems[e.dragData.test] = 1;

console.log(this.droppedItems)
}
  constructor(
    private dragulaService:DragulaService,
    private issueService : IssueService,
     private firebaseDatabase: AngularFireDatabase,
     private router : Router,
     private tostr: ToastrService
     ) { 
// dragulaService.drop.subscribe((value) => {
//   console.log(`drop: ${value[0]}`);
//   this.onDrop(value.slice(1));
//   const [bagName, e, el] = value;
//   console.log('id is:', e.dataset.id);
  
//   //Bag       
//   console.log(value[0]);

//   // What is moved
//   console.log(value[1]);

//   // Destination
//   console.log(value[2]);

//   // Origin
//   console.log(value[3]);

//   console.log(value[2]['id']);
//   // console.log('value', value);
//   // this.onDrop(value.slice(1));
  

//   // I want to update the `meal_type` here 
//   // and then I can create an updateMealType() 
//   // function that will update Firebase.  
//   // But I don't know how to tell which bag I have 
//   // dropped the 'dish' into as they have the same bag name.

// });

this.dragulaService.drop.subscribe(value => {

  // Get location item is dragged to
  let destination = value[2]['id'];

  // Get item's name and clean it up
  let itemName = value[1]['innerText'];
  itemName = value[1]['innerText'].trim();
  itemName = itemName.slice(0, -5);

  // Update the FireList's itemList
  this.rows.find(item => item.name == itemName).location = destination;

});

let data = this.issueService.getAll();

data.subscribe(item => {

  this.temp = [];
  item.forEach(element => {
      let json = element.payload.toJSON();
      json["$key"] = element.key;
      this.temp.push(json);
  });

  // var temp1 = this.temp.filter(item => item.equippable == true);
  // var a = this.temp.filter(item => item.location == 'armor');
  // var b  = this.temp.filter(item => item.location == 'bagOfHolding');
  // var c  = this.temp.filter(item => item.location == 'misc');
  // var d  = this.temp.filter(item => item.location == 'weapons');

});

  }


  drop(el, target, source, sibling){
    console.log(el, target, source, sibling)
  }

  
  rows = [];
  temp = [];

  ngOnInit() {
    this.issueService.getAll().subscribe(
      list => {
        this.rows = list.map(item => {
          return {
            $key: item.key, 
            ...item.payload.val()
          };
        });
        this.temp = list.map(item => {
          return {
            $key: item.key, 
            ...item.payload.val()
          };
        });
      });
  }

  todos: Object[] = [{
    status: 'New',
    title: 'issue1',
    name: 'Learn Angular 2.0'
  }, {
    status: 'New',
    title: 'issue2',
    name: 'Learn Angular Material 2.0'
  }, {
    status: 'In Progress',
    title: 'issue3',
    name: 'Build examples'
  }, {
    status: 'Completed',
    title: 'issue4',
    name: 'Documentation'
  }, {
    status: 'Completed',
    title: 'issue5',
    name: 'Write about your findings'
  }, {
    status: 'On Hold',
    title: 'issue6',
    name: 'Contribute back to the community'
  } ];


  // Dragula Events
  private hasClass(el: any, name: string) {
    return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(el.className);
  }

  private addClass(el: any, name: string) {
    if (!this.hasClass(el, name)) {
      el.className = el.className ? [el.className, name].join(' ') : name;
    }
  }

  private removeClass(el: any, name: string) {
    if (this.hasClass(el, name)) {
      el.className = el.className.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');
    }
  }

  private onDrag(args) {
    let [e, el] = args;
    console.log(args);
    this.removeClass(e, 'ex-moved');
  }

  private onDrop(args) {
    let [e, el] = args;
    this.addClass(e, 'ex-moved');
    console.log(args)
  }

  private onOver(args) {
    let [e, el, container] = args;
    this.addClass(el, 'ex-over');
  }

  private onOut(args) {
    let [e, el, container] = args;
    this.removeClass(el, 'ex-over');
  }
}
