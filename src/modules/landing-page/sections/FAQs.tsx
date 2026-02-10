'use client';

import SectionsWrapper from '@/layouts/SectionsWrapper';
import React from 'react';
import InfoWrapper from '../layouts/InfoWrapper';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { theme } from '@/lib/theme';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQ[] = [
  {
    id: 'item-1',
    question: 'How do I book an appointment?',
    answer:
      'Booking an appointment is easy! Visit our website, select your preferred date and time, choose a veterinarian, and complete the booking form. You can also call us directly at +1 (555) 123-4567. For online consultations, we offer telemedicine appointments as well.',
  },
  {
    id: 'item-2',
    question: 'Do you offer 24/7 emergency services?',
    answer:
      'Yes, we provide 24/7 emergency services for critical situations. You can call our emergency hotline or use our mobile emergency vet service. Our experienced veterinarians are always available to handle urgent pet health issues outside regular clinic hours.',
  },
  {
    id: 'item-3',
    question: 'What is telemedicine and how does it work?',
    answer:
      "Telemedicine allows you to consult with our veterinarians from the comfort of your home via video call. You can discuss your pet's symptoms, get preliminary advice, and receive prescriptions if necessary. This is perfect for non-emergency consultations and follow-up appointments.",
  },
  {
    id: 'item-4',
    question: 'Are your veterinarians licensed and certified?',
    answer:
      'Absolutely! All our veterinarians are licensed by the state veterinary board and hold current certifications in their specialties. We ensure continuous professional development and maintain the highest standards of veterinary care.',
  },
  {
    id: 'item-5',
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, MasterCard, American Express), debit cards, digital wallets (Apple Pay, Google Pay), and bank transfers. We also offer flexible payment plans for major procedures.',
  },
  {
    id: 'item-6',
    question: "Can I get my pet's medical records?",
    answer:
      "Yes! Your pet's medical records are securely stored and can be accessed anytime through your online account. You can download, print, or share them with other veterinarians. We ensure all records are encrypted and comply with privacy regulations.",
  },
];

const FAQs = () => {
  return (
    <SectionsWrapper noContainer className="bg-[#F9FAFB]">
      <InfoWrapper
        sectionTitle="FAQs"
        title="Frequently Asked Questions"
        subTitle="Find answers to common questions about our services, appointments, and pet care."
      >
        <div className="max-w-200 mx-auto w-full rounded-xl bg-white overflow-hidden">
          <Accordion type="single" collapsible>
            {faqData.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-base">{faq.question}</AccordionTrigger>
                <AccordionContent
                  className="leading-relaxed"
                  style={{ color: theme.colors.text.tertiary }}
                >
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </InfoWrapper>
    </SectionsWrapper>
  );
};

export default FAQs;
