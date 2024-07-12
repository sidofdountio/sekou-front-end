import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageModal } from 'src/app/model/message-modal';

@Component({
  selector: 'app-message-modale',
  templateUrl: './message-modale.component.html',
  styleUrls: ['./message-modale.component.css']
})
export class MessageModaleComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: MessageModal, private dialogRef: MatDialogRef<MessageModaleComponent>) { }
  save(): void {
    this.data.discase = true;
    this.dialogRef.close(this.data);

  }
  cancel(): void {
    this.data.discase = false;
    this.dialogRef.close(this.data);
  }

}
