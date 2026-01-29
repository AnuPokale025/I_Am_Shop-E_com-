import React, { useState } from "react";
import { X } from "lucide-react";

export default function CartSidebar({ isOpen, onClose, cartItems, setCartItems }) {
  const handlingCharge = 2;
  const donation = 0;

  const itemsTotal = cartItems?.reduce((acc, item) => acc + item.price * item.qty, 0) || 0;
  const total = itemsTotal + (cartItems?.length > 0 ? handlingCharge : 0) + donation;

  if (!isOpen) return null;

  const updateQty = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, qty: Math.max(0, item.qty + delta) };
      }
      return item;
    }).filter(item => item.qty > 0));
  };


  return (
    <div className="fixed inset-0 z-50 flex">
      {/* OVERLAY */}
      <div
        className="flex-1 bg-black/50"
        onClick={onClose}
      />

      {/* SIDEBAR */}
      <div className="w-full max-w-sm bg-white h-full flex flex-col">
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">My Cart</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">

          {/* DELIVERY INFO */}
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              ⏱️
            </div>
            <div>
              <p className="font-medium">Delivery in 8 minutes</p>
              <p className="text-sm text-gray-500">Shipment of 1 item</p>
            </div>
          </div>

          {/* CART ITEMS */}
          {cartItems?.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              Your cart is empty
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 border rounded-lg p-3">
                <img
                  src={item.img}
                  alt={item.name}
                  className="h-14 w-14 object-contain"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium line-clamp-1">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500">{item.unit || item.qty_desc}</p>
                  <p className="font-semibold">₹{item.price}</p>
                </div>

                <div className="flex items-center bg-green-600 text-white rounded-lg">
                  <button
                    onClick={() => updateQty(item.id, -1)}
                    className="px-3 py-1"
                  >
                    −
                  </button>
                  <span className="px-2">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.id, 1)}
                    className="px-3 py-1"
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}

          {/* BILL DETAILS */}
          <div className="space-y-3">
            <h3 className="font-semibold">Bill details</h3>

            <div className="flex justify-between text-sm">
              <span>Items total</span>
              <span>₹{itemsTotal}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Delivery charge</span>
              <span className="text-green-600">FREE</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Handling charge</span>
              <span>₹{handlingCharge}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Discount</span>
              <span>₹{handlingCharge}</span>
            </div>

            <div className="flex justify-between font-semibold">
              <span>Grand total</span>
              <span>₹{total}</span>
            </div>
          </div>

          {/* DONATION */}
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              🧡
            </div>
            <div className="flex-1">
              <p className="font-medium">Feeding India donation</p>
              <p className="text-xs text-gray-500">
                Working towards a malnutrition free India
              </p>
            </div>
            <input type="checkbox" />
          </div>

          {/* TIP */}
          <div className="space-y-3">
            <h3 className="font-semibold">Tip your delivery partner</h3>
            <p className="text-xs text-gray-500">
              100% of your tip goes directly to your delivery partner.
            </p>

            <div className="flex gap-2">
              {["₹20", "₹30", "₹50", "Custom"].map((tip) => (
                <button
                  key={tip}
                  className="flex-1 border rounded-lg py-2 text-sm hover:border-green-600"
                >
                  {tip}
                </button>
              ))}
            </div>
          </div>
        </div>


        {/* FOOTER */}
        <div className="p-4 border-t">
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg flex items-center justify-between px-4 font-semibold">
            <span>₹{total} TOTAL</span>
            <span>Proceed ➜</span>
          </button>
        </div>
      </div>
    </div>
  );
}
