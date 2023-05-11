import { Button, Dropdown } from "bootstrap";
import Datatable from 'datatables.net-bs5';
import { lenguaje } from "../lenguaje";
import Swal from "sweetalert2";
import L from "leaflet";
import { validarFormulario, Toast, ocultarLoader, mostrarLoader } from "../funciones";
import { Modal } from "bootstrap";


const formPlanificarOpe = document.getElementById('formPlanificarOpe');
const formPlanificarOpe2 = document.getElementById('formPlanificarOpe2');
const formPlanificarOpe4 = document.getElementById('formPlanificarOpe4');
const selectLug= document.getElementById('lugar');
const selectMun = document.getElementById('municipio');
const select = document.getElementById('operacion');
const inputCatalogo = document.getElementById('catalogo');
const inputNombre = document.getElementById('persona');
const agregIns = document.getElementById('agregIns');
let catalogoValido = false;
const agregar_ins = document.getElementById('agregar_ins');
const agregar_veh = document.getElementById('agregar_veh');
const quitar_ins = document.getElementById('quitar_ins');
const quitar_veh = document.getElementById('quitar_veh');
const agregar_Coords = document.getElementById('agregarUbi');
const divs_institucion = document.getElementById('prueba2');
const divs_vehiculo_new= document.getElementById('vehiculo_new');
const divsCoord = document.getElementById('divsCoord');
//const modalElement = document.getElementById('modalMapaRep')
//const mapa = new Modal(modalElement);
const levantarMapa = document.getElementById('levantarMapa');
ocultarLoader();

//funcion del combo de operaciones por area de mision
const limpiar = () => {
    for (let i = select.options.length; i > 0; i--) {
      select.remove(i);
    }
  };
//funcion del combo de municipios por departamento
const limpiar2 = () => {
  for (let i = selectMun.options.length; i > 0; i--) {
    selectMun.remove(i);
  }
};
//funcion del combo de lugar por municipio
const limpiar3 = () => {
  for (let i = selectLug.options.length; i > 0; i--) {
    selectLug.remove(i);
  }
};

  // let acumuladorCoords = 0
  // const agregar_Coordenadas = async (evento) => {

  //   evento && evento.preventDefault();
  //   acumuladorCoords++;
  //   console.log(acumuladorCoords);


  //   const fragment = document.createDocumentFragment();
  //     const divcoordenadas = document.createElement('div');
  //     divcoordenadas.classList.add("col-sm-3")

  //       const botonCords = document.createElement('button')
  //       botonCords.id = "levantarMapa[]"
  //       botonCords.classList.add("btn","btn-outline-info","w-100")
  //         const negritatextBoton = document.createElement('b')
  //           negritatextBoton.innerText = "COORDENADAS"


  //   botonCords.appendChild(negritatextBoton)
  //   divcoordenadas.appendChild(botonCords)
  //   fragment.appendChild(divcoordenadas)
  //   divsCoord.appendChild(fragment)

  // }

  let acumulador = 0
 
  const agregarInstitucion = async (evento) => {

    evento && evento.preventDefault();
    acumulador++;


  
    //query para mandar a traer info de instituciones participantes

    try {
      const url = `/sicop3.0/API/planificar/buscar_inst`
      const headers = new Headers();
      headers.append("X-Requested-With", "fetch");
  
      const config = {
          method: 'GET',
          headers
      }

      const respuesta = await fetch(url, config);
      const data = await respuesta.json();

        //crea el select
            const fragment = document.createDocumentFragment();

            const select_Ins = document.createElement('select')
            select_Ins.id = "instituciones[]"
            select_Ins.classList.add("form-control")
  
            const option_Ins = document.createElement('option')
            option_Ins.value = ""
            option_Ins.innerText = "Seleccione Institucion(es) Participante(s)"
            select_Ins.appendChild(option_Ins)

            data.forEach(e =>{
              const option_institucion = document.createElement('option')
              option_institucion.value = e.inst_codigo
              option_institucion.style = "font-weight:bold"
              option_institucion.innerText = `${e.inst_descripcion} `+'('+`${e.inst_observacion} `+')'
              select_Ins.appendChild(option_institucion)
            })
            
            fragment.appendChild(select_Ins)
  
            //document.getElementById("prueba2").appendChild(fragment)
            divs_institucion.appendChild(fragment)
      //finaliza el select

    } catch (error) {

    }
    
  //finaliza query
    



  }
  

  let acumuladorVeh = 0

  const agregarVehiculo= async (evento) => {

    evento && evento.preventDefault();
    acumuladorVeh++;


  
    //query para mandar a traer info de instituciones participantes

    try {
      const url = `/sicop3.0/API/planificar/buscar_veh`
      const headers = new Headers();
      headers.append("X-Requested-With", "fetch");
  
      const config = {
          method: 'GET',
          headers
      }

      const respuesta = await fetch(url, config);
      const data = await respuesta.json();

        //crea el select
            const fragment = document.createDocumentFragment();

            const select_Veh = document.createElement('select')
            select_Veh.id = "vehiculos[]"
            select_Veh.classList.add("form-control")
  
            const option_Veh = document.createElement('option')
            option_Veh.value = ""
            option_Veh.innerText = "Seleccione Vehículo(s) Empeñado(s)"
            select_Veh.appendChild(option_Veh)

            data.forEach(e =>{
              const option_Vehtitucion = document.createElement('option')
              option_Vehtitucion.value = e.car_catalogo_vehiculo
              option_Vehtitucion.style = "font-weight:bold"
              option_Vehtitucion.innerText = `${e.car_catalogo_vehiculo} `+'-'+`${e.tve_desc} `+' ('+`${e.est_descripcion} `+')'
              select_Veh.appendChild(option_Vehtitucion)
            })
            
            fragment.appendChild(select_Veh)
  
            //document.getElementById("prueba2").appendChild(fragment)
            divs_vehiculo_new.appendChild(fragment)
      //finaliza el select

    } catch (error) {

    }
    
  //finaliza query
    



  }
  
  
  const quitarInstitucion = async (evento) => {

    evento && evento.preventDefault();


        //borra el select
        if (acumulador > 0) {
            divs_institucion.removeChild(divs_institucion.lastElementChild);
            acumulador--;
  
        } else {
            Toast.fire({
                icon: 'warning',
                title: 'No puede realizar esta acción'
            });
        }
      //finaliza borrar el select





  }


  
  const quitarVeh = async (evento) => {

    evento && evento.preventDefault();


        //borra el select
        if (acumuladorVeh > 0) {
            divs_vehiculo_new.removeChild(divs_vehiculo_new.lastElementChild);
            acumuladorVeh--;
  
        } else {
            Toast.fire({
                icon: 'warning',
                title: 'No puede realizar esta acción'
            });
        }
      //finaliza borrar el select





  }

