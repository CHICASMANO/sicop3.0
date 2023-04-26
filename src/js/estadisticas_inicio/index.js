import { Dropdown } from "bootstrap";
import { validarFormulario, Toast, ocultarLoader, mostrarLoader } from "../funciones";
import Datatable from 'datatables.net-bs5';
import { lenguaje } from "../lenguaje";
import Swal from "sweetalert2";
import L from "leaflet";



var Highcharts = require('highcharts');
const { data } = require('jquery');
// Load module after Highcharts is loaded
//require('highcharts/modules/exporting')(Highcharts);  
// Create the chart
//Highcharts.chart('container', { /*Highcharts options*/ });

const divTabla = document.getElementById('divTabla');
let tablaProductos = new Datatable('#productosTabla');


const divTabla2 = document.getElementById('divTabla2');
let tablaBrigadas = new Datatable('#TablaBrigadas');

const divTabla3 = document.getElementById('divTabla3');
let tablaAreasMis = new Datatable('#TablaAreasMis');

const TotalEfectuado = document.getElementById('totalEfectuado');
const loader = document.querySelector('#loader')




$(function () {

  var start = moment().subtract(0, 'days');
  var end = moment();

  function cb(start, end) {
    $('#reportrange span').html(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
  }

  $('#reportrange').daterangepicker({
    startDate: start,
    endDate: end,
    ranges: {
      'Hoy': [moment(), moment()],
      'Ayer': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Últimos 7 Días': [moment().subtract(6, 'days'), moment()],
      'Últimos 30 Días': [moment().subtract(29, 'days'), moment()],
      'Este Mes': [moment().startOf('month'), moment().endOf('month')],
      'Último Mes': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    }
  }, cb);

  cb(start, end);

});

let fecha_inicio = '';
let fecha_fin = '';

const map = L.map('map', {
  center: [15.825158, -89.72959],
  zoom: 7.5
})

const map2 = L.map('map2', {
  center: [15.825158, -89.72959],
  zoom: 7.5
});
const markers = L.layerGroup();
const markers2 = L.layerGroup();

markers.addTo(map)
markers2.addTo(map2)


const grayScale = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 100,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoiZGFuaWVsZmo5NzUiLCJhIjoiY2tpcWNlbHM0MXZmbDJ6dTZvdDV3NGticiJ9.7ciIi1FKO5-BqgE0zz5UFw'
}).addTo(map);




const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 25,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map2);

const LimpiarMapa = () => {
  map.eachLayer(layer => { markers.removeLayer(layer) })
  map2.eachLayer(layer => { markers2.removeLayer(layer) })

}

