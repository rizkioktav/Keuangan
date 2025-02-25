import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BerandaComponent } from './components/beranda/beranda.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AfterLoginService } from './services/after-login.service';
import { BeforeLoginService } from './services/before-login.service';
import { KasdanbankComponent } from './components/kasdanbank/kasdanbank.component';
import { TransaksiComponent } from './components/transaksi/transaksi.component';
import { DataMasterComponent } from './components/data-master/data-master.component';
import { LaporanComponent } from './components/laporan/laporan.component';

//child of transaksiComponent
import { PemasukanComponent } from './components/transaksi/pemasukan/pemasukan.component';
import { PengeluaranComponent } from './components/transaksi/pengeluaran/pengeluaran.component';
import { HutangComponent } from './components/transaksi/hutang/hutang.component';
import { PiutangComponent } from './components/transaksi/piutang/piutang.component';
import { TanamModalComponent } from './components/transaksi/tanam-modal/tanam-modal.component';
import { TarikModalComponent } from './components/transaksi/tarik-modal/tarik-modal.component';
import { TransferUangComponent } from './components/transaksi/transfer-uang/transfer-uang.component';

//child of datamasterComponent
import { AkunCoaComponent } from './components/data-master/akun-coa/akun-coa.component';
import { AssetComponent } from './components/data-master/asset/asset.component';

//child of laporanComponent
import { LapTransaksiComponent } from './components/laporan/lap-transaksi/lap-transaksi.component';
import { JurnalUmumComponent } from './components/laporan/jurnal-umum/jurnal-umum.component';
import { NeracaComponent } from './components/laporan/neraca/neraca.component';
import { PeriodeComponent } from './components/laporan/periode/periode.component';
import { LabaRugiComponent } from './components/laporan/laba-rugi/laba-rugi.component';
import { HutangPiutangComponent } from './components/laporan/hutang-piutang/hutang-piutang.component';

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
    path: 'beranda',
    component: BerandaComponent,
    canActivate: [AfterLoginService],
    data: { title: 'Beranda', subtitle: 'Beranda'},
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

  {
    path: 'data-master',
    component: DataMasterComponent,
    canActivate: [AfterLoginService],
    data: {title: 'Master Data', subtitle: 'Master Data'}
  },
  // data-master component page //
  { path: 'akun-coa', component: AkunCoaComponent, canActivate: [AfterLoginService], data: {title: 'Data Master', subtitle: ' Data Master / Akun COA' }, },
  { path: 'assets', component: AssetComponent, canActivate: [AfterLoginService], data: {title: 'Data Master', subtitle: ' Data Master / Assets' }, },

  {
    path: 'laporan',
    component: LaporanComponent,
    canActivate: [AfterLoginService],
    data: {title: 'Laporan', subtitle: 'Laporan'},
  },
  // laporan component page
  { path: 'laporan/transaksi', component: LapTransaksiComponent, canActivate: [AfterLoginService], data: {title: 'Laporan', subtitle: 'Laporan / Transaksi'}, },
  { path: 'laporan/jurnalumum', component: JurnalUmumComponent, canActivate: [AfterLoginService], data: {title: 'Laporan', subtitle: 'Laporan / Jurnal Umum'}, },
  { path: 'laporan/neraca', component: NeracaComponent, canActivate: [AfterLoginService], data: {title: 'Laporan', subtitle: 'Laporan / Neraca'}, },
  { path: 'laporan/periode', component: PeriodeComponent, canActivate: [AfterLoginService], data: {title: 'Laporan', subtitle: 'Laporan / Periode'}, },
  { path: 'laporan/labarugi', component: LabaRugiComponent, canActivate: [AfterLoginService], data: {title: 'Laporan', subtitle: 'Laporan / Laba Rugi'}, },
  { path: 'laporan/hutangpiutang', component: HutangPiutangComponent, canActivate: [AfterLoginService], data: {title: 'Laporan', subtitle: 'Laporan / Hutang Piutang'}, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
