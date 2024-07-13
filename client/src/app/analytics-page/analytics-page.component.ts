import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { AnalyticsService } from '../shared/services/analytics.service';
import { AnalyticsPage } from '../shared/interfaces';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.css'],
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('gain') gainRef: ElementRef;
  @ViewChild('order') orderRef: ElementRef;

  average: number;
  pending = true;

  aSub: Subscription;

  constructor(private service: AnalyticsService) {}

  ngAfterViewInit() {
    const gainConfig: any = {
      label: 'Выручка',
      color: 'rgb(255,99,132)',
    };

    const orderConfig: any = {
      label: 'Заказы',
      color: 'rgb(54,162,235)',
    };


    this.aSub = this.service.getAnalytics().subscribe((data: AnalyticsPage) => {
      this.average = data.average;

      gainConfig.labels = data.chart.map((item) => item.label);
      gainConfig.data = data.chart.map((item) => item.gain);

      orderConfig.labels = data.chart.map((item) => item.label);
      orderConfig.data = data.chart.map((item) => item.order);

       //temp
      //  gainConfig.labels.push('10.03.24')
      //  gainConfig.data.push(1500)
      //  gainConfig.labels.push('11.03.24')
      //  gainConfig.data.push(500)

       //temp
      const gainCtx = this.gainRef.nativeElement.getContext('2d');
      const orderCtx = this.orderRef.nativeElement.getContext('2d');

      gainCtx.canvas.height = '300px';
      orderCtx.canvas.height = '300px';

      new Chart(gainCtx, createChartConfig(gainConfig));

      new Chart(orderCtx, createChartConfig(orderConfig));

      this.pending = false;
    });
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }
}

function createChartConfig(params): ChartConfiguration<'line', any, any> {
  return {
    type: 'line',
    data: {
      labels: params.labels,
      datasets: [{
        label: params.label,
        data: params.data,
        fill: false,
        borderColor: params.color,
        tension: 0.1
      }]
    },
    options: {
      responsive: true
    }
  };
}