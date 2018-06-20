import {Component, OnInit, ViewChild} from '@angular/core';
import {ScheduleService} from "../../services/schedule.service";
import {Task} from "../../model/task";
import {RmsChartComponent} from "../rms-chart/rms-chart.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tasks: Task[]  = [];
  task: Task = new Task();
  error: string;
  isDrawChart: boolean = false;

  @ViewChild(RmsChartComponent)
  private rmsChartComponent: RmsChartComponent;

  constructor(private scheduleService: ScheduleService) {

    this.tasks.push(new Task('t1', 3, 20));
    this.tasks.push(new Task('t2', 2, 5));
    this.tasks.push(new Task('t3', 2, 10));
  }

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

  drawChart() {
    if (!this.scheduleService.checkPossibilityToSchedule(this.tasks)){
      this.error = "ERROR Can't schedule";
    } else {
      this.error = null;
      this.rmsChartComponent.resetData();
      this.rmsChartComponent.schedule();
    }
  }

  clearChart() {
    this.rmsChartComponent.resetData();
  }
}
