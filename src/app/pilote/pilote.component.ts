import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ObraService } from "../obra.service";
import { Pilote } from "../modelos/Pilote";
import { Location } from "@angular/common";

@Component({
  selector: "app-pilote",
  templateUrl: "./pilote.component.html",
  styleUrls: ["./pilote.component.css"]
})
export class PiloteComponent implements OnInit {
  pilote: Pilote;
  piloteApi = null;

  constructor(
    private route: ActivatedRoute,
    private obraService: ObraService,
    private location: Location
  ) {}

  getPilote(): void {
    let identif = this.route.snapshot.paramMap.get("identif");
    let id = identif.split("&");

    identif = id[0];
    let obra = id[1];
    console.log(identif, obra);

    this.obraService.getPilote(identif, obra).subscribe(o => {
      this.piloteApi = o;
      this.pilote = new Pilote(
        this.piloteApi.identif,
        this.piloteApi.nombreObra,
        this.piloteApi.diametro,
        this.piloteApi.profundidad,
        this.piloteApi.precioH,
        this.piloteApi.precioHorm,
      );
    });
    console.log(obra);
  }


  save(
    //identif: string,
    nombreObra: string,
    diametro: string,
    profundidad: string,
    precioH: string,
    precioHorm: string,
  ): void {
    //const identifV = identif;
    const nombreObraV = nombreObra;
    const diametroV = parseInt(diametro);
    const profundidadV = parseInt(profundidad);
    const precioHV = parseInt(precioH);
    const precioHormV = parseInt(precioHorm);

    const doc = {
      identif: this.pilote.identif,
      nombreObra: nombreObraV,
      diametro: diametroV,
      profundidad: profundidadV,
      precioH: precioHV,
      precioHorm: precioHormV,
    };
    this.obraService.actualizaPilote(doc).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.getPilote();
  }
}
