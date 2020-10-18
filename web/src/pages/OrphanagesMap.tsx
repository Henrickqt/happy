import React, { useEffect, useState } from 'react';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import api from '../services/api';

import mapIcon from '../utils/mapIcon';
import mapMarkerImg from '../images/map-marker.svg';

import '../styles/pages/orphanages-map.css';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get('orphanages').then((response) => {
      setOrphanages(response.data);
    });
  }, []);

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

        {orphanages.map((orphanage) => {
          return (
            <Marker 
              key={orphanage.id} 
              icon={mapIcon} 
              position={[orphanage.latitude, orphanage.longitude]} 
            >
              <Popup 
                closeButton={false} 
                minWidth={240} 
                maxWidth={240} 
                className="map-popup" 
              >
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`} className="show-orphanage">
                  <FiArrowRight size={20} color="#FFFFFF" />
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFFFFF" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;
