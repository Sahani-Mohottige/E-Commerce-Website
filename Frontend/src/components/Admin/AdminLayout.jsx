import { LogOut, Package, ShoppingCart, Store, Users } from 'lucide-react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'Dashboard', icon: Users, path: '/admin' },
    { name: 'Users', icon: Users, path: '/admin/users' },
    { name: 'Products', icon: Package, path: '/admin/products' },
    { name: 'Orders', icon: ShoppingCart, path: '/admin/orders' },
    { name: 'Shop', icon: Store, path: '/', external: true }
  ];

  const statsData = [
    {
      title: 'Revenue',
      value: '$319.94',
      borderColor: 'border-blue-500'
    },
    {
      title: 'Total Orders',
      value: '4',
      link: 'Manage Orders',
      borderColor: 'border-green-500'
    },
    {
      title: 'Total Products',
      value: '40',
      link: 'Manage Products',
      borderColor: 'border-purple-500'
    }
  ];

  const ordersData = [
    {
      id: '67540ced337612fb361a0ed0',
      user: 'Admin User',
      price: '$199.96',
      status: 'Processing'
    },
    {
      id: '67540d3ca67b4a70e434e092',
      user: 'Admin User',
      price: '$40',
      status: 'Processing'
    },
    {
      id: '675bf2c6ca77bd83eefd7a18',
      user: 'Admin User',
      price: '$39.99',
      status: 'Processing'
    },
    {
      id: '675c24b09b88827304bd5cc1',
      user: 'Admin User',
      price: '$39.99',
      status: 'Processing'
    }
  ];

  // Update active nav based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    const currentNav = navigationItems.find(item => item.path === currentPath);
    if (currentNav) {
      setActiveNav(currentNav.name);
    } else if (currentPath === '/admin') {
      setActiveNav('Dashboard');
    }
  }, [location.pathname]);

  const handleNavClick = (navItem) => {
    if (navItem.external) {
      // For external links like Shop, navigate directly without setting active state
      navigate(navItem.path);
    } else {
      setActiveNav(navItem.name);
      navigate(navItem.path);
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      alert('Logged out successfully!');
      navigate('/login');
    }
  };

  const handleOrderClick = (orderId) => {
    alert(`View details for order: ${orderId}`);
  };

  const handleStatCardClick = (link) => {
    if (link) {
      if (link === 'Manage Orders') {
        navigate('/admin/orders');
      } else if (link === 'Manage Products') {
        navigate('/admin/products');
      }
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Check if we're on the dashboard route
  const isDashboard = location.pathname === '/admin' || location.pathname === '/admin/';

  // Dashboard content component
  const DashboardContent = () => (
    <>
      {/* Header */}
      <div className="mb-8 mt-12 lg:mt-0">
        <h1 className="text-3xl font-semibold text-slate-800">Admin Dashboard</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {statsData.map((stat, index) => (
          <div
            key={stat.title}
            onClick={() => handleStatCardClick(stat.link)}
            className={`
              bg-white p-6 rounded-xl shadow-sm border-l-4 ${stat.borderColor}
              hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer
              animate-fade-in-up opacity-0
            `}
            style={{ 
              animation: `fadeInUp 0.6s ease forwards`,
              animationDelay: `${index * 0.1}s`
            }}
          >
            <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide mb-2">
              {stat.title}
            </h3>
            <div className="text-2xl font-bold text-slate-800 mb-2">
              {stat.value}
            </div>
            {stat.link && (
              <a 
                href="#" 
                className="text-blue-600 hover:text-blue-800 text-sm transition-colors duration-300"
                onClick={(e) => e.preventDefault()}
              >
                {stat.link}
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div 
        className="bg-white rounded-xl shadow-sm p-6 opacity-0 animate-fade-in-up"
        style={{ 
          animation: 'fadeInUp 0.6s ease forwards',
          animationDelay: '0.3s'
        }}
      >
        <h2 className="text-xl font-semibold text-slate-800 mb-6">Recent Orders</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-100">
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Total Price
                </th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ordersData.map((order) => (
                <tr
                  key={order.id}
                  onClick={() => handleOrderClick(order.id)}
                  className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                >
                  <td className="py-4 px-4 font-mono text-sm text-gray-600">
                    {order.id}
                  </td>
                  <td className="py-4 px-4 text-slate-800">
                    {order.user}
                  </td>
                  <td className="py-4 px-4 font-semibold text-green-600">
                    {order.price}
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full border border-yellow-200">
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 bg-slate-800 text-white p-2 rounded-md"
      >
        <span className="text-xl">{isMobileMenuOpen ? '✕' : '☰'}</span>
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <nav className={`
        w-64 bg-slate-800 text-white fixed h-full overflow-y-auto z-50 transition-transform duration-300
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Sidebar Header */}
        <div className="p-6 bg-slate-700 border-b border-slate-600">
          <h2 className="text-2xl font-bold">Rabbit</h2>
          <p className="text-slate-300 text-sm mt-1">Admin Dashboard</p>
        </div>
        
        {/* Navigation */}
        <div className="py-5">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => handleNavClick(item)}
                className={`
                  w-full px-6 py-3 text-left flex items-center transition-all duration-300
                  ${activeNav === item.name && !item.external
                    ? 'bg-blue-600 text-white border-r-4 border-blue-400'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }
                `}
              >
                <IconComponent className="w-5 h-5 mr-3" />
                <span className="text-sm font-medium">{item.name}</span>
              </button>
            );
          })}
        </div>
        
        {/* Logout Button */}
        <div className="absolute bottom-0 w-64">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-6 py-3 text-red-400 hover:bg-red-600 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-4 lg:p-8">
        {isDashboard ? <DashboardContent /> : <Outlet />}
      </main>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;