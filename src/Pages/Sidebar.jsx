// import {
//   MapPin,
//   Package,
//   FileText,
//   Gift,
//   Shield,
//   LogOut,
// } from "lucide-react";

// export default function Sidebar({ active, setActive }) {
//   return (
//     <aside className="w-72 border-r bg-white">
      
//       {/* PHONE */}
//       <div className="p-4 border-b text-sm text-gray-500">
//         +919511723705
//       </div>

//       {/* MENU */}
//       <nav className="flex flex-col text-sm">
//         <Item
//           icon={MapPin}
//           label="My Addresses"
//           active={active === "addresses"}
//           onClick={() => setActive("addresses")}
//         />
//         <Item icon={Package} label="My Orders" />
//         <Item icon={FileText} label="My Prescriptions" />
//         <Item icon={Gift} label="E-Gift Cards" />
//         <Item icon={Shield} label="Account privacy" />
//         <Item icon={LogOut} label="Logout" />
//       </nav>
//     </aside>
//   );
// }

// /* ---------- MENU ITEM ---------- */

// function Item({ icon: Icon, label, active, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`flex items-center gap-3 px-6 py-4 border-b text-left transition ${
//         active
//           ? "bg-gray-100 font-medium text-black"
//           : "text-gray-600 hover:bg-gray-50"
//       }`}
//     >
//       <Icon size={18} className="text-gray-500" />
//       <span>{label}</span>
//     </button>
//   );
// }
