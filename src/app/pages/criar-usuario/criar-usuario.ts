import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


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

  formCriarUsuario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.pattern(this.regexSenha)]),
    senhaConfirmacao: new FormControl('', [Validators.required]),
    aceiteTermos: new FormControl(false, [Validators.requiredTrue])
  });

  criarUsuario() {

    const json = {
      nome: this.formCriarUsuario.value.nome,
      email: this.formCriarUsuario.value.email,
      senha: this.formCriarUsuario.value.senha
    }

    this.httpClient.post('http://localhost:8082/api/v1/usuarios/criar', json)
      .subscribe({
        next: (response) => {
          console.log('Usuário criado com sucesso:', response);
        },
        error: (error) => {
          console.error('Erro ao criar usuário:', error);
        }
      })
  }

}
