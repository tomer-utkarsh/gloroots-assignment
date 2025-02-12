import React, { useEffect, useState } from 'react';
import apiService from '../service/Service';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const RecordForm = ({ open, onClose, onRefresh, editingRecord }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('Active');

  useEffect(() => {
    if (editingRecord) {
      setName(editingRecord.name);
      setEmail(editingRecord.email);
      setStatus(editingRecord.status);
    } else {
      setName('');
      setEmail('');
      setStatus('Active');
    }
  }, [editingRecord]);

  const handleSubmit = async () => {
    const recordData = { name, email, status, updatedAt: new Date().toISOString() };

    try {
      if (editingRecord) {
        await apiService.updateRecord(editingRecord.id, recordData);
      } else {
        await apiService.createRecord(recordData);
      }
      onRefresh();
      onClose();
    } catch (error) {
      console.error('Error saving record:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{editingRecord ? 'Edit Record' : 'Add New Record'}</DialogTitle>
      <DialogContent>
        <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} margin="dense" />
        <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} margin="dense" />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          {editingRecord ? 'Update' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RecordForm;
