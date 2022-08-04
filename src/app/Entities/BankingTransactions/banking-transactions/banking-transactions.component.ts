import { Component, OnInit } from '@angular/core';
import {BankingTransactionsService} from "../services/banking-transactions.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SpentType} from "../../../enum/spent-type";
import {Subscription} from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: 'app-bankingTransactions-list',
  templateUrl: './banking-transactions.component.html',
  styleUrls: ['./banking-transactions.component.scss'],
})
export class BankingTransactionsComponent implements OnInit {

  tipoGasto: boolean = true;

  // @ts-ignore
  filterForm: FormGroup;
  private subscriptions: Subscription[] = [];

  columnDefs = [
    { field: 'data', headerName: 'Data', sortable: true },
    { field: 'tipo_gasto', headerName: 'Tipo de gasto', sortable: true },
    { field: 'categoria', headerName: 'Categoria', sortable: true },
    { field: 'valor', headerName: 'Valor', sortable: true},
    { field: '', headerName: '', width: 300, cellRenderer: this.actionRender.bind(this) },
  ];

  rowData: any = [];
  gridOptions = {
    rowHeight: 50
  }

  filterList: any = [];

  filterListSubscribe: any;

  constructor(private crudService: BankingTransactionsService, private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getBankingTransactionsList();
    this.createFilterForm();
  }

  getBankingTransactionsList(){
    this.filterListSubscribe = this.crudService.loadBankingTransactions().subscribe(res => {
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
      this.viewBankingTransactionsDetails(params);
    });

    let editButton = div.querySelector('.btn-primary');
    // @ts-ignore
    editButton.addEventListener('click', () => {
      this.editBankingTransactionsDetails(params);
    });

    let deleteButton = div.querySelector('.btn-danger');
    // @ts-ignore
    deleteButton.addEventListener('click', () => {
      this.deleteBankingTransactions(params);
    });
    return div;
  }

  viewBankingTransactionsDetails(params: any){
    this.router.navigate(['/crud/view-banking-transactions-details/' + params.data.id]);
  }

  editBankingTransactionsDetails(params: any){
    this.router.navigate(['/crud/update-banking-transactions/' + params.data.id]);
  }

  deleteBankingTransactions(params: any){
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
        that.crudService.deleteBankingTransactions(params.data.id).subscribe(res => {
          if(res.result === 'success'){
            this.getBankingTransactionsList();
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

///////////////////////-- FILTRO --//////////////////////////

  createFilterForm(){
    this.filterForm = this.formBuilder.group({
      tipo_gasto: [null],
      categoria: [null]
    });
  }

  createFilter(values: any){
    console.log(values);
    let formData = new FormData();
    formData.append('tipo_gasto', values.tipo_gasto);
    formData.append('categoria', values.categoria);
    this.filtrar(values);
  }

  filtrar(values: any){
    this.filterListSubscribe = this.crudService.filtro(values).subscribe(res => {
      this.filterList = res;
      console.log('res', res);
      this.rowData = res;
    })
  }
}
