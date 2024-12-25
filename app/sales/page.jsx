'use client'

import { useState } from 'react'
import { Plus, Edit, Trash, ArrowUpDown } from 'lucide-react'

const salesOrders = [
  { id: "SO001", customer: "John Doe", date: "2023-06-15", total: 1500, status: "Pending" },
  { id: "SO002", customer: "Jane Smith", date: "2023-06-14", total: 2200, status: "Processing" },
  { id: "SO003", customer: "Bob Johnson", date: "2023-06-13", total: 3000, status: "Shipped" },
  { id: "SO004", customer: "Alice Brown", date: "2023-06-12", total: 1800, status: "Delivered" },
  { id: "SO005", customer: "Charlie Davis", date: "2023-06-11", total: 2500, status: "Pending" },
]

export default function SalesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortColumn, setSortColumn] = useState('date')
  const [sortDirection, setSortDirection] = useState('desc')

  const filteredOrders = salesOrders.filter(order =>
    order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.id.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Sales Orders</h1>
          <p className="text-gray-600">Manage your sales orders and track their status</p>
        </div>
        <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center">
          <Plus className="mr-2 h-4 w-4" /> New Order
        </button>
      </div>

      <div className="bg-white p-4 shadow-md rounded-lg border-l-4 border-green-500">
        <h2 className="text-xl font-semibold text-gray-800">Sales Orders</h2>
        <div className="flex items-center py-4">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full max-w-xs"
          />
        </div>

        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('id')}>
                Order ID {sortColumn === 'id' && <ArrowUpDown className="ml-2 h-4 w-4 inline" />}
              </th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('customer')}>
                Customer {sortColumn === 'customer' && <ArrowUpDown className="ml-2 h-4 w-4 inline" />}
              </th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('date')}>
                Date {sortColumn === 'date' && <ArrowUpDown className="ml-2 h-4 w-4 inline" />}
              </th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('total')}>
                Total {sortColumn === 'total' && <ArrowUpDown className="ml-2 h-4 w-4 inline" />}
              </th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('status')}>
                Status {sortColumn === 'status' && <ArrowUpDown className="ml-2 h-4 w-4 inline" />}
              </th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 font-medium">{order.id}</td>
                <td className="px-4 py-2">{order.customer}</td>
                <td className="px-4 py-2">{order.date}</td>
                <td className="px-4 py-2">${order.total.toFixed(2)}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-right">
                  <button className="bg-transparent text-blue-600 mr-2 py-1 px-2 rounded hover:bg-blue-50">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="bg-transparent text-red-600 py-1 px-2 rounded hover:bg-red-50">
                    <Trash className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
