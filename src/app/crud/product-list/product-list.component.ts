import { Component, OnInit } from '@angular/core';
import {CRUDService} from "../services/crud.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
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

  productList: any = [];
  productListSubscribe: any;

  constructor(private crudService: CRUDService, private router: Router) { }

  ngOnInit(): void {
    this.getProductList();

  }


  getProductList(){
    this.productListSubscribe = this.crudService.loadProducts().subscribe(res => {
      this.productList = res;
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
      this.viewProductDetails(params);
    });

    let editButton = div.querySelector('.btn-secondary');
    // @ts-ignore
    editButton.addEventListener('click', () => {
      this.editProductDetails(params);
    });

    let deleteButton = div.querySelector('.btn-light');
    // @ts-ignore
    deleteButton.addEventListener('click', () => {
      this.deleteProduct(params);
    });

    return div;
  }

  viewProductDetails(params: any){
    this.router.navigate(['/crud/view-product-details/' + params.data.id]);
  }

  editProductDetails(params: any){
    this.router.navigate(['/crud/update-product/' + params.data.id]);
  }

  deleteProduct(params: any){
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
        that.crudService.deleteProduct(params.data.id).subscribe(res => {
          if(res.result === 'success'){
            this.getProductList();
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
