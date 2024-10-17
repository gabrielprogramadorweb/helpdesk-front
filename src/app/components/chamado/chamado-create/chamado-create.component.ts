import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit {

  chamado: Chamado = {
    prioridade:  '',
    status:      '',
    titulo:      '',
    observacoes: '',
    tecnico:     '',
    cliente:     '',
    nomeCliente: '',
    nomeTecnico: '',
  }

  clientes: Cliente[] = []
  tecnicos: Tecnico[] = []

  chamadoForm: FormGroup;

  constructor(
    private chamadoService: ChamadoService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private toastService: ToastrService,
    private router: Router,
  ) {
    this.chamadoForm = new FormGroup({
      prioridade: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      titulo: new FormControl(null, [Validators.required]),
      observacoes: new FormControl(null, [Validators.required]),
      tecnico: new FormControl(null, [Validators.required]),
      cliente: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.findAllClientes();
    this.findAllTecnicos();
  }

  create(): void {
    if (this.chamadoForm.valid) {
      this.chamado = {
        ...this.chamado,
        titulo: this.chamadoForm.get('titulo')?.value,
        status: this.chamadoForm.get('status')?.value,
        prioridade: this.chamadoForm.get('prioridade')?.value,
        tecnico: this.chamadoForm.get('tecnico')?.value,
        cliente: this.chamadoForm.get('cliente')?.value,
        observacoes: this.chamadoForm.get('observacoes')?.value,
      };
      
      console.log('Dados do chamado:', this.chamado); 
      
      this.chamadoService.create(this.chamado).subscribe(resposta => {
        this.toastService.success('Chamado criado com sucesso', 'Novo chamado');
        this.router.navigate(['chamados']);
      }, ex => {
        console.log(ex);
        this.toastService.error(ex.error.error);
      });
    }
  }
  

  findAllClientes(): void {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    });
  }

  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    });
  }

  validaCampos(): boolean {
    return this.chamadoForm.valid;
  }
}
