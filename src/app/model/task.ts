export class Task {
  id: number;
  name: string;
  estimation: number;
  period: number;
  priority: number;
  isUsed: boolean;
  periodNumber: number;
  isCanBeUsed: boolean;
  jobDone: number;
  waitingTime: number;
  private state: number;
  private repeatNumber: number;

  constructor(name?: string, estimation?: number, period?: number) {
    console.log("EMPTY CONSTRUCTOR CALLED");
    this.name = name;
    this.estimation = estimation;
    this.period = period;
    this.setDefaultValues();
  }

  setDefaultValues(){
    this.priority = 0;
    this.isUsed = false;
    this.periodNumber = -1;
    this.isCanBeUsed = true;
    this.jobDone = 0;
    this.waitingTime = 0;
    this.state = State.STOPPED;
    this.repeatNumber = 0;
  }

  increaseWaitingTime(){
    this.waitingTime++;
  }

  wait(){
    this.state = State.STOPPED;
    this.waitingTime--;
  }

  sleep(){
    this.waitingTime--;
    this.state = State.SLEEP;
    console.log("SET STATE TO SLEEP: " + this.state);
  }

  addWork() {
    if (this.state !== State.WORKING) {
      this.state = State.WORKING;
    }
    this.jobDone++;
    if (this.jobDone == this.estimation){
      this.jobDone = 0;
      this.repeatNumber++;
      this.waitingTime += this.period - this.estimation;
    }
  }

  setPeriodUsed(){
    if (this.state !== State.STOPPED)
      this.isUsed = true;
  }

  getState(){
    return this.state;
  }
}

export class State {
  static WORKING: number = 0;
  static STOPPED: number = 1;
  static SLEEP: number = 2;
}
