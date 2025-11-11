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

  const createIcon = (url: string, size: [number, number] = [32, 32]) =>
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
      {/* <Marker position={center} icon={createIcon(mainIconUrl || '/media/spp_logo.png')}>
        <Popup>Unsere Praxis</Popup>
      </Marker> */}

      {/* Example additional markers */}
      {/* {secondIconUrl && (
        <Marker position={[lat + 0.001, lng + 0.001]} icon={createIcon(secondIconUrl)}>
          <Popup>S-Bahn</Popup>
        </Marker>
      )}
      {thirdIconUrl && (
        <Marker position={[lat + 0.002, lng - 0.001]} icon={createIcon(thirdIconUrl)}>
          <Popup>U-Bahn</Popup>
        </Marker>
      )}
      {fourthIconUrl && (
        <Marker position={[lat - 0.0015, lng + 0.002]} icon={createIcon(fourthIconUrl)}>
          <Popup>Other</Popup>
        </Marker>
      )} */}
    </MapContainer>
  )
}
