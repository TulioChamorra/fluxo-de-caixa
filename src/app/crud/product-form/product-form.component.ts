import { Component, OnInit } from '@angular/core';
import {CRUDService} from "../services/crud.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router, Routes} from "@angular/router";
import Swal from 'sweetalert2';
import {SpentType} from "../enum/spent-type";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  //@ts-ignore
  productForm: FormGroup;
  productId: any;


  constructor(private crudService: CRUDService,
              private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.createProductForm();
    let productId = '';
    if(this.activatedRoute.snapshot.params['productId']){
      let productId = this.activatedRoute.snapshot.params['productId'];
      if(productId !== ''){
        this.loadProductDetails(productId);
      }
    }

  }
createProductForm(){
  this.productForm = this.formBuilder.group({
    'data': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
    'tipo_gasto': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(500)])],
    'categoria': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(8)])],
    'valor': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(8)])],
    'descricao': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(8)])]
  })
}

createProduct(values: any){
  console.log(values);
  let formData = new FormData();
  formData.append('data', values.data);
  formData.append('tipo_gasto', values.tipo_gasto);
  formData.append('categoria', values.categoria);
  formData.append('valor', values.valor);
  formData.append('descricao', values.descricao);
  if(this.productId){
    this.updateProduct(values);
  }else{
    this.crudService.createProduct(formData).subscribe(res =>{
      if(res.result === 'success'){
        this.router.navigate(['/crud/product-list'])
      }
    });
  }


}

updateProduct(values: any){
  let formData = new FormData();
  formData.append('data', values.data);
  formData.append('tipo_gasto', values.tipo_gasto);
  formData.append('categoria', values.categoria);
  formData.append('valor', values.valor);
  formData.append('descricao', values.descricao);
  formData.append('id', this.productId);
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
      this.crudService.updateProductDetails(formData).subscribe((res => {
        if(res.result === 'success'){
          this.router.navigate(['crud/view-product-details/' + this.productId])
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

loadProductDetails(productId: any){
    this.crudService.loadProductInfo(productId).subscribe(res => {
      this.productForm.controls['data'].setValue(res.data);
      this.productForm.controls['tipo_gasto'].setValue(res.tipo_gasto);
      this.productForm.controls['categoria'].setValue(res.categoria);
      this.productForm.controls['valor'].setValue(res.valor);
      this.productForm.controls['descricao'].setValue(res.descricao);
      this.productId = res.id;
    })
}

navigateTo(route: any){
    this.router.navigate([route]);
}
}