const consultarFuerzas = async () => {
  mostrarLoader();
  let total_form = document.getElementById('totalEfectuado')
  LimpiarMapa()

    

  try {
    //primera grafica POR FUERZAS
    const url = `/sicop3.0/inicio/consulta?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}` //ruta que esta en mi controller para entrar a la clase en MetodoEjecucionController.php
    const headers = new Headers();//siempre va...
    headers.append("X-Requested-With", "fetch"); //siempre va

    const config = {
      method: 'GET',

      headers
    }

    const respuesta = await fetch(url, config);
    const data = await respuesta.json();

    //console.log(data)
    let datos = [];

    let tierra = 0;
    let naval = 0;
    let aereo = 0;
    let fuerza_tierra = "FUERZA DE TIERRA";
    let fuerza_naval = "FUERZA NAVAL";
    let fuerza_aereo = "FUERZA AEREA";
    const { consulta1, consulta2, consulta3, consulta4, consulta5 } = data
    consulta1.forEach(element => {
      if (element.met_ejec_codigo == 1 || element.met_ejec_codigo == 2) {

        fuerza_tierra = "FUERZA DE TIERRA";
        tierra = tierra + parseInt(element.total)

      } else if (element.met_ejec_codigo == 3 || element.met_ejec_codigo == 4 || element.met_ejec_codigo == 5) {
        fuerza_naval = "FUERZA NAVAL";
        naval = naval + parseInt(element.total)

      } else if (element.met_ejec_codigo == 6) {
        fuerza_aereo = "FUERZA AEREA";
        aereo = aereo + parseInt(element.total)

      }
    });



    const chart = Highcharts.chart('container', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'ACTIVIDADES POR FUERZA'
      },
      xAxis: {
        type: 'CATEGORIA',
        labels: {
          rotation: -45,
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif'
          }
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'sadfa'
        }
      },
      tooltip: {
        pointFormat: 'En esta categoria: <b>{point.y:.1f} Operacion(es)</b>' //'{series.name}: <b>{point.percentage:.1f}%</b>'
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
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        name: 'PORCENTAJES',
        //colorByPoint: true,
        data: [{
          name: 'FUERZA AEREA',
          y: aereo,
          // color: "#58D68D",
          sliced: true,
          selected: true
        }, {
          name: 'FUERZA NAVAL',
          y: naval,
          // color: "#E74C3C "
        }, {
          name: 'FUERZA DE TIERRA',
          y: tierra,
          // color: "#E74C3C "
        }]
      }]
    });
    //AQUI EMPIEZA GRAFICA 2
    let namearea1 = ""
    let namearea2 = ""
    let namearea3 = ""
    let namearea4 = ""
    let namearea5 = ""
    let labels = [], cantidades = []
    let am1 = 0, am2 = 0, am3 = 0, am4 = 0, am5 = 0

    consulta2.forEach(d => {
      labels = [d.are_descripcion]
      if (labels == "AREA DE MISION UNO") {
        am1 = am1 + parseInt(d.total2)
        namearea1 = "AREA-M1"
      } else if (labels == "AREA DE MISION DOS") {
        am2 = am2 + parseInt(d.total2)
        namearea2 = "AREA-M2"
      } else if (labels == "AREA DE MISION TRES") {
        am3 = am3 + parseInt(d.total2)
        namearea3 = "AREA-M3"
      } else if (labels == "AREA DE MISION CUATRO") {
        am4 = am4 + parseInt(d.total2)
        namearea4 = "AREA-M4"
      } else if (labels == "AREA DE MISION CINCO") {
        am5 = am5 + parseInt(d.total2)
        namearea5 = "AREA-M5"
      }

    })



    let infoAreas = ""
    // info de brigadas para tabla
    let conteo2 = 0
    consulta2.forEach(element => {
      conteo2++,
        infoAreas = [...infoAreas,
        //[element.dep_desc_ct,parseInt(element.total3)],
        {
          contador: conteo2,
          name: element.are_descripcion,
          y: parseInt(element.total2),
        },
        ]
    });





    /*   consulta2.forEach(element => {

          let objeto = [
              '["'+element.are_descripcion+'",'+parseInt(element.total2)+']'+','
            ]
          datos = [...datos,objeto]
    });
*/

    //*/
    const chart2 = Highcharts.chart('container2', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false
      },
      title: {
        text: 'GRÁFICA POR AREA DE MISION',
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y:.1f} Operacion(es)</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: true,
            distance: -50,
            style: {
              fontWeight: 'bold',
              color: 'white'
            }
          },
          startAngle: -90,
          endAngle: 90,
          center: ['50%', '75%'],
          size: '110%'
        }
      },
      series: [{
        type: 'pie',
        name: ' CANTIDAD',
        innerSize: '40%',
        data: [// datos,
          //['AM-1',am1],
          //['AM-2',am2],
          //['AM-3',am3],
          //['AM-4',am4],
          //['AM-5',am5],

          {
            name: namearea1,
            y: am1,
            // color: "#58D68D",
            sliced: true,
            selected: true
          },
          {
            name: namearea2,
            y: am2,
            // color: "#58D68D",
            sliced: true,
            selected: true
          },
          {
            name: namearea3,
            y: am3,
            // color: "#58D68D",
            sliced: true,
            selected: true
          },
          {
            name: namearea4,
            y: am4,
            // color: "#58D68D",
            sliced: true,
            selected: true
          },
          {
            name: namearea5,
            y: am5,
            // color: "#58D68D",
            sliced: true,
            selected: true
          },
          {

            dataLabels: {
              enabled: false
            }
          }
        ]
      }]
    })


    let infoBrigadas = ""
    // console.log(consulta3)
    consulta3.forEach(element => {
      infoBrigadas = [...infoBrigadas,
      [element.dep_desc_ct, parseInt(element.total3)],
        /*                         {
                                  name: element.dep_desc_ct,
                                  y: parseInt(element.total3),
                                  color: "#FF5733",
                                  sliced: true,
                                  selected: true
                                }, */
      ]
    });

    let infoBrigadas2 = ""
    // info de brigadas para tabla
    let conteo = 0
    consulta3.forEach(element => {
      conteo++,
        infoBrigadas2 = [...infoBrigadas2,
        //[element.dep_desc_ct,parseInt(element.total3)],
        {
          contador: conteo,
          name: element.dep_desc_ct,
          y: parseInt(element.total3),
        },
        ]
    });
    //console.log(infoBrigadas)


    //GRAFICA 3 BRIGADAS
    const chart3 = Highcharts.chart('container3', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'BRIGADAS EN OPERACIONES MILITARES'
      },
      subtitle: {
        text: 'Fuente: <a href="https://cit.mindef.mil.gt/AUTOCOM/AUTOCOM/index.php" target="_blank">Sistema de Control Operacional del Ejército</a>'
      },
      xAxis: {
        type: 'category',
        labels: {
          rotation: -45,
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif'
          },
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Cantidad de Operaciones'
        }
      },
      legend: {
        enabled: false
      },
      tooltip: {
        pointFormat: 'Cantidad: <b>{point.y:.1f} Operacion(es)</b>'
      },
      series: [{
        name: 'Brigadas Militares',

        data: infoBrigadas,
        dataLabels: {
          enabled: true,
          rotation: -90,
          color: '#FFFFFF',
          align: 'right',
          format: '{point.y:.1f}', // one decimal
          y: 10, // 10 pixels down from the top
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif'
          }
        }
      }]
    });

    // info de las actividades por fuerza


    /* const fTierra = [];
    fTierra[0]= fuerza_tierra;
    fTierra[1]= fuerza_naval;
    fTierra[2]= fuerza_aereo;
    
    
    const fTierraCant = [];
    fTierraCant[0]=tierra;
    fTierraCant[1]=naval;
    fTierraCant[2]=aereo;*/

    //const todojunto3 =[fuerza_tierra, tierra, fuerza_naval, naval, fuerza_aereo, aereo]

    const todojunto = [];
    // todojunto[0]=[ fuerza_tierra, tierra];
    // todojunto[1]=[ fuerza_naval, naval];
    // todojunto[2]=[ fuerza_aereo, aereo];  //*/

    todojunto[0] = {
      'contador': 1,
      'nombre': fuerza_tierra,
      'cantidad': tierra,
    }
    todojunto[1] = {
      'contador': 2,
      'nombre': fuerza_naval,
      'cantidad': naval,
    }
    todojunto[2] = {
      'contador': 3,
      'nombre': fuerza_aereo,
      'cantidad': aereo,
    }

    /* const todojunto2 =[];
    todojunto2[0]=[ fuerza_tierra, tierra];
    todojunto2[1]=[tierra];
    todojunto2[2]=[fuerza_naval];
    todojunto2[3]=[naval];
    todojunto2[4]=[fuerza_aereo];
    todojunto2[5]=[aereo]; */





    let tablaProductos = new Datatable('#productosTabla');
    tablaProductos.destroy();
    let contador = -1;
    let contador2 = 1
    //let contador2 = -1;
    new Datatable('#productosTabla', {
      language: lenguaje,
      //selected : false,
      data: todojunto,
      columns: [
        {
          data: 'contador',
          //render: (data) => {
          //  return 'NO. ' + data
          //}
          // render : () => {      
          //     return contador2++
          // },
        },
        {

          data: 'nombre',
          // "render": () => 
          // {

          //     contador++;
          //     if(contador == 0) {
          //      return fuerza_tierra 
          //     }else if(contador == 1) {
          //       return fuerza_naval
          //     }else if(contador == 2) {
          //       return fuerza_aereo
          //     }
          // }, 
        },
        {
          data: 'cantidad',

          //  "render": () => 
          //  {
          //      if(contador == 0) {
          //          return tierra;
          //      }else if(contador == 1) {
          //        return naval
          //      }else if(contador == 2) {
          //        return aereo
          //      }
          //  }, 
        },

      ],


    })

    /* 
    tablaProductos = new Datatable('#productosTabla', {
        language : lenguaje,
        data : consulta1,
        "render": (data,type,row,meta) => 
        {
            if(row['met_ejec_codigo']==1 || row['met_ejec_codigo']==2) {
                return `FUERZA DE TIERRA`
            }else if(row['met_ejec_codigo']==3 || row['met_ejec_codigo']==4 || row['met_ejec_codigo']==5) {
              return `FUERZA NAVAL`
            }else if(row['met_ejec_codigo']==6) {
              return `FUERZA AEREA`
            }
        }, 
    
        render: (data,type,row,meta) => 
        {
            if(row['met_ejec_codigo']==1){
              cantFuerzas = cantFuerzas+parseInt(row['total'])
            }else if(row['met_ejec_codigo']==2) {
              cantFuerzas = cantFuerzas+parseInt(row['total'])
              fuerza = "FUERZA DE TIERRA"
    
              columns : [
                { 
                    data : 'id',
                    render : () => {      
                        return contador++;
                    }
                },
                { 
                  data : "met_ejec_codigo",
                },
                { 
                    data : cantFuerzas
                },
               ]
               
            }
        }
    
    /*     columns : [
          { 
              data : 'id',
              render : () => {      
                  return contador++;
              }
          },
          { 
            data : "met_ejec_codigo",
          },
          { 
              data : "total"
          },
         ]
    }) */

    //console.log(todojunto)


    //aqui empieza brigadas por operacion Tte. Cab. Chicas V. C.C. 10,110 / K-1484
    //console.log(infoBrigadas2)

    let tablaBrigadas = new Datatable('#TablaBrigadas');
    tablaBrigadas.destroy();
    let cont = 0
    new Datatable('#TablaBrigadas', {
      language: lenguaje,
      data: infoBrigadas2,
      columns: [
        {

          data: 'contador'
        },
        {

          data: 'name',

        },
        {
          data: 'y',

        },

      ],


    })

    // aqui empieza tabla por areas de mision

    let tablaAreasMis = new Datatable('#TablaAreasMis');
    tablaAreasMis.destroy();
    new Datatable('#TablaAreasMis', {
      language: lenguaje,
      data: infoAreas,
      columns: [
        {

          data: 'contador'
        },
        {

          data: 'name',

        },
        {
          data: 'y',

        },

      ],


    })


    let infototales = 0
    consulta1.forEach(element => {
      if (element.met_ejec_codigo == 1 || element.met_ejec_codigo == 2) {
        infototales = infototales + parseInt(element.total)

      } else if (element.met_ejec_codigo == 3 || element.met_ejec_codigo == 4 || element.met_ejec_codigo == 5) {
        infototales = infototales + parseInt(element.total)

      } else if (element.met_ejec_codigo == 6) {
        infototales = infototales + parseInt(element.total)
      }
    });

    total_form.value = infototales;

    // AQUI EMPIEZAN LOS MAPAS LLEGUÉ HASTA PRUEBA 2 (FUE LA QUE CORRIÓ) K-1484
 
    
    
   
    
    // document.addEventListener('DOMContentLoaded', () => {
    //   const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    //   const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl))

    // })
    let contador_areas = 0
    let no_areas = ""
    let are_codigo = ""
    let cat = ""
    let are_responsabilidad = ""
    let lugar_are = ""
    let encargado_Are = ""
    let inicio_ope = ""
    let finaliza = ""
    let latitud_are = ""
    let longitud_are = ""
    let depend_Are = ""
    let are_descripcion = ""
    let are_situacion = ""
    consulta5.forEach(element => {

      no_areas = contador_areas++
      are_codigo = element.are_codigo
      cat = element.per_catalogo
      are_responsabilidad = element.are_responsabilidad
      lugar_are = element.coo_lugar
      encargado_Are = element.gra_desc_lg + ' ' + element.per_nom1 + ' ' + element.per_nom2 + ' ' + element.per_ape1 + ' ' + element.per_ape2
      inicio_ope = element.ope_pla_inicia
      finaliza = element.ope_pla_termina
      latitud_are = element.coo_decimal_lat
      longitud_are = element.coo_decimal_long
      depend_Are = element.dep_desc_lg
      are_descripcion = element.are_descripcion
      are_situacion = element.are_situacion

      if (are_descripcion == "AREA DE MISION UNO" && are_situacion == 1) {
        var Icono2 = L.icon({
          iconUrl: "./images/blue/blank.png",
          iconSize: [30, 40],
          iconAnchor: [15, 40]
        });
      } else if (are_descripcion == "AREA DE MISION DOS" && are_situacion == 1) {
        var Icono2 = L.icon({
          iconUrl: "./images/orange/blank.png",
          iconSize: [30, 40],
          iconAnchor: [15, 40]
        });
      } else if (are_descripcion == "AREA DE MISION TRES" && are_situacion == 1) {
        var Icono2 = L.icon({
          iconUrl: "./images/red/blank.png",
          iconSize: [30, 40],
          iconAnchor: [15, 40]
        });
      } else if (are_descripcion == "AREA DE MISION CUATRO" && are_situacion == 1) {
        var Icono2 = L.icon({
          iconUrl: "./images/pink/blank.png",
          iconSize: [30, 40],
          iconAnchor: [15, 40]
        });
      } else if (are_descripcion == "AREA DE MISION CINCO" && are_situacion == 1) {
        var Icono2 = L.icon({
          iconUrl: "./images/green/blank.png",
          iconSize: [30, 40],
          iconAnchor: [15, 40]
        });
      }

      var InfoWindow2 = L.marker([latitud_are, longitud_are], {
        title: are_descripcion,
        draggable: true,
        opacity: 0.75,
        icon: Icono2
      }).bindPopup(`
          <div id="contentInfoWindow ${are_codigo}class="contentMap">
            <div class="contentTxt">
              <h3 align="center">Operacion Realizada:
              </h3>
              <center>
                <img src="https://sistema.ipm.org.gt/sistema/fotos_afiliados/ACTJUB/${cat}.jpg" width="100px">
              </center>
              <br>
              </h2 align="center"><b> Area de Mision: </b>${are_descripcion}</b></br>
              </h2><b>Responsabilidad: </b>${are_responsabilidad}</br>
              </h2><b>Lugar: </b>${lugar_are}</br>
              </h2><b>Oficial Encargado: </b>${encargado_Are}</br>
              </h2><b>Inicia Operacion: </b>${inicio_ope}</br>
              </h2><b>Finaliza Operacion: </b>${finaliza}</br>
              </h2><b>Latitud: </b>${latitud_are}</br>
              </h2><b>Langitud: </b>${longitud_are}</br>
              </h2><b>Dependencia: </b>${depend_Are}</br>
              </h3>
            </div>
          </div>
          <form id="formulario"><input type="hidden" name="num" id="num" value=""><input type="hidden" name="accion" id="accion" value=""></form>
        `)
        .addTo(markers2);
    }

    )


    let contador_consul4 = 0
    let no = ""
    let ope_codigo = ""
    let per_catalogo = ""
    let operacion = ""
    let prop_codigo = ""
    let actividad = ""
    let lugar = ""
    let encargado = ""
    let telefono = ""
    let inicio = ""
    let termina = ""
    let latitud = ""
    let longitud = ""
    let dependencia = ""
    consulta4.forEach(element => {
      no = contador_consul4++
      ope_codigo = element.ope_codigo
      per_catalogo = element.per_catalogo
      operacion = element.ope_descripcion
      prop_codigo = element.prop_codigo
      actividad = element.prop_descripcion
      lugar = element.coo_lugar
      encargado = element.gra_desc_lg + ' ' + element.per_nom1 + ' ' + element.per_nom2 + ' ' + element.per_ape1 + ' ' + element.per_ape2
      telefono = element.ope_pla_tel_resp
      inicio = element.ope_pla_inicia
      termina = element.ope_pla_termina
      latitud = element.coo_decimal_lat
      longitud = element.coo_decimal_long
      dependencia = element.dep_desc_lg

      if (prop_codigo == 41) {
        var Icono = L.icon({
          iconUrl: "./images/gui/puente.png",
          iconSize: [30, 40],
          iconAnchor: [15, 40]
        });
      } else if (prop_codigo == 43) {
        var Icono = L.icon({
          iconUrl: "./images/gui/telephone.png",
          iconSize: [30, 40],
          iconAnchor: [15, 40]
        });
      } else if (prop_codigo == 42) {
        var Icono = L.icon({
          iconUrl: "./images/gui/electricidad.png",
          iconSize: [30, 40],
          iconAnchor: [15, 40]
        });
      } else if (prop_codigo == 10) {
        var Icono = L.icon({
          iconUrl: "./images/gui/airport_runway.png",
          iconSize: [30, 40],
          iconAnchor: [15, 40]
        });
      } else if ((prop_codigo == 26) || (prop_codigo == 23) || (prop_codigo == 24) || (prop_codigo == 44) || (prop_codigo == 55)) {
        var Icono = L.icon({
          iconUrl: "./images/gui/bomber-2.png",
          iconSize: [30, 40],
          iconAnchor: [15, 40]
        });
      } else if ((prop_codigo == 33) || (prop_codigo == 48) || (prop_codigo == 53) || (prop_codigo == 54) || (prop_codigo == 52) || (prop_codigo == 51)) {
        var Icono = L.icon({
          iconUrl: "./images/gui/asuntos_civiles.png",
          iconSize: [30, 40],
          iconAnchor: [15, 40]
        });
      } else if (prop_codigo == 5) {
        var Icono = L.icon({
          iconUrl: "./images/gui/cono.png",
          iconSize: [30, 40],
          iconAnchor: [15, 40]
        });
      } else if (prop_codigo == 9) {
        var Icono = L.icon({
          iconUrl: "./images/gui/cono_azul.png",
          iconSize: [30, 40],
          iconAnchor: [15, 40]
        });
      } else if ((prop_codigo == 16) || (prop_codigo == 17) || (prop_codigo == 18) || (prop_codigo == 29) || (prop_codigo == 37) || (prop_codigo == 22) || (prop_codigo == 19) || (prop_codigo == 21)) {
        var Icono = L.icon({
          iconUrl: "./images/gui/navales.png",
          iconSize: [30, 40],
          iconAnchor: [15, 40]
        });
      } else if ((prop_codigo == 28) || (prop_codigo == 56)) {
        var Icono = L.icon({
          iconUrl: "./images/gui/guate.png",
          iconSize: [30, 40],
          iconAnchor: [15, 40]
        });
      } else if (prop_codigo == 47) {
        var Icono = L.icon({
          iconUrl: "./images/gui/rojo.png",
          iconSize: [30, 40],
          iconAnchor: [15, 40]
        });
      } else if (prop_codigo == 30) {
        var Icono = L.icon({
          iconUrl: "./images/gui/azul.png",
          iconSize: [30, 40],
          iconAnchor: [15, 40]
        });
      } else if (prop_codigo == 34) {
        var Icono = L.icon({
          iconUrl: "./images/gui/amarillo.png",
          iconSize: [30, 40],
          iconAnchor: [15, 40]
        });
      } else if (prop_codigo == 8) {
        var Icono = L.icon({
          iconUrl: "./images/gui/instalaciones.png",
          iconSize: [30, 40],
          iconAnchor: [15, 40]
        });
      } else if (prop_codigo == 75) {
        var Icono = L.icon({
          iconUrl: "./images/gui/puntos_bloqueo.png",
          iconSize: [30, 40],
          iconAnchor: [15, 40]
        });
      } else {
        var Icono = L.icon({
          iconUrl: "./images/green/blank.png",
          iconSize: [30, 40],
          iconAnchor: [15, 40]
        });
      }

      var InfoWindow = L.marker([latitud, longitud], {
        title: actividad,
        draggable: true,
        opacity: 0.75,
        icon: Icono
      }).bindPopup(`
            <div id="contentInfoWindow ${ope_codigo}class="contentMap">
              <div class="contentTxt">
                <h3 align="center">Operacion en Ejecucion
                </h3>
                <center>
                  <img src="https://sistema.ipm.org.gt/sistema/fotos_afiliados/ACTJUB/${per_catalogo}.jpg" width="100px">
                </center>
                <br>
                </h2 align="center"><b> Operacion: </b>${operacion}</b></br>
                </h2><b>Actividad: </b>${actividad}</br>
                </h2><b>Lugar: </b>${lugar}</br>
                </h2><b>Oficial Encargado: </b>${encargado}</br>
                </h2><b>Numero del Oficial Encargado: </b>${telefono}</br>
                </h2><b>Inicia Operacion: </b>${inicio}</br>
                </h2><b>Finaliza Operacion: </b>${termina}</br>
                </h2><b>Latitud: </b>${latitud}</br>
                </h2><b>Langitud: </b>${longitud}</br>
                </h2><b>Dependencia: </b>${dependencia}</br>
                </h3>
              </div>
            </div>
            <form id="formulario"><input type="hidden" name="num" id="num" value=""><input type="hidden" name="accion" id="accion" value=""></form>
          `)
        .addTo(markers);






    })

    //console.log(encargado);

  } catch (error) {
    console.log(error);
  }
  ocultarLoader();
} 

consultarFuerzas();





$('#reportrange').on('apply.daterangepicker', async function (ev, picker) {
  fecha_inicio = picker.startDate.format('YYYY-MM-DD 00:00:00');
  fecha_fin = picker.endDate.format('YYYY-MM-DD 23:59:59');
  consultarFuerzas();
});



