import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ObrasComponent } from "./obras/obras.component";
import { RouterModule, Routes } from "@angular/router";
import { ObraComponent } from "./obra/obra.component";
import { PiloteComponent } from "./pilote/pilote.component";
import { CostesComponent } from "./costes/costes.component";
import { ResultadoComponent } from "./resultado/resultado.component";
import { InformacionComponent } from "./informacion/informacion.component";

const routes: Routes = [
  { path: "informacion", component: InformacionComponent },
  { path: "listadoObras", component: ObrasComponent },
  { path: "obra/:nombre", component: ObraComponent },
  { path: "pilote/:identif", component:PiloteComponent },
  { path: "costes", component: CostesComponent },
  { path: "resultado", component: ResultadoComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
