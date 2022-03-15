/* eslint-disable no-console */

/**
 * @module M/control/SearchPanelControl
 */

import SearchPanelImplControl from 'impl/searchpanelcontrol';
import template from 'templates/searchpanel';

export default class SearchPanelControl extends M.Control {
  /**
   * @classdesc
   * Main constructor of the class. Creates a PluginControl
   * control
   *
   * @constructor
   * @extends {M.Control}
   * @api stable
   */
  constructor(config) {
    // 1. checks if the implementation can create PluginControl
    if (M.utils.isUndefined(SearchPanelImplControl)) {
      M.exception('La implementación usada no puede crear controles SearchPanelControl');
    }
    // 2. implementation of this control
    const impl = new SearchPanelImplControl();
    super(impl, 'SearchPanel');
    this.config = config;


  }

  /**
   * This function creates the view
   *
   * @public
   * @function
   * @param {M.Map} map to add the control
   * @api stable
   */
  createView(map) {


    return new Promise((success, fail) => {
      const html = M.template.compileSync(template);
      // Añadir código dependiente del DOM
      this.addEvents(html);
      success(html);
    });
  }

  addEvents(html) {

    const buscarEspacioProductivoEl = html.querySelectorAll('label#buscarEspacioProductivo')[0];
    const buscarEmpresaEl = html.querySelectorAll('label#buscarEmpresa')[0];
    const buscarParcelaEl = html.querySelectorAll('label#buscarParcela')[0];
    const buscadorEspaciosProductivosEl = html.querySelectorAll('div#buscadorEspaciosProductivos')[0];
    const buscadorEstablecimientosEl = html.querySelectorAll('div#buscadorEstablecimientos')[0];
    const buscadorParcelasEl = html.querySelectorAll('div#buscadorParcelas')[0];
    const resultadosBusquedaEl = html.querySelectorAll('div#resultadosBusqueda')[0];
    const loadButtonEl = html.querySelectorAll('button#loadButton')[0];
    const clearButtonEl = html.querySelectorAll('button#clearButton')[0];
    const selectProvinciasEspaciosProductivosEL = html.querySelectorAll('select#selectProvinciasEspaciosProductivos')[0];
    const selectProvinciasParcelasEL = html.querySelectorAll('select#selectProvinciasParcelas')[0];
    const SelectMunicipiosEspaciosProductivosEL = html.querySelectorAll('select#selectMunicipiosEspaciosProductivos')[0];
    const selectMunicipiosParcelasEL = html.querySelectorAll('select#selectMunicipiosParcelas')[0];
    const SelectTipologiaEspaciosProductivosEl = html.querySelectorAll('select#selectTipologiaEspaciosProductivos')[0];
    const SelectSubTipologiaEspaciosProductivosEl = html.querySelectorAll('select#selectSubTipologiaEspaciosProductivos')[0];
    const SelectTipologiaParcelasEl = html.querySelectorAll('select#selectTipologiaParcelas')[0];
    const textboxNombreEspacioProductivoEl = html.querySelectorAll('input#textboxNombreEspacioProductivo')[0];
    const SelectActividadEl = html.querySelectorAll('select#selectActividad')[0];
    const textboxEspacioProductivoEl = html.querySelectorAll('input#textboxEspacioProductivo')[0];
    const textboxEstablecimientoEl = html.querySelectorAll('input#textboxEstablecimiento')[0];
    const textboxEspacioProductivoParcelasEl = html.querySelectorAll('input#textboxEspacioProductivoParcelas')[0];
    const resultsEl = html.querySelectorAll('div#results')[0];

    const selector = {
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
      SelectSubTipologiaEspaciosProductivosEl:SelectSubTipologiaEspaciosProductivosEl,
      SelectTipologiaParcelasEl:SelectTipologiaParcelasEl,
      textboxNombreEspacioProductivoEl:textboxNombreEspacioProductivoEl,
      SelectActividadEl:SelectActividadEl,
      textboxEspacioProductivoEl:textboxEspacioProductivoEl,
      textboxEstablecimientoEl:textboxEstablecimientoEl,
      textboxEspacioProductivoParcelasEl:textboxEspacioProductivoParcelasEl,
      resultsEl:resultsEl,

    };

    buscarEspacioProductivoEl.addEventListener('click', this.showBuscadorEspacioProductivo(selector));
    buscarEmpresaEl.addEventListener('click', this.showBuscadorEmpresas(selector));
    buscarParcelaEl.addEventListener('click', this.showBuscadorParcelas(selector));
    loadButtonEl.addEventListener('click', this.search(selector));
    clearButtonEl.addEventListener('click', this.clear(selector));
    selectProvinciasEspaciosProductivosEL.addEventListener('change', (selector) => {
      let selected = new Array()
      for (var option of selectProvinciasEspaciosProductivosEL.options) {
        if (option.selected) {
          selected.push(option.value);
        }
      }
      if (selected.indexOf("all") != -1) {
        selected = ["*"]
      }
      this.actualizoMunicipio(selected, "selectMunicipiosEspaciosProductivos");
      selector.SelectMunicipiosEspaciosProductivosEL.disabled = false;
      this.enableButtons(selector);
    });

    selectProvinciasEspaciosProductivosEL.addEventListener('click', (selector) => {
      selector.selectProvinciasEspaciosProductivosEL.multiple = true;
    });

    selectProvinciasParcelasEL.addEventListener('change', (selector) => {
      let selected = new Array()
      for (var option of selectProvinciasParcelasEL.options) {
        if (option.selected) {
          selected.push(option.value);
        }
      }
      if (selected.indexOf("all") != -1) {
        selected = ["*"]
      }
      this.actualizoMunicipio(selected, "selectMunicipiosParcelas")
      selector.selectMunicipiosParcelasEL.disabled = false;
      this.enableButtons(selector);
    });

    selectProvinciasParcelasEL.addEventListener('click', (selector) => {
      selector.selectProvinciasParcelasEL.multiple = true;
    });

    SelectMunicipiosEspaciosProductivosEL.addEventListener('click', (selector) => {
      selector.SelectMunicipiosEspaciosProductivosEL.multiple = true;
    });

    SelectMunicipiosEspaciosProductivosEL.addEventListener('change', (selector) => {
      this.config.variables.selectedMunicipiosEspaciosProductivos = new Array();
      for (var option of SelectMunicipiosEspaciosProductivosEL.options) {
        if (option.selected) {
          this.config.variables.selectedMunicipiosEspaciosProductivos.push(option.value);
        }
      }
      if (this.config.variables.selectedMunicipiosEspaciosProductivos.indexOf("all") != -1) {
        this.config.variables.selectedMunicipiosEspaciosProductivos = ["*"]
      }
      this.enableButtons(selector);
    });

    selectMunicipiosParcelasEL.addEventListener('click', (selector) => {
      selector.selectMunicipiosParcelasEL.multiple = true;
    });

    SelectTipologiaEspaciosProductivosEl.addEventListener('click', (selector) => {
      selector.SelectTipologiaEspaciosProductivosEl.multiple = true;
    });

    SelectTipologiaEspaciosProductivosEl.addEventListener('change', (selector) => {
      this.config.variables.selectedTipologiasEspaciosProductivos = new Array()
      for (var option of SelectTipologiaEspaciosProductivosEl.options) {
        if (option.selected) {
          this.config.variables.selectedTipologiasEspaciosProductivos.push(option.value);
        }
      }
      if (this.config.variables.selectedTipologiasEspaciosProductivos.indexOf("all") != -1) {
        this.config.variables.selectedTipologiasEspaciosProductivos = ["*"]
      }
      this.enableButtons(selector);

    });

    SelectTipologiaEspaciosProductivosEl.addEventListener('input', this.enableButtons(selector));

    SelectTipologiaParcelasEl.addEventListener('click', (selector) => {
      selector.SelectTipologiaParcelasEl.multiple = true;
    });

    textboxNombreEspacioProductivoEl.addEventListener('input', this.enableButtons(selector));

    SelectActividadEl.addEventListener('input', this.enableButtons(selector));

    textboxEspacioProductivoEl.addEventListener('input', this.enableButtons(selector));

    textboxEstablecimientoEl.addEventListener('input', this.enableButtons(selector));

    textboxEspacioProductivoParcelasEl.addEventListener('input', this.enableButtons(selector));

    resultsEl.addEventListener('click', function (event) {
      if (event.target.className == 'refCatResult') {
          let target = event.target
          let refCatValue = target.querySelector(".refCat");
          let refCatCode = refCatValue.textContent;
          let urlCatastro = 'https://www1.sedecatastro.gob.es/CYCBienInmueble/OVCListaBienes.aspx?del=&muni=&rc1=' + refCatCode.substring(0, 7) + '&rc2=' + refCatCode.substring(7, 14);
          window.open(urlCatastro, '_blank');
  
      } else {
          this.map.removeLayers(this.config.variables.capaGeoJSON);
          this.config.variables.selectedFeatures = new Array();
  
          let record = event.target.id;
          let find = false;
          let layerName = null;
          let estilo = null;
          let estiloPoligono = new M.style.Polygon({
              fill: {
                  color: "#0000FF",
                  opacity: 0.1
              },
              stroke: {
                  color: "#FF0000",
                  width: 4
              }
          });
  
          let estiloPunto = new M.style.Point({
              icon: {
                  src: 'https://ws205.juntadeandalucia.es/visores/espacios-productivos/logos/icono_empresas.svg',
                  scale: 1
              }
          });
          do {
              for (let i = 0; i < this.config.variables.arrayFeaturesMapeaGeoJSON.length; i++) {
                  if ((this.config.variables.arrayFeaturesMapeaGeoJSON[i].id == record)) {
                      this.config.variables.selectedFeatures.push(this.config.variables.arrayFeaturesMapeaGeoJSON[i]);
                      find = true;
                  }
              }
          } while (! find);
          if (this.concat.variables.activedPanel == "empresas") {
              estilo = estiloPunto;
              layerName = "Resultado Búsqueda Empresas";
          }
          if (this.concat.variables.activedPanel == "espaciosProductivos") {
              estilo = estiloPoligono;
              layerName = "Resultado Búsqueda Espacios Productivo";
          }
          if (this.concat.variables.activedPanel == "parcelas") {
              estilo = estiloPoligono;
              layerName = "Resultado Búsqueda Parcelas";
          }
  
          this.config.variables.capaGeoJSON = new M.layer.GeoJSON({
              extract: false,
              source: {
                  crs: {
                      properties: {
                          name: "EPSG:25830"
                      },
                      type: "name"
                  },
                  features: this.config.variables.selectedFeatures,
                  type: "FeatureCollection"
              },
              name: layerName
          });
  
          this.config.variables.capaGeoJSON.setStyle(estilo);
          this.map.addLayers(this.config.variables.capaGeoJSON);
          this.config.variables.capaGeoJSON.displayInLayerSwitcher = true;
          this.map.setBbox(this.config.variables.capaGeoJSON.getFeaturesExtent());
          this.config.variables.capaGeoJSON.setZIndex(100000);
      }
  }, false);

    this.map_.on(M.evt.COMPLETED, () => {
      //Se añade funcionalidad para desplazarse por los menus
      for (let i = 0; i < html.querySelectorAll('div#opcionesBuscador>label').length; i++) {
        html.querySelectorAll('div#opcionesBuscador>label')[i].addEventListener('click', () => {
          for (let j = 0; j < html.querySelectorAll('div#opcionesBuscador>label').length; j++) {
            html.querySelectorAll('div#opcionesBuscador>label')[j].className = '';
            html.querySelectorAll('div#buscador-panel-body>div')[j].style.display = 'none';
          }
          html.querySelectorAll('div#opcionesBuscador>label')[i].className = 'actived';
          html.querySelectorAll('div#buscador-panel-body>div')[i].style.display = 'block';
        });
      }

    });
  }

