'use client'

import { useState } from 'react'
import AnimatedSection from '@/components/AnimatedSection'
import styles from './faq.module.css'

const faqs = [
  {
    question: "What technologies do you specialize in?",
    answer: "I specialize in modern web technologies including React, Next.js, Node.js, Python, TypeScript, and PostgreSQL. I also work with cloud platforms like AWS and Vercel, and have experience with mobile development using React Native and Flutter."
  },
  {
    question: "What is your typical project timeline?",
    answer: "Project timelines vary based on scope and complexity. A simple website typically takes 2-4 weeks, while a full-stack web application can take 6-12 weeks. I provide detailed timelines during our initial consultation after understanding your specific requirements."
  },
  {
    question: "Do you offer ongoing maintenance and support?",
    answer: "Yes, I offer comprehensive maintenance and support packages. This includes bug fixes, security updates, performance optimization, feature additions, and regular backups. I believe in building long-term partnerships with my clients."
  },
  {
    question: "How do you handle project communication?",
    answer: "I maintain transparent communication throughout the project lifecycle. I use tools like Slack or Discord for daily updates, hold weekly sync calls, and provide access to project management tools like Notion or Trello. You'll always know exactly where your project stands."
  },
  {
    question: "What is your pricing structure?",
    answer: "I offer flexible pricing based on project scope: fixed-price for well-defined projects, hourly rates for ongoing work or consulting, and retainer packages for long-term partnerships. All pricing is discussed upfront with no hidden fees."
  },
  {
    question: "Do you work with international clients?",
    answer: "Absolutely. I work with clients globally and am comfortable accommodating different time zones. I'm based in Nairobi, Kenya (EAT/UTC+3), and have experience collaborating with teams across North America, Europe, and Asia."
  },
  {
    question: "Can you help with existing projects or codebases?",
    answer: "Yes, I regularly work with existing codebases. Whether you need refactoring, feature additions, performance optimization, or bug fixes, I can quickly get up to speed with your current stack and contribute effectively."
  },
  {
    question: "What happens after the project is completed?",
    answer: "After completion, I provide full documentation, source code, and a knowledge transfer session. I also offer a warranty period for bug fixes and am available for future enhancements. Most clients choose to continue with a maintenance retainer."
  }
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <AnimatedSection>
          <div className={styles.header}>
            <div className={styles.eyebrow}>KNOWLEDGE BASE</div>
            <h1 className={styles.title}>Frequently Asked<br />Questions</h1>
            <p className={styles.subtitle}>
              Everything you need to know about working with me. Can&apos;t find what you&apos;re looking for? Feel free to reach out.
            </p>
          </div>
        </AnimatedSection>

        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <AnimatedSection key={index} delay={index * 0.05}>
              <div
                className={`${styles.faqItem} ${openIndex === index ? styles.open : ''}`}
                onClick={() => toggle(index)}
              >
                <div className={styles.faqQuestion}>
                  <span>{faq.question}</span>
                  <span className={styles.faqIcon}>{openIndex === index ? '−' : '+'}</span>
                </div>
                <div className={styles.faqAnswer}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.4}>
          <div className={styles.cta}>
            <h2>Still have questions?</h2>
            <p>I&apos;m happy to help. Get in touch and I&apos;ll get back to you within 24 hours.</p>
            <a href="/contact" className={styles.ctaBtn}>Contact Me →</a>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
