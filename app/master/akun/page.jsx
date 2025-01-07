"use client";
import React, { useState, useEffect, useMemo } from "react";
import MUIDataTable from "mui-datatables";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Menu,
  MenuItem,
  CircularProgress,
  Box,
  Grid,
} from "@mui/material";
import { Add, Help, Upload, MoreVert } from "@mui/icons-material";
import Badge from "../../components/badge";

function ContactForm({
  formData,
  handleFormChange,
  handleFormSubmit,
  setOpen,
  errors,
}) {
  const handleTypeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      handleFormChange({
        target: { name: "type", value: [...formData.type, value] },
      });
    } else {
      handleFormChange({
        target: {
          name: "type",
          value: formData.type.filter((item) => item !== value),
        },
      });
    }
  };

  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="name"
            label="Account Name"
            fullWidth
            required
            value={formData.name}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="accountNumber"
            label="Account Number"
            fullWidth
            required
            value={formData.accountNumber}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="type"
            label="Type"
            fullWidth
            required
            value={formData.type}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="balance"
            type="number"
            label="Balance"
            fullWidth
            required
            inputProps={{ step: "0.01" }}
            value={formData.balance}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="currencyId"
            label="Currency ID"
            fullWidth
            required
            value={formData.currencyId}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Create Account
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default function AccountsPage() {
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [contacts, setContacts] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch("/api/accounts");
        const data = await response.json();
        setAccounts(data);
        console.log(data[0].currency.code);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      } finally {
          setLoading(false);
      }
    };
    fetchAccounts();
  }, []);

  const columns = [
    { name: "name", label: "Account Name" },
    { name: "accountNumber", label: "Account Number" },
    { name: "type", label: "Type" },
    {
      name: "balance",
      label: "Balance",
      options: {
        customBodyRender: (value, tableMeta) =>
          `${tableMeta.rowData[4].symbol}${value.toFixed(2)}`,
      },
    },
    {
      name: "currency",
      label: "Currency",
      options: {
        customBodyRender: (value) => value.code || "N/A",
      },
    },
  ];

  const options = useMemo(
    () => ({
      selectableRows: "none",
      responsive: "standard",
      download: false,
      print: false,
    }),
    []
  );

  const [formData, setFormData] = useState({
    name: "",
    accountNumber: "",
    type: [],
    balance: 0,
    currencyId: "",
  });

  const [errors, setErrors] = useState({});
  const [popupMessage, setPopupMessage] = useState("");

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = "Nama tidak boleh kosong";
    if (formData.type.length === 0) formErrors.type = "Tipe tidak boleh kosong";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setPopupMessage("Formulir masih memiliki kesalahan, harap perbaiki!");
      return;
    }

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const addedContact = await response.json();
        setContacts((prev) => [...prev, addedContact]);
        setOpen(false);
        setFormData({
          name: "",
          accountNumber: "",
          type: [],
          balance: 0,
          currencyId: "",
        });
        setErrors({});
        setPopupMessage("Akun berhasil ditambahkan!");
      }
    } catch (error) {
      setPopupMessage("Kesalahan Jaringan!");
      console.error("Error adding contact:", error);
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);

  const handleOpenMenu = (event, contact) => {
    setAnchorEl(event.currentTarget);
    setSelectedContact(contact);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedContact(null);
  };

  const handleDetail = () => {
    console.log("Detail:", selectedContact);
    handleCloseMenu();
  };

  const handleEdit = () => {
    console.log("Edit:", selectedContact);
    handleCloseMenu();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 p-12">
      <div className="flex justify-between items-center p-6">
        <h1 className="text-xl font-bold text-gray-800">Daftar Akun</h1>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center px-4 py-2 bg-indigo-500 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-gray-200 transition text-white"
        >
          <Add className="mr-2" /> Tambah Akun
        </button>
      </div>

      <MUIDataTable
        data={accounts}
        columns={columns}
        options={options}
        className="rounded-lg text-gray-800"
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleDetail}>Detail</MenuItem>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
      </Menu>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Tambah Akun</DialogTitle>
        <DialogContent>
          {popupMessage && (
            <Box className="m-4 p-4 text-sm text-white bg-red-600 rounded-md">
              {popupMessage}
            </Box>
          )}
          <ContactForm
            formData={formData}
            handleFormChange={handleFormChange}
            handleFormSubmit={handleFormSubmit}
            setOpen={setOpen}
            errors={errors}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormSubmit} color="primary">
            Simpan
          </Button>
          <Button onClick={() => setOpen(false)} color="secondary">
            Batal
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
}