  /**
   * This function is called on the control activation
   *
   * @public
   * @function
   * @api stable
   */
  activate() {
    // calls super to manage de/activation
    super.activate();

  }
  /**
   * This function is called on the control deactivation
   *
   * @public
   * @function
   * @api stable
   */
  deactivate() {
    // calls super to manage de/activation
    super.deactivate();

  }
  /**
   * This function gets activation button
   *
   * @public
   * @function
   * @param {HTML} html of control
   * @api stable
   */
  getActivationButton(html) {
    return html.querySelector('.m-searchpanel button');
  }

  /**
   * This function compares controls
   *
   * @public
   * @function
   * @param {M.Control} control to compare
   * @api stable
   */
  equals(control) {
    return control instanceof SearchPanelControl;
  }

  // Add your own functions

  enableButtons(selector) {
    selector.loadButtonEl.disabled = false;
    selector.clearButtonEl.disabled = false;
  }

  // Petición a geosearch con los valores distintos, recuperando solo los atributos deseados

  getData(url, listaAtributos) {
    let atributos

    for (let index = 0; index < listaAtributos.length; index++) {
      if (index == 0) {
        atributos = listaAtributos[index];
      } else {
        atributos = atributos + "+" + listaAtributos[index];
      }
    }

    let urlBusqueda = url + "*:*&rows=1000000&start=0&srs=EPSG:25830&fl=" + atributos

    M.remote.get(urlBusqueda).then((res) => {
      let myJsonResponse = JSON.parse(res.text);
      let myDocs = myJsonResponse.response.docs;
      this.makeObject(myDocs);
      this.config.variables.arrayTipologias = [...new Set(myDocs.map(item => item.tipologia))];
      this.config.variables.arrayProvincias = [...new Set(myDocs.map(item => item.provincia))];
      for (let index = 0; index < this.config.variables.arrayProvincias.length; index++) {
        const element = this.config.variables.arrayProvincias[index];
        this.config.variables.arrayMunicipiosByProvincias = myDocs.filter(v => v.provincia == element);
        let unique = [...new Set(this.config.variables.arrayMunicipiosByProvincias.map(item => item.municipio))];
        let myObject = {
          provincia: element,
          municipios: unique
        };
        this.config.variables.arrayMunicipiosByProvincias.push(myObject);
      }
    }).then(() => {
      if (this.config.variables.arrayProvincias.length != 0) {
        this.rellenaProvincia(this.config.variables.arrayProvincias);
      }
      if (this.config.variables.arrayTipologias.length != 0) {
        this.rellenaTipologia(this.config.variables.arrayTipologias);
      }
    })
  }

