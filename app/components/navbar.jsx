'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Package, ShoppingCart, Users, Box, FileText } from 'lucide-react'

const Navbar = () => {
  const pathname = usePathname()

  const routes = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Accounts', href: '/accounts', icon: Users },
    // { name: 'Products', href: '/products', icon: Box },
    { name: 'Inventory', href: '/inventory', icon: Package },
    { name: 'Sales Orders', href: '/sales', icon: ShoppingCart },
    { name: 'Procurement', href: '/procurement', icon: FileText },
  ]

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* <span className="text-2xl font-semibold text-blue-600">TANGTU</span> */}
          <nav>
            <ul className="flex space-x-6">
              {routes.map((route) => {
                const isActive = pathname === route.href
                return (
                  <li key={route.name}>
                    <Link 
                      href={route.href}
                      className={`flex items-center px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 ${
                        isActive ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : ''
                      }`}
                    >
                      <route.icon className={`w-5 h-5 mr-2 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                      {route.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Navbar
