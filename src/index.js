import M$plugin$SearchPanel from 'C:/proyectos/searchpanel/src/facade/js/searchpanel';
import M$control$SearchPanelControl from 'C:/proyectos/searchpanel/src/facade/js/searchpanelcontrol';
import M$impl$control$SearchPanelControl from 'C:/proyectos/searchpanel/src/impl/ol/js/searchpanelcontrol';

if (!window.M.plugin) window.M.plugin = {};
if (!window.M.control) window.M.control = {};
if (!window.M.impl) window.M.impl = {};
if (!window.M.impl.control) window.M.impl.control = {};
window.M.plugin.SearchPanel = M$plugin$SearchPanel;
window.M.control.SearchPanelControl = M$control$SearchPanelControl;
window.M.impl.control.SearchPanelControl = M$impl$control$SearchPanelControl;
