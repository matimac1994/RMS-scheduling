import {Component, Input, OnInit} from '@angular/core';
import {Task} from "../../model/task";

@Component({
  selector: 'app-rms-chart',
  templateUrl: './rms-chart.component.html',
  styleUrls: ['./rms-chart.component.css']
})
export class RmsChartComponent implements OnInit {

  @Input() tasks: Task[];

  constructor() { }

  ngOnInit() {
  }

}
