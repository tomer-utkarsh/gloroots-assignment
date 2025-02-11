import React, { useEffect, useState } from 'react';
import apiService from '../service/Service';
import {
  Table, TableHead, TableBody, TableRow, TableCell,
  TableContainer, Paper, TablePagination, Button, TextField, MenuItem, Select, FormControl, InputLabel, Checkbox, FormGroup, FormControlLabel
} from '@mui/material';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'status', label: 'Status' },
  { key: 'updatedAt', label: 'Last Updated' },
];

const DataTable = () => {
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [visibleColumns, setVisibleColumns] = useState(columns.reduce((acc, col) => ({ ...acc, [col.key]: true }), {}));

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, search, statusFilter, sortField, sortOrder]);

  const fetchData = async () => {
    try {
      const response = await apiService.fetchRecords({
        _page: page + 1,
        _limit: rowsPerPage,
        q: search,
        status: statusFilter || undefined,
        _sort: sortField || undefined,
        _order: sortOrder || undefined
      });
      setRecords(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (id) => {
    await apiService.deleteRecord(id);
    fetchData();
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  const handleColumnToggle = (columnKey) => {
    setVisibleColumns({ ...visibleColumns, [columnKey]: !visibleColumns[columnKey] });
  };

  return (
    <Paper>
      <div style={{ padding: 16, display: 'flex', gap: 16 }}>
        <TextField
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />
        <FormControl>
          <InputLabel>Status</InputLabel>
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ minWidth: 120 }}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
      </div>

      <FormGroup row style={{ padding: 16 }}>
        {columns.map((col) => (
          <FormControlLabel
            key={col.key}
            control={
              <Checkbox
                checked={visibleColumns[col.key]}
                onChange={() => handleColumnToggle(col.key)}
              />
            }
            label={col.label}
          />
        ))}
      </FormGroup>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                visibleColumns[col.key] && (
                  <TableCell key={col.key} onClick={() => handleSort(col.key)} style={{ cursor: 'pointer' }}>
                    {col.label} {sortField === col.key ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                  </TableCell>
                )
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                {columns.map((col) => (
                  visibleColumns[col.key] && (
                    <TableCell key={col.key}>
                      {col.key === 'updatedAt' ? new Date(record[col.key]).toLocaleString() : record[col.key]}
                    </TableCell>
                  )
                ))}
                <TableCell>
                  <Button color="secondary" onClick={() => handleDelete(record.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={records.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
      />
    </Paper>
  );
};

export default DataTable;
