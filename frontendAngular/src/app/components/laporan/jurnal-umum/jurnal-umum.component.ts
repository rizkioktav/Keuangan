import { Component } from '@angular/core';

@Component({
  selector: 'app-jurnal-umum',
  templateUrl: './jurnal-umum.component.html',
  styleUrl: './jurnal-umum.component.css'
})
export class JurnalUmumComponent {
  startDate: string = '';
  endDate: string = '';
  searchQuery: string = '';
  jurnalSampleData = [
    { tanggal: '2023-07-01', keterangan: 'Pembelian barang', ref: '1234', details: [
      { akun: 'Persediaan Barang', debit: 50000, kredit: 0 },
      { akun: 'Kas', debit: 0, kredit: 50000 }
    ] },
    { tanggal: '2023-07-02', keterangan: 'Penjualan produk', ref: '1235', details: [
      { akun: 'Kas', debit: 150000, kredit: 0 },
      { akun: 'Penjualan', debit: 0, kredit: 150000 }
    ] },
  ];

  totalDebitAllTransactions(): number {
    let total = 0;
    this.jurnalSampleData.forEach(data => {
      data.details.forEach(detail => {
        total += detail.debit;
      });
    });
    return total;
  }

  totalKreditAllTransactions(): number {
    let total = 0;
    this.jurnalSampleData.forEach(data => {
      data.details.forEach(detail => {
        total += detail.kredit;
      });
    });
    return total;
  }
  

  cariLaporan() {

  }
}
