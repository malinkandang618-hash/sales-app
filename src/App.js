import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Products from './components/Products';
import Modal from './components/Modal';
import Sales from './components/Sales';
import Reports from './components/Reports';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
            <Link className="navbar-brand" to="/">Aplikasi Penjualan (by.Suci)</Link>
            <div className="navbar-nav">
              <Link className="nav-link" to="/">Home</Link>
              <Link className="nav-link" to="/products">Harga Produk</Link>
              <Link className="nav-link" to="/modal">Modal</Link>
              <Link className="nav-link" to="/sales">Penjualan</Link>
              <Link className="nav-link" to="/reports">Laporan</Link>
            </div>
          </div>
        </nav>
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={
              <div className="text-center py-5 hero-section">
                <h1 className="display-4">Aplikasi Penjualan (by.Suci)</h1>
                <p className="lead">Kelola produk, modal, penjualan, dan lihat laporan laba rugi dengan mudah.</p>
                <div className="row mt-4 gx-4 gy-4">
                  <div className="col-md-3">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">🛒 Harga Produk</h5>
                        <p className="card-text">Kelola daftar produk dan harga.</p>
                        <Link className="btn btn-primary" to="/products">Kelola</Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">💰 Modal</h5>
                        <p className="card-text">Tambah biaya modal awal.</p>
                        <Link className="btn btn-primary" to="/modal">Kelola</Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">📝 Penjualan</h5>
                        <p className="card-text">Catat penjualan harian.</p>
                        <Link className="btn btn-primary" to="/sales">Catat</Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">📈 Laporan</h5>
                        <p className="card-text">Lihat laporan laba rugi.</p>
                        <Link className="btn btn-primary" to="/reports">Lihat</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            } />
            <Route path="/products" element={<Products />} />
            <Route path="/modal" element={<Modal />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;