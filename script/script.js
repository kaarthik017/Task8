function createWEatherData(data){
var container = document.createElement('div');
container.setAttribute('class','container');

var row = document.createElement('div');
row.setAttribute('class','row');
for(var i=0;i<data.length;i++){

var col1 = document.createElement('div');
col1.setAttribute('class','col-lg-4');

var col2 = document.createElement('div');
col2.setAttribute('class','col-sm-12');

var card = document.createElement('div');
card.setAttribute('class','card');

var cardHeader = document.createElement('div');
cardHeader.setAttribute('class','cardheader card-header');
cardHeader.innerHTML = data[i].name;

var cardBody = document.createElement('div');
cardBody.setAttribute('class','card-body');

var image = document.createElement('img');
image.src = data[i].flag;

var p = document.createElement('p')
p.setAttribute('class','para');
p.innerHTML = "Capital: "+data[i].capital;

var p1 = document.createElement('p')
p1.setAttribute('class','para');
p1.innerHTML = "Region: "+data[i].region;

var p2 = document.createElement('p')
p2.setAttribute('class','para');
p2.innerHTML = "Country Code: "+data[i].alpha3Code;

var button = document.createElement('button');
button.setAttribute('class','btn btn-primary');
button.setAttribute('id',i);
button.setAttribute("onclick","addConent(this.id,"+data[i].latlng[0]+","+data[i].latlng[1]+")");
button.innerHTML = 'Click for Weather';


var cardFooter = document.createElement('div');
cardFooter.setAttribute('class','card-footer');
cardFooter.setAttribute('id','cardfooter'+i);

cardBody.append(image,p,p1,p2,button);
card.append(cardHeader, cardBody, cardFooter);
col2.append(card);
col1.append(col2);
row.appendChild(col1);
}
container.appendChild(row);

document.body.append(container);

}

function addConent(id,lat,lon){

  var a = document.getElementById('cardfooter'+id);
  var idSelector = document.getElementById('p1'+id);
  var idSelector1 = document.getElementById('p2'+id);
  var idSelector2 = document.getElementById('p3'+id);
  var p = document.createElement('p');
  p.setAttribute('id','p1'+id);
  var p1 = document.createElement('p');
  p1.setAttribute('id','p2'+id);
  var p2 = document.createElement('p');
  p2.setAttribute('id','p3'+id);
  fetch('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=a2520c5c1ca021359afb5b40f238d424')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(weather) {
        
        p.innerHTML = "Sky: "+weather.weather[0].description;
        p1.innerHTML = "Temperature in F: "+weather.main.temp;
        p2.innerHTML = "Pressure: "+weather.main.pressure;
        if((idSelector === null)&&(idSelector1 === null)&&(idSelector2 === null)){ 
        a.append(p,p1,p2);
        }
        else{
          a.replaceChild(p,idSelector);
          a.replaceChild(p1,idSelector1);
          a.replaceChild(p2,idSelector2);
        }
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
 }

fetch('https://restcountries.eu/rest/v2/all')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
         createWEatherData(data);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });