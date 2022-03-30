import SearchPanel from 'facade/searchpanel';

const map = M.map({
  container: 'mapjs',
  controls: ['overviewmap', 'scale', 'panzoom'],
  layers: [],
  wmcfiles: [
    // 'http://www.juntadeandalucia.es/institutodeestadisticaycartografia/VisorGrid/wmc/WMC_callejero_simplificado.xml*Callejero',
    // 'http://www.juntadeandalucia.es/institutodeestadisticaycartografia/VisorGrid/wmc/WMC_satelite_simplificado.xml*Satélite',
    // 'http://www.juntadeandalucia.es/institutodeestadisticaycartografia/VisorGrid/wmc/WMC_hibrido_simplificado.xml*Híbrido',
    'https://www.juntadeandalucia.es/institutodeestadisticaycartografia/visores/espacios-productivos/wmc/WMC_IDE_eepp.xml*Contexto'
  ],
  projection: 'EPSG:25830*m'
});


/**
         * Plugin gestor de capas */
var configGroups = [];

/** Se aÃ±ade grupo capas auxiliares **/
configGroups.push({
  title: "Espacios Productivos: Información auxiliar",
  description: "Información auxiliar en Espacios Productivos de Andalucía",
  overlays: [
    new M.layer.WMS({
      url: "http://factorylab01.ieca.junta-andalucia.es/services/eepp/wms?",
      name: "lineas_electricas_eepp",
      legend: "Lí­neas eléctricas",
      transparent: true,
      tiled: true,
    }),
    new M.layer.WMS({
      url: "http://factorylab01.ieca.junta-andalucia.es/services/eepp/wms?",
      name: "subestacion_electrica",
      legend: "Subestaciones eléctricas",
      transparent: true,
      tiled: true,
    }),
    new M.layer.WMS({
      url: "http://factorylab01.ieca.junta-andalucia.es/services/eepp/wms?",
      name: "gasoductos_eepp",
      legend: "Gasoductos",
      transparent: true,
      tiled: true,
    }),
    new M.layer.WMS({
      url: "http://factorylab01.ieca.junta-andalucia.es/services/eepp/wms?",
      name: "energia_telecomunicaciones",
      legend: "Telecomunicaciones",
      transparent: true,
      tiled: true,
    }),
  ],
});

/** Se añade grupo Datos de referencia **/
configGroups.push({
  title: "Datos de referencia",
  description:
    "Conjunto de capas que permiten la generación de un mapa de Andalucí­a básico",
  overlays: [
    new M.layer.WMS({
      url: "https://ovc.catastro.meh.es/Cartografia/WMS/ServidorWMS.aspx?",
      name: "Catastro",
      legend: "Catastro publicada por la dirección general de Catastro",
      version: "1.1.1",
      transparent: true,
      tiled: true,
    }),
    new M.layer.WMTS(
      {
        url: "https://www.ign.es/wmts/pnoa-ma",
        name: "OI.OrthoimageCoverage",
        legend:
          "PNOA máxima actualidad publicada por el Instituto Geográfico Nacional",
        version: "1.3.0",
        transparent: true,
        tiled: true,
      },
      {
        params: {
          layers: "OI.OrthoimageCoverage",
          styles: "default",
        },
      }
    ),
  ],
});

var configBaseMaps = [{
  img: './plugins/managelayers/img/osm.png',
  layer: new M.layer.OSM({
    legend: 'OpenStreet Maps'
  })
},
{
  img: './plugins/managelayers/img/pnoa.png',
  layer: new M.layer.WMTS({
    url: 'https://www.ign.es/wmts/pnoa-ma',
    name: "OI.OrthoimageCoverage",
    legend: 'PNOA máxima actualidad publicada por el Instituto Geográfico Nacional',
    version: '1.3.0',
    transparent: false,
    tiled: true
  }, {
    params: {
      layers: 'OI.OrthoimageCoverage',
      styles: 'default'
    }
  })
},
{
  img: './plugins/managelayers/img/ign.png',
  layer: new M.layer.WMS({
    url: 'https://www.ign.es/wms-inspire/ign-base',
    name: "IGNBaseTodo",
    legend: 'Mapa base del Instituto Geográfico Nacional',
    version: '1.3.0',
    transparent: false,
    tiled: true
  })
},
{
  img: './plugins/managelayers/img/catastro.png',
  layer: new M.layer.WMS({
    url: 'https://ovc.catastro.meh.es/Cartografia/WMS/ServidorWMS.aspx?',
    name: 'Catastro',
    legend: 'Catastro publicada por la dirección general de Catastro',
    version: '1.1.1',
    transparent: false,
    tiled: true
  })
}
];

//Plugin managelayers
var paramsPlugin = {
  options: {
    panel: {
      className: 'clasePrivada',
      collapsedClass: 'g-cartografia-capas2',
      tooltip: 'Gestión de capas'
    }
  },
  config: {
    thematicLayers: {
      params: {
        groups: configGroups
      },
      options: {
        iconClass: 'g-cartografia-mundo2',
        tooltip: 'Favoritas'
      }
    },
    baseLayers: {
      params: {
        baseMaps: [], //configBaseMaps,
        activatedBlankMap: false
      },
      options: {
        tooltip: 'Capas de fondo'
      }
    }
  }
}

