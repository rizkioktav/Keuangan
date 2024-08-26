import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-akun-coa',
  templateUrl: './akun-coa.component.html',
  styleUrl: './akun-coa.component.css'
})
export class AkunCoaComponent implements OnInit {
  accountData: any; 
  namaAkun: string = '';
  kategori: string = '';
  kategoriKode: string = 'A-1';
  kodeAkun: number = 101;
  deskripsi: string = '';

  constructor() { }

  ngOnInit(): void {
    // Ambil data akun dari API atau sumber data lainnya
    this.accountData = [
      { kode: 'A-1001', nama: 'Kas Bank', kategori: 'Kas & Bank', tipeAkun: 'Debit', deskripsi: 'Uang simpanan di bank' },
      { kode: 'A-2001', nama: 'Piutang Dagang', kategori: 'Akun Piutang', tipeAkun: 'Debit', deskripsi: 'Utang pelanggan atas pembelian barang' },
      // ... Data akun lainnya
    ];
  }

  onInputChange(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length > 3) {
      input.value = input.value.slice(0, 3);
    }
  }

  onSubmit(form: any): void {
    if (form.valid) {
      console.log('Form Submitted!', form.value);
    }
  }
}
