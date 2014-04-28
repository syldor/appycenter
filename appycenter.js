var positions = [];
var points_layer;

var init = function() {
  map = new OpenLayers.Map("map_appycenter");
  var base_layer = new OpenLayers.Layer.OSM();
  var fromProjection = new OpenLayers.Projection("EPSG:4326");
  var toProjection = new OpenLayers.Projection("EPSG:900913");
  var lon = 2.33;
  var lat = 48.86;
  var position = new OpenLayers.LonLat(lon, lat).transform(fromProjection, toProjection);
  var zoom = 13;
  map.addLayer(base_layer);
  map.setCenter(position, zoom);
  points_layer = create_points_layer('Points Layer');
  map.addLayer(points_layer);

  var i = 0;

  OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {                
    defaultHandlerOptions: {
        'single': true,
        'double': false,
        'pixelTolerance': 0,
        'stopSingle': false,
        'stopDouble': false
    },

    initialize: function(options) {
        this.handlerOptions = OpenLayers.Util.extend(
            {}, this.defaultHandlerOptions
        );
        OpenLayers.Control.prototype.initialize.apply(
            this, arguments
        ); 
        this.handler = new OpenLayers.Handler.Click(
            this, {
                'click': this.trigger
            }, this.handlerOptions
        );
    }, 

    trigger: function(e) {
        var lonlat = map.getLonLatFromPixel(e.xy);
        positions[i] = {};
        positions[i].lon = lonlat.lon;
        positions[i].lat = lonlat.lat;
        i++;
        var point = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat))
        points_layer.addFeatures(point);
    }
  });

  var click = new OpenLayers.Control.Click();
  map.addControl(click);
  click.activate();

}


//
// create_points_layer
//
// Create the layer with the points and its style.

var create_points_layer = function(name) {
  var styleMap = new OpenLayers.StyleMap({
    "default": new OpenLayers.Style({
      "pointRadius": 6,
      "strokeWidth": 1,
      "fillColor": "red"
    }),
    "select": new OpenLayers.Style({
    })
  });

  var layer = new OpenLayers.Layer.Vector(name, {
      styleMap: styleMap,
  });
  return layer;
}

var get_bar = function(positions) {
  var x_bar = 0;
  var y_bar = 0;

  for(var p = 0 ; p < positions.length ; p++) {
    x_bar += positions[p].lon;
    y_bar += positions[p].lat;
  }

  x_bar = x_bar / positions.length;
  y_bar = y_bar / positions.length;
  var barycentre = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(x_bar, y_bar))
  points_layer.addFeatures(barycentre);
}