var sp = new M.plugin.Sidepanel();
sp.on(M.evt.ADDED_TO_MAP, () => {
  sp.addPlugin(new M.plugin.ManageLayers(paramsPlugin), 1);
  sp.addGroup({
    icon: "g-cartografia-mas2",
    title: "Añadir Capas",
    order: 2,
    plugins: [
      { plugin: new M.plugin.AddServices(), order: 1 },
      { plugin: new M.plugin.AddLayers(), order: 2 }
    ]
  });
  sp.addGroup({
    icon: "g-cartografia-zoom",
    title: "Búsquedas",
    order: 3,
    plugins: [
      { plugin: new M.plugin.Toponomysearch(), order: 1 },
      { plugin: new M.plugin.CatalogSearch({ geoNetworkUrl: 'http://www.ideandalucia.es/catalogo/inspire/srv/spa' }), order: 2 },
      { plugin: new M.plugin.CatastroSearch(), order: 3 },
      { plugin: new M.plugin.XYLocator(), order: 4 },
      { plugin: new M.plugin.SearchstreetGeosearch(), order: 5 }
    ]
  });

  sp.addGroup({
    icon: "g-cartografia-herramienta",
    title: "Herramientas",
    order: 4,
    plugins: [
      { plugin: new M.plugin.Drawing(), order: 1 },
      { plugin: new M.plugin.Measurebar(), order: 2 },
      {
        plugin: new M.plugin.Printer({
          "params": {
            "pages": {
              "creditos": "Impresión generada a través de Mapea"
            },
            "layout": {
              "outputFilename": "mapea_${yyyy-MM-dd_hhmmss}"
            }
          },
          // Pueden establecerse los valores de los desplegables
          'options': {
            'layout': 'imagen apaisada',
            'format': 'png',
            'dpi': '127'
          }
        }),
        order: 3
      }
    ]
  });

  sp.addGroup({
    icon: "g-cartografia-guardar",
    title: "Gestionar Sesión",
    order: 5,
    plugins: [

      { plugin: new M.plugin.Wmc(), order: 1 }
    ]
  });

  // sp.addPlugin(new M.plugin.SearchPanel());
  sp.addPlugin(new M.plugin.MaxExtZoom({ position: 'TR', }))
  sp.addPlugin(new M.plugin.Featureinfo());

  //sp.addPlugin(new M.plugin.Attributions(paramsAttributions))
});
//plugin Attributions

var paramsAttributions = {
  params: {
    includeRequired: true,
    attributions: [
      "TXT*Infraestructura de Datos Espaciales de Andalucía", [
        'HTML*<p>IDEAndalucia Participa en:</p><p><a href="https://www.opengeospatial.org/" target="_blank"><img src="http://www.ideandalucia.es/visor/logos/logo_ogc.gif" alt="Open Geospatial Consortium" title="Open Geospatial Consortium" height="100%"></a>&nbsp;&nbsp;&nbsp;<a href="https://www.idee.es/" target="_blank"><img src="http://www.ideandalucia.es/visor/logos/logo_idee.gif" alt="Infraestructura de Datos Espaciales de España" title="Infraestructura de Datos Espaciales de España" height="100%"></a>&nbsp;&nbsp;&nbsp;<a href="https://inspire-geoportal.ec.europa.eu/" target="_blank"><img src="http://www.ideandalucia.es/visor/logos/logo_inspire.gif" alt="Infrastructure for Spatial Information in the European Community" title="Infrastructure for Spatial Information in the European Community" height="100%"></a></p>'
      ]
    ]
  },
  options: {
    panel: {
      className: 'clasePrivada',
      collapsedClass: 'g-cartografia-ayuda',
      tooltip: 'Panel Attributions'
    }
  }
};



map.addPlugin(new M.plugin.Attributions(paramsAttributions));
map.addPlugin(sp);



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
var selectedSolridParcelas = new Array()
var selectedSolridEspaciosProductivos = new Array()
var selectedMunicipiosEspaciosProductivos = new Array()
var selectedTipologiasEspaciosProductivos = new Array()
var geosearchUrlEspaciosProductivos = "https://www.juntadeandalucia.es/institutodeestadisticaycartografia/geobusquedas/eepp-f1/search?fq=";
var geosearchUrlDirectorioEmpresas = "https://www.juntadeandalucia.es/institutodeestadisticaycartografia/geobusquedas/eepp-f1_directorio/search?fq=";
var geosearchUrlParcelas = "https://www.juntadeandalucia.es/institutodeestadisticaycartografia/geobusquedas/eepp-f1_parcelas/search?fq=";
var otherParameters = "&rows=10000&start=0&srs=EPSG%3A25830";
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





const configSearchPanel = {
  variables: {
    atributosBusqueda: atributosBusqueda,
    arrayProvincias: arrayProvincias,
    arrayMunicipiosByProvincias: arrayMunicipiosByProvincias,
    arrayTipologias: arrayTipologias,
    arrayObjetosRecuperados: arrayObjetosRecuperados,
    selectedProvinciasEspaciosProductivos: selectedProvinciasEspaciosProductivos,
    selectedSolridParcelas: selectedSolridParcelas,
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
    selectedMunicipiosParcelas: selectedMunicipiosParcelas,
    selectedProvinciasParcelas: selectedProvinciasParcelas,
    selectedTipologiaParcelas: selectedTipologiaParcelas,
    selectedTipologiaEspaciosProductivos: selectedTipologiaEspaciosProductivos,
    espaciosProductivosList: espaciosProductivosList
  },
  selector: {
  },
};

const mp = new SearchPanel(configSearchPanel);

map.addPlugin(mp);