const BuscarOpes_de_Areas= async (evento) => {
   evento && evento.preventDefault();
   limpiar()
   try {
    const url = '/sicop3.0/API/planificar/combo_opes'
    const body = new FormData(formPlanificarOpe);
    const headers = new Headers();
    headers.append("X-Requested-With", "fetch");

    const config = {
        method: 'POST',
        body,
        headers,

    }
    const respuesta = await fetch(url, config);
    const data = await respuesta.json();
    //console.log(data)
  


   data.forEach(function(row){
    let opcion = document.createElement('option')
    opcion.value = row.ope_codigo
    opcion.text = row.ope_descripcion
    select.add(opcion)
  })
 


  


    } catch (error) {
        console.log(error)

    }



}

// const BuscarMunicipios = async (evento) => {
//   evento && evento.preventDefault();
//   limpiar2()
//   try {
//    const url = '/sicop3.0/API/planificar/combo_munic'
//    const body = new FormData(formPlanificarOpe4);
//    const headers = new Headers();
//    headers.append("X-Requested-With", "fetch");

//    const config = {
//        method: 'POST',
//        body,
//        headers,

//    }
//    const respuesta = await fetch(url, config);
//    const data = await respuesta.json();
//    //console.log(data)
 


//   data.forEach(function(row){
//    let opcion = document.createElement('option')
//    opcion.value = row.mun_codigo
//    opcion.text = row.mun_desc_lg
//    selectMun.add(opcion)
//  })



 


//    } catch (error) {
//        console.log(error)

//    }



// }


// const BuscarLugar = async (evento) => {
//   evento && evento.preventDefault();
//   limpiar3()
//   try {
//    const url = '/sicop3.0/API/planificar/combo_lug'
//    const body = new FormData(formPlanificarOpe4);
//    const headers = new Headers();
//    headers.append("X-Requested-With", "fetch");

//    const config = {
//        method: 'POST',
//        body,
//        headers,

//    }
//    const respuesta = await fetch(url, config);
//    const data = await respuesta.json();
//    console.log(data)
 


//   data.forEach(function(row){
//    let opcion = document.createElement('option')
//    opcion.value = row.lug_codigo
//    opcion.text = row.lug_descripcion
//    selectLug.add(opcion)
//  })



 


//    } catch (error) {
//        console.log(error)

//    }



// }



