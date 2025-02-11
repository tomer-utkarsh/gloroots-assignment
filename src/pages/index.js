import React, { useState } from 'react';
import DataTable from '../component/DataTable';
import RecordForm from '../component/RecordForm';
import { Button, Container } from '@mui/material';

const HomePage = () => {
  const [open, setOpen] = useState(false);

  return (
    <Container>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add Record
      </Button>
      <RecordForm open={open} onClose={() => setOpen(false)} onRefresh={() => window.location.reload()} />
      <DataTable />
    </Container>
  );
};

export default HomePage;
