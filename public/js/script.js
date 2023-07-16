/*
 This is js file for getting location from client's device
*/
const Http = new XMLHttpRequest();
function getLocation() {
    console.log("getLocation Called");
    var bdcApi = "https://api.bigdatacloud.net/data/reverse-geocode-client"

    navigator.geolocation.getCurrentPosition(
        (position) => {
            bdcApi = bdcApi
                + "?latitude=" + position.coords.latitude
                + "&longitude=" + position.coords.longitude
                + "&localityLanguage=en";
            getApi(bdcApi);
            //document.getElementById("demo").innerHTML = "In coordinates<br>Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude;
        },
        (err) => { getApi(bdcApi); },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
}
function getApi(bdcApi) {
    Http.open("GET", bdcApi);
    Http.send();
    Http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    };
}


getLocation();