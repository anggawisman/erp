'use client'

import { useState } from 'react'
import { Plus, Search, UserCircle, Users } from 'lucide-react'

const accounts = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    status: "Active",
    type: "Supplier",
    lastActive: "2 hours ago"
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    status: "Active",
    type: "Customer",
    lastActive: "1 day ago"
  },
  {
    id: "3",
    name: "Tech Solutions Inc.",
    email: "contact@techsolutions.com",
    status: "Inactive",
    type: "Vendor",
    lastActive: "1 week ago"
  },
]

export default function AccountsPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         account.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === 'all' || account.type.toLowerCase() === activeTab
    return matchesSearch && matchesTab
  })

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Account Management</h1>
          <p className="text-gray-600">Manage your suppliers, vendors, and customers</p>
        </div>
        <div className="flex">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Account
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-4">
            <button 
              className={`px-4 py-2 rounded-md ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`} 
              onClick={() => setActiveTab('all')}>
              <Users className="h-4 w-4" />
              All Accounts
            </button>
            <button 
              className={`px-4 py-2 rounded-md ${activeTab === 'supplier' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`} 
              onClick={() => setActiveTab('supplier')}>
              <UserCircle className="h-4 w-4" />
              Suppliers
            </button>
            <button 
              className={`px-4 py-2 rounded-md ${activeTab === 'vendor' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`} 
              onClick={() => setActiveTab('vendor')}>
              <UserCircle className="h-4 w-4" />
              Vendors
            </button>
            <button 
              className={`px-4 py-2 rounded-md ${activeTab === 'customer' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`} 
              onClick={() => setActiveTab('customer')}>
              <UserCircle className="h-4 w-4" />
              Customers
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <input
              placeholder="Search accounts..."
              className="pl-8 py-2 border border-gray-300 rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white border-l-4 border-blue-500 p-4 rounded-md">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">Account</th>
                <th className="py-2 px-4 text-left">Type</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Last Active</th>
                <th className="py-2 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map((account) => (
                <tr key={account.id} className="border-b">
                  <td className="py-2 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white">
                        {account.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{account.name}</div>
                        <div className="text-sm text-gray-600">{account.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-4">
                    <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full border">
                      {account.type}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      account.status === 'Active' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {account.status}
                    </span>
                  </td>
                  <td className="py-2 px-4">{account.lastActive}</td>
                  <td className="py-2 px-4 text-right">
                    <button className="bg-transparent text-blue-600 hover:text-blue-800 text-sm py-1 px-3 rounded-md">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
