import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { cpf } from 'cpf-cnpj-validator';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonInput,
    IonButton,
    FormsModule,
    CommonModule,
  ],
})
export class HomePage {
  cpf: string = '';
  email: string = '';

  constructor(private router: Router) {}

  login() {
    const valido = cpf.isValid(this.cpf);

    const emailM = this.email.toLocaleLowerCase();
    const emailC = emailM.endsWith('@gmail.com');

    if (!this.email || !this.cpf) {
      alert('Preencha todos os campos!');
      return;
    }
    if (emailC == true && valido == true) {
      alert("Cadastro realizado com sucesso!");
      this.router.navigate(['/tela1']);
    } else {
      alert('Email ou CPF inválidos!');
    }
  }
}
