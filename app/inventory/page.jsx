'use client'
import { useState } from 'react'
import { Plus, Search, Edit, Trash, ArrowUpDown } from 'lucide-react'

const inventoryItems = [
  { id: "INV001", name: "Laptop", category: "Electronics", quantity: 50, location: "Warehouse A", lastUpdated: "2023-06-15" },
  { id: "INV002", name: "Office Chair", category: "Furniture", quantity: 30, location: "Warehouse B", lastUpdated: "2023-06-14" },
  { id: "INV003", name: "Printer Paper", category: "Supplies", quantity: 1000, location: "Warehouse A", lastUpdated: "2023-06-13" },
  { id: "INV004", name: "Wireless Mouse", category: "Electronics", quantity: 100, location: "Warehouse C", lastUpdated: "2023-06-12" },
  { id: "INV005", name: "Desk Lamp", category: "Lighting", quantity: 75, location: "Warehouse B", lastUpdated: "2023-06-11" },
]

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortColumn, setSortColumn] = useState('name')
  const [sortDirection, setSortDirection] = useState('asc')

  const filteredItems = inventoryItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
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
          <h1 className="text-2xl font-bold text-gray-800">Inventory Management</h1>
          <p className="text-muted-foreground text-gray-600">Manage your inventory and stock levels</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center">
          <Plus className="mr-2 h-4 w-4" /> Add Item
        </button>
      </div>

      <div className="bg-white border-l-4 border-blue-500 shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
          <h2 className="text-xl font-semibold">Inventory Items</h2>
        </div>
        <div className="p-4">
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Search inventory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full max-w-sm"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('name')}>
                    Name {sortColumn === 'name' && <ArrowUpDown className="ml-2 h-4 w-4 inline" />}
                  </th>
                  <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('category')}>
                    Category {sortColumn === 'category' && <ArrowUpDown className="ml-2 h-4 w-4 inline" />}
                  </th>
                  <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('quantity')}>
                    Quantity {sortColumn === 'quantity' && <ArrowUpDown className="ml-2 h-4 w-4 inline" />}
                  </th>
                  <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('location')}>
                    Location {sortColumn === 'location' && <ArrowUpDown className="ml-2 h-4 w-4 inline" />}
                  </th>
                  <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('lastUpdated')}>
                    Last Updated {sortColumn === 'lastUpdated' && <ArrowUpDown className="ml-2 h-4 w-4 inline" />}
                  </th>
                  <th className="px-4 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="px-4 py-2 font-medium">{item.name}</td>
                    <td className="px-4 py-2">{item.category}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        item.quantity > 50 ? 'bg-green-100 text-green-800' :
                        item.quantity > 20 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {item.quantity}
                      </span>
                    </td>
                    <td className="px-4 py-2">{item.location}</td>
                    <td className="px-4 py-2">{item.lastUpdated}</td>
                    <td className="px-4 py-2 text-right">
                      <button className="text-blue-600 hover:text-blue-800 mr-2">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
