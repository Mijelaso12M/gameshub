/* IDENTIFICACION DE ARCHIVOS 
1. En qué archivo se define la interfaz juego?
rpta: se encuentra en el archivo interfaces.
2. Qué archivo maneja el estado global de los filtros?
rpta:filtros.component.ts.
3. Donde se configura el HttpClient para la aplicación?
rpta: app.config.ts
COMPRENSION DE ARQUITECTURA
4. Por qué este proyecto no tiene app.module.ts?
rpta: ya que el poryecto usa standalone.
5. ¿Qué ventaja tiene usar BehaviorSubject en el servicio de juegos?
rpta: porque tiene los parametros actuaizados .
*/




import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegosDataService } from '../../services/juegos-data.service';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Juego } from '../../interfaces/juego.interface';
import { Observable } from 'rxjs';
import { Categoria } from '../../interfaces/categoria.interface';
import { RouterLink } from '@angular/router';
import { TarjetaJuegoComponent } from '../tarjeta-juego/tarjeta-juego.component';
import { CategoriasService } from '../../services/categorias.service';


@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [CommonModule,RouterLink,TarjetaJuegoComponent,],
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit{
   juegospopulares$!: Observable<Juego[]>;
   juegoss$!: Observable<Juego[]>;
   Totaldejuegos=0;
   Juegosgratis=0;
   Juegospago=0;
   promedio=0;
   mejorjuego?:Juego;
     
     constructor(
      private juegosService: JuegosDataService, 
      private juegosDataService: JuegosDataService,
    private categoriasService: CategoriasService) {}

     ngOnInit(): void{

      this.juegospopulares$ = this.juegosService.obtenerJuegosPopulares(1);
      this.juegosDataService.obtenerJuegos().subscribe(juegos => {
      this.Totaldejuegos = juegos.length;
      this.Juegosgratis = juegos.filter(j => j.esGratis).length;
      this.Juegospago = juegos.filter(j => !j.esGratis).length;
       const precios = juegos.filter(j => !j.esGratis).map(j => j.precio);
      this.promedio = precios.length > 0? precios.reduce((acc, precio) => acc + precio, 0) / precios.length: 0;
  });
    }
}