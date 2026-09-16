import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'How long does shipping take?',
    a: 'Orders are dispatched within 1-2 business days and typically arrive within 3-5 business days via our courier partners.',
  },
  {
    q: 'What is your warranty policy?',
    a: 'All products come with the manufacturer\u2019s standard warranty, plus a 3-year local warranty on monitors and PCs sold directly by Apex Tech.',
  },
  {
    q: 'Can I return a product?',
    a: 'Yes - unopened items can be returned within 14 days of delivery for a full refund. Contact support to start a return.',
  },
  {
    q: 'Do you offer cash on delivery?',
    a: 'Yes, Cash on Delivery is available at checkout alongside direct bank transfer.',
  },
  {
    q: 'How do I track my order?',
    a: 'Visit the My Orders page while logged in to see the current status of every order you\u2019ve placed.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-black text-white">Frequently Asked Questions</h1>
        <p className="text-xs text-textMuted">Can&apos;t find what you&apos;re looking for? Reach out to our support team.</p>
      </div>

      <div className="space-y-3">
        {FAQS.map((item, i) => (
          <div key={item.q} className="bg-[#181A20] border border-[#2B2D3A] rounded-2xl overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-bold text-white"
            >
              {item.q}
              <ChevronDown className={`w-4 h-4 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
            </button>
            {openIndex === i && (
              <p className="px-5 pb-4 text-xs text-textMuted leading-relaxed">{item.a}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
