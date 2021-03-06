import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiClock, FiInfo } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { Map, TileLayer, Marker } from 'react-leaflet';

import api from '../services/api';
import Sidebar from '../components/Sidebar';

import mapIcon from '../utils/mapIcon';

import '../styles/pages/orphanage.css';

interface Orphanage {
  name: string;
  latitude: number;
  longitude: number;
  whatsapp: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    id: number;
    url: string;
  }>;
}

interface OrphanageParams {
  id: string;
}

function Orphanage() {
  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const params = useParams<OrphanageParams>();

  useEffect(() => {
    api.get(`orphanages/${params.id}`).then((response) => {
      setOrphanage(response.data);
    });
  }, [params.id]);

  if (!orphanage) {
    return <p>Carregando...</p>
  }

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img src={orphanage.images[activeImageIndex].url} alt={orphanage.name} />

          <div className="images">
            {orphanage.images.map((image, index) => {
              return (
                <button 
                  key={image.id} 
                  type="button" 
                  className={activeImageIndex === index ? 'active' : ''} 
                  onClick={() => {
                    setActiveImageIndex(index);
                  }}
                >
                  <img src={image.url} alt={orphanage.name} />
                </button>
              )
            })}
          </div>

          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map 
                center={[orphanage.latitude, orphanage.longitude]} 
                zoom={15} 
                style={{ width: '100%', height: 280 }} 
                dragging={false} 
                touchZoom={false} 
                zoomControl={false} 
                scrollWheelZoom={false} 
                doubleClickZoom={false} 
              >
                {/* If you want to use the OpenStreetMap tile layer, use the TileLayer component below */}
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}

                {/* Otherwise, access https://www.mapbox.com/ and create an account, then use your own access_token in the URL below */}
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
                />

                <Marker 
                  icon={mapIcon} 
                  position={[orphanage.latitude, orphanage.longitude]} 
                  interactive={false} 
                />
              </Map>

              <footer>
                <a 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  href={`https://google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`} 
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </div>
              {orphanage.open_on_weekends 
                ? (
                  <div className="open-on-weekends">
                    <FiInfo size={32} color="#39CC83" />
                    Atendemos <br />
                    fim de semana
                  </div>
                )
                : (
                  <div className="dont-open-on-weekends">
                    <FiInfo size={32} color="#FF669D" />
                    Não atendemos <br />
                    fim de semana
                  </div>
                )
              }
            </div>

            <a 
              className="contact-button" 
              target="_blank" 
              rel="noopener noreferrer" 
              href={`https://wa.me/+55${orphanage.whatsapp}?text=Olá,%20tenho%20interesse%20em%20visitá-los!`}
            >
              <FaWhatsapp size={20} color="FFFFFF" />
              Entrar em contato
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Orphanage;
