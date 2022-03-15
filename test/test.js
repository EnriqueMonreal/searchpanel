import SearchPanel from 'facade/searchpanel';

const map = M.map({
  container: 'mapjs',
  wmcfiles: [
    'http://www.juntadeandalucia.es/institutodeestadisticaycartografia/VisorGrid/wmc/WMC_callejero_simplificado.xml*Callejero',
    'http://www.juntadeandalucia.es/institutodeestadisticaycartografia/VisorGrid/wmc/WMC_satelite_simplificado.xml*Satélite',
    'http://www.juntadeandalucia.es/institutodeestadisticaycartografia/VisorGrid/wmc/WMC_hibrido_simplificado.xml*Híbrido'
  ],
  projection: 'EPSG:25830*m'
});

/*VARIABLES GLOBALES*/
var atributosBusqueda = ["municipio", "provincia", "solrid", "tipologia"];
// listado de provincias
var arrayProvincias = new Array();
// Listado de municipios agrupado por provincias
var arrayMunicipiosByProvincias = new Array();
// listado de tipologias
var arrayTipologias = new Array()
var arrayObjetosRecuperados = new Array()
var selectedProvinciasEspaciosProductivos = new Array()
var selectedSolridEspaciosProductivos = new Array()
var selectedMunicipiosEspaciosProductivos = new Array()
var selectedTipologiasEspaciosProductivos = new Array()
var geosearchUrlEspaciosProductivos = "https://www.juntadeandalucia.es/institutodeestadisticaycartografia/geobusquedas/eepp-f1/search?fq=";
var geosearchUrlDirectorioEmpresas = "https://www.juntadeandalucia.es/institutodeestadisticaycartografia/geobusquedas/eepp-f1_directorio/search?fq=";
var geosearchUrlParcelas = "https://www.juntadeandalucia.es/institutodeestadisticaycartografia/geobusquedas/eepp-f1_parcelas/search?fq=";
var otherParameters = "&rows=1000&start=0&srs=EPSG%3A25830";
var maxRecordsPage = 5;
var totalRecords = null;
var page_number = 1;
var page_total = null;
var dataList = new Array();
var capaGeoJSON = null;
var wktFormatter_ = new ol.format.WKT();
var arrayFeaturesMapeaGeoJSON = new Array();
var selectedFeatures = new Array();
var activedPanel = "espaciosProductivos";

var selectedMunicipiosParcelas = new Array();
var selectedProvinciasParcelas = new Array();
var selectedTipologiaParcelas = new Array();
var selectedTipologiaEspaciosProductivos = new Array();
var espaciosProductivosList = new Array();

var rowResult = null;
/* FIN VARIABLES GLOBALES */

/* SELECTOR DE ELEMENTOS */
let buscadorButtonEl = document.getElementById("buscador-button");
let buscadorAreaEl = document.getElementById("buscador-area");
let buscadorCloseButtonEl = document.getElementById("buscador-close-button");
let buscarEspacioProductivoEl = document.getElementById("buscarEspacioProductivo");
let buscarEmpresaEl = document.getElementById("buscarEmpresa");
let buscarParcelaEl = document.getElementById("buscarParcela");
let buscadorEspaciosProductivosEl = document.getElementById("buscadorEspaciosProductivos");
let buscadorEstablecimientosEl = document.getElementById("buscadorEstablecimientos");
let buscadorParcelasEl = document.getElementById("buscadorParcelas");

let resultadosBusquedaEl = document.getElementById("resultadosBusqueda");
let loadButtonEl = document.getElementById("loadButton");
let clearButtonEl = document.getElementById("clearButton");
// let textboxProvinciaEspaciosProductivosEl = document.getElementById("textboxProvinciaEspaciosProductivos");
let selectProvinciasEspaciosProductivosEL = document.getElementById("selectProvinciasEspaciosProductivos");
let selectProvinciasParcelasEL = document.getElementById("selectProvinciasParcelas");
let textboxProvinciaParcelasEl = document.getElementById("textboxProvinciaParcelas");
// let textboxMunicipioEspaciosProductivosEl = document.getElementById("textboxMunicipioEspaciosProductivos");
let SelectMunicipiosEspaciosProductivosEL = document.getElementById("selectMunicipiosEspaciosProductivos");
let selectMunicipiosParcelasEL = document.getElementById("selectMunicipiosParcelas");
let textboxMunicipioParcelasEl = document.getElementById("textboxMunicipioParcelas");
let SelectTipologiaEspaciosProductivosEl = document.getElementById("selectTipologiaEspaciosProductivos");
let SelectSubTipologiaEspaciosProductivosEl = document.getElementById("selectSubTipologiaEspaciosProductivos");
let SelectTipologiaParcelasEl = document.getElementById("selectTipologiaParcelas");
let textboxNombreEspacioProductivoEl = document.getElementById("textboxNombreEspacioProductivo");
let SelectActividadEl = document.getElementById("selectActividad");
let textboxEspacioProductivoEl = document.getElementById("textboxEspacioProductivo");
let textboxEstablecimientoEl = document.getElementById("textboxEstablecimiento");
let textboxEspacioProductivoParcelasEl = document.getElementById("textboxEspacioProductivoParcelas");


