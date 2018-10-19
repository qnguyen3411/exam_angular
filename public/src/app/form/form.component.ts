import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  existingData: Object;

  postData = {
    field1: "",
    field2: "",
    field3: "",
    field4: "",
  }

  constructor(private _httpService: HttpService){}

  ngOnInit() {
  }

  onSubmit() {

  }
}
