"use client";
import React, { useState, useMemo, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Menu, MenuItem, CircularProgress, Box } from "@mui/material";
import { Upload, MoreVert } from "@mui/icons-material";
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
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-2 space-y-4">
      <div className="">
        <label htmlFor="name" className="block text-sm font-semibold">
          Nama
        </label>
        <input
          required
          id="name"
          name="name"
          value={formData.name}
          onChange={handleFormChange}
          className="w-full p-2 text-sm border-b outline-none "
          placeholder="Masukkan nama Anda"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}
      </div>

      <div className="">
        <label htmlFor="email" className="block text-sm font-semibold">
          Email
        </label>
        <input
          // required
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleFormChange}
          className="w-full p-2 text-sm border-b outline-none "
          placeholder="email@example.com"
        />
        {/* {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )} */}
      </div>

      <div className="">
        <label htmlFor="phone" className="block text-sm font-semibold">
          Telepon
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleFormChange}
          className="w-full p-2 text-sm border-b outline-none "
          placeholder="+62 123 4567 890"
        />
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="">
          <label htmlFor="npwp" className="block text-sm font-semibold">
            NPWP/KTP
            <button
              title="Informasi lebih lanjut tentang NPWP/KTP"
              className="ml-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              ?
            </button>
          </label>
          <input
            id="npwp"
            name="npwp"
            value={formData.npwp}
            onChange={handleFormChange}
            className="w-full p-2 text-sm border-b outline-none "
            placeholder="Masukkan NPWP/KTP"
          />
          {errors.npwp && (
            <p className="text-red-500 text-xs mt-1">{errors.npwp}</p>
          )}
        </div>

        <div className="">
          <p className="block text-sm font-semibold">
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

      <div className="">
        <label htmlFor="address" className="block text-sm font-semibold">
          Alamat
        </label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleFormChange}
          rows={4}
          className="w-full p-2 text-sm border-b outline-none  resize-none"
          placeholder="Masukkan alamat lengkap"
        ></textarea>
        {errors.address && (
          <p className="text-red-500 text-xs mt-1">{errors.address}</p>
        )}
      </div>

      <div className="">
        <p className="block text-sm font-semibold">Pilih Tipe</p>
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
              <span className="">{type}</span>
            </label>
          ))}
        </div>
        {errors.type && (
          <p className="text-red-500 text-xs mt-1">{errors.type}</p>
        )}
      </div>
    </form>
  );
}

export default function ContactsPage() {
  const [loading, setLoading] = useState(true);
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
          customBodyRender: (value, tableMeta) => {
            // Dynamically assign badge types based on value
            const badgeMapping = {
              pelanggan: "blue-badge",
              pemasok: "green-badge",
              karyawan: "yellow-badge",
              penjual: "red-badge",
              stories: "gray-badge",
            };

            return Array.isArray(value) ? (
              <div className="flex flex-wrap gap-2">
                {value.map((item, index) => (
                  <Badge
                    key={index}
                    badgeType={badgeMapping[item.toLowerCase()] || "gray-badge"}
                    textValue={item}
                  />
                ))}
              </div>
            ) : (
              <Badge
                badgeType={badgeMapping[value.toLowerCase()] || "gray-badge"}
                textValue={value}
              />
            );
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
            <button
              onClick={(e) => handleOpenMenu(e, contacts[tableMeta.rowIndex])}
            >
              <MoreVert />
            </button>
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
      download: false, // Hides the download button
      print: false, // Hides the print button
    }),
    []
  );

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
    // if (!formData.email) formErrors.email = "Email tidak boleh kosong";
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
      setLoading(true);

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
    } finally {
      setLoading(false);
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
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchContacts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
      </div>
    );
  }
  return (
    <section className="min-h-screen bg-gray-100 p-12 ">
      <div className="flex justify-between items-center p-6">
        <h1 className="text-xl font-bold text-gray-800">Daftar Kontak</h1>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center px-4 py-2 bg-indigo-500 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-gray-200 transition text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Tambah Kontak
        </button>
      </div>

      <MUIDataTable
        data={contacts}
        columns={columns}
        options={options}
        className={"rounded-lg text-gray-800"}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleDetail}>Detail</MenuItem>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
      </Menu>

      {/* Modal for the form */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10 ${
          open ? "" : "hidden"
        }`}
      >
        <div className="relative w-full max-w-xl bg-white rounded-lg shadow-lg text-gray-800">
          {/* Popup Message */}
          {popupMessage && (
            <div className="m-4 p-4 text-sm text-white bg-red-600 rounded-md">
              <strong className="font-semibold">Error</strong>
              <span className="mx-2">•</span>
              {popupMessage}
            </div>
          )}

          {/* Modal Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h3 className="text-lg font-semibold">Tambah Kontak</h3>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-gray-800"
              aria-label="Close"
            >
              &times;
            </button>
          </div>

          {/* Modal Content */}
          <div className=" h-[60vh] overflow-y-auto p-4">
            <div className="flex border-b mb-4">
              <button
                className={`flex-1 py-2 text-center ${
                  tabValue === 0
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : ""
                }`}
                onClick={() => setTabValue(0)}
              >
                Umum
              </button>
              <button
                className={`flex-1 py-2 text-center ${
                  tabValue === 1
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : ""
                }`}
                onClick={() => setTabValue(1)}
              >
                Alamat
              </button>
              <button
                className={`flex-1 py-2 text-center ${
                  tabValue === 2
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : ""
                }`}
                onClick={() => setTabValue(2)}
              >
                Data Lain
              </button>
            </div>

            {/* Tab Panels */}
            {tabValue === 0 && (
              <div className="">
                {/* Replace with your ContactForm */}
                <ContactForm
                  formData={formData}
                  handleFormChange={handleFormChange}
                  handleFormSubmit={handleFormSubmit}
                  setOpen={setOpen}
                  errors={errors}
                />
              </div>
            )}
            {tabValue === 1 && (
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-semibold"
                  >
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    className="w-full p-2 text-sm border-b outline-none "
                    placeholder="Enter company name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-semibold"
                    >
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      className="w-full p-2 text-sm border-b outline-none "
                      placeholder="Enter city"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="postalCode"
                      className="block text-sm font-semibold"
                    >
                      Postal Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      className="w-full p-2 text-sm border-b outline-none "
                      placeholder="Enter postal code"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="streetAddress"
                    className="block text-sm font-semibold"
                  >
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="streetAddress"
                    className="w-full p-2 text-sm border-b outline-none "
                    placeholder="Enter street address"
                  />
                </div>
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-semibold"
                  >
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="country"
                    className="w-full p-2 text-sm border-b outline-none "
                  >
                    <option value="USA">USA</option>
                    <option value="Canada">Canada</option>
                    <option value="UK">UK</option>
                  </select>
                </div>
              </form>
            )}
            {tabValue === 2 && (
              <div className="text-sm text-gray-500">
                Data lain akan ditampilkan di sini
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end px-4 py-3 border-t gap-2">
            <button
              onClick={handleFormSubmit}
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Simpan
            </button>
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2  bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
