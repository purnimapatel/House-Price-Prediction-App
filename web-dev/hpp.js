function getBathValue() {
    // Get no of bathrooms
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for (var i in uiBathrooms) {
      if (uiBathrooms[i].checked) {
        return parseInt(i) + 1;
      }
    }
    return -1; // Invalid Value
  }
function getBHKValue(){
    // Get no of BHK
    var uiBHK = document.getElementsByClassName("uiBHK");
    for(var i in uiBHK){
        if(uiBHK[i].checked){
            return parseInt(i)+1;
        }
    }
    return -1; //Invalid Value
}  
function getBalconyValue(){
    // Get no of Balcony
    var uibalcony = document.getElementsByClassName("uibalcony");
    for(var i in uibalcony){
        if(uibalcony[i].checked){
            return parseInt(i)+1;
        }
    }
    return -1; //Invalid value
}
function onClickedEstimatePrice() {
    var sqft = document.getElementById("uiSqft");
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var balcony = getBalconyValue();
    var location = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");
  
    var url = "http://127.0.0.1:5000/predict_home_price";
    //   var url = "/api/predict_home_price"; // only Deployment
  
    $.post(
      url,
      {
        total_sqft: parseFloat(sqft.value),
        size: bhk,
        bath: bathrooms,
        balcony: balcony,
        location: location.value,
      },
      function (data, status) {
        estPrice.innerHTML =
          "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
        }
    );
}
function onPageLoad() {
    console.log( "document loaded" );
    var url = "http://127.0.0.1:5000/get_location_names"; // Use this if you are NOT using nginx which is first 7 tutorials
    //var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
    $.get(url,function(data, status) {
        console.log("got response for get_location_names request");
        if(data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for(var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
  }
  
  window.onload = onPageLoad;

