import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {State, Task} from "../../model/task";
import {ScheduleService} from "../../services/schedule.service";

@Component({
  selector: 'app-rms-chart',
  templateUrl: './rms-chart.component.html',
  styleUrls: ['./rms-chart.component.css']
})
export class RmsChartComponent implements OnInit {

  @Input() tasks: Task[];

  stateTable: State[][];
  scheduledTasks: Task[];

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit() {
    this.schedule()
  }

  schedule(){
    if (this.scheduleService.checkPossibilityToSchedule(this.tasks)){
      this.stateTable = this.scheduleService.schedule(this.tasks);
      this.scheduledTasks = this.scheduleService.getTasks();
    }
  }

  resetData() {
    this.scheduledTasks = [];
    this.stateTable = [];
    this.scheduleService.resetValues();
  }
}
