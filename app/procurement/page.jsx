'use client'

import { useState } from 'react'
import { Plus, Search, Edit, Trash, FileText, ShoppingCart, Users } from 'lucide-react'

const purchaseOrders = [
  { id: "PO001", vendorName: "Tech Supplies Inc.", date: "2023-06-15", total: 5000, status: "Pending" },
  { id: "PO002", vendorName: "Office Furniture Co.", date: "2023-06-10", total: 3500, status: "Approved" },
  { id: "PO003", vendorName: "Industrial Parts Ltd.", date: "2023-06-05", total: 7500, status: "Delivered" },
]

const vendors = [
  { id: "V001", name: "Tech Supplies Inc.", category: "Electronics", rating: 4.5, contractStatus: "Active" },
  { id: "V002", name: "Office Furniture Co.", category: "Furniture", rating: 4.2, contractStatus: "Active" },
  { id: "V003", name: "Industrial Parts Ltd.", category: "Manufacturing", rating: 3.8, contractStatus: "Inactive" },
  { id: "V004", name: "Global Logistics Corp.", category: "Logistics", rating: 4.7, contractStatus: "Pending" },
]

export default function ProcurementPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('purchase-orders')

  const filteredPOs = purchaseOrders.filter(po =>
    po.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    po.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Procurement and Vendor Management</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`py-2 px-4 rounded-lg ${activeTab === 'purchase-orders' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setActiveTab('purchase-orders')}
        >
          <ShoppingCart className="inline-block h-5 w-5 mr-2" />
          Purchase Orders
        </button>
        <button
          className={`py-2 px-4 rounded-lg ${activeTab === 'vendors' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setActiveTab('vendors')}
        >
          <Users className="inline-block h-5 w-5 mr-2" />
          Vendors
        </button>
        <button
          className={`py-2 px-4 rounded-lg ${activeTab === 'contracts' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setActiveTab('contracts')}
        >
          <FileText className="inline-block h-5 w-5 mr-2" />
          Contracts
        </button>
      </div>

      {/* Purchase Orders Tab */}
      {activeTab === 'purchase-orders' && (
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Purchase Order Management</h2>
            <button className="bg-green-600 text-white py-2 px-4 rounded-lg flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Create PO
            </button>
          </div>

          <div className="flex items-center py-4">
            <input
              type="text"
              placeholder="Search purchase orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border rounded-lg w-full max-w-xs"
            />
          </div>

          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">PO ID</th>
                <th className="px-4 py-2 text-left">Vendor</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Total</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPOs.map((po) => (
                <tr key={po.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{po.id}</td>
                  <td className="px-4 py-2">{po.vendorName}</td>
                  <td className="px-4 py-2">{po.date}</td>
                  <td className="px-4 py-2">${po.total.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      po.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      po.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {po.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <button className="text-blue-600 mr-2">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600">
                      <Trash className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Vendors Tab */}
      {activeTab === 'vendors' && (
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Vendor Management</h2>
            <button className="bg-green-600 text-white py-2 px-4 rounded-lg flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Add Vendor
            </button>
          </div>

          <div className="flex items-center py-4">
            <input
              type="text"
              placeholder="Search vendors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border rounded-lg w-full max-w-xs"
            />
          </div>

          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Vendor</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Rating</th>
                <th className="px-4 py-2 text-left">Contract Status</th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVendors.map((vendor) => (
                <tr key={vendor.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{vendor.name}</td>
                  <td className="px-4 py-2">{vendor.category}</td>
                  <td className="px-4 py-2">{vendor.rating.toFixed(1)}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      vendor.contractStatus === 'Active' ? 'bg-green-100 text-green-800' :
                      vendor.contractStatus === 'Inactive' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {vendor.contractStatus}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <button className="text-blue-600 mr-2">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600">
                      <Trash className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Contracts Tab */}
      {activeTab === 'contracts' && (
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800">Contracts Management</h2>
          {/* Add your contracts content here */}
        </div>
      )}
    </div>
  )
}
