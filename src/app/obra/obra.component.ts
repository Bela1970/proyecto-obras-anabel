import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObraService } from '../obra.service';
import { Obra } from '../modelos/Obra';
import { Pilote } from '../modelos/Pilote';
import { Location } from '@angular/common';

import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-obra',
  templateUrl: './obra.component.html',
  styleUrls: ['./obra.component.css']
})
export class ObraComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  obra: Obra;
  obraApi = null;

  chartOptions: Highcharts.Options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      backgroundColor: '#b0ffba',
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Benficios por obra'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        showInLegend: true
      }
    },
    series: [
      {
        type: 'pie',
        data: []
      }
    ]
  };

  constructor(
    private route: ActivatedRoute,
    private obraService: ObraService,
    private location: Location
  ) {}

  getObra(): void {
    let nombre = this.route.snapshot.paramMap.get('nombre');
    this.obraService.getObra(nombre).subscribe(o => {
      this.obraApi = o;
      let pilotes: Array<Pilote> = new Array();
      for (let pilote of this.obraApi[0]._pilotes_obra) {
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
      this.obra = new Obra(
        this.obraApi[0].nombre,
        this.obraApi[0].localidad,
        this.obraApi[0].presupuesto,
        this.obraApi[0].alias,
        pilotes
      );
      /*type tDoc = {
        identificador: string;
        y: number;
        x: number;
      };

      let coste: Array<tDoc> = new Array();

      for (let p of this.obra.pilotes) {
        let c: tDoc = {
          identificador: p.identif,
          y: p.precioH;
          x: p.precioHorm;
        };
        coste.push(c);
      }

      console.log(coste);*/

      //this.chartOptions.series[0]["data"] = coste;
      //this.chartOptions.series[0]["identificador"] = "Coste";

      Highcharts.chart('Grafico1', this.chartOptions);
    });
  }

  add(
    identif: string,
    nombreObra: string,
    diametro: string,
    profundidad: string,
    precioH: string,
    precioHorm: string
  ) {
    const identifV = identif.trim();
    const nombreObraV = nombreObra.trim();
    const diametroV = parseInt(diametro);
    const profundidadV = parseInt(profundidad);
    const precioHV = parseInt(precioH);
    const precioHormV = parseInt(precioHorm);

    const newDoc: any = {
      identif: identifV,
      nombreObra: this.obra.nombre,
      diametro: diametroV,
      profundidad: profundidadV,
      precioH: precioHV,
      precioHorm: precioHorm
    };

    this.obraService.addPilote(newDoc).subscribe(p => {
      const piloteTmp: any = newDoc;
      this.obra.pilotes.push(piloteTmp);
    });
  }

  save(
    nombre: string,
    localidad: string,
    presupuesto: string
    //alias: string
  ): void {
    const nombreV = nombre.trim();
    const localidadV = localidad.trim();
    const presupuestoV = parseInt(presupuesto);
    //const aliasV = this.obra.alias;

    const doc = {
      nombre: nombreV,
      localidad: localidadV,
      presupuesto: presupuestoV,
      alias: this.obra.alias
    };
    this.obraService.actualizaObra(doc).subscribe(() => this.goBack());
  }

  delete(pilote: Pilote): void {
    this.obra.pilotes.forEach((p, index) => {
      if (p === pilote) this.obra.pilotes.splice(index, 1);
    });
    this.obraService.deletePilote(pilote).subscribe();
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.getObra();
  }
}
