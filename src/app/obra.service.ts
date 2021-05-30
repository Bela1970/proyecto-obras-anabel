import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pilote } from './modelos/Pilote';

@Injectable({ providedIn: 'root' })
export class ObraService {
  private url = '  https://modificacion-proyecto-anabel.herokuapp.com/';
  constructor(private http: HttpClient) {}
  getObrasApi() {
    const urlget = `${this.url}obras/`;
    const v = this.http.get(urlget);
    console.log(urlget);
    return v;
  }

  addObra(doc: any) {
    return this.http.post(this.url, doc);
  }

  getObra(alias: string) {
    const url = `  https://modificacion-proyecto-anabel.herokuapp.com/obra/${alias}`;
    return this.http.get(url);
  }

  addPilote(doc: any) {
    const url = '   https://modificacion-proyecto-anabel.herokuapp.com/pilotes';
    return this.http.post(url, doc);
  }

  actualizaObra(doc: any) {
    const url = `   https://modificacion-proyecto-anabel.herokuapp.com/actualiza/${
      doc.alias
    }`;
    return this.http.post(url, doc);
  }

  deletePilote(pilote: Pilote) {
    const url = ` https://modificacion-proyecto-anabel.herokuapp.com/borraP/${
      pilote.identif
    }`;
    return this.http.delete(url);
  }

  getPilote(identif: string, obra: string) {
    const url = `  https://modificacion-proyecto-anabel.herokuapp.com/plt/${identif}`;
    return this.http.get(url);
  }

  actualizaPilote(doc: any) {
    const url = `  https://modificacion-proyecto-anabel.herokuapp.com/actualizaP/${
      doc.identif
    }`;
    return this.http.post(url, doc);
  }
}
