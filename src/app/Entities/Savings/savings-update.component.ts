import {Component, OnInit} from '@angular/core';
import {SavingsService} from "./services/savings.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from 'sweetalert2';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-banking-transactions-form',
  templateUrl: './savings-update.component.html',
  styleUrls: ['./savings-update.component.scss']
})
export class SavingsUpdateComponent implements OnInit {
  //@ts-ignore
  editForm: FormGroup;
  savingsId: any;
  saida: boolean = true;
  entrada: boolean = false;


  private subscriptions: Subscription[] = [];

  constructor(private crudService: SavingsService,
              private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.editForms();
    let savingsId = '';
    if(this.activatedRoute.snapshot.params['savingsId']){
      let savingsId = this.activatedRoute.snapshot.params['savingsId'];
      if(savingsId !== ''){
        this.loadSavingsDetails(savingsId);
      }
    }
    this.registerInputChanges();
  }

  registerInputChanges(): void{
    this.editForm.get(['tipo_gasto'])?.valueChanges.subscribe(res => {
      if(this.saida == true){
        this.entrada = true;
        this.saida = false;
      }else{
        this.entrada = false;
        this.saida = true;
      }

    });
  }

editForms(){
  this.editForm = this.formBuilder.group({
    data: [null, this.validar],
    valor: [null, Validators.required],
  });
}


validar(input: FormControl){
    return (input.value ? null : { obrigatoriedade: true});
}


createSavings(values: any){
  console.log(values);
  let formData = new FormData();
  formData.append('data', values.data);
  formData.append('valor', values.valor);
  if(this.savingsId){
    this.updateSavings(values);
  }else{
    this.crudService.createSavings(formData).subscribe(res =>{
      if(res.result === 'success'){
        Swal.fire(
          'Salvo com sucesso!',
          '',
          'success'
        );
        this.router.navigate(['/save/savings-list'])
      }
    });
  }
}

updateSavings(values: any){
  let formData = new FormData();
  formData.append('data', values.data);
  formData.append('valor', values.valor);
  formData.append('id', this.savingsId);
  const that = this;

  Swal.fire({
    title: 'Deseja salvar as alterações feitas?',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Editar'
  }).then((result: any) => {
    if (result.isConfirmed) {
      this.crudService.updateSavingsDetails(formData).subscribe((res => {
        if(res.result === 'success'){
          this.router.navigate(['save/view-savings-details/' + this.savingsId])
        }
      }));
      Swal.fire(
        'Editado com sucesso!',
        '',
        'success'
      );
    }
  });
}

loadSavingsDetails(savingsId: any){
    this.crudService.loadSavingsInfo(savingsId).subscribe(res => {
      this.editForm.controls['data'].setValue(res.data);
      this.editForm.controls['valor'].setValue(res.valor);
      this.savingsId = res.id;
    })
}
}
