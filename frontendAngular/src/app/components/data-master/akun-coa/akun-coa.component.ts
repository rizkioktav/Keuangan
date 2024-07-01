import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-akun-coa',
  templateUrl: './akun-coa.component.html',
  styleUrl: './akun-coa.component.css'
})
export class AkunCoaComponent implements OnInit {
  accountData: any; // Tipe data akun

  constructor() { }

  ngOnInit(): void {
    // Ambil data akun dari API atau sumber data lainnya
    this.accountData = [
      { kode: 'ACC123', nama: 'Kas Bank', kategori: 'Aset', tipeAkun: 'Deposito', deskripsi: 'Uang simpanan di bank' },
      { kode: 'ACC456', nama: 'Piutang Dagang', kategori: 'Aset', tipeAkun: 'Piutang', deskripsi: 'Utang pelanggan atas pembelian barang' },
      // ... Data akun lainnya
    ];
  }
}
