import { Component } from '@angular/core';

interface Asset {
  nama: string;
  akunAsset: string;
  deskripsi: string;
  tanggalAkuisisi: string;
  biayaAkuisisi: number;
  akunDikreditkan: string;
}

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrl: './asset.component.css'
})
export class AssetComponent {
  searchTerm: string = '';
  namaAsset: string = '';
  akunAsset: string = '';
  deskripsi: string = '';
  tanggalAkuisisi: string = '';
  biayaAkuisisi: number = 0;
  akunDikreditkan: string = '';

  akunList = [
    { id: '101', nama: 'Kas' },
    { id: '201', nama: 'Hutang Dagang' },
    { id: '301', nama: 'Piutang Dagang' },
    // Tambahkan akun-akun lain sesuai kebutuhan
  ];

  assetData: Asset[] = [
    { nama: 'Laptop', akunAsset: 'B-1001 Harta Tetap', deskripsi: 'Laptop kantor', tanggalAkuisisi: '01-01-2024', biayaAkuisisi: 15000000, akunDikreditkan: 'A-1001 Kas' },
    { nama: 'Mobil', akunAsset: 'B-1001 Harta Tetap', deskripsi: 'Mobil operasional', tanggalAkuisisi: '02-15-2024', biayaAkuisisi: 200000000, akunDikreditkan: 'A-1001 Kas' },
    // Tambahkan aset-aset lain sesuai kebutuhan
  ];

  filterAssets() {
    // Logika untuk memfilter aset berdasarkan searchTerm
  }

  onSubmit(form: any) {
    if (form.valid) {
      const newAsset: Asset = {
        nama: this.namaAsset,
        akunAsset: this.akunList.find(akun => akun.id === this.akunAsset)?.nama || '',
        deskripsi: this.deskripsi,
        tanggalAkuisisi: this.tanggalAkuisisi,
        biayaAkuisisi: this.biayaAkuisisi,
        akunDikreditkan: this.akunList.find(akun => akun.id === this.akunDikreditkan)?.nama || '',
      };
      this.assetData.push(newAsset);
      form.resetForm();
    }
  }
}
