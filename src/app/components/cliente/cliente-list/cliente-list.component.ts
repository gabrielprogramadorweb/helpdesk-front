import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  ELEMENT_DATA: Cliente[] = [];
  clienteParaDeletar: Cliente;  // Cliente selecionado para exclusão
  isModalVisible: boolean = false;  // Controle de visibilidade do modal

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];
  dataSource = new MatTableDataSource<Cliente>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: ClienteService,
    private toastr: ToastrService  // Para mensagens de sucesso ou erro
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Cliente>(resposta);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDeleteModal(cliente: Cliente) {
    this.clienteParaDeletar = cliente;  // Armazena o cliente a ser deletado
    this.isModalVisible = true;  // Exibe o modal de confirmação
  }

  handleConfirmation(confirmed: boolean) {
    if (confirmed) {
      this.deleteCliente();
    }
    this.isModalVisible = false;  // Fecha o modal após a ação
  }

  deleteCliente() {
    this.service.delete(this.clienteParaDeletar.id).subscribe(() => {
      this.toastr.success('Cliente deletado com sucesso', 'Sucesso');
      this.findAll();  // Atualiza a lista de clientes após a exclusão
    }, err => {
      this.toastr.error('Erro ao deletar o cliente', 'Erro');
    });
  }
}
