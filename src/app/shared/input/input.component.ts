import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() controle:FormControl;
  @Input() label:string;
  @Input() input:string;
  @Input() tipo:string = 'input';
  constructor() { }

  ngOnInit() {
  }
  showErrors(){
    const {dirty, touched, errors} = this.controle;
    return dirty && touched && errors;
  }
}