  // Generación de objetos recuperados del geosearch
  makeObject(listaRecuperada) {
    for (let index = 0; index < listaRecuperada.length; index++) {
      const element = listaRecuperada[index];
      let myObjets = {
        provincia: element['provincia'],
        municipio: element["municipio"],
        solrid: element["solrid"],
        tipologia: element["tipologia"]
      };
      this.config.variables.arrayObjetosRecuperados.push(myObjets);
    }

  }

  rellenaProvincia(arrayProvincias) {
    this.addOptionsSelect(arrayProvincias, "selectProvinciasEspaciosProductivos", "Todas las Provincias");
    this.addOptionsSelect(arrayProvincias, "selectProvinciasParcelas", "Todas las Provincias");

  }

  rellenaTipologia(arrayTipologias) {
    this.addOptionsSelect(arrayTipologias, "selectTipologiaEspaciosProductivos", "Todas las Tipologías");
  }

  // Función apra actualizar municipios en función de provincia seleccionada
  actualizoMunicipio(e, IdSelectListaMunicipios) {
    let listadoMuncipio = new Array()
    document.getElementById(IdSelectListaMunicipios).innerHTML = '';
    //SelectMunicipiosEspaciosProductivosEL.innerHTML = '';
    for (let index = 0; index < e.length; index++) {
      const element = e[index];
      if (e == "*") {
        for (let index = 0; index < this.config.variables.arrayMunicipiosByProvincias.length; index++) {
          const provincias = this.config.variables.arrayMunicipiosByProvincias[index];
          listadoMuncipio = listadoMuncipio.concat(provincias.municipios);
        }
      } else {
        let listadoMuncipioByProvincias = this.config.variables.arrayMunicipiosByProvincias.filter(v => v.provincia == element);
        listadoMuncipio = listadoMuncipio.concat(listadoMuncipioByProvincias[0].municipios);
      } listadoMuncipio = listadoMuncipio.sort(function (a, b) {
        return a.localeCompare(b);
      })
    }
    this.addOptionsSelect(listadoMuncipio, IdSelectListaMunicipios, "Todos los Municipios");
  }

