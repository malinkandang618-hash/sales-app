import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function Modal() {
  const [modals, setModals] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchModals();
  }, []);

  const fetchModals = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('modals')
        .select('*')
        .order('id', { ascending: false });
      
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
    setLoading(false);
  };

  const addModal = async () => {
    if (description && amount) {
      setLoading(true);
      try {
        if (editingId) {
          const { error } = await supabase
            .from('modals')
            .update({ description, amount: parseFloat(amount) })
            .eq('id', editingId);
          
          if (error) throw error;
          setEditingId(null);
          alert('Modal berhasil diupdate!');
        } else {
          const { error } = await supabase
            .from('modals')
            .insert([{ description, amount: parseFloat(amount) }]);
          
          if (error) throw error;
          alert('Modal berhasil ditambahkan!');
        }
        setDescription('');
        setAmount('');
        fetchModals();
      } catch (error) {
        console.error('Error:', error);
        alert('Error: ' + error.message);
      }
      setLoading(false);
    }
  };

  const startEdit = (modal) => {
    setEditingId(modal.id);
    setDescription(modal.description);
    setAmount(modal.amount.toString());
  };

  const deleteModal = async (id) => {
    if (window.confirm('Hapus modal ini?')) {
      setLoading(true);
      try {
        const { error } = await supabase
          .from('modals')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        fetchModals();
      } catch (error) {
        console.error('Error:', error);
        alert('Error: ' + error.message);
      }
      setLoading(false);
    }
  };

  return (
    <div>
      <Link className="btn btn-secondary mb-3" to="/">Kembali ke Home</Link>
      <h2>Modal per Box/Pcs (Biaya Awal)</h2>
      <div className="card mb-4">
        <div className="card-body">
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Deskripsi" value={description} onChange={e => setDescription(e.target.value)} disabled={loading} />
            <input type="number" className="form-control mt-2" placeholder="Harga Modal" value={amount} onChange={e => setAmount(e.target.value)} disabled={loading} />
            <button className="btn btn-primary mt-3" onClick={addModal} disabled={loading}>{editingId ? 'Update Modal' : 'Tambah Modal'}</button>
          </div>
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Deskripsi</th>
            <th>Harga Modal</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {modals.map(m => (
            <tr key={m.id}>
              <td>{m.description}</td>
              <td>Rp {(m.amount || 0).toLocaleString()}</td>
              <td>
                <button className="btn btn-info btn-sm me-2" onClick={() => startEdit(m)} disabled={loading}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteModal(m.id)} disabled={loading}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Modal;