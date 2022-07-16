import { Component, OnInit } from '@angular/core';
import {BankingTransactionsService} from "../services/banking-transactions.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-bankingTransactions-list',
  templateUrl: './banking-transactions-list.component.html',
  styleUrls: ['./banking-transactions-list.component.scss'],
})
export class BankingTransactionsListComponent implements OnInit {
  columnDefs = [
    { field: 'id', headerName: 'Id', sortable: true },
    { field: 'data', headerName: 'Data', sortable: true },
    { field: 'tipo_gasto', headerName: 'Tipo de gasto', sortable: true },
    { field: 'categoria', headerName: 'Categoria', sortable: true },
    { field: 'valor', headerName: 'Valor', sortable: true},
    { field: 'descricao', headerName: 'Descrição', sortable: true },
    { field: '', headerName: '', width: 300, cellRenderer: this.actionRender.bind(this) },
  ];

  rowData: any = [];
  gridOptions = {
    rowHeight: 50
  }

  bankingTransactionsList: any = [];
  bankingTransactionsListSubscribe: any;

  constructor(private crudService: BankingTransactionsService, private router: Router) { }

  ngOnInit(): void {
    this.getBankingTransactionsList();

  }


  getBankingTransactionsList(){
    this.bankingTransactionsListSubscribe = this.crudService.loadBankingTransactions().subscribe(res => {
      this.bankingTransactionsList = res;
      console.log('res', res);
      this.rowData = res;
    })
  }

  actionRender(params: any){
    let div = document.createElement('div');
    let htmlCode = '<button type="button" class="btn btn-primary">Ver</button>\n' +
    '<button type="button" class="btn btn-secondary">Editar</button>\n' +
    '<button type="button" class="btn btn-light">Deletar</button>\n'
    div.innerHTML = htmlCode;
    let viewButton = div.querySelector('.btn-primary');
    // @ts-ignore
    viewButton.addEventListener('click', () => {
      this.viewBankingTransactionsDetails(params);
    });

    let editButton = div.querySelector('.btn-secondary');
    // @ts-ignore
    editButton.addEventListener('click', () => {
      this.editBankingTransactionsDetails(params);
    });

    let deleteButton = div.querySelector('.btn-light');
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
}
