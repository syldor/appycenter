var init = function() {
  map = new OpenLayers.Map("map");
  var base_layer = new OpenLayers.Layer.OSM();
  var fromProjection = new OpenLayers.Projection("EPSG:4326");
  var toProjection = new OpenLayers.Projection("EPSG:900913");
  var lon = 2.33;
  var lat = 48.86;
  var position = new OpenLayers.LonLat(lon, lat).transform(fromProjection, toProjection);
  var zoom = 13;
  map.addLayer(base_layer);
  map.setCenter(position, zoom);

}