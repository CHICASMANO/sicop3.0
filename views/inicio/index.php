<div class="row">
    <div class="col-sm-2">
        <center>
            <img src="<?= asset('images/emdn.png') ?>" width="180" height="210">
        </center>
    </div>

    <div class="col-sm-8">
        <center>
            <br>
            <h1>SISTEMA DE CONTROL OPERACIONAL DEL EJÉRCITO DE GUATEMALA (SICOP)</h1>
            <br><br>
        </center>
    </div>

    <div class="col-sm-2">
        <center>
            <img src="<?= asset('images/cit.png') ?>" width="200" height="210">
        </center>
    </div>

</div>

<div class="row">
    <div class="col-sm-4"></div>

    <div class="col-sm-2">
        <center>
            <b>ELEGIR TEMPORALIDAD</b>
        </center>
    </div>
    <div class="col-sm-2">
        <center>
            <b>TOTAL EFECTUADO</b>
        </center>
    </div>
    <div class="col-sm-4"></div>

</div>

<div class="row">
    <div class="col-sm-4"></div>

    <div class="col-sm-2">
        <div id="reportrange" style="background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #ccc; width: 100%">
            <i class="fa fa-calendar"></i>&nbsp;
            <span></span> <i class="fa fa-caret-down"></i>
        </div>
    </div>
    
    <div class="col-sm-2">   
        <center>
            <input class="col-sm-3" type="text" id="totalEfectuado" readonly>
        </center>
    </div>
    <div class="col-sm-4"></div>

</div>


<br>
<div class="row">
    <div class="col-sm-1">
    </div>
    <div class="col-sm-3">
        <figure class="highcharts-figure">
            <div id="container"></div>
            <p class="highcharts-description">
            </p>
        </figure>
    </div>

    <div class="col-sm-4">
        <figure class="highcharts-figure">
            <div id="container3"></div>
            <p class="highcharts-description">
            </p>
        </figure>
    </div>

    <div class="col-sm-3">
        <figure class="highcharts-figure">
            <div id="container2"></div>
            <p class="highcharts-description">

            </p>
        </figure>
    </div>

    <div class="col-sm-1">
    </div>
</div>

<div class="row">
    <div class="col-sm-1">
    </div>

    <div class="col-sm-3">
        <div class="row justify-content-center" id="divTabla">
            <div class="col-lg-10">
                <table id="productosTabla" class="table table-bordered table-hover w-100">
                    <thead>
                        <tr>
                            <th>NO.</th>
                            <th>FUERZA</th>
                            <th>CANTIDAD</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <div class="col-sm-4">

    <div class="row justify-content-center" id="divTabla2">
            <div class="col-lg-10">
                <table id="TablaBrigadas" class="table table-bordered table-hover w-100">
                    <thead>
                        <tr>
                            <th>NO.</th>
                            <th>NOMBRE</th>
                            <th>CANTIDAD</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>

    </div>

    <div class="col-sm-3">
    <div class="row justify-content-center" id="divTabla3">
            <div class="col-lg-10">
                <table id="TablaAreasMis" class="table table-bordered table-hover w-100">
                    <thead>
                        <tr>
                            <th>NO.</th>
                            <th>AREA</th>
                            <th>CANTIDAD</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>

    </div>
    </div>

    <div class="col-sm-1">
    </div>
</div>

<div class="row">
    <div class="col-sm-3"></div>

    <div class="col-sm-6">    
        <center>
            <H3>CROQUIS DE OPERACIONES</H3>
        </center>
    </div>
    <div class="col-sm-3"></div>

</div>

<div class="row">
    <div class="col-sm-1"></div>

    <div class="col-sm-5">    
        <center>
            <b>OPERACIONES POR PROPOSITO</b>
        </center>
    </div>
    <div class="col-sm-5">   
        <center>
            <b>OPERACIONES POR AREAS DE MISIÓN</b>
        </center>
    </div>
    <div class="col-sm-1"></div>

</div>

<div class="row">
    <div class="col-sm-1"></div>

    <div class="col-lg-5 pt-2">
        <div class="border border-2  mb-4 rounded  pt-3" id="map" style=" height: 87vh;min-height:auto;">


        </div>
    </div>
    <div class="col-lg-5 pt-2">
        <div class="border border-2  mb-4 rounded  pt-3" id="map2" style=" height: 87vh;min-height:auto;">


        </div>
    </div>
    <!--<div class="col-sm-6" id='map'></div>-->

    <div class="col-sm-1"></div>

</div>


<!-- <div id="container" style="width:100%; height:400px;"></div> -->



<script type="text/javascript" src="https://cdn.jsdelivr.net/jquery/latest/jquery.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />

<script src="./build/js/estadisticas_inicio/index.js"></script>