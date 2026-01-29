import { useState } from "react";
import { ChevronDown, X, HelpCircle } from "lucide-react";

const faqs = [
  {
    id: 0,
    question: "Do you charge for delivery?",
    answer:
      "Delivery charges may apply depending on your location and order value.",
  },
  {
    id: 1,
    question: "What are your delivery timings?",
    answer:
      "We deliver every day between 9:00 AM and 9:00 PM, including weekends.",
  },
  {
    id: 2,
    question: "Can I change the delivery address of my order?",
    answer:
      "Yes, you can change the delivery address before the order is shipped.",
  },
  {
    id: 3,
    question: "What if I don't receive my order by the scheduled time?",
    answer:
      "If your order is delayed, please contact customer support for assistance.",
  },
];

const cancellation = [
  {
    id: 4,
    question: "How can I cancel my order?",
    answer:
      "You can cancel your order from the 'My Orders' section before it is shipped.",
  },
  {
    id: 5,
    question: "What if I want to return something?",
    answer:
      "You can request a return within 7 days of delivery from your orders page.",
  },
  {
    id: 6,
    question: "Can I reschedule my order?",
    answer:
      "Yes, rescheduling is available before the order is out for delivery.",
  },
  {
    id: 7,
    question: "What if I have a complaint regarding my order?",
    answer:
      "You can raise a complaint via the Help & Support section in your account.",
  },
];

export default function FAQModal({ isOpen, onClose }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState('delivery'); // 'delivery' or 'cancellation'

  if (!isOpen) return null;

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setOpenIndex(null); // Close any open FAQ when switching categories
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <HelpCircle size={24} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Help & Support</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 flex-1 overflow-y-auto">
          {/* Category Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => handleCategoryChange('delivery')}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                activeCategory === 'delivery'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Delivery
            </button>
            <button
              onClick={() => handleCategoryChange('cancellation')}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                activeCategory === 'cancellation'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cancellation & Return
            </button>
          </div>

          {/* FAQ Content */}
          <div className="space-y-4">
            {(activeCategory === 'delivery' ? faqs : cancellation).map((faq, index) => (
              <div key={faq.id} className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex justify-between items-center p-4 text-left font-medium hover:bg-gray-50 transition-colors"
                >
                  <span className="text-gray-800">{faq.question}</span>
                  <ChevronDown
                    className={`transition-transform duration-300 ${
                      openIndex === faq.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openIndex === faq.id && (
                  <div className="px-4 pb-4 pt-2 border-t bg-gray-50">
                    <p className="text-gray-600 text-sm">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Support */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">Need More Help?</h4>
            <p className="text-blue-700 text-sm mb-3">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Contact Support
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t">
          <button
            onClick={onClose}
            className="w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}