import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';


@Component({
  selector: 'app-criar-usuario',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './criar-usuario.html',
  styleUrl: './criar-usuario.css',
})
export class CriarUsuario {

  private regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/

  private httpClient = inject(HttpClient);

  mensagemSucesso = signal<string>('');
  mensagemErro = signal<string>('');

  formCriarUsuario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.pattern(this.regexSenha)]),
    senhaConfirmacao: new FormControl('', [Validators.required]),
    aceiteTermos: new FormControl(false, [Validators.requiredTrue])
  },
  {validators: this.validarSenhasIguais}
);

  criarUsuario() {

    this.limparMensagens();

    const json = {
      nome: this.formCriarUsuario.value.nome,
      email: this.formCriarUsuario.value.email,
      senha: this.formCriarUsuario.value.senha
    }

    this.httpClient.post('http://localhost:8082/api/v1/usuarios/criar', json)
      .subscribe({
        next: (response) => {
          this.mensagemSucesso.set('Usuário criado com sucesso.');
          this.formCriarUsuario.reset();
        },
        error: (e) => {
          this.mensagemErro.set('Erro: ' + e.error);
        }
      })
  }

  private validarSenhasIguais(control: AbstractControl): ValidationErrors | null{
    const valorSernha = control.get('senha')?.value;
    const valorSernhaConfirmacao = control.get('senhaConfirmacao')?.value;

    if(valorSernha && (valorSernhaConfirmacao !== valorSernha)){
      return { senhasDiferentes: true };
    }
    return null;
  }

  private limparMensagens() {
    this.mensagemSucesso.set('');
    this.mensagemErro.set('');
  }
}