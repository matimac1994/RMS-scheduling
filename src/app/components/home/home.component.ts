import { Component, OnInit } from '@angular/core';
import {ScheduleService} from "../../services/schedule.service";
import {Task} from "../../model/task";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tasks: Task[] = [];
  task: Task = new Task();
  error: string;

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit() {
  }

  addTaskToList(savedTask: Task){
    this.tasks.push(savedTask);
  }

  processForm(savedTask: Task) {
    if (savedTask.estimation > savedTask.period){
      this.error = "Estimation should be lower than period"
    } else{
      this.addTaskToList(savedTask);
      this.task = new Task();
      this.error = null;
    }

  }

  deleteTask(deletedTask: Task) {
    const index: number = this.tasks.indexOf(deletedTask);
    console.log(index);
    if (index !== -1) {
      console.log("removed" + index);
      this.tasks.splice(index, 1);
    }
  }
}
