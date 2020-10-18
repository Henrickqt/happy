import React from 'react';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft, FiPlus } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import Leaflet from 'leaflet';

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/pages/create-orphanage.css';
import 'leaflet/dist/leaflet.css';

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60],
});

function CreateOrphanage() {
  const { goBack } = useHistory();

  return (
    <div id="page-create-orphanage">
      <aside>
        <img src={mapMarkerImg} alt="Happy"/>

        <footer>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFFFFF" />
          </button>
        </footer>
      </aside>

      <main>
        <form className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <div className="map-container">
              <Map 
                center={[-21.2290419, -45.0098092]} 
                zoom={15} 
                style={{ width: '100%', height: 280 }} 
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
                  interactive={false} 
                />
              </Map>
            </div>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name"/>
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteers</span></label>
              <textarea id="about" maxLength={300} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="uploaded-image"></div>

              <button className="new-image">
                <FiPlus size={24} color="15B6D6" />
              </button>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário das visitas</label>
              <input id="opening_hours" />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana?</label>

              <div className="button-select">
                <button type="button" className="active">Sim</button>
                <button type="button">Não</button>
              </div>
            </div>
          </fieldset>

          <button type="submit" className="confirm-button">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

export default CreateOrphanage;
