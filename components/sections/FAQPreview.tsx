'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FAQPreview() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How far in advance should I book my dumpster?',
      answer: 'While we can often accommodate same-day or next-day requests, we recommend booking 2-3 days in advance to ensure availability, especially during peak construction seasons.',
    },
    {
      question: 'Do I need a permit for my dumpster?',
      answer: 'If you\'re placing the dumpster on private property (like your driveway), you typically don\'t need a permit. However, if it needs to go on public property (street, sidewalk), you\'ll likely need a municipal permit.',
    },
    {
      question: 'What can I put in my dumpster?',
      answer: 'Most common construction debris, household waste, and yard waste are allowed. Prohibited items typically include hazardous materials, chemicals, batteries, tires, and electronics. We\'ll provide a complete list with your rental.',
    },
    {
      question: 'How long can I keep the dumpster?',
      answer: 'Our standard rental period is 7-10 days. If you need more time, we can extend the rental for a small daily fee. We also offer flexible scheduling to meet your project timeline.',
    },
  ];

  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">Get answers to common questions about dumpster rentals</p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-4 mb-8">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200">
              <button
                className="w-full text-left py-4 flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                <span className="text-2xl text-gray-400">{openIndex === index ? '−' : '+'}</span>
              </button>
              {openIndex === index && (
                <div className="pb-4 text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-gray-600 mb-4">Have more questions?</p>
          <Link href="/faq" className="btn-secondary">
            View All FAQs
          </Link>
        </div>
      </div>
    </section>
  );
}
