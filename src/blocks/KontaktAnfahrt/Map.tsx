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

  // Icon factory with SAME sizes as your second snippet
  const createIcon = (url: string, type: 'main' | 'small' = 'small') =>
    L.icon({
      iconUrl: url,
      iconSize: type === 'main' ? [42, 42] : [20, 20],
      iconAnchor: type === 'main' ? [16, 32] : [15, 15],
      className: 'image-marker',
    })

  return (
    <MapContainer
      center={center}
      zoom={16}
      scrollWheelZoom={false}
      style={{ height: '550px', width: '100%', zIndex: 1 }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution="&copy; <a href='https://carto.com/'>CARTO</a>"
      />

      {/* Main marker (42×42) */}
      <Marker position={center} icon={createIcon(mainIconUrl || '/media/spp_logo.png', 'main')}>
        <Popup>Linienstraße 127</Popup>
      </Marker>

      {/* Additional markers (20×20) */}
      {secondIconUrl && (
        <Marker
          position={[52.52497770786654, 13.392909433053319]}
          icon={createIcon(secondIconUrl)}
        />
      )}

      {thirdIconUrl && (
        <Marker
          position={[52.52552931610739, 13.387399706552674]}
          icon={createIcon(thirdIconUrl)}
        />
      )}

      {fourthIconUrl && <Marker position={[52.5203, 13.3869]} icon={createIcon(fourthIconUrl)} />}

      {fifthIconUrl && <Marker position={[52.5256, 13.3936]} icon={createIcon(fifthIconUrl)} />}

      {sixthIconUrl && <Marker position={[52.5234, 13.3888]} icon={createIcon(sixthIconUrl)} />}

      {seventhIconUrl && <Marker position={[52.5262, 13.3924]} icon={createIcon(seventhIconUrl)} />}
    </MapContainer>
  )
}
