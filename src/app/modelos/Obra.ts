import { Pilote } from './Pilote';

export class Obra {
  private _nombre: string;
  private _localidad: string;
  private _presupuesto: number;
  private _alias: string;
  private _pilotes: Array<Pilote>;

  public constructor(
    nombre: string,
    localidad: string,
    presupuesto: number,
    alias: string,
    pilotes: Array<Pilote>
  ) {
    (this._nombre = nombre),
      (this._alias = alias),
      (this._localidad = localidad),
      (this._presupuesto = presupuesto),
      (this._alias = alias),
      (this._pilotes = pilotes);
  }

  get nombre() {
    return this._nombre;
  }

  get localidad() {
    return this._localidad;
  }

  get presupuesto() {
    return this._presupuesto;
  }

  get alias() {
    return this._alias;
  }

  get pilotes() {
    return this._pilotes;
  }

  set nombre(nombre: string) {
    this._nombre = nombre;
  }

  set localidad(localidad: string) {
    this._localidad = localidad;
  }

  set presupuesto(presupuesto: number) {
    this._presupuesto = presupuesto;
  }

  set alias(alias: string) {
    this._alias = alias;
  }

  set pilotes(pilotes: Pilote[]) {
    this._pilotes = pilotes;
  }

  resultado() {
    let resultado = 0;
    let cTotal = 0;
    for (let p of this.pilotes) {
      cTotal = cTotal + (p.cHierro() + p.cHorm());
      resultado = this.presupuesto - cTotal;
    }
    return resultado;
  }
}
