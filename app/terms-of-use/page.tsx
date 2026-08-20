import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Use | Mutuku Joshua - Fullstack Developer",
  description: "Terms of Use for Mutuku Joshua portfolio website and development services.",
}

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Use</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using Mutuku Joshua&apos;s portfolio website ("Website"), you accept and agree to be bound
                by these terms and conditions. If you do not agree to abide by these terms, please do not use this website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Nature of Services</h2>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                <p className="text-blue-800 font-medium">
                  <strong>Note:</strong> This website showcases my portfolio and development capabilities. 
                  Contacting me does not create a contractual relationship until a formal agreement is signed.
                </p>
              </div>
              <p className="text-gray-700 mb-4">
                The information provided on this website is for demonstration and portfolio purposes. A client-contractor
                relationship is formed only through a signed project agreement or contract.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Services Disclaimer</h2>
              <p className="text-gray-700 mb-4">
                The information on this website is provided "as is" without any representations or warranties, express
                or implied. I make no representations or warranties in relation to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>The accuracy or completeness of portfolio demonstrations</li>
                <li>Future project outcomes or results</li>
                <li>Technology trends or recommendations</li>
                <li>Each project being unique and client-specific</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Communication Guidelines</h2>
              <div className="bg-gray-50 border-l-4 border-gray-400 p-4 mb-4">
                <p className="text-gray-800 font-medium">
                  <strong>Guidelines:</strong> Please do not send confidential project information through this website 
                  or email until a contractual relationship has been established.
                </p>
              </div>
              <p className="text-gray-700 mb-4">
                Initial communications are not secure. Unsolicited information sent to me cannot be considered confidential
                until covered by a signed NDA or project agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Use License</h2>
              <p className="text-gray-700 mb-4">
                Permission is granted to temporarily view the materials on this website for personal review and
                evaluation purposes only. This is the grant of a license, not a transfer of title, and under this
                license you may not:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Modify or copy the materials without permission</li>
                <li>Use the materials for commercial purposes without agreement</li>
                <li>Attempt to reverse engineer any code or techniques shown</li>
                <li>Remove any copyright or proprietary notations</li>
                <li>Use the website in any way that violates applicable laws</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Acceptable Use</h2>
              <p className="text-gray-700 mb-4">You agree not to use the website to:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Transmit harmful, threatening, or offensive content</li>
                <li>Interfere with the website&apos;s operation or security</li>
                <li>Attempt to access restricted areas or systems</li>
                <li>Impersonate any person or entity</li>
                <li>Send spam or unsolicited communications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                All content on this website, including code snippets, designs, graphics, project demonstrations,
                and written content, are the intellectual property of Mutuku Joshua unless otherwise stated.
              </p>
              <p className="text-gray-700 mb-4">
                Portfolio projects may include work done for clients. Any client-specific code or information is 
                shared with permission and remains the client&apos;s property. Generic techniques and approaches 
                shown are my own.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                In no event shall Mutuku Joshua be liable for any damages (including, without limitation, damages
                for loss of data, profit, or business interruption) arising out of the use or inability to use
                the materials on this website or related to any services showcased here.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Portfolio Representations</h2>
              <p className="text-gray-700 mb-4">
                My portfolio showcases completed projects and capabilities. Each project was built under specific
                requirements and constraints. Past performance does not guarantee future results for different projects.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Jurisdiction</h2>
              <p className="text-gray-700 mb-4">
                These terms and conditions are governed by the laws of Kenya. Any disputes relating to these terms
                shall be subject to the jurisdiction of Kenyan courts. I work with clients internationally remotely,
                and project agreements will specify applicable jurisdiction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Project Agreements</h2>
              <p className="text-gray-700 mb-4">
                All development projects are governed by separate contractual agreements that outline:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Project scope and deliverables</li>
                <li>Payment terms and schedules</li>
                <li>Timeline and milestones</li>
                <li>Intellectual property ownership</li>
                <li>Confidentiality provisions</li>
                <li>Support and maintenance terms</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Modifications</h2>
              <p className="text-gray-700 mb-4">
                I may revise these terms of use at any time without notice. By using this website, you are agreeing to
                be bound by the then-current version of these terms of use.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Use, please contact me:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Mutuku Joshua</strong>
                </p>
                <p className="text-gray-700">Email: officialjoshua@lumyn.co.ke</p>
                <p className="text-gray-700">Phone: +254 794 773 452</p>
                <p className="text-gray-700">Location: Nairobi, Kenya</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Severability</h2>
              <p className="text-gray-700 mb-4">
                If any provision of these Terms of Use is found to be invalid or unenforceable, the remaining provisions
                shall remain in full force and effect.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

