import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    this.initKasBankChart();
    this.initPiutangChart();
    this.initHutangChart();
    this.initLabaRugiChart();
  }

  initKasBankChart(): void {
    new Chart("kasBankChart", {
      type: 'line',
      data: {
        labels: ['15 Jun', '18 Jun', '21 Jun', '24 Jun', '27 Jun', '30 Jun', '03 Jul', '06 Jul', '09 Jul'],
        datasets: [{
          label: 'Kas & Bank',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 9600877],
          borderColor: '#5AA454',
          fill: false
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: { display: true, title: { display: true, text: 'Date' } },
          y: { display: true, title: { display: true, text: 'Rupiah' } }
        }
      }
    });
  }

  initPiutangChart(): void {
    new Chart("piutangChart", {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Piutang',
          data: [],
          borderColor: '#A10A28',
          fill: false
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: { display: true, title: { display: true, text: 'Date' } },
          y: { display: true, title: { display: true, text: 'Rupiah' } }
        }
      }
    });
  }

  initHutangChart(): void {
    new Chart("hutangChart", {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Hutang',
          data: [],
          borderColor: '#C7B42C',
          fill: false
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: { display: true, title: { display: true, text: 'Date' } },
          y: { display: true, title: { display: true, text: 'Rupiah' } }
        }
      }
    });
  }

  initLabaRugiChart(): void {
    new Chart("labaRugiChart", {
      type: 'line',
      data: {
        labels: ['15 Jun', '18 Jun', '21 Jun', '24 Jun', '27 Jun', '30 Jun', '03 Jul', '06 Jul', '09 Jul'],
        datasets: [
          {
            label: 'Pemasukan',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 11600877],
            borderColor: '#5AA454',
            fill: false
          },
          {
            label: 'Biaya',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            borderColor: '#A10A28',
            fill: false
          },
          {
            label: 'Laba Bersih',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 11600877],
            borderColor: '#C7B42C',
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: { display: true, title: { display: true, text: 'Date' } },
          y: { display: true, title: { display: true, text: 'Rupiah' } }
        }
      }
    });
  }
}
