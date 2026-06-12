import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonTitle,
  IonLabel,
  IonCard,
  IonCardContent,
  IonIcon,
  IonButton,
  IonItem,
  IonList,
  IonModal,
  ModalController,
  IonInput,
  IonButtons,
  IonToolbar,
  IonHeader,
} from '@ionic/angular/standalone';

import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-tela1',
  templateUrl: './tela1.page.html',
  styleUrls: ['./tela1.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonTitle,
    IonLabel,
    IonContent,
    IonCard,
    IonCardContent,
    IonIcon,
    IonButton,
    IonItem,
    IonList,
    IonModal,
    IonInput,
    IonButtons,
    IonToolbar,
    IonHeader,
    FormsModule,
    CommonModule,
  ],
})
export class Tela1Page implements OnInit {
  constructor(
    private router: Router,
    private modalCtrl: ModalController,
  ) {}

  historico: any[] = [];

  ngOnInit() {
    this.historico = JSON.parse(localStorage.getItem('historico') || '[]');
    this.valCont = Number(localStorage.getItem('Saldo'));
  }

  sair() {
    this.router.navigate(['/home']);
  }

  valCont = 0;
  saldoD!: number | string;
  saldoS!: number | string;
  depInput = document.getElementById('depInput') as HTMLInputElement;

  cancelDep() {
    return this.modalCtrl.dismiss(null, 'cancelD');
  }

  cancelSac() {
    return this.modalCtrl.dismiss(null, 'cancelS');
  }

  confirmDep() {
    return this.modalCtrl.dismiss(this.saldoD, 'confirmD');
  }

  confirmSac() {
    return this.modalCtrl.dismiss(this.saldoS, 'confirmS');
  }

  verExtra() {
    this.historico = JSON.parse(localStorage.getItem('historico') || '[]');
  }

  limparHistorico() {
    localStorage.setItem('historico', '[]');
    this.historico = [];
  }
  
  onWillDismissDep(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirmD') {
      this.valCont = Number(this.valCont) + Number(event.detail.data);
      localStorage.setItem('Saldo', this.valCont.toString());
      this.adicionarHistorico('Deposito', Number(this.saldoD));
      this.saldoD = '';
    }
  }

  onWillDismissSac(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirmS') {
      if (Number(this.saldoS) > this.valCont) {
        alert('Não é possivel sacar essse valor');
      } else {
        this.valCont = Number(this.valCont) - Number(event.detail.data);
        localStorage.setItem('Saldo', this.valCont.toString());
        this.adicionarHistorico('Saque', Number(this.saldoS));
        this.saldoS = '';
      }
    }
  }

  adicionarHistorico(tipo: string, valor: number) {
    const historico = JSON.parse(localStorage.getItem('historico') || '[]');

    historico.push({
      tipo,
      valor,
      data: new Date().toISOString(),
    });

    localStorage.setItem('historico', JSON.stringify(historico));
  }
}
