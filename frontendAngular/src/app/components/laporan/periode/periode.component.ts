import { Component } from '@angular/core';

interface Detail {
  kodeAkun: string;
  namaAkun: string;
  saldo: number;
}

interface Laporan {
  header: string;
  details: Detail[];
  total: number;
}

@Component({
  selector: 'app-periode',
  templateUrl: './periode.component.html',
  styleUrls: ['./periode.component.css']
})
export class PeriodeComponent {
  startDate: string = '';
  endDate: string = '';

  laporanSampleData: Laporan[] = [
    {
      header: 'Kas & Bank',
      details: [
        { kodeAkun: '1-10001', namaAkun: 'Kas', saldo: 2732456 },
      ],
      total: 2732456
    },
    {
      header: 'Harta Tetap',
      details: [
        { kodeAkun: '1-10705', namaAkun: 'Aset Tetap - Peralatan Kantor', saldo: 2000000 },
      ],
      total: 2000000
    },
    {
      header: 'Pendapatan',
      details: [
        { kodeAkun: '4-40000', namaAkun: 'Pendapatan', saldo: 500000 },
      ],
      total: 500000
    },
    {
      header: 'Harga Pokok Penjualan',
      details: [
        { kodeAkun: '5-50000', namaAkun: 'Beban Pokok Pendapatan', saldo: 1232456 },
      ],
      total: 1232456
    }
  ];

  cariLaporan(): void {

  }
}
