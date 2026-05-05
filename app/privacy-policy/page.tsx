import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Mutuku Joshua - Fullstack Developer",
  description: "Privacy Policy for Mutuku Joshua - How I collect, use, and protect your personal information.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Mutuku Joshua ("I," "my," or "me") is committed to protecting your privacy. This Privacy
                Policy explains how I collect, use, disclose, and safeguard your information when you visit my portfolio
                website or use my development services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information I Collect</h2>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Personal Information</h3>
              <p className="text-gray-700 mb-4">
                I may collect personal information that you voluntarily provide to me, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Name and contact information (email, phone)</li>
                <li>Project requirements and specifications</li>
                <li>Communication history between us</li>
                <li>Any other information you choose to provide</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Automatically Collected Information</h3>
              <p className="text-gray-700 mb-4">When you visit my website, I may automatically collect:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>IP address and browser information</li>
                <li>Device and operating system information</li>
                <li>Website usage data and analytics</li>
                <li>Cookies for website functionality</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How I Use Your Information</h2>
              <p className="text-gray-700 mb-4">I use your information to:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Provide web development and consulting services</li>
                <li>Communicate with you about your projects</li>
                <li>Process project proposals and invoices</li>
                <li>Improve my website and service offerings</li>
                <li>Comply with applicable legal requirements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Project Confidentiality</h2>
              <p className="text-gray-700 mb-4">
                I take project confidentiality seriously. All information shared in the context of project development
                is kept strictly confidential and will not be disclosed to third parties, except as required by law or
                with your explicit consent. Code, designs, and project details remain your intellectual property.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Information Sharing</h2>
              <p className="text-gray-700 mb-4">
                I do not sell, trade, or rent your personal information. I may share your information only in the
                following circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect my rights, property, or safety</li>
                <li>With trusted collaborators on your project (under NDA if needed)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Security</h2>
              <p className="text-gray-700 mb-4">
                I implement appropriate technical and organizational security measures to protect your personal
                information and project data. This includes secure code repositories, encrypted communications, and
                secure development practices. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Your Rights</h2>
              <p className="text-gray-700 mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Access and review your personal information</li>
                <li>Request corrections to inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Request removal of your project from my portfolio (with advance notice)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Cookies</h2>
              <p className="text-gray-700 mb-4">
                My website uses essential cookies to enhance your browsing experience. I do not use tracking cookies
                for advertising purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Third-Party Services</h2>
              <p className="text-gray-700 mb-4">
                My website may use third-party services (like hosting providers) that have their own privacy policies.
                I choose reputable providers that prioritize data protection.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to This Policy</h2>
              <p className="text-gray-700 mb-4">
                I may update this Privacy Policy from time to time. I will notify you of any material changes by
                posting the new policy on my website with an updated effective date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy, please contact me:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Mutuku Joshua</strong>
                </p>
                <p className="text-gray-700">Email: officialjoshuamwendwa@gmail.com</p>
                <p className="text-gray-700">Phone: +254 794 773 452</p>
                <p className="text-gray-700">Location: Nairobi, Kenya</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

