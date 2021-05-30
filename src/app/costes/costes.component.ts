import { Component, OnInit } from '@angular/core';
import { ObraService } from '../obra.service';
import { Obra } from '../modelos/Obra';
import { Pilote } from '../modelos/Pilote';

import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-costes',
  templateUrl: './costes.component.html',
  styleUrls: ['./costes.component.css']
})
export class CostesComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  obras: Array<Obra> = [];
  obrasApi = null;
  obraTmp: any;
  pilotes: Array<Pilote> = [];

  chartOptions: Highcharts.Options = {
    chart: {
      type: 'column',
      backgroundColor: 'white',
      borderRadius: 15,
      spacing: [20, 20, 20, 20]
    },
    title: {
      text: 'Costes por pilote/obra',
      style: {
        fontFamily: 'verdana',
        fontSize: '20px',
        color: '#512418'
      }
    },
    xAxis: {
      categories: []
    },
    yAxis: {
      title: {
        text: 'Costes'
      }
    },

    series: [
      {
        type: 'column',
        name: 'hierro',
        data: [],
        color: '#D8664D '
      },
      {
        type: 'column',
        name: 'hormigon',
        data: [],
        color: '#8AD0EF  '
      }
    ],
    noData: {
      style: {
        fontWeight: 'bold',
        fontSize: '15px',
        color: '#303030'
      }
    }
  };

  constructor(private obraService: ObraService) {}

  getPilotes() {
    this.obraService.getObrasApi().subscribe(obras => {
      this.obrasApi = obras;
      console.log(this.obrasApi);
      for (let obra of this.obrasApi) {
        for (let pilote of obra._pilotes_obra) {
          let p = new Pilote(
            pilote.identif,
            pilote.nombreObra,
            pilote.diametro,
            pilote.profundidad,
            pilote.precioH,
            pilote.precioHorm
          );
          this.pilotes.push(p);
        }
      }

      console.log(this.pilotes);

      let costes = this.pilotes; //.slice(0, 30);
      console.log(costes);

      this.chartOptions.xAxis['categories'] = costes.map((x: Pilote) => {
        return x.identif;
      });

      this.chartOptions.series[0]['data'] = costes.map((x: Pilote) => {
        return x.cHierro();
        //console.log(x.cHierro())
      });
      this.chartOptions.series[1]['data'] = costes.map((x: Pilote) => {
        return x.cHorm();
        //console.log(x.cHorm())
      });
      /*this.chartOptions.series[3]["data"] = costes.map((x: Pilote) =>  {return x.cTotal()
      });*/

      Highcharts.chart('costes', this.chartOptions);
    });
  }

  ngOnInit() {
    this.getPilotes();
  }
}
