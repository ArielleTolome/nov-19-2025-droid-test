'use client';

import { useState } from 'react';
import type { Metadata } from 'next';

const faqs = [
  {
    category: 'General',
    questions: [
      {
        question: 'How far in advance should I book my dumpster?',
        answer: 'While we can often accommodate same-day or next-day requests, we recommend booking 2-3 days in advance to ensure availability, especially during peak construction seasons.',
      },
      {
        question: 'Do I need a permit for my dumpster?',
        answer: 'If you\'re placing the dumpster on private property (like your driveway), you typically don\'t need a permit. However, if it needs to go on public property (street, sidewalk), you\'ll likely need a municipal permit. We can help you understand local requirements.',
      },
      {
        question: 'What can I put in my dumpster?',
        answer: 'Most common construction debris, household waste, and yard waste are allowed. Prohibited items typically include hazardous materials, chemicals, batteries, tires, and electronics. We\'ll provide a complete list with your rental.',
      },
      {
        question: 'How long can I keep the dumpster?',
        answer: 'Our standard rental period is 7-10 days. If you need more time, we can extend the rental for a small daily fee. We also offer flexible scheduling to meet your project timeline.',
      },
    ],
  },
  {
    category: 'Pricing',
    questions: [
      {
        question: 'What does the rental price include?',
        answer: 'The rental price includes delivery, pickup, disposal fees for up to the weight limit, and the rental period (typically 7-10 days). Additional fees may apply for overage weight or extended rental periods.',
      },
      {
        question: 'Are there any hidden fees?',
        answer: 'No hidden fees! We provide transparent pricing upfront. The only additional charges would be for exceeding weight limits or extending the rental period beyond the included time.',
      },
      {
        question: 'Do you offer discounts for multiple dumpsters?',
        answer: 'Yes! We offer volume discounts for multiple dumpsters or long-term rentals. Contact us for a custom quote.',
      },
    ],
  },
  {
    category: 'Delivery & Pickup',
    questions: [
      {
        question: 'How quickly can you deliver?',
        answer: 'We offer same-day and next-day delivery in most areas. Delivery times depend on your location and our current schedule.',
      },
      {
        question: 'Where will you place the dumpster?',
        answer: 'We\'ll place the dumpster in the location you specify, as long as it\'s accessible by our truck. Common locations include driveways, construction sites, and parking lots.',
      },
      {
        question: 'What if I need the dumpster picked up early?',
        answer: 'No problem! Just give us a call and we can schedule an early pickup. There are no penalties for early pickup.',
      },
    ],
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<{ category: number; question: number } | null>(null);

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl opacity-90">Get answers to common questions about dumpster rentals</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-4xl">
          {faqs.map((category, categoryIndex) => (
            <div key={category.category} className="mb-12">
              <h2 className="text-3xl font-bold mb-6">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const isOpen = openIndex?.category === categoryIndex && openIndex?.question === questionIndex;
                  return (
                    <div key={questionIndex} className="border-b border-gray-200">
                      <button
                        className="w-full text-left py-4 flex justify-between items-center"
                        onClick={() =>
                          setOpenIndex(
                            isOpen ? null : { category: categoryIndex, question: questionIndex }
                          )
                        }
                      >
                        <span className="font-semibold text-lg pr-4">{faq.question}</span>
                        <span className="text-2xl text-gray-400 flex-shrink-0">
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="pb-4 text-gray-600">{faq.answer}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
