

// In a real wrold scenario, cd_catalog.xm file will be in the server
//But in this example, I use visual studio code editor and its Live Server extension.
// When you use Live Server extension, it creates an environment that mimics a remote web server.

function loadDoc() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() { myFunction(this); }  // this parameter referes the xhttp object
    xhttp.open("GET", "cd_catalog.xml", true);
    xhttp.send();
}

function myFunction(xml) {
    const xmlDoc = xml.responseXML;
    const x = xmlDoc.getElementsByTagName("CD");
    let table = "<table><tr><th>Artist</th><th>Title</th></tr>";
    for (let i = 0; i < x.length; i++) {
        table += "<tr><td>" +
            x[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue +
            "</td><td>" +
            x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue +
            "</td></tr>";
    }
    table += "</table>";
    document.getElementById("demo").innerHTML = table;
}

//End