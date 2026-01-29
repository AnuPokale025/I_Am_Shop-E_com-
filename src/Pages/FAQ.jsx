import { useState } from "react";
import { ChevronDown, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-sky-100 min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-4">
          <button 
            onClick={() => navigate(-1)}
            className="mr-3 p-2 rounded-full hover:bg-sky-200 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-semibold pr-3">Frequently Ask Questions</h1>
        </div>
        {/* DELIVERY SECTION */}
        <h2 className="text-xl font-semibold mb-4 pl-2">Delivery</h2>

        <div className=" rounded-lg divide-y">
          {faqs.map((faq, index) => (
            <div key={index}>
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-4 text-left font-medium"
              >
                {faq.question}
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-4 pb-4 text-gray-600 text-sm">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CANCELLATION SECTION */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4 pl-2">Cancellation and Return</h2>
          <div className=" rounded-lg divide-y">
            {cancellation.map((faq, index) => (
              <div key={index}>
                <button
                  onClick={() => toggleFAQ(faq.id || index + faqs.length)}
                  className="w-full flex justify-between items-center p-4 text-left font-medium"
                >
                  {faq.question}
                  <ChevronDown
                    className={`transition-transform duration-300 ${
                      openIndex === (faq.id || index + faqs.length) ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openIndex === (faq.id || index + faqs.length) && (
                  <div className="px-4 pb-4 text-gray-600 text-sm">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}