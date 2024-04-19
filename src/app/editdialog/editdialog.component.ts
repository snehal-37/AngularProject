import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EdituserService } from '../edituser.service';

@Component({
  selector: 'app-editdialog',
  templateUrl: './editdialog.component.html',
  styleUrls: ['./editdialog.component.css'],
})
export class EditdialogComponent {
  userDetails: any = {};
  users!: any;
  registerForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<EditdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private router: Router,
    private ed: EdituserService
  ) {}
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  mobileNumber: string = '';
  value: number = 20;
  age: number = 20;
  state: string = '';
  country: string = '';
  selectedAddressType: string = '';
  add1: string = '';
  cadd1: string = '';
  selectedTag: string = '';
  chips: string[] = ['Cricket', 'Badminton', 'Reading'];
  checked: boolean = false;

  removeChip(chip: string) {
    const index = this.chips.indexOf(chip);
    if (index > -1) {
      this.chips.splice(index, 1);
    }
  }

  selectChip(chip: string) {
    this.selectedTag = chip;
  }
  updateAge(event: any) {
    const value = event.target.value;
    this.age = value;
  }
  submitForm(regForm: NgForm) {
    if (regForm.valid) {
      const userData = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        mobileNumber: this.mobileNumber,
        age: this.value,
        state: this.state,
        country: this.country,
        address: this.selectedAddressType,
        tag: this.selectedTag,
        check: this.checked,
      };
      this.ed.editUser(userData).subscribe((result) => {
        this.users = result;
        this.router.navigate(['']);
        this.dialogRef.close();
        alert('Details are updated successfully');
      });
    }
  }

  cancelForm(): void {
    this.firstname = '';
    this.lastname = '';
    this.email = '';
    this.mobileNumber = '';
    this.value = 0;
    this.selectedAddressType = '';
    this.selectedTag = '';
    this.checked = false;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
