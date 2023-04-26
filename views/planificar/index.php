<div class="row text-center">
    <div class="col">
        <h1><u>FORMULARIO DE PLANIFICACIÓN DE OPERACIONES</u></h1>
    </div>
</div>
<br>
<div class="row"><br></div>
<div class="row justify-content-center">
    <form id="formPlanificarOpe" class="col-lg-9 border rounded bg-light p-3">
        <div class="row">
            <center>
                <div class="col-sm-4">
                    <label for=""><b><u>DATOS DE OPERACIÓN:</u></b></label>
                </div>
            </center>
        </div>
        <br>
        <div class="row">
            <div class="col-sm-4">
                <center>
                    <b>Ordenó el Estado Mayor</b>
                </center>
            </div>

            <div class="col-sm-4">
                <center>
                    <b>Área de Mision</b>
                </center>
            </div>

            <div class="col-sm-4">
                <center>
                    <b>Operación a Ejecutar</b>
                </center>
            </div>

        </div>

        <div class="row">
            <div class="col-sm-4">
                <select class="form-control" name="orden" id="orden">
                    <option value="">Seleccione O/O</option>
                    <option style="font-weight:bold" value="1">OPERACIÓN RUTINARIA</option>

                    <?php foreach ($orden_ope as $row) : ?>

                        <option style="font-weight:bold" value="<?= $row['ord_codigo'] ?>"><?= utf8_decode($row['ord_referencia']) ?></option>
                    <?php endforeach ?>
                </select>
            </div>

            <div class="col-sm-4">
                <select class="form-control" name="area" id="area">
                    <option value="">Seleccione Área de Mision</option>

                    <?php foreach ($orden_mis as $row) : ?>

                        <option style="font-weight:bold" value="<?= $row['are_codigo'] ?>"><?= utf8_decode($row['are_descripcion']) ?></option>
                    <?php endforeach ?>
                </select>
            </div>

            <div class="col-sm-4">
                <select class="form-control" name="operacion" id="operacion">
                    <option value="0">Seleccione Operación</option>
                </select>
            </div>

        </div>

        <br>

        <div class="row">
            <div class="col-sm-4">
                <center>
                    <b>Propósito de la Misión</b>
                </center>
            </div>

            <div class="col-sm-4">
                <center>
                    <b>Método de Ejecución</b>
                </center>
            </div>

            <div class="col-sm-4">
                <center>
                    <b>Unidades Orgánicas</b>
                </center>
            </div>

        </div>


        <div class="row">
            <div class="col-sm-4">
                <select class="form-control" name="proposito" id="proposito">
                    <option value="">Seleccione Propósito</option>

                    <?php foreach ($prop_mis as $row) : ?>

                        <option style="font-weight:bold" value="<?= $row['prop_codigo'] ?>"><?= utf8_decode($row['prop_descripcion']) ?></option>
                    <?php endforeach ?>
                </select>
            </div>

            <div class="col-sm-4">
                <select class="form-control" name="metodo" id="metodo">
                    <option value="">Seleccione Método de Ejecución</option>

                    <?php foreach ($metodo_ejec as $row) : ?>

                        <option style="font-weight:bold" value="<?= $row['met_ejec_codigo'] ?>"><?= utf8_decode($row['met_ejec_descripcion']) ?></option>
                    <?php endforeach ?>
                </select>
            </div>

            <div class="col-sm-4">
                <select class="form-control" name="unidad" id="unidad">
                    <option value="">Seleccione Unidad Orgánica</option>

                    <?php foreach ($uni_org as $row) : ?>

                        <option style="font-weight:bold" value="<?= $row['uni_org_codigo'] ?>"><?= utf8_decode($row['uni_org_descripcion']) ?></option>
                    <?php endforeach ?>
                </select>
            </div>


        </div>
    </form>

    <div class="row"><br></div>

    <form id="formPlanificarOpe2" class="col-lg-9 border rounded bg-light p-3">
        <div class="row">
            <center>
                <div class="col-sm-4">
                    <label for=""><b><u>DATOS DE RESPONSABILIDADES:</u></b></label>
                </div>
            </center>
        </div>
        <br>
        <div class="row">
            <div class="col-sm-4">
                <center>
                    <b>Catálogo</b>
                </center>
            </div>

            <div class="col-sm-8">
                <center>
                    <b>Oficial Responsable</b>
                </center>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-4">
                <input type="number" name="catalogo" id="catalogo" class="form-control" placeholder="Ingrese un catalogo" style="text-transform:uppercase">
            </div>

            <div class="col-sm-8">
                <input type="text" disabled name="persona" id="persona" class="form-control" placeholder="Grado, Nombres, Apellidos" style="text-transform:uppercase">
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-sm-4">
                <center>
                    <b>Teléfono del Responsable</b>
                </center>
            </div>

            <div class="col-sm-4">
                <center>
                    <b>Inicio de Operación</b>
                </center>
            </div>

            <div class="col-sm-4">
                <center>
                    <b>Finalización de Operación</b>
                </center>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-1">
                <input type="text" class="form-control" placeholder="Ingrese no. de teléfono" value="+502" readonly>
            </div>

            <div class="col-sm-3">
                <input type="number" name="telefono" id="telefono" class="form-control" placeholder="Ingrese no. de teléfono" style="text-transform:uppercase">
            </div>

            <div class="col-sm-4">
                <input type="datetime-local" name="inicia" id="inicia" class="form-control">
            </div>

            <div class="col-sm-4">
                <input type="datetime-local" name="finaliza" id="finaliza" class="form-control">
            </div>

        </div>
        <br>
        <div class="row">
            <div class="col-sm-4"></div>

            <div class="col-sm-4">
                <center>
                    <b>Estado de Fuerza</b>
                </center>
            </div>

            <div class="col-sm-4"></div>
        </div>
        <div class="row">
            <div class="col-sm-4"></div>

            <div class="col-sm-1">
                <center>
                    Of. Sup
                </center>
            </div>

            <div class="col-sm-1">
                <center>
                    Of. Sub
                </center>
            </div>

            <div class="col-sm-1">
                <center>
                    Esptas.
                </center>
            </div>

            <div class="col-sm-1">
                <center>
                    Tropa
                </center>
            </div>

            <div class="col-sm-4"></div>

        </div>
        <div class="row">
            <div class="col-sm-4"></div>

            <div class="col-sm-1">
                <input type="text" class="form-control" value="0">
            </div>

            <div class="col-sm-1">
                <input type="text" class="form-control" value="0">
            </div>

            <div class="col-sm-1">
                <input type="text" class="form-control" value="0">
            </div>

            <div class="col-sm-1">
                <input type="text" class="form-control" value="0">
            </div>

            <div class="col-sm-4"></div>

        </div>
    </form>
    <div class="row"><br></div>
    <form id="formPlanificarOpePRUEBA" class="col-lg-9 border rounded bg-light p-3">
        <div class="row">
            <center>
                <div class="col-sm-4">
                    <label for=""><b><u>DATALLES IMPORTANTES:</u></b></label>
                </div>
            </center>
        </div>
        <br>
        <div class="row section z-depth-2">
            <div class="col s6">

                <div class="row">
                    <div class="col-sm-1"></div>
                    <div class="col-sm-10">
                        <center>
                            <b>Vehículo(s) Empeñado(s)</b>
                        </center>
                    </div>
                    <div class="col-sm-1"></div>
                </div>

                <div class="row">
                    <div class="col-sm-1"></div>
                    <div class="col-sm-10">
                        <select class="form-control" name="vehiculos" id="vehiculos">
                            <option value="">Seleccione Vehículo(s) Empeñado(s)</option>

                            <?php foreach ($instituciones as $row) : ?>

                                <option style="font-weight:bold" value="<?= $row['inst_codigo'] ?>"><?= utf8_decode($row['inst_descripcion']) ?> (<?= utf8_decode($row['inst_observacion']) ?>)</option>
                            <?php endforeach ?>
                        </select>
                    </div>
                    <div class="col-sm-1"></div>
                </div>


                <br>
                <div class="row">
                    <div class="col-sm-4"></div>
                    <div class="col-sm-2">
                        <button id="agregar_veh" type="button" class="btn btn-outline-success w-100"><b>+</b></button>
                    </div>
                    <div class="col-sm-2">
                        <button id="quitar_veh" type="button" class="btn btn-outline-danger w-100"><b>-</b></button>
                    </div>
                    <div class="col-sm-4"></div>
                </div>
                <br>


            </div>

            <div class="col s6">
                <div class="row">
                    <div class="col-sm-1"></div>
                    <div class="col-sm-10">
                        <center>
                            <b>Instituciones Participantes</b>
                        </center>
                    </div>
                    <div class="col-sm-1"></div>
                </div>

                <div class="row">
                    <div class="col-sm-1"></div>
                    <div class="col-sm-10">
                        <select class="form-control" name="instituciones" id="instituciones">
                            <option value="">Seleccione Institucion(es) Participante(s)</option>

                            <?php foreach ($instituciones as $row) : ?>

                                <option style="font-weight:bold" value="<?= $row['inst_codigo'] ?>"><?= utf8_decode($row['inst_descripcion']) ?> (<?= utf8_decode($row['inst_observacion']) ?>)</option>
                            <?php endforeach ?>
                        </select>
                    </div>
                    <div class="col-sm-1"></div>
                </div>
                <div class="row">
                    <div class="col-sm-1"></div>
                    <div class="col-sm-10">
                        <div id="prueba2">
                            <!-- aqui ingresan el select de instituciones -->
                        </div>
                    </div>
                    <div class="col-sm-1"></div>
                </div>

                <br>
                <div class="row">
                    <div class="col-sm-4"></div>
                    <div class="col-sm-2">
                        <button id="agregar_ins" type="button" class="btn btn-outline-success w-100"><b>+</b></button>
                    </div>
                    <div class="col-sm-2">
                        <button id="quitar_ins" type="button" class="btn btn-outline-danger w-100"><b>-</b></button>
                    </div>
                    <div class="col-sm-4"></div>
                </div>
            </div>
        </div>
    </form>


    <div class="row"><br></div>

    <form id="formPlanificarOpe4" class="col-lg-9 border rounded bg-light p-3">
        <div class="row">
            <center>
                <div class="col-sm-4">
                    <label for=""><b><u>GUARDAR FORMULARIO</u></b></label>
                </div>
            </center>
        </div>
        <br>
