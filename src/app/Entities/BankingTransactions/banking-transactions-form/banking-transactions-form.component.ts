import { Component, OnInit } from '@angular/core';
import {BankingTransactionsService} from "../services/banking-transactions.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router, Routes} from "@angular/router";
import Swal from 'sweetalert2';
import {SpentType} from "../../../enum/spent-type";

@Component({
  selector: 'app-banking-transactions-form',
  templateUrl: './banking-transactions-form.component.html',
  styleUrls: ['./banking-transactions-form.component.scss']
})
export class BankingTransactionsFormComponent implements OnInit {
  //@ts-ignore
  bankingTransactionsForm: FormGroup;
  bankingTransactionsId: any;


  constructor(private crudService: BankingTransactionsService,
              private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.createBankingTransactionsForm();
    let bankingTransactionsId = '';
    if(this.activatedRoute.snapshot.params['bankingTransactionsId']){
      let bankingTransactionsId = this.activatedRoute.snapshot.params['bankingTransactionsId'];
      if(bankingTransactionsId !== ''){
        this.loadBankingTransactionsDetails(bankingTransactionsId);
      }
    }

  }
createBankingTransactionsForm(){
  this.bankingTransactionsForm = this.formBuilder.group({
    'data': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
    'tipo_gasto': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(500)])],
    'categoria': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(8)])],
    'valor': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(8)])],
    'descricao': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(8)])]
  })
}

createBankingTransactions(values: any){
  console.log(values);
  let formData = new FormData();
  formData.append('data', values.data);
  formData.append('tipo_gasto', values.tipo_gasto);
  formData.append('categoria', values.categoria);
  formData.append('valor', values.valor);
  formData.append('descricao', values.descricao);
  if(this.bankingTransactionsId){
    this.updateBankingTransactions(values);
  }else{
    this.crudService.createBankingTransactions(formData).subscribe(res =>{
      if(res.result === 'success'){
        this.router.navigate(['/crud/banking-transactions-list'])
      }
    });
  }


}

updateBankingTransactions(values: any){
  let formData = new FormData();
  formData.append('data', values.data);
  formData.append('tipo_gasto', values.tipo_gasto);
  formData.append('categoria', values.categoria);
  formData.append('valor', values.valor);
  formData.append('descricao', values.descricao);
  formData.append('id', this.bankingTransactionsId);
  const that = this;

  Swal.fire({
    title: 'Deseja salvar as alterações feitas?',
    text: "Você nao vai conseguir reverter esta ação!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Editar'
  }).then((result: any) => {
    if (result.isConfirmed) {
      this.crudService.updateBankingTransactionsDetails(formData).subscribe((res => {
        if(res.result === 'success'){
          this.router.navigate(['crud/view-banking-transactions-details/' + this.bankingTransactionsId])
        }
      }));
      Swal.fire(
        'Editado!',
        'Seu registro foi editado',
        'success'
      );
    }
  });
}

loadBankingTransactionsDetails(bankingTransactionsId: any){
    this.crudService.loadBankingTransactionsInfo(bankingTransactionsId).subscribe(res => {
      this.bankingTransactionsForm.controls['data'].setValue(res.data);
      this.bankingTransactionsForm.controls['tipo_gasto'].setValue(res.tipo_gasto);
      this.bankingTransactionsForm.controls['categoria'].setValue(res.categoria);
      this.bankingTransactionsForm.controls['valor'].setValue(res.valor);
      this.bankingTransactionsForm.controls['descricao'].setValue(res.descricao);
      this.bankingTransactionsId = res.id;
    })
}

navigateTo(route: any){
    this.router.navigate([route]);
}
}
