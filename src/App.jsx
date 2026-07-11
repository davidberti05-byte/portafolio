import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ContentProvider } from './context/ContentContext.jsx'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './components/Home.jsx'
import ContentDetail from './components/ContentDetail.jsx'
import AdminLogin from './components/AdminLogin.jsx'
import AdminDashboard from './components/AdminDashboard.jsx'

function AdminGate() {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <AdminDashboard /> : <AdminLogin />
}

function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-base-bg">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <Routes>
          {/* Rotta nascosta per l'area amministrazione: non è linkata da nessuna parte,
              si raggiunge digitando l'URL o con doppio click sul puntino nel footer. */}
          <Route path="/admin" element={<AdminGate />} />

          <Route
            path="/"
            element={
              <PublicLayout>
                <Home />
              </PublicLayout>
            }
          />
          <Route
            path="/content/:id"
            element={
              <PublicLayout>
                <Home />
                <ContentDetail />
              </PublicLayout>
            }
          />
        </Routes>
      </ContentProvider>
    </AuthProvider>
  )
}