  // Función generica para actualzar options selects
  addOptionsSelect(arrayOptions, idSelect, allText) {
    let select = document.getElementById(idSelect);
    // select.innerHTML = '';
    let opt = document.createElement('option');
    opt.appendChild(document.createTextNode(allText));
    opt.value = 'all';
    opt.selected = true;
    select.appendChild(opt);
    for (let i = 0; i < arrayOptions.length; i++) {
      opt = document.createElement('option');
      opt.appendChild(document.createTextNode(arrayOptions[i]));
      opt.value = arrayOptions[i];
      select.appendChild(opt)
    }
    select.disabled = false;
  }

  getSelectedSolrId(selectedProvinciasEspaciosProductivos, selectedMunicipiosEspaciosProductivos) {

    this.config.variables.selectedSolridEspaciosProductivos = new Array()
    if (selectedMunicipiosEspaciosProductivos.includes("all")) {
      for (let index = 0; index < selectedProvinciasEspaciosProductivos.length; index++) {
        const element = selectedProvinciasEspaciosProductivos[index];
        let arrayFilter = this.config.variables.arrayObjetosRecuperados.filter(obj => {
          return obj.provincia === element
        });
        for (let index = 0; index < arrayFilter.length; index++) {
          this.config.variables.selectedSolridEspaciosProductivos.push(arrayFilter[index]);
        }
      }
    } else {
      for (let index = 0; index < selectedMunicipiosEspaciosProductivos.length; index++) {
        const element = selectedMunicipiosEspaciosProductivos[index];
        let arrayFilter = this.config.variables.arrayObjetosRecuperados.filter(obj => {
          return obj.municipio === element
        })
        for (let index = 0; index < arrayFilter.length; index++) {
          this.config.variables.selectedSolridEspaciosProductivos.push(arrayFilter[index]);
        }
      }
    }
  }

  mappingSupSolar(value) {
    let result = null;
    switch (value) {
      case "1": result = "Menor de 2.000 m²";
        break
      case "2": result = "Entre 2.000 m² y 5.000 m²";
        break;
      case "3": result = "Entre 5000 m² y 10.000 m²";
        break;
      case "4": result = "Mayor de 10.000 m²";
        break;
    }
    return result
  }

  wrapComplexFeature(feature) {
    const featureGeom = feature.getGeometry();
    if (featureGeom.getType() === M.geom.wkt.type.POLYGON || featureGeom.getType() === M.geom.wkt.type.MULTI_POLYGON) {
      let centroid;
      if (featureGeom.getType() === M.geom.wkt.type.POLYGON) {
        centroid = featureGeom.getInteriorPoint();
      } else {
        centroid = featureGeom.getInteriorPoints();
      }
      const geometryCollection = new ol.geom.GeometryCollection([centroid, featureGeom,]);
      feature.setGeometry(geometryCollection);
    }
  }

  showBuscadorArea() {
    this.showBuscadorEspacioProductivo();
    this.config.selector.buscadorAreaEl.style.display = "block";
    this.config.selector.resultadosBusquedaEl.style.display = "none";
  }

  hideBuscadorArea() {
    this.config.selector.buscadorAreaEl.style.display = "none";
    this.config.selector.resultadosBusquedaEl.style.display = "none";
  }

  showBuscadorEspacioProductivo(selector) {
    this.clear(selector);
    console.log(selector.buscarEspacioProductivoEl);
    selector.buscarEspacioProductivoEl.classList.add("actived");
    selector.buscarEmpresaEl.classList.remove("actived");
    selector.buscarParcelaEl.classList.remove("actived");
    selector.buscadorEspaciosProductivosEl.style.display = "block";
    selector.buscadorEstablecimientosEl.style.display = "none";
    selector.buscadorParcelasEl.style.display = "none";
    selector.resultadosBusquedaEl.style.display = "none";
    selector.paginationEl.style.display = "none";
    selector.textboxEstablecimientoEl.value = "";
    selector.textboxEspacioProductivoParcelasEl.value = "";
    this.config.variables.activedPanel = "espaciosProductivos";
  }

  showBuscadorEmpresas(selector) {
    this.clear(selector);
    selector.buscarEmpresaEl.classList.add("actived");
    selector.buscarEspacioProductivoEl.classList.remove("actived");
    selector.buscadorEspaciosProductivosEl.style.display = "none";
    selector.buscarParcelaEl.classList.remove("actived");
    selector.buscadorParcelasEl.style.display = "none";
    selector.resultadosBusquedaEl.style.display = "none";
    selector.paginationEl.style.display = "none";
    selector.buscadorEstablecimientosEl.style.display = "block";
    selector.textboxProvinciaEspaciosProductivosEl.value = "";
    selector.textboxProvinciaParcelasEl.value = "";
    selector.textboxMunicipioEspaciosProductivosEl.value = "";
    selector.textboxMunicipioParcelasEl.value = "";
    selector.SelectTipologiaEspaciosProductivosEl.selectedIndex = 0;
    selector.SelectTipologiaParcelasEl.selectedIndex = 0;
    selector.textboxNombreEspacioProductivoEl.value = "";
    selector.textboxEspacioProductivoEl.value = "";
    selector.textboxEspacioProductivoParcelasEl.value = "";
    selector.SelectActividadEl.selectedIndex = 0;
    selector.textboxEstablecimientoEl.value = "";
    this.config.variables.activedPanel = "empresas";
  }

