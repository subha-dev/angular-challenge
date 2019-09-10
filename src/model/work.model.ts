import uuidv1 from "uuid/v1";

export enum WorkStatus {
    Overdue = "overdue",
    Done = "done",
    InProgress = "in_progress"
}

export class Work {
    public id: number = 0;
    public item: string = "";
    public dueDate: string = "";
    public resourceCount: number = 0;
    public status: WorkStatus = WorkStatus.InProgress;
    public isEditable: boolean = true;
    public trackId: string = uuidv1();
}