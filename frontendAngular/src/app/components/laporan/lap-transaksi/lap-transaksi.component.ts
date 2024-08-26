import { Component } from '@angular/core';

@Component({
  selector: 'app-lap-transaksi',
  templateUrl: './lap-transaksi.component.html',
  styleUrl: './lap-transaksi.component.css'
})
export class LapTransaksiComponent {
  startDate: string = '';
  endDate: string = '';
  searchQuery: string = '';
  transaksiSampleData = [
    { tanggal: '2023-07-01', transaksi: 'Pembelian', catatan: 'Pembelian alat tulis', nominal: 50000 },
    { tanggal: '2023-07-02', transaksi: 'Penjualan', catatan: 'Penjualan produk', nominal: 150000 },

  ];

  cariLaporan() {
  }
}