const buscarCatalogo = async (e) => {
  inputNombre.value = '';
  let catalogo = e.target.value
  if(catalogo.trim().length < 6){
      catalogoValido = false;
      return
  }
  try {
      const url = `/sicop3.0/API/planificar/buscar_cat?catalogo=${catalogo}`
      const headers = new Headers();
      headers.append("X-Requested-With", "fetch");
  
      const config = {
          method: 'GET',
          headers
      }

      const respuesta = await fetch(url, config);
      const data = await respuesta.json();
      
      if(data){
          catalogoValido = true
          const {grado, arma, nombre} = data;
          //console.log(grado);
          inputNombre.value = grado + " DE " + arma + " " + nombre

      }else{
          catalogoValido = false
      }

  
  } catch (error) {
      
  }
}

// const abrirmapa = async (evento) => {
//   evento && evento.preventDefault();
//   mapa.show();
// }

// modalElement.addEventListener('show.bs.modal', function  (event) {
    
//   setTimeout(function() {
//       map.invalidateSize();
//   }, 500);
// })

// //funcion para obtener el mapa en el modal

// const map = L.map('map', {
//   center: [15.825158, -89.72959],
//   zoom: 7.5
// })

// const markers = L.layerGroup();
// markers.addTo(map)


// const grayScale = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//   attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//   maxZoom: 100,
//   id: 'mapbox/streets-v11',
//   tileSize: 512,
//   zoomOffset: -1,
//   accessToken: 'pk.eyJ1IjoiZGFuaWVsZmo5NzUiLCJhIjoiY2tpcWNlbHM0MXZmbDJ6dTZvdDV3NGticiJ9.7ciIi1FKO5-BqgE0zz5UFw'
// }).addTo(map);

// const LimpiarMapa = () => {
//   map.eachLayer(layer => { markers.removeLayer(layer) })
// }


// const marcador = (e) =>{
//   LimpiarMapa()
//   let latitud = e.latlng.lat;
//   let longitud = e.latlng.lng;
//   const selectCoord = (e) =>{
//     let ddd="asdasd";
//     console.log(ddd)
//   }
//   console.log(latitud,longitud)

//   var Icono = L.icon({
//     iconUrl: "./images/gui/amarillo.png",
//   });

//   var InfoWindow = L.marker([latitud, longitud], {
//     title: 'COORDENADAS',
//     draggable: true,
//     opacity: 0.75,
//     icon: Icono
//   }).bindPopup(`
//         <div id="contentInfoWindow class="contentMap">
//           <div class="contentTxt">
//             <h3 align="center">COORDENADAS
//             </h3>
//             <br>
//             </h2><b>Latitud: </b>${latitud}</br>
//             </h2><b>Langitud: </b>${longitud}</br>
//             </h3>
//           </div>
//         </div>
//         <form id="formulario"><input type="hidden" name="num" id="num" value=""><input type="hidden" name="accion" id="accion" value=""></form>
//       `)
//     .addTo(markers);

// }

// map.on('click', marcador)

// const options = {
//   enableHighAccuracy: true,
//   timeout: 5000,
//   maximumAge: 0
// };

// function success(pos) {
//   const crd = pos.coords;

//   console.log('Tu ubicación actual es:');
//   console.log(`Latitud : ${crd.latitude}`);
//   console.log(`Longitud: ${crd.longitude}`);
//   console.log(`Más o menos ${crd.accuracy} metros.`);
//   map.flyTo([crd.latitude, crd.longitude],14)
// }

// function error(err) {
//   console.warn(`ERROR(${err.code}): ${err.message}`);
// }

// navigator.geolocation.getCurrentPosition(success, error, options);


//finaliza obtencion del mapa

// const ElegirUbi = async (evento) => {
//   evento && evento.preventDefault();
  

//   let asd =1484 
//   console.log(asd)



// }



document.getElementById('area').addEventListener('change', BuscarOpes_de_Areas)
agregar_ins.addEventListener('click', agregarInstitucion)
//agregar_Coords.addEventListener('click', agregar_Coordenadas)
quitar_ins.addEventListener('click', quitarInstitucion)
//levantarMapa.addEventListener('click', abrirmapa)
inputCatalogo.addEventListener('input', buscarCatalogo);
agregar_veh.addEventListener('click', agregarVehiculo)
quitar_veh.addEventListener('click', quitarVeh)
formPlanificarOpe.addEventListener('submit', guardarOpe )

//document.getElementById('departamentos').addEventListener('change', BuscarMunicipios)
//document.getElementById('municipio').addEventListener('change', BuscarLugar)
//document.getElementById('selectCoorde').addEventListener('click', ElegirUbi)