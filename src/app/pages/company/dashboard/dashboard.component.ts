import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ChartModule } from 'primeng/chart';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  username:string ="";
  role:string ="";
  constructor() {
    const jwthelper = new JwtHelperService();
    const token = jwthelper.decodeToken(localStorage.getItem('token'))
    this.username = token['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
    this.role = token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
  }
  data :any;
  options:any;
  ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    
    this.data = {
        labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz'],
        datasets: [
            {
                label: 'Satış Sayısı',
                backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                data: [1, 3, 5, 7, 2, 12, 24]
            },
            // {
            //     label: 'My Second dataset',
            //     backgroundColor: documentStyle.getPropertyValue('--pink-500'),
            //     borderColor: documentStyle.getPropertyValue('--pink-500'),
            //     data: [28, 48, 40, 19, 86, 27, 90]
            // }
        ]
    };

    this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            // y: {
            //     ticks: {
            //         color: textColorSecondary
            //     },
            //     grid: {
            //         color: surfaceBorder,
            //         drawBorder: false
            //     }
            // }

        }
    };
  }
}
