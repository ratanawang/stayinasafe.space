function getLocation() {
    const successCallBack = (position) => {
            const map = new google.maps.Map(document.getElementById('map'), {
                zoom: 8,
                center: { lat: position.coords.latitude, lng: position.coords.longitude }
            });
    };
    const errorCallBack = (error) => {
            console.error(error);
    };
    navigator.geolocation.getCurrentPosition(successCallBack, errorCallBack)
}

function getReportLocation() {
    const successCallBack = (position) => {
       center: { lat: position.coords.latitude, lng: position.coords.longitude }
    };
    const errorCallBack = (error) => {
            console.error(error);
    };
    navigator.geolocation.getCurrentPosition(successCallBack, errorCallBack)
}

function initMap(){
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: ,
        // center: {lat: 49.2827, lng: -123.1207}
        center: { lat: -25.344, lng: 131.036 }
    });
    const data = {
      'type': 'verbal',
      'lat': -33.827293,
      'lng': 150.202919,
      'time': '02/19/2021 11:33',
      'context': 'goddd'
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    fetch('http://localhost:5000', options);


    fetch("http://localhost:5000", { referrerPolicy: 'no-referrer-when-downgrade' })
      .then(resp => resp.json())
      .then(resp=> {
          const StalkLocations = resp.stalkLocations;
          const StalkImage =
          "http://maps.google.com/mapfiles/ms/icons/green-dot.png" ;
          const StalkMarkers = StalkLocations.map((location, i) => {
              return new google.maps.Marker({
                  position: location,
                  icon: StalkImage,
                  map: map,
              });
          });

          const PhysicalLocations = resp.physicalLocations;
          const PhysicalImage =
          "http://maps.google.com/mapfiles/ms/icons/red-dot.png" ;
          const PhysicalMarkers = PhysicalLocations.map((location, i) => {
              return new google.maps.Marker({
                  position: location,
                  icon: PhysicalImage,
                  map: map,
              });
          });

          const VerbalLocations = resp.verbalLocations;
          const VerbalImage =
          "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" ;
          const VerbalMarkers = VerbalLocations.map((location, i) => {
              return new google.maps.Marker({
                  position: location,
                  icon: VerbalImage,
                  map: map,
              });
          });
        })

