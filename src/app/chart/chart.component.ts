import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {BaseChartDirective, Color} from 'ng2-charts';
import {DataService} from '../data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: any[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        // {
        //   id: 'y-axis-1',
        //   position: 'right',
        //   gridLines: {
        //     color: 'rgba(255,0,0,0.3)',
        //   },
        //   ticks: {
        //     fontColor: 'red',
        //   }
        // }
      ]
    },
    annotation: {},
  };
  public lineChartColors: Color[] = [
    { // red
      backgroundColor: 'rgb(0, 255, 204)',
      borderColor: 'rgb(0, 255, 204)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective, {static: true}) chart: BaseChartDirective | undefined;

  constructor(public dataService: DataService) {
  }

  ngOnInit(): void {
    this.fetchData();
  }

  public fetchData(): void {
    this.dataService.FetchData().subscribe(response => {
      for (const coinData of response) {
        const priceList = [];
        const labelList: string[] = [];
        for (const doc of coinData.coin_data) {
          priceList.push(doc.data.coin_data.current_price);
          let timestamp: string = doc.id;
          timestamp = timestamp.slice(0, 2) + '/' + timestamp.slice(2, 4) + '/' + timestamp.slice(4, 8) + ' ' +
            timestamp.slice(9, 11) + ':' + timestamp.slice(11, 13) + ' ' + timestamp.slice(15, 17);
          labelList.push(timestamp);
        }
        this.lineChartData.push({data: priceList, label: coinData.coin});
        this.lineChartLabels.push(labelList);
      }

    }, error => {
      console.log(error);
    });
  }
}
