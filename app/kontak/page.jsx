"use client";
import React, { useState, useMemo, useEffect } from "react";
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
  IconButton,
  Checkbox,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormLabel,
  Tab,
  Tabs,
  Tooltip,
} from "@mui/material";
import { Add, Help, Upload, MoreVert } from "@mui/icons-material";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className="py-4"
    >
      {value === index && children}
    </div>
  );
}

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
      // Add to the array if checked
      handleFormChange({
        target: { name: "type", value: [...formData.type, value] },
      });
    } else {
      // Remove from the array if unchecked
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
    <form
      onSubmit={handleFormSubmit}
      className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nama
          </label>
          <input
            required
            id="name"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
            placeholder="Masukkan nama Anda"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div className="space-y-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            required
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleFormChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
            placeholder="email@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div className="space-y-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Telepon
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleFormChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
            placeholder="+62 123 4567 890"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label
              htmlFor="npwp"
              className="block text-sm font-medium text-gray-700"
            >
              NPWP/KTP
              <button className="ml-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                ?
              </button>
            </label>
            <input
              id="npwp"
              name="npwp"
              value={formData.npwp}
              onChange={handleFormChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
              placeholder="Masukkan NPWP/KTP"
            />
            {errors.npwp && (
              <p className="text-red-500 text-xs mt-1">{errors.npwp}</p>
            )}
          </div>

          <div className="space-y-4">
            <p className="block text-sm font-medium text-gray-700">
              Unggah Dokumen Pendukung
            </p>
            <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition duration-200 ease-in-out">
              <Upload className="w-5 h-5 mr-2 text-blue-500" />
              <span className="text-sm text-blue-500">
                {file ? file.name : "Unggah Dokumen"}
              </span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Alamat
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleFormChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out resize-none"
            placeholder="Masukkan alamat lengkap"
          ></textarea>
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">{errors.address}</p>
          )}
        </div>

        <div className="space-y-4">
          <p className="block text-sm font-medium text-gray-700">Pilih Tipe</p>
          <div className="grid grid-cols-2 gap-4">
            {["Pelanggan", "Pemasok", "Karyawan", "Penjual"].map((type) => (
              <label
                key={type}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={type}
                  checked={formData.type.includes(type)}
                  onChange={handleTypeChange}
                  className="form-checkbox h-5 w-5 text-blue-500 rounded border-gray-300 focus:ring-blue-500 transition duration-200 ease-in-out"
                />
                <span className="text-gray-700">{type}</span>
              </label>
            ))}
          </div>
          {errors.type && (
            <p className="text-red-500 text-xs mt-1">{errors.type}</p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default function ContactsPage() {
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [contacts, setContacts] = useState([
    // {
    //   id: 1,
    //   name: "ASNAWI JMAG",
    //   code: "IAJ-014",
    //   type: ["Pelanggan"],
    //   phone: "08568911737",
    // },
    // {
    //   id: 2,
    //   name: "22 CELL SHOP JMAG",
    //   code: "2CSJ-001",
    //   type: ["Pelanggan"],
    //   phone: "",
    // },
    // {
    //   id: 3,
    //   name: "23 DJAYA MANDIRI",
    //   code: "2DM-001",
    //   type: ["Pemasok"],
    //   phone: "",
    // },
    // {
    //   id: 4,
    //   name: "66 COLECTION",
    //   code: "6C-001",
    //   type: ["Pelanggan"],
    //   phone: "",
    // },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    email: "",
    type: [], // Store types as an array
    website: "",
    phone: "",
    npwp: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [popupMessage, setPopupMessage] = useState("");

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = "Nama tidak boleh kosong";
    if (!formData.email) formErrors.email = "Email tidak boleh kosong";
    // if (!formData.phone) formErrors.phone = "Nomor telepon tidak boleh kosong";
    // if (!formData.npwp) formErrors.npwp = "NPWP/KTP tidak boleh kosong";
    // if (!formData.address) formErrors.address = "Alamat tidak boleh kosong";
    if (formData.type.length === 0) formErrors.type = "Tipe tidak boleh kosong"; // Check if types are selected

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleFormSubmit = async () => {
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
          code: "",
          email: "",
          type: [], // Reset type to an empty array
          website: "",
          phone: "",
          npwp: "",
          address: "",
        });
        setErrors({});
        setPopupMessage("Kontak berhasil ditambahkan!");
      }
    } catch (error) {
      setPopupMessage("Kesalahan Jaringan!");
      console.error("Error adding contact:", error);
    }
  };

  const columns = useMemo(
    () => [
      { name: "id", label: "Kode" },
      {
        name: "name",
        label: "Nama",
        options: {
          setCellProps: () => ({
            className: "uppercase", // Add custom class to this column
          }),
        },
      },
      {
        name: "email",
        label: "Email",
        options: {
          empty: true,
          setCellProps: () => ({
            className: "uppercase", // Add custom class to this column
          }),
        },
      },
      {
        name: "type",
        label: "Tipe",
        options: {
          customBodyRender: (_, tableMeta) => {
            return _.join(", ");
          },
        },
      },
      { name: "website", label: "Website", options: { empty: true } },
      { name: "phone", label: "Telepon", options: { empty: true } },
      {
        name: "actions",
        label: "Actions",
        options: {
          customBodyRender: (_, tableMeta) => (
            <IconButton
              onClick={(e) => handleOpenMenu(e, contacts[tableMeta.rowIndex])}
            >
              <MoreVert />
            </IconButton>
          ),
        },
      },
    ],
    [contacts]
  );

  const options = useMemo(
    () => ({
      selectableRows: "none",
      responsive: "standard",
    }),
    []
  );

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

  const fetchContacts = async () => {
    try {
      const response = await fetch("/api/contacts"); // Adjust the API endpoint as needed
      if (response.ok) {
        const data = await response.json();
        setContacts(data); // Set the fetched data to contacts state
      } else {
        console.error("Failed to fetch contacts");
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };
  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <section className="bg-white shadow rounded-lg p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Daftar Kontak</h1>
          <Button
            onClick={() => setOpen(true)}
            variant="outlined"
            startIcon={<Add />}
          >
            Tambah Kontak
          </Button>
        </div>

        {/* Modal for the form */}
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          {/* Popup Message */}
          {popupMessage && (
            // <div
            //   className="m-4 p-4 text-sm text-white bg-red-600 rounded-md"
            //   role="alert"
            // >
            //   {popupMessage}
            // </div>

            <div className="relative isolate flex items-center gap-x-6 overflow-hidden text-white bg-red-700 px-6 py-2.5 sm:px-3.5 sm:before:flex-1 m-4 p-4 rounded-md">
              {/* <div
                aria-hidden="true"
                className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
              >
                <div
                  style={{
                    clipPath:
                      "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
                  }}
                  className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
                />
              </div>
              <div
                aria-hidden="true"
                className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
              >
                <div
                  style={{
                    clipPath:
                      "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
                  }}
                  className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
                />
              </div> */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <p className="text-sm/6 ">
                  <strong className="font-semibold">Error</strong>
                  <svg
                    viewBox="0 0 2 2"
                    aria-hidden="true"
                    className="mx-2 inline size-0.5 fill-current"
                  >
                    <circle r={1} cx={1} cy={1} />
                  </svg>
                  {popupMessage}
                </p>
                {/* <a
                  href="#"
                  className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                >
                  Register now <span aria-hidden="true">&rarr;</span>
                </a> */}
              </div>
              <div className="flex flex-1 justify-end">
                {/* <button
                  type="button"
                  className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
                >
                  <span className="sr-only">Dismiss</span>
                  x
                </button> */}
              </div>
            </div>
          )}
          <DialogTitle className="flex items-center gap-2 border-b pb-4">
            <Add className="h-5 w-5" />
            Tambah Kontak
          </DialogTitle>

          <DialogContent className="!pt-6">
            <Tabs
              value={tabValue}
              onChange={(e, newValue) => setTabValue(newValue)}
              variant="fullWidth"
              className="border-b"
            >
              <Tab label="Umum" />
              <Tab label="Alamat" />
              <Tab label="Data Lain" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <ContactForm
                formData={formData}
                handleFormChange={handleFormChange}
                handleFormSubmit={handleFormSubmit}
                setOpen={setOpen}
                errors={errors}
              />
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <div className="text-sm text-gray-500">
                Konten alamat akan ditampilkan di sini
              </div>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <div className="text-sm text-gray-500">
                Data lain akan ditampilkan di sini
              </div>
            </TabPanel>

            <div className="flex justify-end pt-4 gap-2">
              <Button
                onClick={handleFormSubmit}
                variant="contained"
                color="primary"
              >
                Simpan
              </Button>
              <Button
                variant="outlined"
                onClick={() => setOpen(false)}
                className="normal-case"
              >
                Batal
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <MUIDataTable data={contacts} columns={columns} options={options} />

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={handleDetail}>Detail</MenuItem>
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
        </Menu>
      </section>
    </div>
  );
}
