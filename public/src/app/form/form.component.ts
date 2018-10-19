import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges {
  @Output() formDidSubmit = new EventEmitter();
  @Input() existingData = {};

  idToUpdate = ""

  postData = {
    name: "",
    type: "",
    description: "",
    skills: ["", "", ""],
  }

  errors = {
    name: "",
    type: "",
    description: "",
  }

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.existingData['_id']) {
      console.log("WE UPDATIN EXISTIN DATA I GUSSS")
      this.idToUpdate = this.existingData['_id'];
      this.postData['name'] = this.existingData['name'];
      this.postData['type'] = this.existingData['type'];
      this.postData['description'] = this.existingData['description'];
      this.postData['skills'] = this.existingData['skills'] as Array<string>;
    }
  }

  onSubmit() {
    this.postData.skills = this.postData.skills.filter(val => val !== "")
    const showError = (errors: Array<Object>) => {
      this.errors = { name: "", type: "", description: ""}
      errors.forEach(error => {
        this.errors[error['tag']] = error['message'];
      })
      console.log(this.errors)
    }

    if (!this.idToUpdate) {
      this._httpService
        .post(this.postData)
        .subscribe(response => {
          if (response['status'] === "error") {
            showError(response['data'] as Array<Object>)
            return;
          }
          this.formDidSubmit.emit()
        });
    } else {
      this._httpService
        .updateOne(this.idToUpdate, this.postData)
        .subscribe(response => {
          console.log(response)
          if (response['status'] === "error") { 
            showError(response['data'] as Array<Object>)
            return; 
          }
          this.formDidSubmit.emit()
        });
    }
  }

  onCancel() {
    this.formDidSubmit.emit();
  }

  emptyForm() {
    this.postData = {
      name: "",
      type: "",
      description: "",
      skills: ["", "", ""],
    }
  }
}
