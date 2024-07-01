import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token-interceptor.service';
import { RouterLinkActive } from '@angular/router';
import { NavbarService } from './services/navbar.service';
import { FilterPipe } from './filter.pipe';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PemasukanComponent } from './components/transaksi/pemasukan/pemasukan.component';
import { PengeluaranComponent } from './components/transaksi/pengeluaran/pengeluaran.component';
import { HutangComponent } from './components/transaksi/hutang/hutang.component';
import { TanamModalComponent } from './components/transaksi/tanam-modal/tanam-modal.component';
import { TarikModalComponent } from './components/transaksi/tarik-modal/tarik-modal.component';
import { TransferUangComponent } from './components/transaksi/transfer-uang/transfer-uang.component';
import { PiutangComponent } from './components/transaksi/piutang/piutang.component';
import { KasdanbankComponent } from './components/kasdanbank/kasdanbank.component';
import { TransaksiComponent } from './components/transaksi/transaksi.component';
import { DataMasterComponent } from './components/data-master/data-master.component';
import { LaporanComponent } from './components/laporan/laporan.component';
import { BerandaComponent } from './components/beranda/beranda.component';
import { AkunCoaComponent } from './components/data-master/akun-coa/akun-coa.component';
import { AssetComponent } from './components/data-master/asset/asset.component';
import { JurnalUmumComponent } from './components/laporan/jurnal-umum/jurnal-umum.component';
import { NeracaComponent } from './components/laporan/neraca/neraca.component';
import { PeriodeComponent } from './components/laporan/periode/periode.component';
import { LabaRugiComponent } from './components/laporan/laba-rugi/laba-rugi.component';
import { HutangPiutangComponent } from './components/laporan/hutang-piutang/hutang-piutang.component';
import { LapTransaksiComponent } from './components/laporan/lap-transaksi/lap-transaksi.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    DashboardComponent,
    SidebarComponent,
    KasdanbankComponent,
    TransaksiComponent,
    PemasukanComponent,
    PengeluaranComponent,
    HutangComponent,
    TanamModalComponent,
    TarikModalComponent,
    TransferUangComponent,
    PiutangComponent,
    DataMasterComponent,
    LaporanComponent,
    FilterPipe,
    BerandaComponent,
    AkunCoaComponent,
    AssetComponent,
    JurnalUmumComponent,
    NeracaComponent,
    PeriodeComponent,
    LabaRugiComponent,
    HutangPiutangComponent,
    LapTransaksiComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    NgbModule,
    FormsModule,
    HttpClientModule,
    RouterLinkActive,
  ],
  providers: [
    NavbarService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
    },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
