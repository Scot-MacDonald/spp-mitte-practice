import React from 'react'

interface LoginProps {
  children: React.ReactNode
}
const CustomLogin: React.FC<LoginProps> = ({ children }) => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5', // optional
      }}
    >
      <img
        src="/spp_logo.png"
        alt="SPP Logo"
        style={{ marginBottom: '2rem', width: '200px', height: 'auto' }}
      />
      {children}
    </div>
  )
}

export default CustomLogin
