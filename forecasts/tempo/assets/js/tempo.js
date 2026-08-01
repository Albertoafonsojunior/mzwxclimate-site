


let manifest;


fetch("../../products/eta/manifest.json")

.then(response => response.json())

.then(data => {

    manifest = data;

    updateForecast();

});



function updateForecast(){

    let variable =
        document.getElementById("variable").value;


    let hour =
        document.getElementById("hour").value;


    let file =
        manifest.variables[variable][hour];


    let image =
        "../../products/eta/images/" + file;



    document.getElementById("forecast-image").src=image;


    document.getElementById("png-link").href=image;



    let txt =
        file.replace(".png",".txt");


    document.getElementById("txt-link").href =
        "../../products/eta/txt/" + txt;



    let csv =
        file.split("_")[0];


    document.getElementById("csv-link").href =
        "../../products/eta/csv/" + csv + ".csv";

}



document
.getElementById("variable")
.addEventListener("change",updateForecast);



document
.getElementById("hour")
.addEventListener("change",updateForecast);

