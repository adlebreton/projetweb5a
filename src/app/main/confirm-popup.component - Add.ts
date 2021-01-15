import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { mainModule } from 'process';


@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirm-popup - Add.html',
})

export class ConfirmationDialogComponentAdd implements OnInit {

  formGroup: FormGroup | undefined
  post: any = '';
  constructor(private activeModal: NgbActiveModal, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm()
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      name: [null, Validators.required]
    });
  }
  

  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
    this.activeModal.close(true);

  }

  public dismiss() {
    this.activeModal.dismiss();
  }

}
