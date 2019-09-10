import { Component, AfterViewInit } from '@angular/core';
import { Work, WorkStatus } from "../model/work.model";
import { Chart } from "chart.js";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent implements AfterViewInit {
  public statusFilter: string = "";
  public works: Work[] = [];

  private statusPie: Chart;

  constructor() {
    this.getDataFromStorage();
  }

  public ngAfterViewInit(): void {
    this.makePie();
  }

  public addNewWork(): void {
    const work = new Work();
    this.works.push(work);
    this.setDataInStorage();
  }

  public saveWork(data: Work): void {
    this.setDataInStorage();
  }

  public deleteWork(trackId: string): void {
    this.works = this.works.filter(x => x.trackId !== trackId);
    this.setDataInStorage();
  }

  public uploadToGSpreadSheet(): void {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://script.google.com/macros/s/AKfycbxKhrdrsJy-uJ8VzlMZo1riDhNtLuRe65lcJSCELSQdCXImk30/exec", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = () => {

    };
    xhr.send(this.getFormattedData());
  }

  private getFormattedData(): any {
    const dataArray: any = [];
    for (let work of this.works) {
      const data: any = {};
      data.Id = work.id;
      data.WorkItem = work.item;
      data.DueDate = work.dueDate;
      data.ResourcesNeeded = work.resourceCount;
      dataArray.push(data);
    }
    return dataArray;
  }

  private setDataInStorage(): void {
    window.localStorage.setItem("data", JSON.stringify(this.works));
    this.makePie();
  }

  private getDataFromStorage(): void {
    const data: string = window.localStorage.getItem("data");
    if (data) {
      this.works = JSON.parse(data);
    }
    this.makePie();
  }

  private makePie(): void {
    const overdueCount = this.works.filter(x => x.status === WorkStatus.Overdue).length;
    const doneCount = this.works.filter(x => x.status === WorkStatus.Done).length;
    const inProgressCount = this.works.filter(x => x.status === WorkStatus.InProgress).length;
    if (this.statusPie) {
      this.statusPie.destroy();
    }
    this.statusPie = new Chart("pie", {
      type: 'pie',
      data: {
        datasets: [{
          data: [overdueCount, doneCount, inProgressCount],
          backgroundColor: ["#dd4b39", "#00a65a", "#00c0ef"],
        }],
        labels: [
          'Overdue',
          'Done',
          'In Progress'
        ]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }
}
