import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';
declare var $: any; 
@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css']
})
export class TecnicoListComponent implements OnInit {

  ELEMENT_DATA: Tecnico[] = []
  tecnicoSelecionado: Tecnico;


  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

  tecnicoParaDeletar: Tecnico;
  isModalVisible: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: TecnicoService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<Tecnico>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDeleteModal(tecnico: Tecnico) {
    this.tecnicoParaDeletar = tecnico;
    this.isModalVisible = true;
  }

  handleConfirmation(confirmed: boolean) {
    if (confirmed) {
      this.deleteTecnico();
    }
    this.isModalVisible = false;
  }

  deleteTecnico() {
    this.service.delete(this.tecnicoParaDeletar.id).subscribe(() => {
      this.toastr.success('Técnico deletado com sucesso', 'Sucesso');
      this.findAll();
    }, err => {
      this.toastr.error('Erro ao deletar o técnico', 'Erro');
    });
  }
}