  showBuscadorParcelas(selector) {
    this.clear(selector);
    selector.buscarParcelaEl.classList.add("actived");
    selector.buscarEspacioProductivoEl.classList.remove("actived");
    selector.buscadorEspaciosProductivosEl.style.display = "none";
    selector.buscarEmpresaEl.classList.remove("actived");
    selector.buscadorEstablecimientosEl.style.display = "none";
    selector.resultadosBusquedaEl.style.display = "none";
    selector.paginationEl.style.display = "none";
    selector.buscadorParcelasEl.style.display = "block";
    // textboxProvinciaEspaciosProductivosEl.value = "";
    // textboxMunicipioEspaciosProductivosEl.value = "";
    selector.SelectTipologiaEspaciosProductivosEl.selectedIndex = 0;
    selector.textboxNombreEspacioProductivoEl.value = "";
    selector.textboxEspacioProductivoEl.value = "";
    selector.textboxEspacioProductivoParcelasEl.value = "";
    selector.SelectActividadEl.selectedIndex = 0;
    selector.textboxEstablecimientoEl.value = "";
    this.config.variables.activedPanel = "parcelas";
  }

  clear(selector) {

    selector.selectMunicipiosParcelasEL = document.getElementById("selectMunicipiosParcelas");


    selector.selectProvinciasEspaciosProductivosEL.value = "";
    selector.selectProvinciasEspaciosProductivosEL.multiple = false;
    selector.selectProvinciasParcelasEL.value = "";
    selector.selectProvinciasParcelasEL.multiple = false;
    //this.config.selector.textboxProvinciaParcelasEl.value = "";
    selector.SelectMunicipiosEspaciosProductivosEL.value = "";
    selector.SelectMunicipiosEspaciosProductivosEL.selectedIndex = 0;
    selector.SelectMunicipiosEspaciosProductivosEL.options[0].text = "  -- Municipios --  ";
    selector.SelectMunicipiosEspaciosProductivosEL.disabled = true;
    selector.SelectMunicipiosEspaciosProductivosEL.multiple = false;
    selector.selectedMunicipiosEspaciosProductivos = new Array()

    selector.selectMunicipiosParcelasEL.value = "";
    selector.selectMunicipiosParcelasEL.selectedIndex = 0;
    selector.selectMunicipiosParcelasEL.options[0].text = "  -- Municipios --  ";
    selector.selectMunicipiosParcelasEL.disabled = true;
    selector.selectMunicipiosParcelasEL.multiple = false;
    this.config.variables.selectedMunicipiosParcelas = new Array()

    //textboxMunicipioParcelasEl.value = "";
    selector.selectedTipologiasEspaciosProductivos = new Array()
    selector.SelectTipologiaEspaciosProductivosEl.value = "";
    selector.SelectTipologiaEspaciosProductivosEl.selectedIndex = 0;
    selector.SelectTipologiaEspaciosProductivosEl.options[0].text = "  -- Tipologías --  ";
    selector.SelectTipologiaEspaciosProductivosEl.selectedIndex = 0;
    selector.SelectTipologiaEspaciosProductivosEl.multiple = false;
    selector.SelectSubTipologiaEspaciosProductivosEl.selectedIndex = 0;
    selector.SelectTipologiaParcelasEl.selectedIndex = 0;
    selector.textboxNombreEspacioProductivoEl.value = "";
    selector.textboxEstablecimientoEl.value = "";
    selector.textboxEspacioProductivoEl.value = "";
    selector.textboxEspacioProductivoParcelasEl.value = "";
    selector.SelectActividadEl.selectedIndex = 0;
    selector.textboxEstablecimientoEl.value = "";
    selector.loadButtonEl.disabled = true;
    selector.totalRecords = null;
    this.config.variables.page_number = 1;
    this.config.variables.page_total = null;
    this.config.variables.espaciosProductivosList = new Array();
    selector.clearButtonEl.disabled = true;
    selector.resultadosBusquedaEl.style.display = "none";
    if (this.config.variables.activedPanel == "empresas") {
      selector.buscadorEspaciosProductivosEl.style.display = "none";
      selector.buscadorParcelasEl.style.display = "none";
      selector.buscadorEstablecimientosEl.style.display = "block";
    }
    if (this.config.variables.activedPanel == "espaciosProductivos") {
      selector.buscadorEstablecimientosEl.style.display = "none";
      selector.buscadorParcelasEl.style.display = "none";
      selector.buscadorEspaciosProductivosEl.style.display = "block";
    }
    if (this.config.variables.activedPanel == "parcelas") {
      selector.buscadorEstablecimientosEl.style.display = "none";
      selector.buscadorEspaciosProductivosEl.style.display = "none";
      selector.buscadorParcelasEl.style.display = "block";
    }
    selector.paginationEl.style.display = "none";
    this.map.removeLayers(this.config.variables.capaGeoJSON);
    this.config.variables.capaGeoJSON = null;
  }

