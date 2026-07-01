import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  private router = inject(Router);

  mensagemErro = signal<string>('');


  formAutenticar = new FormGroup({
    email: new FormControl('', [Validators.required]),
    senha: new FormControl('', [Validators.required]),
  });

  autenticar() {

    this.mensagemErro

    this.httpClient.post(this.URL + "autenticar", this.formAutenticar.value)
    .subscribe({
      next: (response: any) => {
        sessionStorage.setItem("auth", JSON.stringify(response));
        this.router.navigate(['pages/dashboard']);
      },
      error: (e) => {
        this.mensagemErro.set('Erro: ' + e.error);   
      }
    });
  }


}
