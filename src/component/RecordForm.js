import React, { useState } from 'react';
import apiService from '../service/Service';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const RecordForm = ({ open, onClose, onRefresh }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('Active');

  const handleSubmit = async () => {
    await apiService.createRecord({ name, email, status, updatedAt: new Date().toISOString() });
    onRefresh();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Record</DialogTitle>
      <DialogContent>
        <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} margin="dense" />
        <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} margin="dense" />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RecordForm;
