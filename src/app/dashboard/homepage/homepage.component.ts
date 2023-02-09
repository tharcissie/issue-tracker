import { Component } from '@angular/core';
import { cardData } from './cardData';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  cardData = cardData

  chart: any;
	
  chartOptions = {
    title:{
      text: "Total Projects by Issues"
    },
    animationEnabled: true,
    axisY: {
      includeZero: true,
      // suffix: "K"
    },
    data: [{
      type: "bar",
      indexLabel: "{y}",
      // yValueFormatString: "#,###K",
      dataPoints: [
        { label: "Snapchat", y: 15 },
        { label: "Instagram", y: 20 },
        { label: "YouTube", y: 24 },
        { label: "Twitter", y: 29 },
        { label: "Facebook", y: 73 }
      ]
    }]
  }	
}
