export class Pilote {
  private _identif: string;
  private _nombreObra: string;
  private _diametro: number;
  private _profundidad: number;
  private _precioH: number;
  private _precioHorm: number;

  public constructor(
    identif: string,
    nombreObra: string,
    diametro: number,
    profundidad: number,
    precioH: number,
    precioHorm: number
  ) {
    (this._identif = identif),
      (this._nombreObra = nombreObra),
      (this._diametro = diametro),
      (this._profundidad = profundidad),
      (this._precioH = precioH),
      (this._precioHorm = precioHorm);
  }

  get identif() {
    return this._identif;
  }
  get nombreObra() {
    return this._nombreObra;
  }
  get diametro() {
    return this._diametro;
  }
  get profundidad() {
    return this._profundidad;
  }
  get precioH() {
    return this._precioH;
  }
  get pilotes() {
    return this.pilotes;
  }
  get precioHorm() {
    return this._precioHorm;
  }
  set diametro(_diametro: number) {
    if (_diametro < 0) {
      throw 'El diámetro debe ser > 0';
    }
    this._diametro = _diametro;
  }

  set profundidad(_profundidad: number) {
    if (_profundidad < 0) {
      throw 'El diámetro debe ser > 0';
    }
    this._profundidad = _profundidad;
  }

  /*tierra(){
        let tierra : number
        tierra =((((((this._diametro/2)*(this._diametro/2))*3.1416)*this._profundidad)*1.15)/1000000000)
        if (tierra == 0){
            throw "ERROR: No se ha echado hormigón, inténtelo de nuevo"
        }
        return Math.round(tierra)
    }

    /* 1,15 es el esponjamiento de la tierra extraida */

  hormigon() {
    let hormigon: number;
    hormigon =
      ((this.diametro / 2) *
        (this.diametro / 2) *
        3.1416 *
        this.profundidad) /
      1000000;

    if (hormigon == 0) {
      console.log(`Hormigon: ${hormigon}`);
    }
    //console.log(hormigon)
    return Math.round(hormigon);
  }

  hierro() {
    let hierro: number;
    hierro = 15 * this.profundidad;
    //console.log(hierro)
    return hierro;
  }

  /* 15 son los kg aplicables a metro lineal de pilote */

  /*nCamiones() {
    let nCamiones: number;
    nCamiones =
      ((this._diametro / 2) * (this._diametro / 2) *  3.1416 * this._profundidad *
        1.15) /
      1000000000 /
      6;
    if (nCamiones == 0) {
      throw 'ERROR: No se ha echado hormigón, inténtelo de nuevo';
    }
    return Math.round(nCamiones);
  }*/

  cHierro() {
    let cHierro = 0;
    cHierro = this.hierro() * this.precioH;
    return this.hierro() * this.precioH;

  }
  cHorm() {
    let cHorm = 0;
    cHorm = this.hormigon() * this.precioHorm;
    //console.log(this.hormigon() * this.precioHorm);
    return this.hormigon() * this.precioHorm;
  }


}
