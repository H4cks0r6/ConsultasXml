var xhttp = new XMLHttpRequest();

function showConsult(v) {
  showResult(xhttp.responseXML, v);
}

xhttp.open("GET", "movies.xml", true);
xhttp.send();

function showResult(xml, value) {
  var txt = "";
  var array = [
    "/moviestore/movie[price<35]/price",
    "/moviestore/movie[price>35]/title",
    "/moviestore/movie[@category='Marvel']/title",
    "/moviestore/movie/title",
    "/moviestore/movie[1]/title",
    "/moviestore/movie/price[text()]",
    "/moviestore/movie/director",
    "//movie[year<2010]/title",
    "/moviestore/movie/title[@lang='es']",
    "/moviestore/movie[director='Joh Lasseter']/title",
  ];

  path = array[value];
  if (xml.evaluate) {
    var nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
    var result = nodes.iterateNext();
    while (result) {
      txt += result.childNodes[0].nodeValue + "<br>";
      result = nodes.iterateNext();
    }
    // Code For Internet Explorer
  } else if (window.ActiveXObject || xhttp.responseType == "msxml-document") {
    xml.setProperty("SelectionLanguage", "XPath");
    nodes = xml.selectNodes(path);
    for (i = 0; i < nodes.length; i++) {
      txt += nodes[i].childNodes[0].nodeValue + "<br>";
    }
  }
  document.getElementById("demo").innerHTML = txt;
}
