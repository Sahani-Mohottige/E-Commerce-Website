import { Contrast, LogOut, Package, ShoppingCart, Store, Users } from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchAllOrders } from "../../redux/slices/adminOrderSlice";
import { fetchProducts } from "../../redux/slices/adminProductSlice";
import { fetchUsers } from "../../redux/slices/adminSlice";
import { toast } from "sonner";

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Modal state

  const { orders } = useSelector((state) => state.adminOrders);
  const { products } = useSelector((state) => state.adminProducts);
  const { users } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAllOrders());
    dispatch(fetchProducts());
    dispatch(fetchUsers());
  }, [dispatch]);

  // Redirect if not logged in as admin
  React.useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const navigationItems = [
    { name: "Dashboard", icon: Contrast, path: "/admin" },
    { name: "Users", icon: Users, path: "/admin/users" },
    { name: "Products", icon: Package, path: "/admin/products" },
    { name: "Orders", icon: ShoppingCart, path: "/admin/orders" },
  ];

  const statsData = [
    {
      title: "Revenue",
      value: `$${orders?.reduce((acc, o) => acc + (o.totalPrice || 0), 0).toFixed(2)}`,
      borderColor: "border-green-600",
    },
    {
      title: "Total Orders",
      value: orders?.length || 0,
      link: "Manage Orders",
      borderColor: "border-green-500",
    },
    {
      title: "Total Products",
      value: products?.length || 0,
      link: "Manage Products",
      borderColor: "border-green-400",
    },
    {
      title: "Total Users",
      value: users?.length || 0,
      link: "Manage Users",
      borderColor: "border-green-300",
    },
  ];

  const ordersData = orders?.slice(0, 5).map((o) => ({
    id: o._id,
    user: o.user?.name || "Unknown",
    price: `$${o.totalPrice?.toFixed(2) || 0}`,
    status: o.status,
  }));

  // Update active nav
  useEffect(() => {
    const currentPath = location.pathname;
    const currentNav = navigationItems.find((item) => item.path === currentPath);
    setActiveNav(currentNav ? currentNav.name : "Dashboard");
  }, [location.pathname]);

  const handleNavClick = (navItem) => {
    if (navItem.external) {
      navigate(navItem.path);
    } else {
      setActiveNav(navItem.name);
      navigate(navItem.path);
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    // Clear all possible admin tokens/sessions
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminToken");
    localStorage.removeItem("adminSession");
    sessionStorage.removeItem("adminSession");
    toast.success("Logged out successfully!", {
      description: "You have been safely logged out of the admin panel.",
    });
    navigate("/admin/login");
  };

  const handleOrderClick = (orderId) => {
    toast.info(`Order Details`, {
      description: `Viewing details for order #${orderId}`,
    });
  };

  const handleStatCardClick = (link) => {
    if (!link) return;
    if (link === "Manage Orders") navigate("/admin/orders");
    else if (link === "Manage Products") navigate("/admin/products");
    else if (link === "Manage Users") navigate("/admin/users");
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const isDashboard = location.pathname === "/admin" || location.pathname === "/admin/";

  const DashboardContent = () => (
    <>
      <div className="mb-8 mt-12 lg:mt-0">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {statsData.map((stat, i) => (
          <div
            key={stat.title}
            onClick={() => handleStatCardClick(stat.link)}
            className={`bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer transform transition-transform duration-300 hover:-translate-y-1 border-l-4 ${stat.borderColor}`}
            style={{ animation: `fadeInUp 0.6s ease forwards`, animationDelay: `${i * 0.1}s` }}
          >
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wide mb-2">{stat.title}</h3>
            <div className="text-2xl font-bold text-gray-800 mb-2">{stat.value}</div>
            {stat.link && <p className="text-green-600 hover:text-green-700 text-sm">{stat.link}</p>}
          </div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div
        className="bg-white rounded-xl shadow p-6 overflow-x-auto opacity-0 animate-fade-in-up"
        style={{ animation: "fadeInUp 0.6s ease forwards", animationDelay: "0.3s" }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Orders</h2>
        <table className="w-full border border-gray-200 rounded-lg">
          <thead className="bg-green-100 text-gray-800">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold">Order ID</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">User</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">Total</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {ordersData.map((order) => (
              <tr
                key={order.id}
                onClick={() => handleOrderClick(order.id)}
                className="hover:bg-green-50 cursor-pointer transition-colors"
              >
                <td className="py-3 px-4 font-mono text-sm text-gray-600">{order.id}</td>
                <td className="py-3 px-4 text-gray-800">{order.user}</td>
                <td className="py-3 px-4 font-semibold text-green-600">{order.price}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 bg-green-600 text-white p-2 rounded-md shadow"
      >
        <span className="text-xl">{isMobileMenuOpen ? "✕" : "☰"}</span>
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMobileMenuOpen(false)}></div>}

      {/* Sidebar */}
      <nav
        className={`w-64 bg-green-600 text-white fixed h-full overflow-y-auto z-50 transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 bg-green-700 border-b border-green-800">
          <h2 className="text-3xl font-bold">Pickzy</h2>
          <p className="text-green-200 text-sm mt-1">Admin Dashboard</p>
        </div>

        <div className="py-5">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => handleNavClick(item)}
                className={`w-full px-6 py-3 flex items-center text-left rounded-lg transition-all duration-300 ${
                  activeNav === item.name && !item.external
                    ? "bg-green-800 text-white shadow-lg"
                    : "text-green-100 hover:bg-green-500 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="text-lg font-medium">{item.name}</span>
              </button>
            );
          })}
          <div className="my-4 border-t border-green-300"></div>
          {/* Logout button opens modal */}
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center justify-center w-full px-6 py-3 font-bold text-base bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow"
            style={{ letterSpacing: "0.5px" }}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-4 lg:p-8">{isDashboard ? <DashboardContent /> : <Outlet />}</main>

      {/* Logout Modal */}
{showLogoutModal && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl p-8 w-96 text-center shadow-xl animate-fade-in-up">
      <h3 className="text-2xl font-bold mb-4">Confirm Logout</h3>
      <p className="text-gray-700 mb-6 text-lg">Are you sure you want to logout?</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setShowLogoutModal(false)}
          className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors font-medium"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            setShowLogoutModal(false);
            handleLogout();
          }}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
)}


      {/* Animations */}
      <style>
        {`
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
            opacity: 0;
            animation: fadeInUp 0.6s ease forwards;
          }
        `}
      </style>
    </div>
  );
};

export default AdminLayout;
