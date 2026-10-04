'use client'

import { useState } from 'react'
import AnimatedSection from '@/components/AnimatedSection'
import { faqs } from '@/lib/faqs'
import styles from './faq.module.css'

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
