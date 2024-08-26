import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-neraca',
  templateUrl: './neraca.component.html',
  styleUrl: './neraca.component.css'
})
export class NeracaComponent implements OnInit {
  month: string = '';
  totalDebit: number = 0;
  totalKredit: number = 0;

  laporanSampleData = [
    { kodeAkun: '1-10001', namaAkun: 'Kas', saldoDebit: 0, saldoKredit: 2732456 },
    { kodeAkun: '1-10705', namaAkun: 'Aset Tetap - Peralatan Kantor', saldoDebit: 2000000, saldoKredit: 0 },
    { kodeAkun: '4-40000', namaAkun: 'Pendapatan', saldoDebit: 0, saldoKredit: 500000 },
    { kodeAkun: '5-50000', namaAkun: 'Beban Pokok Pendapatan', saldoDebit: 1232456, saldoKredit: 0 }
  ];

  constructor() { }

  ngOnInit(): void {
    this.calculateTotals();
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); 
    this.month = `${year}-${month}`;
  }

  cariLaporan() {
    this.calculateTotals();
  }

  calculateTotals() {
    this.totalDebit = this.laporanSampleData.reduce((sum, item) => sum + item.saldoDebit, 0);
    this.totalKredit = this.laporanSampleData.reduce((sum, item) => sum + item.saldoKredit, 0);
  }
}
