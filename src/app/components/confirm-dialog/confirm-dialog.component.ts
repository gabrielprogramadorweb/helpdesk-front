import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnChanges {
  @Input() isVisible: boolean = false;
  @Input() entityName: string = '';  
  @Input() entityType: string = '';  
  @Output() confirmed = new EventEmitter<boolean>();

  modalClass: string = '';

  ngOnChanges() {
    this.modalClass = this.isVisible ? 'modal-show' : '';
  }

  close() {
    this.isVisible = false;
    this.confirmed.emit(false);
  }

  confirm() {
    this.isVisible = false;
    this.confirmed.emit(true);
  }
}