  search(selector) {
    this.config.variables.selectedProvinciasEspaciosProductivos = new Array()
    this.config.variables.selectedMunicipiosEspaciosProductivos = new Array()
    this.config.variables.selectedTipologiaEspaciosProductivos = new Array()
    this.config.variables.selectedProvinciasParcelas = new Array()
    this.config.variables.selectedMunicipiosParcelas = new Array()
    this.config.variables.selectedTipologiaParcelas = new Array()




    for (let option of this.config.selector.selectProvinciasEspaciosProductivos.options) {
      if (option.selected) {
        this.config.variables.selectedProvinciasEspaciosProductivos.push(option.value);
      }
    }
    if (this.config.variables.selectedProvinciasEspaciosProductivos.indexOf("all") != -1) {
      this.config.variables.selectedProvinciasEspaciosProductivos = ["all"]
    }


    for (let option of this.config.selector.selectMunicipiosEspaciosProductivos.options) {
      if (option.selected) {
        this.config.variables.selectedMunicipiosEspaciosProductivos.push(option.value);
      }
    }
    if (this.config.variables.selectedMunicipiosEspaciosProductivos.indexOf("all") != -1) {
      this.config.variables.selectedMunicipiosEspaciosProductivos = ["all"]
    }

    for (let option of this.config.selector.SelectTipologiaEspaciosProductivosEl.options) {
      if (option.selected) {
        this.config.variables.selectedTipologiaEspaciosProductivos.push(option.value);
      }
    }
    if (this.config.variables.selectedTipologiaEspaciosProductivos.indexOf("all") != -1) {
      this.config.variables.selectedTipologiaEspaciosProductivos = ["all"]
    }

    //Javier Parcelas

    for (let option of this.config.selector.selectProvinciasParcelasEL.options) {
      if (option.selected) {
        this.config.variables.selectedProvinciasParcelas.push(option.value);
      }
    }
    if (this.config.variables.selectedProvinciasParcelas.indexOf("all") != -1) {
      this.config.variables.selectedProvinciasParcelas = ["all"]
    }


    for (let option of this.config.selector.selectMunicipiosParcelasEL.options) {
      if (option.selected) {
        this.config.variables.selectedMunicipiosParcelas.push(option.value);
      }
    }
    if (this.config.variables.selectedMunicipiosParcelas.indexOf("all") != -1) {
      this.config.variables.selectedMunicipiosParcelas = ["all"]
    }

    for (let option of this.config.selector.SelectTipologiaParcelasEl.options) {
      if (option.selected) {
        this.config.variables.selectedTipologiaParcelas.push(option.value);
      }
    }
    if (this.config.variables.selectedTipologiaParcelas.indexOf("all") != -1) {
      this.config.variables.selectedTipologiaParcelas = ["all"]
    }


    //fin Javier

    let geosearchUrl = null;
    let query = "";
    this.config.variables.totalRecords = null;
    this.config.variables.page_number = 1;
    this.config.variables.page_total = null;
    this.config.variables.espaciosProductivosList = new Array();
    let fieldList = new Array();

    this.getSelectedSolrId(this.config.variables.selectedProvinciasEspaciosProductivos, this.config.variables.selectedMunicipiosEspaciosProductivos);
    this.getSelectedSolrId(this.config.variables.selectedProvinciasParcelas, this.config.variables.selectedMunicipiosParcelas);

    let provinciaParcela = this.config.selector.textboxProvinciaParcelasEl.value;
    let municipioParcela = this.config.selector.textboxMunicipioParcelasEl.value;
    let tipologiaParcelas = this.config.selector.SelectTipologiaParcelasEl.value;
    let espacioProductivo = this.config.selector.textboxEspacioProductivoEl.value;
    let espacioProductivoParcelas = this.config.selector.textboxEspacioProductivoParcelasEl.value;
    let actividad = this.config.selector.SelectActividadEl.value;
    let establecimiento = this.config.selector.textboxEstablecimientoEl.value;
    if (this.config.variables.activedPanel == "empresas") {
      geosearchUrl = this.config.variables.geosearchUrlDirectorioEmpresas;
      if (espacioProductivo != "") {
        fieldList.push("nombre:" + '"' + espacioProductivo + '"');
      }
      if (actividad != "") {
        fieldList.push("actividad:" + '"' + actividad + '"');
      }
      if (establecimiento != "") {
        fieldList.push("razon_soci:" + '"' + establecimiento + '"');
      }
    }
    if (this.config.variables.activedPanel == "espaciosProductivos") {
      geosearchUrl = this.config.variables.geosearchUrlEspaciosProductivos;


      if (this.config.variables.selectedSolridEspaciosProductivos.length != 0) {
        let query = ""
        for (let index = 0; index < this.config.variables.selectedSolridEspaciosProductivos.length; index++) {
          const element = this.config.variables.selectedSolridEspaciosProductivos[index];
          if (index == 0) {
            query = query + "solrid:\"" + element.solrid + "\""
          } else {
            query = query + " OR solrid:\"" + element.solrid + "\""
          }
        }
        fieldList.push(query)
      }
      if (this.config.variables.selectedTipologiasEspaciosProductivos.length != 0) {
        let query = ""
        for (let index = 0; index < this.config.variables.selectedTipologiasEspaciosProductivos.length; index++) {
          const element = this.config.variables.selectedTipologiasEspaciosProductivos[index];
          if (element == "*" && index == 0) {
            query = query + "tipologia:" + element
          } else if (index == 0 && element != "*") {
            query = query + "tipologia:\"" + element + "\""
          } else {
            query = query + " OR tipologia:\"" + element + "\""
          }
        }
        fieldList.push(query)
      }

      if (this.config.selector.textboxNombreEspacioProductivoEl.value != "") {
        fieldList.push("nombre: \"" + this.config.selector.textboxNombreEspacioProductivoEl.value + "\"")
      }
      console.log(fieldList)

      if (fieldList.length == 0) {
        M.dialog.error("Debe introducir almenos un parámetro de búsqueda");
      }
    }
    if (this.config.variables.activedPanel == "parcelas") {
      geosearchUrl = this.config.variables.geosearchUrlParcelas;
      if (provinciaParcela != "") {
        fieldList.push("provincia:" + '"' + provinciaParcela + '"');
      }
      if (municipioParcela != "") {
        fieldList.push("municipio:" + '"' + municipioParcela + '"');
      }
      if (tipologiaParcelas != "") {
        fieldList.push("rango:" + '"' + tipologiaParcelas + '"');
      }
      if (espacioProductivoParcelas != "") {
        fieldList.push("nombre:" + '"' + espacioProductivoParcelas + '"');
      }
    }
    if (fieldList.length == 1) {
      query = "(" + fieldList[0] + ")";
    } else {
      for (let i = 0; i < fieldList.length; i++) {
        if (i == fieldList.length - 1) {
          query += "(" + fieldList[i] + ")";
        } else {
          query += "(" + fieldList[i] + ")" + " AND ";
        }
      }
    }

    console.log(geosearchUrl + encodeURI(query) + this.config.variables.otherParameters)
    M.remote.get(geosearchUrl + encodeURI(query) + this.config.variables.otherParameters).then(function (res) {
      this.config.selector.resultadosBusquedaEl.style.display = "block";
      this.config.selector.buscadorEspaciosProductivosEl.style.display = "none";
      this.config.selector.buscadorEstablecimientosEl.style.display = "none";
      this.config.selector.buscadorParcelasEl.style.display = "none";
      //data = JSON.parse(res.text);
      this.config.variables.arrayFeaturesMapeaGeoJSON = new Array();
      let respuestaGeosearch = JSON.parse(res.text);
      const projection = ol.proj.get(this.map.getProjection().code);
      respuestaGeosearch.response.docs.forEach(function (elemento) {
        const feature = this.config.variables.wktFormatter_.readFeature(elemento.geom, { dataProjection: projection });
        feature.setId(elemento.solrid);
        feature.setProperties(elemento);
        this.wrapComplexFeature(feature);
        const featureMapea = M.impl.Feature.olFeature2Facade(feature);
        featureMapea.setAttribute("geom", null);

        this.config.variables.arrayFeaturesMapeaGeoJSON.push(featureMapea.getGeoJSON());
      });
      this.showResult(this.config.variables.arrayFeaturesMapeaGeoJSON);
    });
  }

