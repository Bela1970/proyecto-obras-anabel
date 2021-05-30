import { Component, OnInit } from "@angular/core";
import { ObraService } from "../obra.service";
import { Obra } from "../modelos/Obra";
import { Pilote } from "../modelos/Pilote";

import * as Highcharts from "highcharts";

@Component({
  selector: "app-resultado",
  templateUrl: "./resultado.component.html",
  styleUrls: ["./resultado.component.css"]
})
export class ResultadoComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  obras: Array<Obra> = [];
  obrasApi = null;
  obraTmp: any;
  pilotes: Array<Pilote> = [];

  chartOptions: Highcharts.Options = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Resultados por obra'
    },
    
    xAxis: {
        categories: []
    },
    credits: {
        enabled: false
    },
    series: [{
        type: "column",
        name: "Resultado",
        data: [],
    },
    ]
    };

  constructor(private obraService: ObraService) {}

  getObrasApi() {
    this.obraService.getObrasApi().subscribe(obras => {
      this.obrasApi = obras;
      for (let obra of this.obrasApi) {
        let pilotes: Array<Pilote> = new Array();
        for (let pilote of obra._pilotes_obra) {
          let p = new Pilote(
            pilote.identif,
            pilote.nombreObra,
            pilote.diametro,
            pilote.profundidad,
            pilote.precioH,
            pilote.precioHorm
          );
          pilotes.push(p);

        }
        let o = new Obra(
          obra.nombre,
          obra.localidad,
          obra.presupuesto,
          obra.alias,
          pilotes
        );
        this.obras.push(o);
      }
      let resultado= this.obras.slice(0,10);
      this.chartOptions.xAxis["categories"] = resultado.map(
        (x: Obra) => x.nombre
      );

      //const dataSeries = resultado.map((x: Obra) => x.resultado);
      this.chartOptions.series[0]["data"] = resultado.map((x: Obra) => 
      x.resultado());

      Highcharts.chart("resultado", this.chartOptions);
    });
  }

  ngOnInit() {
    this.getObrasApi();
  }
}
