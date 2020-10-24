import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import api from '../services/api';
import Sidebar from '../components/Sidebar';

import mapIcon from '../utils/mapIcon';

import '../styles/pages/create-orphanage.css';

function CreateOrphanage() {
  const history = useHistory();

  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0});
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  function handleMapClick(event: LeafletMouseEvent) {
    const {lat, lng} = event.latlng;

    setCoordinates({ latitude: lat, longitude: lng });
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map((image) => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = coordinates;

    if (
      name.trim() === '' || 
      whatsapp.trim() === '' || 
      about.trim() === '' || 
      instructions.trim() === '' || 
      opening_hours.trim() === '' 
    ) {
      alert('Favor informar todos os dados.');
      return;
    }

    if (latitude === 0 && longitude === 0) {
      alert('Favor informar a localização.');
      return;
    }

    if (images.length < 1) {
      alert('Favor incluir pelo menos uma foto do orfanato.');
      return;
    }

    const data = new FormData();

    data.append('name', name);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('whatsapp', whatsapp);
    data.append('about', about);
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));

    images.forEach((image) => {
      data.append('images', image);
    });

    await api.post('orphanages', data);

    alert('Cadastro realizado com sucesso!');

    history.push('/app');
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <div className="map-container">
              <Map 
                center={[-21.2290419, -45.0098092]} 
                zoom={15} 
                style={{ width: '100%', height: 280 }} 
                onClick={handleMapClick} 
              >
                {/* If you want to use the OpenStreetMap tile layer, use the TileLayer component below */}
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}

                {/* Otherwise, access https://www.mapbox.com/ and create an account, then use your own access_token in the URL below */}
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
                />

                {coordinates.latitude !== 0 && coordinates.longitude !==0 && (
                  <Marker 
                    icon={mapIcon} 
                    position={[coordinates.latitude, coordinates.longitude]} 
                    interactive={false} 
                  />
                )}
              </Map>
            </div>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
                id="name" 
                value={name} 
                onChange={(event) => setName(event.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="whatsapp">Whatsapp <span>DDD + Número</span></label>
              <input 
                id="whatsapp" 
                maxLength={11} 
                value={whatsapp} 
                onChange={(event) => setWhatsapp(event.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
                id="about" 
                maxLength={300} 
                value={about} 
                onChange={(event) => setAbout(event.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map((image) => {
                  return (
                    <img key={image} src={image} alt={name} />
                  );
                })}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="15B6D6" />
                </label>
              </div>
              
              <input 
                id="image[]" 
                type="file" 
                multiple 
                onChange={handleSelectImages} 
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
                id="instructions" 
                value={instructions} 
                onChange={(event) => setInstructions(event.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário das visitas</label>
              <input 
                id="opening_hours" 
                value={opening_hours} 
                onChange={(event) => setOpeningHours(event.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana?</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className={open_on_weekends ? 'active' : ''} 
                  onClick={() => setOpenOnWeekends(true)} 
                >
                  Sim
                </button>
                <button 
                  type="button" 
                  className={!open_on_weekends ? 'deactivated': ''} 
                  onClick={() => setOpenOnWeekends(false)} 
                >
                  Não
                </button>
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
