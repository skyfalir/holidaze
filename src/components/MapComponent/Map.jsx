import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import './map.css'
const MapComponent = ({ venue }) => {
  const mapContainerRef = useRef(null);
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2FuZGVydmgiLCJhIjoiY2xzcTIxcXVnMHVwbzJqbzkyN2R2Ym05diJ9.vD9B2o5lBi7ETXZaAx3BHg';
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/sandervh/clsq332xb00p601quazxcfesq',
      center: [venue.location.longitude || 10.7522, venue.location.latitude || 59.9139],
      zoom: 8
    });
    return () => map.remove();
  }, [venue.location.latitude, venue.location.longitude]);
  return <div className="map-container"><div ref={mapContainerRef} className="map" /></div>;
};
export default MapComponent;