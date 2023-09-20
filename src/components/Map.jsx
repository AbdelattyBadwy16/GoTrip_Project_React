import { useNavigate, useSearchParams } from "react-router-dom"
import styles from "./Map.module.css"
import Button from "./Button"
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from '../contexts/CitiesContext'
import { useGeolocation } from "../Hook/useGeolocation";
import { useUrlPosition } from "../Hook/useUrl";

export default function Map() {

  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {isLoading : isLoadingPosition ,position : geoPosition , getPosition} = useGeolocation();
  const { cities } = useCities();
  const [lat,lng] = useUrlPosition();

  useEffect(function(){
    console.log(lat,lng ,"FF");
      if(lat && lng) setMapPosition([lat,lng])
  },[lat,lng])

  useEffect(function(){
        if(geoPosition)setMapPosition([geoPosition.lat,geoPosition.lng])
  },[geoPosition])

  return (<div className={styles.mapContainer}>
    <Button type="position" onClick={getPosition}>
      {isLoadingPosition ? "Loading..." : "Use your position"}
    </Button>
    <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className={styles.map}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      />
      {
        cities.map(city=>
        <Marker  arker position={[city.position.lat,city.position.lng]} key={city.id}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        )
      }
      <ChangeCenter position={mapPosition}></ChangeCenter>
      <DetectClick></DetectClick>
    </MapContainer>
  </div>)
}

function ChangeCenter({position})
{
  const map = useMap();
  map.setView(position);
  return null;
}


function DetectClick()
{
  const navigate = useNavigate();
  
  useMapEvent({
    click: (e)=> navigate(`form?lan=${e.latlng.lat}&lng=${e.latlng.lng}`),
  })
}