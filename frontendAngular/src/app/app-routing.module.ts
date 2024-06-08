import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AfterLoginService } from './services/after-login.service';
import { BeforeLoginService } from './services/before-login.service';
import { KasdanbankComponent } from './components/kasdanbank/kasdanbank.component';
import { TransaksiComponent } from './components/transaksi/transaksi.component';

//child of transaksiComponent
import { PemasukanComponent } from './components/transaksi/pemasukan/pemasukan.component';
import { PengeluaranComponent } from './components/transaksi/pengeluaran/pengeluaran.component';
import { HutangComponent } from './components/transaksi/hutang/hutang.component';
import { PiutangComponent } from './components/transaksi/piutang/piutang.component';
import { TanamModalComponent } from './components/transaksi/tanam-modal/tanam-modal.component';
import { TarikModalComponent } from './components/transaksi/tarik-modal/tarik-modal.component';
import { TransferUangComponent } from './components/transaksi/transfer-uang/transfer-uang.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [BeforeLoginService],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [BeforeLoginService],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [BeforeLoginService],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AfterLoginService],
    data: { title: 'Profile', subtitle: 'Profile'},
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AfterLoginService],
    data: { title: 'Dashboard', subtitle: 'Dashboard'},
  },
  {
    path: 'cash-bank',
    component: KasdanbankComponent,
    canActivate: [AfterLoginService],
    data: { title: 'Kas dan Bank', subtitle: 'Kas dan Bank'},
  },
  {
    path: 'transaksi',
    component: TransaksiComponent,
    canActivate: [AfterLoginService],
    data: { title: 'Transaksi', subtitle: 'Transaksi'},
  },
  // transaksi component page //
  { path: 'pemasukan', component: PemasukanComponent, canActivate: [AfterLoginService], data: {title: 'Transaksi', subtitle: 'Transaksi / Pemasukan' }, },
  { path: 'pengeluaran', component: PengeluaranComponent, canActivate: [AfterLoginService], data: {title: 'Transaksi', subtitle: 'Transaksi / Pengeluaran' }, },
  { path: 'hutang', component: HutangComponent, canActivate: [AfterLoginService], data: {title: 'Transaksi', subtitle: 'Transaksi / Hutang' }, },
  { path: 'piutang', component: PiutangComponent, canActivate: [AfterLoginService], data: {title: 'Transaksi', subtitle: 'Transaksi / Piutang' }, },
  { path: 'tanam-modal', component: TanamModalComponent, canActivate: [AfterLoginService], data: {title: 'Transaksi', subtitle: 'Transaksi / Tanam Modal' },  },
  { path: 'tarik-modal', component: TarikModalComponent, canActivate: [AfterLoginService], data: {title: 'Transaksi', subtitle: 'Transaksi / Tarik Modal' },  },
  { path: 'transfer-uang', component: TransferUangComponent, canActivate: [AfterLoginService], data: {title: 'Transaksi', subtitle: 'Transaksi / Transfer Uang' },  },
  // end of transaksi component page //

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
