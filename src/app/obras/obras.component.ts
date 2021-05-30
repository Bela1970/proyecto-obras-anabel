
import { Component, OnInit } from "@angular/core";
import { ObraService } from "../obra.service";
import { Obra } from "../modelos/Obra";
import { Pilote } from "../modelos/Pilote";
@Component({
  selector: "app-obras",
  templateUrl: "./obras.component.html",
  styleUrls: ["./obras.component.css"]
})
export class ObrasComponent implements OnInit {
  obras: Array<Obra> = [];
  obrasApi = null;
  obraTmp: any;
  constructor(private obraService: ObraService) {}

  getObras() {
    this.obraService.getObrasApi().subscribe(obras => {
      this.obrasApi = obras;
      console.log (this.obrasApi)
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
        //console.log(o.resultado())
        this.obras.push(o);
      }

    });
  }

  add (nombre: string, localidad: string, presupuesto: string, alias: string) {
    const nombreV = nombre.trim();
    const localidadV = localidad;
    const presupuestoV = parseInt(presupuesto);
    const aliasV = alias;

    const newDoc: any = {
      nombre: nombreV,
      localidad: localidadV,
      presupuesto: presupuestoV,
      alias: aliasV
    };

    this.obraService.addObra(newDoc).subscribe(p => {
      this.obraTmp = newDoc;
      this.obras.push(this.obraTmp);
    });

  }

  ngOnInit() {
    this.getObras();
  }
}
