'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L, { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface MapProps {
  lat: number
  lng: number
  mainIconUrl?: string
  secondIconUrl?: string
  thirdIconUrl?: string
  fourthIconUrl?: string
  fifthIconUrl?: string
  sixthIconUrl?: string
  seventhIconUrl?: string
}

export default function Map({
  lat,
  lng,
  mainIconUrl,
  secondIconUrl,
  thirdIconUrl,
  fourthIconUrl,
  fifthIconUrl,
  sixthIconUrl,
  seventhIconUrl,
}: MapProps) {
  const center: LatLngExpression = [lat, lng]

  const createIcon = (url: string, size: [number, number] = [15, 15]) =>
    L.icon({
      iconUrl: url,
      iconSize: size,
      iconAnchor: [size[0] / 2, size[1]],
      popupAnchor: [0, -size[1] / 2],
    })

  return (
    <MapContainer
      center={center}
      zoom={15}
      scrollWheelZoom={false}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution="&copy; <a href='https://carto.com/'>CARTO</a>"
      />

      {/* Main marker */}
      <Marker position={center} icon={createIcon(mainIconUrl || '/media/spp_logo.png')}>
        <Popup>Unsere Praxis</Popup>
      </Marker>

      {/* Example additional markers */}
      {secondIconUrl && (
        <Marker position={[52.52497770786654, 13.392909433053319]} icon={createIcon(secondIconUrl)}>
          <Popup>Other</Popup>
        </Marker>
      )}

      {thirdIconUrl && (
        <Marker position={[52.52552931610739, 13.387399706552674]} icon={createIcon(thirdIconUrl)}>
          <Popup>Other</Popup>
        </Marker>
      )}

      {fourthIconUrl && (
        <Marker position={[52.5203, 13.3869]} icon={createIcon(fourthIconUrl)}>
          <Popup>S-Bahn</Popup>
        </Marker>
      )}

      {fifthIconUrl && (
        <Marker position={[52.5256, 13.3936]} icon={createIcon(fifthIconUrl)}>
          <Popup>U-Bahn</Popup>
        </Marker>
      )}

      {sixthIconUrl && (
        <Marker position={[52.5234, 13.3888]} icon={createIcon(sixthIconUrl)}>
          <Popup>Other</Popup>
        </Marker>
      )}

      {seventhIconUrl && (
        <Marker position={[52.5262, 13.3924]} icon={createIcon(seventhIconUrl)}>
          <Popup>Other</Popup>
        </Marker>
      )}
    </MapContainer>
  )
}
