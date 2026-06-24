import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-autenticar-usuario',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './autenticar-usuario.html',
  styleUrl: './autenticar-usuario.css',
})
export class AutenticarUsuario {

  private httpClient = inject(HttpClient);

  private URL = "http://localhost:8082/api/v1/usuarios/";

  formAutenticar = new FormGroup({
    email: new FormControl('', [Validators.required]),
    senha: new FormControl('', [Validators.required]),
  });

  autenticar() {
    this.httpClient.post(this.URL + "autenticar", this.formAutenticar.value)
    .subscribe({
      next: (resposta) => {
        console.log(resposta);
      },
      error: (erro) => {
        console.error(erro);
      }
    });
  }
}