let resultsEl = document.getElementById("results");
let paginationEl = document.getElementById("pagination");
let previusPageEl = document.getElementById("previusPage");
let nextPageEl = document.getElementById("nextPage");
let recordsTotalEl = document.getElementById("recordsTotal");
let recordsNumberEl = document.getElementById("recordsNumber");
// textboxProvinciaEspaciosProductivosEl.addEventListener("input", enableButtons);




const configSearchPanel = {
  variables: {
    atributosBusqueda: atributosBusqueda,
    arrayProvincias: arrayProvincias,
    arrayMunicipiosByProvincias: arrayMunicipiosByProvincias,
    arrayTipologias: arrayTipologias,
    arrayObjetosRecuperados: arrayObjetosRecuperados,
    selectedProvinciasEspaciosProductivos: selectedProvinciasEspaciosProductivos,
    selectedSolridEspaciosProductivos: selectedSolridEspaciosProductivos,
    selectedMunicipiosEspaciosProductivos: selectedMunicipiosEspaciosProductivos,
    selectedTipologiasEspaciosProductivos: selectedTipologiasEspaciosProductivos,
    geosearchUrlEspaciosProductivos: geosearchUrlEspaciosProductivos,
    geosearchUrlDirectorioEmpresas: geosearchUrlDirectorioEmpresas,
    geosearchUrlParcelas: geosearchUrlParcelas,
    otherParameters: otherParameters,
    maxRecordsPage: maxRecordsPage,
    totalRecords: totalRecords,
    page_number: page_number,
    page_total: page_total,
    dataList: dataList,
    capaGeoJSON: capaGeoJSON,
    wktFormatter_: wktFormatter_,
    arrayFeaturesMapeaGeoJSON: arrayFeaturesMapeaGeoJSON,
    selectedFeatures: selectedFeatures,
    activedPanel: activedPanel,
    rowResult: rowResult,
    selectedMunicipiosParcelas:selectedMunicipiosParcelas,
    selectedProvinciasParcelas:selectedProvinciasParcelas,
    selectedTipologiaParcelas:selectedTipologiaParcelas,
    selectedTipologiaEspaciosProductivos:selectedTipologiaEspaciosProductivos,
    espaciosProductivosList:espaciosProductivosList
  },
  selector: {
    buscadorButtonEl: buscadorButtonEl,
    buscadorAreaEl: buscadorAreaEl,
    buscadorCloseButtonEl: buscadorCloseButtonEl,
    buscarEspacioProductivoEl: buscarEspacioProductivoEl,
    buscarEmpresaEl: buscarEmpresaEl,
    buscarParcelaEl: buscarParcelaEl,
    buscadorEspaciosProductivosEl: buscadorEspaciosProductivosEl,
    buscadorEstablecimientosEl: buscadorEstablecimientosEl,
    buscadorParcelasEl: buscadorParcelasEl,
    resultadosBusquedaEl: resultadosBusquedaEl,
    loadButtonEl: loadButtonEl,
    clearButtonEl: clearButtonEl,
    selectProvinciasEspaciosProductivosEL: selectProvinciasEspaciosProductivosEL,
    selectProvinciasParcelasEL: selectProvinciasParcelasEL,
    SelectMunicipiosEspaciosProductivosEL: SelectMunicipiosEspaciosProductivosEL,
    selectMunicipiosParcelasEL: selectMunicipiosParcelasEL,
    SelectTipologiaEspaciosProductivosEl: SelectTipologiaEspaciosProductivosEl,
    SelectSubTipologiaEspaciosProductivosEl: SelectSubTipologiaEspaciosProductivosEl,
    SelectTipologiaParcelasEl: SelectTipologiaParcelasEl,
    textboxNombreEspacioProductivoEl: textboxNombreEspacioProductivoEl,
    SelectActividadEl: SelectActividadEl,
    textboxEspacioProductivoEl: textboxEspacioProductivoEl,
    textboxEstablecimientoEl: textboxEstablecimientoEl,
    textboxEspacioProductivoParcelasEl: textboxEspacioProductivoParcelasEl,
    resultsEl: resultsEl,
    paginationEl: paginationEl,
    previusPageEl: previusPageEl,
    nextPageEl: nextPageEl,
    recordsTotalEl: recordsTotalEl,
    recordsNumberEl: recordsNumberEl,
    textboxProvinciaParcelasEl:textboxProvinciaParcelasEl,
    textboxMunicipioParcelasEl:textboxMunicipioParcelasEl
  },
};

const mp = new SearchPanel(configSearchPanel);

map.addPlugin(mp);
