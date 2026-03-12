import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function Products() {
  const [products, setProducts] = useState([]);
  const [modals, setModals] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchModals();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: false });
      
      if (error) {
        console.error('Error fetching products:', error);
        // fallback ke localStorage jika Supabase error
        const stored = localStorage.getItem('products');
        if (stored) setProducts(JSON.parse(stored));
      } else {
        setProducts(data || []);
        localStorage.setItem('products', JSON.stringify(data || []));
      }
    } catch (error) {
      console.error('Error:', error);
      // fallback ke localStorage
      const stored = localStorage.getItem('products');
      if (stored) setProducts(JSON.parse(stored));
    } finally {
      setLoading(false);
    }
  };

  const fetchModals = async () => {
    try {
      const { data, error } = await supabase
        .from('modals')
        .select('*');
      
      if (error) {
        console.error('Error fetching modals:', error);
        const stored = localStorage.getItem('modals');
        if (stored) setModals(JSON.parse(stored));
      } else {
        setModals(data || []);
        localStorage.setItem('modals', JSON.stringify(data || []));
      }
    } catch (error) {
      console.error('Error:', error);
      const stored = localStorage.getItem('modals');
      if (stored) setModals(JSON.parse(stored));
    }
  };

  const addProduct = async () => {
    if (name && price) {
      setLoading(true);
      try {
        if (editingId) {
          // update existing
          const { error } = await supabase
            .from('products')
            .update({ name, price: parseFloat(price) })
            .eq('id', editingId);
          
          if (error) throw error;
          setEditingId(null);
          alert('Produk berhasil diupdate!');
        } else {
          // add new
          const { error } = await supabase
            .from('products')
            .insert([{ name, price: parseFloat(price) }]);
          
          if (error) throw error;
          alert('Produk berhasil ditambahkan!');
        }
        setName('');
        setPrice('');
        fetchProducts();
      } catch (error) {
        console.error('Error:', error);
        alert('Error: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setName(product.name);
    setPrice(product.price.toString());
  };

  const deleteProduct = async (id) => {
    try {
      // Check if there are sales using this product
      const { data: salesData, error: checkError } = await supabase
        .from('sales')
        .select('id')
        .eq('product_id', id);
      
      if (checkError) throw checkError;
      
      if (salesData && salesData.length > 0) {
        // Ada sales yang menggunakan produk ini
        const confirmDelete = window.confirm(
          `Produk ini masih memiliki ${salesData.length} data penjualan.\n\nApakah Anda ingin menghapus produk beserta semua data penjualannya?`
        );
        
        if (!confirmDelete) return;
        
        // Delete all sales with this product first
        setLoading(true);
        const { error: deleteSalesError } = await supabase
          .from('sales')
          .delete()
          .eq('product_id', id);
        
        if (deleteSalesError) throw deleteSalesError;
      } else {
        // No sales, ask for confirmation
        const confirmDelete = window.confirm('Hapus produk ini?');
        if (!confirmDelete) return;
        setLoading(true);
      }
      
      // Delete the product
      const { error: deleteError } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (deleteError) throw deleteError;
      
      alert('Produk berhasil dihapus!');
      fetchProducts();
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getTotalModalPerBox = () => {
    return modals.reduce((sum, m) => sum + (m.amount || 0), 0);
  };

  return (
    <div>
      <Link className="btn btn-secondary mb-3" to="/">Kembali ke Home</Link>
      <h2>Harga Produk per Box/Pcs</h2>
      
      <div className="alert alert-info mb-4">
        <strong>📦 Total Modal per 1 Box/Pcs:</strong> Rp {getTotalModalPerBox().toLocaleString()}
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Nama Produk" value={name} onChange={e => setName(e.target.value)} disabled={loading} />
            <input type="number" className="form-control mt-2" placeholder="Harga Jual per Box/Pcs" value={price} onChange={e => setPrice(e.target.value)} disabled={loading} />
            <button className="btn btn-primary mt-3" onClick={addProduct} disabled={loading}>{editingId ? 'Update Produk' : 'Tambah Produk'}</button>
          </div>
        </div>
      </div>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Nama</th>
            <th className="text-end">Modal/Box</th>
            <th className="text-end">Harga Jual/Box</th>
            <th className="text-end">Keuntungan</th>
            <th className="text-end">Margin %</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => {
            const totalModal = getTotalModalPerBox();
            const sellingPrice = p.price || 0;
            const profit = sellingPrice - totalModal;
            const marginPercent = totalModal > 0 ? ((profit / sellingPrice) * 100).toFixed(2) : 0;
            
            return (
              <tr key={p.id}>
                <td><strong>{p.name}</strong></td>
                <td className="text-end">Rp {totalModal.toLocaleString()}</td>
                <td className="text-end text-primary"><strong>Rp {sellingPrice.toLocaleString()}</strong></td>
                <td className={`text-end font-weight-bold ${profit >= 0 ? 'text-success' : 'text-danger'}`}>
                  Rp {profit.toLocaleString()}
                </td>
                <td className={`text-end ${profit >= 0 ? 'text-success' : 'text-danger'}`}>
                  {marginPercent}%
                </td>
                <td>
                  <button className="btn btn-info btn-sm me-2" onClick={() => startEdit(p)} disabled={loading}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteProduct(p.id)} disabled={loading}>Hapus</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Products;