  paginate(array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }

  showResult(data) {
    this.config.variables.dataList = new Array();
    this.config.variables.totalRecords = data.length;
    if (this.config.variables.totalRecords > 0) {
      this.config.variables.dataList = data;
      if (this.config.variables.totalRecords % this.config.variables.maxRecordsPage == 0) {
        this.config.variables.page_total = this.config.variables.totalRecords / this.config.variables.maxRecordsPage;
      } else {
        this.config.variables.page_total = Math.floor(this.config.variables.totalRecords / this.config.variables.maxRecordsPage) + 1;
      }
      let paginatedRecords = this.paginate(this.config.variables.dataList, this.config.variables.maxRecordsPage, this.config.variables.page_number);
      let htmlTable = this.createHtmlTable(paginatedRecords, this.config.variables.activedPanel);
      //let htmlPagination = this.createPaginationHTML();
      this.config.selector.resultsEl.innerHTML = htmlTable;
      this.config.selector.loadButtonEl.disabled = true;
    } else {
      this.config.selector.resultsEl.innerHTML = '<table class="center">\n' + "<tbody>\n" + "<tr>\n" + '<th class="noResults" colspan="2">\n' + "<p>No se ha encontrado ningún resultado</p>\n" + "</th>\n" + "</tr>\n" + "</tbody>\n" + "</table>";

      this.config.selector.recordsNumberEl.textContent = "0";
      this.config.selector.recordsTotalEl.textContent = "0";
      this.config.selector.nextPageEl.style.visibility = "hidden";
      this.config.selector.previusPageEl.style.visibility = "hidden";
    } this.config.selector.paginationEl.style.display = "block";
  }

