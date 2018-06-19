import { Injectable } from '@angular/core';
import {State, Task} from "../model/task";

@Injectable()
export class ScheduleService {

  historyTable: State[][];
  tasks: Task[];

  constructor() { }

  resetValues(){
    this.historyTable = [];
    this.tasks = [];
  }

  checkPossibilityToSchedule(tasks: Task[]){
    let sum = 0;
    for (let task of tasks){
      sum += task.estimation/task.period;
    }
    return sum <= 1;
  }

  setPriorities(){
    let highestPriority = this.tasks.length;
    let t = new Task();
    for (let i = 0; i < this.tasks.length; i++){
      for (let j = i; j < this.tasks.length-1; j++){
        if (this.tasks[j].period > this.tasks[j+1].period){
          t = this.tasks[j];
          this.tasks[j] = this.tasks[j+1];
          this.tasks[j+1] = t;
        }
      }
    }

    for (let i = 0; i < this.tasks.length; i++){
      this.tasks[i].priority = highestPriority--;
    }
  }

  schedule(tasks: Task[]){
    this.tasks = tasks;
    this.setPriorities();
    this.fillHistoryTable();
    let period;
    let isProcessorWorking = false;
    let maximumPeriod =  this.getMaximumPeriod();
    for (let i = 0; i < maximumPeriod; i++) {
      isProcessorWorking = false;
      for (let j = 0; j < this.tasks.length; j++){
        period = this.tasks[j].period;

        this.checkIsPeriodUsed(i, period, j);
        this.checkIsTaskCanBeUsed(j);
        this.checkWaitingTime(j);

        if (this.tasks[j].waitingTime > 0){
          this.tasks[j].wait();
        } else {
          if (isProcessorWorking === false){
            this.tasks[j].addWork();
            isProcessorWorking = true;
            this.tasks[j].setPeriodUsed();
          } else {
            if (this.tasks[j].getState() !== State.STOPPED)
              this.tasks[j].sleep();
            else
              this.tasks[j].wait();
          }
        }
      }
      this.saveState();
    }

    return this.historyTable;
  }

  private checkIsPeriodUsed(i: number, period: any, j: number) {
    if (i%period == 0){
      this.tasks[j].isUsed = false;
      this.tasks[j].periodNumber = this.tasks[j].periodNumber++;
      console.log("IS PERIOD USED: " + this.tasks[j].isUsed + " " + this.tasks[j].periodNumber)
    }
  }

  getMaximumPeriod(){
    let maximumPeriod = 0;
    for (let task of this.tasks){
      if (task.period > maximumPeriod)
        maximumPeriod = task.period;
    }
    //console.log("MAXIMUM PERIOD: " + maximumPeriod);
    return maximumPeriod;
  }

  private checkIsTaskCanBeUsed(j: number) {
    if (this.tasks[j].isUsed == false){
      this.tasks[j].isCanBeUsed = this.tasks[j].jobDone == 0;
    }

    //console.log("TASK CAN BE USED: " + this.tasks[j].name + " " + this.tasks[j].isCanBeUsed);
  }

  private checkWaitingTime(j: number) {
    if (this.tasks[j].isCanBeUsed == false)
      this.tasks[j].increaseWaitingTime();
    //console.log("CHECK WAITING TIME:" + this.tasks[j].name + " " + this.tasks[j].waitingTime)
  }

  // TODO RECOGNIZE TASKS IN HISTORY TABLE
  private saveState() {
    for (let j = 0; j < this.tasks.length; j++){
      this.historyTable[j].push(this.tasks[j].getState());
      console.log("SAVE STATE: " + this.tasks[j].getState());
    }
  }

  private fillHistoryTable() {
    this.historyTable = [];
    for (let i = 0; i < this.tasks.length; i++){
      this.historyTable[i] = [];
    }
  }

  getTasks(){
    return this.tasks;
  }
}
