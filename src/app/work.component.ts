import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Work } from 'src/model/work.model';

@Component({
    selector: "single-work",
    templateUrl: "./work.component.html",
})

export class WorkComponent {
    @Input() public work: Work;
    @Output() private save: EventEmitter<Work> = new EventEmitter<Work>();
    @Output() private delete: EventEmitter<string> = new EventEmitter<string>();

    public editRow(): void {
        this.work.isEditable = true;
    }

    public saveChanges(): void {
        this.work.isEditable = false;
        this.save.emit(this.work);
    }

    public deleteRow(): void {
        this.delete.emit(this.work.trackId);
    }
}
