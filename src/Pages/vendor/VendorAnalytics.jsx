// import React, { useState, useEffect } from 'react';
// import { TrendingUp, ShoppingCart, Users, DollarSign, BarChart3, Calendar } from 'lucide-react';
// import axios from 'axios';

// const VendorAnalytics = () => {
//   const [analytics, setAnalytics] = useState({
//     totalSales: 0,
//     totalOrders: 0,
//     totalCustomers: 0,
//     averageOrderValue: 0,
//     salesData: [],
//     topProducts: [],
//     recentOrders: []
//   });
//   const [loading, setLoading] = useState(true);
//   const [timeRange, setTimeRange] = useState('7d');

//   useEffect(() => {
//     fetchAnalytics();
//   }, [timeRange]);

//   const fetchAnalytics = async () => {
//     try {
//       const response = await axios.get(`/vendor/analytics?range=${timeRange}`);
//       setAnalytics(response.data);
//     } catch (error) {
//       console.error('Error fetching analytics:', error);
//       setAnalytics({
//         totalSales: 125000,
//         totalOrders: 342,
//         totalCustomers: 1200,
//         averageOrderValue: 365,
//         salesData: [
//           { date: '2024-01-01', sales: 2400 },
//           { date: '2024-01-02', sales: 3200 },
//           { date: '2024-01-03', sales: 2800 },
//           { date: '2024-01-04', sales: 4100 },
//           { date: '2024-01-05', sales: 3500 },
//           { date: '2024-01-06', sales: 3900 },
//           { date: '2024-01-07', sales: 4200 }
//         ],
//         topProducts: [
//           { name: 'Organic Apples', sales: 1250, revenue: 24500 },
//           { name: 'Fresh Milk', sales: 980, revenue: 18900 },
//           { name: 'Whole Wheat Bread', sales: 756, revenue: 15200 }
//         ],
//         recentOrders: [
//           { id: '#12345', customer: 'John Doe', amount: 2450, status: 'completed', date: '2024-01-15' },
//           { id: '#12346', customer: 'Jane Smith', amount: 1890, status: 'processing', date: '2024-01-15' }
//         ]
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const StatCard = ({ title, value, icon: Icon, change, isCurrency = false }) => (
//     <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm font-medium text-gray-600">{title}</p>
//           <p className="text-2xl font-bold text-gray-900 mt-1">
//             {isCurrency ? `₹${value.toLocaleString()}` : value.toLocaleString()}
//           </p>
//         </div>
//         <div className="p-3 bg-indigo-100 rounded-lg">
//           <Icon className="h-6 w-6 text-indigo-600" />
//         </div>
//       </div>
//       {change && (
//         <div className={`flex items-center mt-3 text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
//           {change > 0 ? '↑' : '↓'} {Math.abs(change)}% from last period
//         </div>
//       )}
//     </div>
//   );

//   const SkeletonLoader = () => (
//     <div className="animate-pulse">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {[...Array(4)].map((_, i) => (
//           <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
//             <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
//             <div className="h-8 bg-gray-200 rounded w-3/4"></div>
//           </div>
//         ))}
//       </div>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <div className="bg-white rounded-xl p-6 shadow-sm">
//           <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
//           <div className="space-y-4">
//             {[...Array(5)].map((_, i) => (
//               <div key={i} className="h-4 bg-gray-200 rounded"></div>
//             ))}
//           </div>
//         </div>
//         <div className="bg-white rounded-xl p-6 shadow-sm">
//           <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
//           <div className="space-y-4">
//             {[...Array(3)].map((_, i) => (
//               <div key={i} className="h-4 bg-gray-200 rounded"></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   if (loading) return <SkeletonLoader />;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="bg-white shadow-sm border-b">
//         <div className="container mx-auto px-4 py-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
//               <p className="text-gray-600 mt-1">Track your business performance</p>
//             </div>
//             <select
//               value={timeRange}
//               onChange={(e) => setTimeRange(e.target.value)}
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//             >
//               <option value="7d">Last 7 days</option>
//               <option value="30d">Last 30 days</option>
//               <option value="90d">Last 90 days</option>
//               <option value="1y">Last year</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8">
//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <StatCard
//             title="Total Sales"
//             value={analytics.totalSales}
//             icon={DollarSign}
//             change={12.5}
//             isCurrency
//           />
//           <StatCard
//             title="Total Orders"
//             value={analytics.totalOrders}
//             icon={ShoppingCart}
//             change={8.2}
//           />
//           <StatCard
//             title="Customers"
//             value={analytics.totalCustomers}
//             icon={Users}
//             change={15.3}
//           />
//           <StatCard
//             title="Avg. Order Value"
//             value={analytics.averageOrderValue}
//             icon={BarChart3}
//             change={3.7}
//             isCurrency
//           />
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Sales Chart */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-lg font-semibold text-gray-900">Sales Overview</h2>
//               <TrendingUp className="h-5 w-5 text-indigo-600" />
//             </div>
//             <div className="h-64 flex items-end space-x-2">
//               {analytics.salesData.map((data, index) => (
//                 <div key={index} className="flex-1 flex flex-col items-center">
//                   <div
//                     className="w-full bg-indigo-500 rounded-t hover:bg-indigo-600 transition-colors"
//                     style={{ height: `${(data.sales / Math.max(...analytics.salesData.map(d => d.sales))) * 100}%` }}
//                   ></div>
//                   <span className="text-xs text-gray-500 mt-2">
//                     {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Top Products */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-lg font-semibold text-gray-900">Top Selling Products</h2>
//               <ShoppingCart className="h-5 w-5 text-indigo-600" />
//             </div>
//             <div className="space-y-4">
//               {analytics.topProducts.map((product, index) => (
//                 <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                   <div className="flex items-center">
//                     <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
//                       <span className="text-indigo-600 font-medium">{index + 1}</span>
//                     </div>
//                     <div>
//                       <p className="font-medium text-gray-900">{product.name}</p>
//                       <p className="text-sm text-gray-600">{product.sales} sold</p>
//                     </div>
//                   </div>
//                   <p className="font-medium text-gray-900">₹{product.revenue.toLocaleString()}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Recent Orders */}
//         <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
//             <Calendar className="h-5 w-5 text-indigo-600" />
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b">
//                   <th className="text-left py-3 px-4 font-medium text-gray-900">Order ID</th>
//                   <th className="text-left py-3 px-4 font-medium text-gray-900">Customer</th>
//                   <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
//                   <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
//                   <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {analytics.recentOrders.map((order) => (
//                   <tr key={order.id} className="border-b hover:bg-gray-50">
//                     <td className="py-3 px-4 font-medium text-gray-900">{order.id}</td>
//                     <td className="py-3 px-4 text-gray-600">{order.customer}</td>
//                     <td className="py-3 px-4 text-gray-600">{order.date}</td>
//                     <td className="py-3 px-4 font-medium text-gray-900">₹{order.amount}</td>
//                     <td className="py-3 px-4">
//                       <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
//                         order.status === 'completed' ? 'bg-green-100 text-green-800' :
//                         order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
//                         'bg-blue-100 text-blue-800'
//                       }`}>
//                         {order.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VendorAnalytics;