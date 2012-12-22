// 
// Don't break scale on iPad rotate.
// 
// By default iPad re-zooms the page when the device orientation changes.
// The heuristics here do not work always; our page got zoomed in
// though it should be max zoomed out.
// 
// This snippet fixes the situation so that you can still zoom in, but when
// the device is rotated the scale is restored.
// 
// via http://opensourcehacker.com/2012/01/09/zoom-on-orientation-change-fix-for-mobile-browsers-mobilizing-websites-with-responsive-design-and-html5-part-8/
//

(function(doc) {

  var addEvent = 'addEventListener',
      type = 'gesturestart',
      qsa = 'querySelectorAll',
      scales = [1, 1],
      meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];

  function fix() {
      meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
      doc.removeEventListener(type, fix, true);
  }

  if ((meta = meta[meta.length - 1]) && addEvent in doc) {
      fix();
      scales = [1.0,1.0];//[0.25, 1.6];
      doc[addEvent](type, fix, true);
  }

}(document));
