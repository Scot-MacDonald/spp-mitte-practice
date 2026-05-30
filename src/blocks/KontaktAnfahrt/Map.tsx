'use client'

import 'leaflet/dist/leaflet.css'
import L, { type LatLngExpression } from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

type MapProps = {
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

  const createIcon = (url: string, type: 'main' | 'small' = 'small') => {
    if (type === 'main') {
      return L.icon({
        iconUrl: url,
        iconSize: [55, 48],
        iconAnchor: [27, 48],
        className: 'image-marker',
      })
    }

    return L.icon({
      iconUrl: url,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
      className: 'image-marker',
    })
  }

  return (
    <div className="w-full h-[550px] border rounded-lg overflow-hidden">
      <MapContainer
        center={center}
        zoom={16}
        scrollWheelZoom={false}
        style={{ height: '550px', width: '100%', zIndex: 0 }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution="&copy; <a href='https://carto.com/'>CARTO</a>"
        />

        <Marker position={center} icon={createIcon(mainIconUrl || '/media/spp_logo.png', 'main')}>
          <Popup>Linienstraße 127</Popup>
        </Marker>

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

        {seventhIconUrl && (
          <Marker position={[52.5262, 13.3924]} icon={createIcon(seventhIconUrl)} />
        )}
      </MapContainer>
    </div>
  )
}
