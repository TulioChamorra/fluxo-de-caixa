import { Component, OnInit } from '@angular/core';
import {SavingsService} from "./services/savings.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: 'app-savings-list',
  templateUrl: './savings.component.html',
  styleUrls: ['./savings.component.scss'],
})
export class SavingsComponent implements OnInit {
  saida: boolean = true;
  entrada: boolean = true;

  // @ts-ignore
  filterForm: FormGroup;
  private subscriptions: Subscription[] = [];

  columnDefs = [
    { field: 'data', headerName: 'Data', sortable: true },
    { field: 'valor', headerName: 'Valor', sortable: true},
    { field: '', headerName: '', width: 300, cellRenderer: this.actionRender.bind(this) },
  ];

  rowData: any = [];
  gridOptions = {
    rowHeight: 50
  }

  filterList: any = [];

  filterListSubscribe: any;

  constructor(private crudService: SavingsService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getSavingsList();
  }

  getSavingsList(){
    this.filterListSubscribe = this.crudService.loadSavings().subscribe(res => {
      this.filterList = res;
      console.log('res', res);
      this.rowData = res;
    })
  }


  actionRender(params: any){
    let div = document.createElement('div');
    let htmlCode = '<button type="button" class="btn btn-success">Ver</button>\n' +
    '<button type="button" class="btn btn-primary">Editar</button>\n' +
    '<button type="button" class="btn btn-danger">Deletar</button>\n'
    div.innerHTML = htmlCode;
    let viewButton = div.querySelector('.btn-success');
    // @ts-ignore
    viewButton.addEventListener('click', () => {
      this.viewSavingsDetails(params);
    });

    let editButton = div.querySelector('.btn-primary');
    // @ts-ignore
    editButton.addEventListener('click', () => {
      this.editSavingsDetails(params);
    });

    let deleteButton = div.querySelector('.btn-danger');
    // @ts-ignore
    deleteButton.addEventListener('click', () => {
      this.deleteSavings(params);
    });
    return div;
  }

  viewSavingsDetails(params: any){
    this.router.navigate(['/save/view-savings-details/' + params.data.id]);
  }

  editSavingsDetails(params: any){
    this.router.navigate(['/save/update-savings/' + params.data.id]);
  }

  deleteSavings(params: any){
    const that = this;

    // @ts-ignore
    Swal.fire({
      title: 'Você tem certeza?',
      text: "Você nao vai conseguir reverter esta ação!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Excluir'
    }).then((result: any) => {
      if (result.isConfirmed) {
        that.crudService.deleteSavings(params.data.id).subscribe(res => {
          if(res.result === 'success'){
            this.getSavingsList();
            // @ts-ignore
            Swal.fire(
              'Excluido!',
              'Seu registro foi excluido',
              'success'
            );
          }
        });
      }
    })
  }
  priceCellRender(params: any){
    return '$ ' + params.data.p_price;
  }

}
