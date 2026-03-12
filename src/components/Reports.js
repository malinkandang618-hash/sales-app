import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function Reports() {
  const [sales, setSales] = useState([]);
  const [modals, setModals] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filterSales = (salesList, start, end) => {
    let filtered = salesList;
    if (start) filtered = filtered.filter(s => s.date >= start);
    if (end) filtered = filtered.filter(s => s.date <= end);
    return filtered;
  };

  useEffect(() => {
    const fetchData = async () => {
      // Fetch sales
      const { data: salesData, error: salesError } = await supabase
        .from('sales')
        .select('*')
        .order('date', { ascending: false });
      
      if (!salesError) {
        setSales(salesData || []);
        setFilteredSales(filterSales(salesData || [], startDate, endDate));
        localStorage.setItem('sales', JSON.stringify(salesData || []));
      }

      // Fetch modals
      const { data: modalsData, error: modalsError } = await supabase
        .from('modals')
        .select('*');
      
      if (!modalsError) {
        setModals(modalsData || []);
        localStorage.setItem('modals', JSON.stringify(modalsData || []));
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredSales(filterSales(sales, startDate, endDate));
  }, [sales, startDate, endDate]);

  const totalRevenue = filteredSales.reduce((sum, s) => sum + (s.total || 0), 0);
  const totalModal = modals.reduce((sum, m) => sum + (m.amount || 0), 0);
  const netProfit = totalRevenue - totalModal;

  return (
    <div>
      <Link className="btn btn-secondary mb-3" to="/">Kembali ke Home</Link>
      <h2>Laporan Laba Rugi</h2>
      <div className="card mb-4">
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="startDate" className="form-label">Tanggal Mulai</label>
            <input id="startDate" type="date" className="form-control" value={startDate} onChange={e => setStartDate(e.target.value)} />
            <label htmlFor="endDate" className="form-label mt-2">Tanggal Akhir</label>
            <input id="endDate" type="date" className="form-control mt-2" value={endDate} onChange={e => setEndDate(e.target.value)} />
          </div>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-white bg-success mb-3">
            <div className="card-header">Total Pendapatan</div>
            <div className="card-body">
              <h5 className="card-title">Rp {totalRevenue.toLocaleString()}</h5>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-warning mb-3">
            <div className="card-header">Total Modal</div>
            <div className="card-body">
              <h5 className="card-title">Rp {totalModal.toLocaleString()}</h5>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className={`card text-white mb-3 ${netProfit >= 0 ? 'bg-primary' : 'bg-danger'}`}>
            <div className="card-header">Laba Bersih</div>
            <div className="card-body">
              <h5 className="card-title">Rp {netProfit.toLocaleString()}</h5>
            </div>
          </div>
        </div>
      </div>
      <h3>Detail Penjualan</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Produk</th>
            <th>Harga per Box/Pcs</th>
            <th>Jumlah</th>
            <th>Nama Pembeli</th>
            <th>Alamat</th>
            <th>Ongkos Kirim</th>
            <th>Total</th>
            <th>Tanggal</th>
          </tr>
        </thead>
        <tbody>
          {filteredSales.map(s => (
            <tr key={s.id}>
              <td>{s.product_name}</td>
              <td className="text-end">Rp {s.price.toLocaleString()}</td>
              <td>{s.quantity}</td>
              <td>{s.buyer_name || '-'}</td>
              <td>{s.address || '-'}</td>
              <td>Rp {(s.shipping_cost || 0).toLocaleString()}</td>
              <td>Rp {s.total.toLocaleString()}</td>
              <td>{s.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reports;