<!-- EL CODIGO A CONTINUACIÓN FUNCIONARÁ EN UNA VERSIÓN SIGUIENTE PARA PONER LAS UBICACIONES EN EL FORMULARIO PRINCIPAL, LAS FUNCIONES QUEDARON COMENTARIADAS EN EL JS DUDAS: TTE CHICAS V
        <div class="row">
            <div class="col-sm-3">
                <center>
                    <b>Coordenadas</b>
                </center>
            </div>

            <div class="col-sm-3">
                <center>
                    <b>Departamento</b>
                </center>
            </div>

            <div class="col-sm-3">
                <center>
                    <b>Municipio</b>
                </center>
            </div>

            <div class="col-sm-3">
                <center>
                    <b>Lugar</b>
                </center>
            </div>
        </div>

                            -->
        <!-- <div class="row">
            <div class="col-sm-3">
                <button id="levantarMapa" class="btn btn-outline-info w-100"><b>COORDENADAS</b></button>
            </div>
            <div class="col-sm-3">
                <select class="form-control" name="departamentos" id="departamentos">
                    <option value="">Seleccione Departamento</option>

                    <?php foreach ($departamento as $row) : ?>

                        <option style="font-weight:bold" value="<?= $row['dep_codigo'] ?>"><?= utf8_decode($row['dep_desc_lg']) ?></option>
                    <?php endforeach ?>
                </select>
            </div>
            <div class="col-sm-3">
                <select class="form-control" name="municipio" id="municipio">
                    <option value="0">Seleccione Municipio</option>
                </select>
            </div>
            <div class="col-sm-3">
                <select class="form-control" name="lugar" id="lugar">
                    <option value="0">Seleccione Lugar</option>
                </select>
            </div>
        </div>  

        <div class="row">
            <div id="divsCoord">
                AQUI VAN LAS NUEVAS COORDENADAS | DEP | MUN | LUG | 
            </div>
        </div>
        -->

        <div class="row">
            <div class="col-sm-4"></div>
            <div class="col-sm-2">
                <button id="guardarOperacion" type="button" class="btn btn-outline-success w-100"><b>GUARDAR</b></button>
            </div>
            <div class="col-sm-2">
                <button id="limpiar" type="button" class="btn btn-outline-warning w-100"><b>LIMPIAR</b></button>
            </div>
            <div class="col-sm-4"></div>
        </div>
        <!-- MODAL DEL MAPA, EN UNA VERSIÓN SIGUIENTE RECOMIENDO LEVANTAR EN MODAL EL MAPA PARA ELEGIR UBICACION, EN EL CODIGO DE JS QUEDÓ COMENTARIADO COMO SE HIZO Y FUNCIONABA (NO ÚTIL PARA LA ACTUAL VERSIÓN) DUDAS: TTE CHICAS V
        <div class="modal fade" id="modalMapaRep" name="modalMapaRep" tabindex="-1" role="dialog" aria-labelledby="infoModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
                <div class="modal-content">
                    <div class="modal-header ">
                        <center>
                            <h3 class="modal-title " id="infoModalLabel">REFERENCIA: MAPA DE LA REPÚBLICA DE GUATEMALA</h5>
                        </center>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body container">
                        <div class="border border-2  mb-4 rounded  pt-3" id="map" style=" height: 87vh;min-height:auto;">
                            aqui va el mapa 
                        </div>

                    </div>
                    <div>
                        <button id="selectCoorde" type="button" class="btn btn-outline-info w-100" data-bs-dismiss="modal" aria-label="Close"><b>SELECCIONAR</b></button>
                    </div>
                </div>
            </div>

            
            -->



    </form>


</div>
<div class="row"><br></div>




<script src="./build/js/planificar/index.js"></script>