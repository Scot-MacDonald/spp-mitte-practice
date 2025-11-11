'use client'

import { useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css'

type Props = {
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

  secondIconUrl,
  thirdIconUrl,
  fourthIconUrl,
  fifthIconUrl,
  sixthIconUrl,
  seventhIconUrl,
}: Props) {
  const [Map, setMap] = useState<React.ReactNode>(null)

  useEffect(() => {
    const loadMap = async () => {
      const { MapContainer, TileLayer, Marker } = await import('react-leaflet')
      const L = await import('leaflet')
      //   await import("leaflet/dist/leaflet.css");

      const dotIcon = L.icon({
        iconUrl: '/media/spp_logo.png',
        iconSize: [42, 42],
        iconAnchor: [16, 32],
        className: 'image-marker',
      })

      const imageIcon = L.icon({
        iconUrl: secondIconUrl || '/media/S-Bahn-Logo.webp',
        iconSize: [20, 20],
        iconAnchor: [15, 15],
        className: 'image-marker',
      })

      const imageIconU = L.icon({
        iconUrl: thirdIconUrl || '/media/U-Bahn.svg',
        iconSize: [20, 20],
        iconAnchor: [15, 15],
        className: 'image-marker',
      })
      const imageIconS = L.icon({
        iconUrl: fourthIconUrl || '/media/S-Bahn-Logo.webp',
        iconSize: [20, 20],
        iconAnchor: [15, 15],
        className: 'image-marker',
      })
      const imageIconT = L.icon({
        iconUrl: fifthIconUrl || '/media/Tram-Logo.svg',
        iconSize: [20, 20],
        iconAnchor: [15, 15],
        className: 'image-marker',
      })
      const imageIconB = L.icon({
        iconUrl: sixthIconUrl || '/media/Bus-Logo.svg',
        iconSize: [20, 20],
        iconAnchor: [15, 15],
        className: 'image-marker',
      })
      const imageIconB2 = L.icon({
        iconUrl: seventhIconUrl || '/media/BUS-Logo-BVG.svg',
        iconSize: [20, 20],
        iconAnchor: [15, 15],
        className: 'image-marker',
      })
      setMap(
        // @ts-ignore
        <MapContainer
          center={[lat, lng]}
          zoom={15}
          zoomControl={true}
          scrollWheelZoom={false}
          dragging={true}
          doubleClickZoom={false}
          style={{
            height: '550px',
            width: '100%',
            borderRadius: '',
            zIndex: 1,
          }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution="&copy; <a href='https://carto.com/'>CARTO</a>"
          />
          <Marker position={[lat, lng]} icon={dotIcon} />
          <Marker position={[52.52497770786654, 13.392909433053319]} icon={imageIcon} />
          <Marker position={[52.52552931610739, 13.387399706552674]} icon={imageIconU} />
          <Marker position={[52.5203, 13.3869]} icon={imageIconS} />
          <Marker position={[52.5256, 13.3936]} icon={imageIconT} />
          <Marker position={[52.5234, 13.3888]} icon={imageIconB} />
          <Marker position={[52.5262, 13.3924]} icon={imageIconB2} />
        </MapContainer>,
      )
    }

    loadMap()
  }, [
    lat,
    lng,
    secondIconUrl,
    thirdIconUrl,
    fourthIconUrl,
    fifthIconUrl,
    sixthIconUrl,
    seventhIconUrl,
  ])

  return <div>{Map || <div>Loading map…</div>}</div>
}
