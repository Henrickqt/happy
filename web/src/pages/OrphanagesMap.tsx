import React from 'react';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/pages/orphanages-map.css';
import 'leaflet/dist/leaflet.css';

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [58, 68],
  iconAnchor: [29, 58],
  popupAnchor: [170, 10],
});

function OrphanagesMap() {
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy"/>

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Lavras</strong>
          <span>Minas Gerais</span>
        </footer>
      </aside>

      <Map 
        center={[-21.2290419, -45.0098092]} 
        zoom={15} 
        style={{ width: '100%', height: '100%' }} 
      >
        {/* If you want to use the OpenStreetMap tile layer, use the TileLayer component below */}
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}

        {/* Otherwise, access https://www.mapbox.com/ and create an account, then use your own access_token in the URL below */}
        <TileLayer 
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
        />

        <Marker 
          icon={mapIcon} 
          position={[-21.2290419, -45.0098092]} 
        >
          <Popup 
            closeButton={false} 
            minWidth={240} 
            maxWidth={240} 
            className="map-popup" 
          >
            Lar das meninas
            <Link to="/" className="show-orphanage">
              <FiArrowRight size={20} color="#FFFFFF" />
            </Link>
          </Popup>
        </Marker>
      </Map>

      <Link to="/" className="create-orphanage">
        <FiPlus size={32} color="#FFFFFF" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;
