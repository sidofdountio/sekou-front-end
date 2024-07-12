import { Injectable } from '@angular/core';
import { MessageModal } from '../model/message-modal';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MessageModaleComponent } from '../util/message-modale/message-modale.component';

@Injectable({
  providedIn: 'root'
})
export class MessageModalService {
  messageModaleData: MessageModal = {
    message: '',
    discase: false
  }
  
  // will be use to whether user had click on close button.
  discase:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private dialogue: MatDialog) { }

  confirmMessage(message:string):void{
    // dialogConfig
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    this.messageModaleData.message=message;
    dialogConfig.data =this.messageModaleData;
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    // dialogRef
    const dialogRef:MatDialogRef<MessageModaleComponent>=this.dialogue.open(MessageModaleComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(
      response=>{
        // receive information from modal compone after close it.
        // set it to our diacase,messgeModaleData
        this.discase.next(response);
      },error=>{
        console.log('error after close modale message type %s',error);
      }
    );
  }

  closeEditeDialog$(): Observable<boolean> {
    return this.discase.asObservable();
  }
  /** 
   * Update the of discase to false after close the dialog.
   * So we will be to re-open the dialog.
  */
  updateValue() {
    this.discase.next(false);
  }


}
