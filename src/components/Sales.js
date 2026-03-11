import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function Sales() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedProductPrice, setSelectedProductPrice] = useState(0);
  const [quantity, setQuantity] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [buyerName, setBuyerName] = useState('');
  const [address, setAddress] = useState('');
  const [shippingCost, setShippingCost] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [calculatedTotal, setCalculatedTotal] = useState(0);

  useEffect(() => {
    fetchProducts();
    fetchSales();
  }, []);

  useEffect(() => {
    const prodId = selectedProduct ? parseInt(selectedProduct) : null;
    const product = products.find(p => Number(p.id) === prodId);
    if (product) {
      setSelectedProductPrice(parseFloat(product.price) || 0);
    } else {
      setSelectedProductPrice(0);
    }
  }, [selectedProduct, products]);

  useEffect(() => {
    const prodId = selectedProduct ? parseInt(selectedProduct) : null;
    const product = products.find(p => Number(p.id) === prodId);
    const qty = parseInt(quantity) || 0;
    const shipCost = parseFloat(shippingCost) || 0;
    
    if (product && qty > 0) {
      const total = (parseFloat(product.price) || 0) * qty + shipCost;
      setCalculatedTotal(total);
    } else {
      setCalculatedTotal(0);
    }
  }, [selectedProduct, quantity, shippingCost, products]);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*');
    
    if (error) {
      const stored = localStorage.getItem('products');
      if (stored) setProducts(JSON.parse(stored));
    } else {
      setProducts(data || []);
    }
  };

  const fetchSales = async () => {
    const { data, error } = await supabase
      .from('sales')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) {
      const stored = localStorage.getItem('sales');
      if (stored) setSales(JSON.parse(stored));
    } else {
      setSales(data || []);
      localStorage.setItem('sales', JSON.stringify(data || []));
    }
  };

  const addSale = async () => {
    const prodId = selectedProduct ? parseInt(selectedProduct) : null;
    const product = products.find(p => Number(p.id) === prodId);
    if (product && prodId && quantity && buyerName && address) {
      setLoading(true);
      try {
        const shipCost = parseFloat(shippingCost) || 0;
        const qty = parseInt(quantity);
        const price = parseFloat(product.price) || 0;
        const total = (price * qty) + shipCost;
        
        const saleData = {
          product_id: prodId,
          product_name: product.name,
          price: price,
          quantity: qty,
          total: total,
          date,
          buyer_name: buyerName,
          address,
          shipping_cost: shipCost
        };

        if (editingId) {
          const { error } = await supabase
            .from('sales')
            .update(saleData)
            .eq('id', editingId);
          
          if (error) throw error;
          setEditingId(null);
          alert('Penjualan berhasil diupdate!');
        } else {
          const { error } = await supabase
            .from('sales')
            .insert([saleData]);
          
          if (error) throw error;
          alert('Penjualan berhasil ditambahkan!');
        }

        setSelectedProduct('');
        setSelectedProductPrice(0);
        setQuantity('');
        setBuyerName('');
        setAddress('');
        setShippingCost('');
        setCalculatedTotal(0);
        fetchSales();
      } catch (error) {
        console.error('Error:', error);
        alert('Error: ' + error.message);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Harap isi semua field yang diperlukan: Tanggal, Nama Pembeli, Produk, Alamat, dan Jumlah.');
    }
  };

  const startEdit = (sale) => {
    setEditingId(sale.id);
    setSelectedProduct(sale.product_id.toString());
    setSelectedProductPrice(parseFloat(sale.price));
    setQuantity(sale.quantity.toString());
    setDate(sale.date);
    setBuyerName(sale.buyer_name);
    setAddress(sale.address);
    setShippingCost(sale.shipping_cost.toString());
    setCalculatedTotal(sale.total);
  };

  const deleteSale = async (id) => {
    if (window.confirm('Hapus data penjualan ini?')) {
      setLoading(true);
      try {
        const { error } = await supabase
          .from('sales')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        fetchSales();
      } catch (error) {
        console.error('Error:', error);
        alert('Error: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <Link className="btn btn-secondary mb-3" to="/">Kembali ke Home</Link>
      <h2>Catat Penjualan</h2>
      <div className="card mb-4">
        <div className="card-body">
          <div className="mb-3">
            <input type="date" className="form-control" value={date} onChange={e => setDate(e.target.value)} disabled={loading} />
            <input type="text" className="form-control mt-2" placeholder="Nama Pembeli" value={buyerName} onChange={e => setBuyerName(e.target.value)} disabled={loading} />
            <select className="form-control mt-2" value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)} disabled={loading}>
              <option value="">Pilih Produk</option>
              {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            {selectedProductPrice > 0 && (
              <div className="mt-2 p-2 bg-info text-white rounded">
                <strong>Harga per Box/Pcs: Rp {selectedProductPrice.toLocaleString()}</strong>
              </div>
            )}
            <input type="text" className="form-control mt-2" placeholder="Alamat" value={address} onChange={e => setAddress(e.target.value)} disabled={loading} />
            <input type="number" className="form-control mt-2" placeholder="Ongkos Kirim" value={shippingCost} onChange={e => setShippingCost(e.target.value)} disabled={loading} />
            <input type="number" className="form-control mt-2" placeholder="Jumlah (box/pcs)" value={quantity} onChange={e => setQuantity(e.target.value)} disabled={loading} />
            {calculatedTotal > 0 && (
              <div className="mt-2 p-2 bg-light rounded">
                <strong>Total: Rp {calculatedTotal.toLocaleString()}</strong>
              </div>
            )}
            <button className="btn btn-success mt-3" onClick={addSale} disabled={loading}>{editingId ? 'Update Penjualan' : 'Tambah Penjualan'}</button>
          </div>
        </div>
      </div>
      <h3>Riwayat Penjualan Hari Ini</h3>
      <table className="table table-striped table-hover table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Tanggal</th>
            <th>Nama Pembeli</th>
            <th>Alamat</th>
            <th>Produk</th>
            <th>Harga Produk</th>
            <th>Jumlah</th>
            <th>Ongkos Kirim</th>
            <th>Total</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {sales.filter(s => s.date === date).map(s => (
            <tr key={s.id}>
              <td className="text-center">{s.date}</td>
              <td className="fw-semibold">{s.buyer_name}</td>
              <td>{s.address}</td>
              <td>{s.product_name}</td>
              <td className="text-end">Rp {s.price.toLocaleString()}</td>
              <td className="text-center">{s.quantity}</td>
              <td className="text-end">Rp {s.shipping_cost.toLocaleString()}</td>
              <td className="text-end fw-bold text-primary">Rp {s.total.toLocaleString()}</td>
              <td className="text-center">
                <button className="btn btn-info btn-sm me-1" onClick={() => startEdit(s)} disabled={loading}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteSale(s.id)} disabled={loading}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Sales;