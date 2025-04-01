import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Typography,
  Box,
  AppBar,
  Toolbar,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Add as AddIcon, Search as SearchIcon, Delete as DeleteIcon, Login } from '@mui/icons-material';


function Main() {
  const url = "http://localhost:8000/";
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    item: '',
    paidBy: '',
    cost: '',
  });
  const [filters, setFilters] = useState({
    item: '',
    date: '',
    paidBy: '',
  });
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    expenseId: null,
    expenseItem: '',
  });

  const handleAddExpense = () => {
    if (!newExpense.item || !newExpense.paidBy || !newExpense.cost) return;

    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    const cost = parseInt(newExpense.cost);
    const costPerPerson = Math.ceil(cost / 4); // Assuming 4 people, adjust as needed

    const expense = {
      id: Date.now(),
      item: newExpense.item,
      date: currentDate,
      time: currentTime,
      paidBy: newExpense.paidBy,
      cost: cost,
      costPerPerson: costPerPerson,
    };
     
    axios.post(url,expense).then((res)=>{
      console.log(res.data);
    }).catch((e)=>{
      console.log(e);
    })

    setExpenses([...expenses, expense]);
          console.log(expenses);

    setNewExpense({ item: '', paidBy: '', cost: '' });
  };

  const getExpenses = async()=>{
    try {
      const tmp =  await axios.get(url)
      // console.log(expenses);
      // console.log(tmp.data[0].item);
      setExpenses(tmp.data);
    } catch (error) {
      console.log(error);
    }
  
  }

  useEffect(()=>{
    getExpenses();
  },[expenses])

  const handleDeleteClick = (id, item) => {
    console.log(id);
    setDeleteDialog({
      open: true,
      expenseId: id,
      expenseItem: item,
    });
  };


  const handleDeleteConfirm = async() => {
    console.log(deleteDialog.expenseId);
    await axios.delete(`${url}+${deleteDialog.expenseId}`).then(()=>{
      setExpenses(expenses.filter(expense => expense._id !== deleteDialog.expenseId));
      setDeleteDialog({ open: false, expenseId: null, expenseItem: '' });

    }).catch((error)=>{
      console.log("Error while deleting:",error);
    })
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, expenseId: null, expenseItem: '' });
  };

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  const filteredExpenses = expenses.filter(expense => {
    // console.log(expense.item);
    return (
      expense.item.toLowerCase().includes(filters.item.toLowerCase()) &&
      expense.date.includes(filters.date) &&
      expense.paidBy.toLowerCase().includes(filters.paidBy.toLowerCase())
    );
  });

  const totalCost = filteredExpenses.reduce((sum, expense) => sum + expense.cost, 0);
  const totalCostPerPerson = Math.ceil(totalCost / 4); // Assuming 4 people, adjust as needed

    return ( 
        <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Rishikesh Trip Expenses
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Add New Expense
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField
              label="Item"
              value={newExpense.item}
              onChange={(e) => setNewExpense({ ...newExpense, item: e.target.value })}
              sx={{ minWidth: 200 }}
            />
            <TextField
              label="Paid By"
              value={newExpense.paidBy}
              onChange={(e) => setNewExpense({ ...newExpense, paidBy: e.target.value })}
              sx={{ minWidth: 200 }}
            />
            <TextField
              label="Cost"
              type="number"
              value={newExpense.cost}
              onChange={(e) => setNewExpense({ ...newExpense, cost: e.target.value })}
              sx={{ minWidth: 200 }}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddExpense}
              sx={{ height: 56 }}
            >
              Add Expense
            </Button>
          </Box>
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Search Filters
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Search by Item"
                value={filters.item}
                onChange={(e) => handleFilterChange('item', e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Search by Date"
                value={filters.date}
                onChange={(e) => handleFilterChange('date', e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Search by Paid By"
                value={filters.paidBy}
                onChange={(e) => handleFilterChange('paidBy', e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>
          </Grid>
        </Paper>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Paid By</TableCell>
                <TableCell align="right">Cost</TableCell>
                <TableCell align="right">Cost Per Person</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredExpenses.map((expense) => (
                <TableRow key={expense._id}>
                  <TableCell>{expense.item}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>{expense.time}</TableCell>
                  <TableCell>{expense.paidBy}</TableCell>
                  <TableCell align="right">₹{expense.cost}</TableCell>
                  <TableCell align="right">₹{expense.costPerPerson}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteClick(expense._id, expense.item)}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Paper sx={{ p: 2, mt: 3 }}>
          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" align="right">
                Total Cost: ₹{totalCost}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" align="right">
                Total Cost Per Person: ₹{totalCostPerPerson}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      <Dialog
        open={deleteDialog.open}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the expense for "{deleteDialog.expenseItem}"?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
     );
}

export default Main;