  createHtmlTable(dataList, activedPanel) {
    let htmlResult = "";
    if (activedPanel == "espaciosProductivos") {
      for (let i = 0; i < dataList.length; i++) {
        let infoEspacioProductivo = dataList[i];
        htmlResult += '<table id="' + infoEspacioProductivo.properties["solrid"] + '" class"result">\n<tbody class="pointer-none">\n<tr class="rowResult" >\n<td class="key">Nombre</td>\n<td class="value">' + infoEspacioProductivo.properties["nombre"] + '</td>\n</tr>\n<tr class="rowResult">\n<td class="key">Tipología</td>\n<td class="value">' + infoEspacioProductivo.properties["tipologia"] + '</td>\n</tr>\n<tr  class="rowResult">\n<td class="key">Provincia</td>\n<td class="value">' + infoEspacioProductivo.properties["provincia"] + '</td>\n</tr>\n<tr class="rowResult">\n<td class="key">Municipio</td>\n<td class="value">' + infoEspacioProductivo.properties["municipio"] + "</td>\n</tr>\n</tbody>\n</table>\n";
      }
    }
    if (activedPanel == "empresas") {
      for (let i = 0; i < dataList.length; i++) {
        let infoEstablecmimiento = dataList[i];
        htmlResult += '<table id="' + infoEstablecmimiento.properties["solrid"] + '" class"result">\n<tbody class="pointer-none">\n<tr class="rowResult" >\n<td class="key">Nombre</td>\n<td class="value">' + infoEstablecmimiento.properties["razon_soci"] + '</td>\n</tr>\n<tr class="rowResult">\n<td class="key">Actividad</td>\n<td class="value">' + infoEstablecmimiento.properties["actividad"] + '</td>\n</tr>\n<tr  class="rowResult">\n<td class="key">Asalariados</td>\n<td class="value">' + infoEstablecmimiento.properties["estrato"] + '</td>\n</tr>\n<tr  class="rowResult">\n<td class="key">Dirección</td>\n<td class="value">' + infoEstablecmimiento.properties["direccion"] + '</td>\n</tr>\n<tr class="rowResult">\n<td class="key">Espacio Productivo</td>\n<td class="value">' + infoEstablecmimiento.properties["nombre"] + "</td>\n</tr>\n</tbody>\n</table>\n";
      }
    }
    if (activedPanel == "parcelas") {
      for (let i = 0; i < dataList.length; i++) {
        let infoParcelas = dataList[i];
        htmlResult += '<table id="' + infoParcelas.properties["solrid"] + '" class"result" style="0px">\n<tbody  class="pointer-none">\n<tr class="rowResult" >\n<td class="key">Espacio Productivo</td>\n<td class="value">' + infoParcelas.properties["nombre"] + '</td>\n</tr>\n<tr class="rowResult">\n<td class="key">Municipio</td>\n<td class="value">' + infoParcelas.properties["municipio"] + '</td>\n</tr>\n<tr  class="rowResult">\n<td class="key">Provincia</td>\n<td class="value">' + infoParcelas.properties["provincia"] + '</td>\n</tr>\n<tr  class="rowResult">\n<td class="key">Superficie m²</td>\n<td class="value">' + infoParcelas.properties["solares"] + ' m²' + '</td>\n</tr>\n<tr  class="rowResult">\n<td class="key">Tipología Solar</td>\n<td class="value">' + this.mappingSupSolar(infoParcelas.properties["rango"]) + '</td>\n</tr>\n</tbody>\n</table>\n' + '<table class="refCatResult"><tbody class="pointer-none">\n<tr class="refCatResult">\n<td class="key">Referencia Catastral</td>\n<td class="value refCat">' + infoParcelas.properties["refcat"] + '</td>\n</tr>\n</tbody>\n</table>\n';
      }
    }
    return htmlResult;
  }

  createPaginationHTML() {
    this.config.selector.recordsTotalEl.textContent = this.config.variables.totalRecords;
    if (this.config.variables.totalRecords < this.config.variables.maxRecordsPage) {
      this.config.selector.recordsNumberEl.textContent = this.config.variables.totalRecords;
    } else {
      this.config.selector.recordsNumberEl.textContent = "1 - " + this.config.variables.maxRecordsPage;
    }
    if (this.config.variables.page_total > 1) {
      this.config.selector.nextPageEl.style.visibility = "visible";
    } else {
      this.config.selector.previusPageEl.style.visibility = "hidden";
      this.config.selector.nextPageEl.style.visibility = "hidden";
    }
  }

  previusPage() {
    this.config.variables.page_number -= 1;
    let paginatedRecords = this.paginate(this.config.variables.dataList, this.config.variables.maxRecordsPage, this.config.variables.page_number);
    let htmlRecords = this.createHtmlTable(paginatedRecords, this.config.variables.activedPanel);
    this.config.selector.resultsEl.innerHTML = htmlRecords;
    if (this.config.variables.page_number == 1) {
      this.config.selector.recordsNumberEl.textContent = "1 - " + this.config.variables.page_number * this.config.variables.maxRecordsPage;
      this.config.selector.previusPageEl.style.visibility = "hidden";
      this.config.selector.nextPageEl.style.visibility = "visible";
    } else {
      this.config.selector.recordsNumberEl.textContent = this.config.variables.page_number * this.config.variables.maxRecordsPage - (this.config.variables.maxRecordsPage - 1) + " - " + this.config.variables.page_number * this.config.variables.maxRecordsPage;
      this.config.selector.previusPageEl.style.visibility = "visible";
      this.config.selector.nextPageEl.style.visibility = "visible";
    }
  }
  nextPage() {
    this.config.variables.page_number += 1;
    let paginatedRecords = this.paginate(this.config.variables.dataList, this.config.variables.maxRecordsPage, this.config.variables.page_number);
    let htmlRecords = this.createHtmlTable(paginatedRecords, this.config.variables.activedPanel);
    this.config.selector.resultsEl.innerHTML = htmlRecords;
    if (this.config.variables.page_number == this.config.variables.page_total) {
      this.config.selector.recordsNumberEl.textContent = this.config.selector.totalRecords;
      this.config.selector.previusPageEl.style.visibility = "visible";
      this.config.selector.nextPageEl.style.visibility = "hidden";
    } else {
      this.config.selector.recordsNumberEl.textContent = this.config.variables.page_number * this.config.variables.maxRecordsPage - (this.config.variables.maxRecordsPage - 1) + " - " + this.config.variables.page_number * this.config.variables.maxRecordsPage;
      this.config.selector.previusPageEl.style.visibility = "visible";
      this.config.selector.nextPageEl.style.visibility = "visible";
    }
  }

}
