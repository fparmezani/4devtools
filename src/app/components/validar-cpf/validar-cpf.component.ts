import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
    selector: 'app-validar-cpf',
    templateUrl: './validar-cpf.component.html',
})
export class ValidarCpfComponent implements OnInit {
    cpf: string = '';
    constructor() {}

    ngOnInit(): void {
        
    }

    validateCpf() {
        
        this.cpf = this.cpf.replace(/\D/g, "");
        
        if (this.cpf.length < 11) {
            this.responseValidateCpf("");
            return;
        }
        
        if (this.cpf.match(/(\d)\1{10}/)) {
            this.responseValidateCpf("invalid");
            return;
        }
        
        let result = true;
        [9, 10].forEach((j) => {
            let sum = 0;
            let rest;
            this.cpf.split(/(?=)/).splice(0, j).forEach((e, i) => {
            sum += parseInt(e) * ((j + 2) - (i + 1));
            });
            rest = sum % 11;
            rest = (rest < 2) ? 0 : 11 - rest;
            if (rest.toString() != this.cpf.substring(j, j + 1))
            result = false;
        });
        
        this.responseValidateCpf(result ? "valid" : "invalid");    
    }

    responseValidateCpf(response:any) {
    
        const div = document.querySelector("#div-validate-cpf");
        const spanIcon = document.querySelector("#span-icon-validate-cpf");
        const spanText = document.querySelector("#span-text-validate-cpf");
      
        div?.classList.remove("has-success has-error");
        spanIcon?.classList.remove("fa fa-check fa-close");
        
        if(spanText != null){
            spanText.innerHTML = "";
        }
      
        if (response === "valid") {
          div?.classList.add("has-success");
          spanIcon?.classList.add("fa fa-check");
          if(spanText != null){
            spanText.innerHTML = "CPF <strong>válido!</strong>";
          }
        }
      
        if (response === "invalid") {
            div?.classList.add("has-error");
            spanIcon?.classList.add("fa fa-close");
            if(spanText != null){
                spanText.innerHTML = "CPF <strong>válido!</strong>";
            }
        }
      }
}
