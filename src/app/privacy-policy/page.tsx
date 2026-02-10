import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - vee.vet',
  description: 'Privacy Policy for Vets Unleashed LLC (vee.vet)',
};

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-gray-600">
          Privacy Policy for Vets Unleashed LLC (vee.vet)
          <br />
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="space-y-8 text-gray-700 text-justify">
        {/* Introduction */}
        <section>
          <p className="leading-relaxed">
            This Privacy Policy explains how Vets Unleashed LLC ("vee.vet," "we," "us," or "our")
            collects, uses, and protects the information you provide when using our Service and the
            vee.vet Platform. By accessing or using the vee.vet Platform or our Service, you agree
            to this Privacy Policy and our Terms of Use.
          </p>
        </section>

        {/* What We Do */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">What We Do</h2>
          <p className="leading-relaxed">
            The Service refers to vee.vet's marketplace, accessible via the vee.vet Platform (our
            website at https://vee.vet, the associated mobile apps, the associated technology
            platform, tools, and any related software or applications). This marketplace connects
            licensed veterinarians and other qualified veterinary professionals with veterinary
            facilities (hospitals, offices) seeking contract professionals to perform veterinary
            services.
          </p>
        </section>

        {/* Information We Collect */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            The Information That We Collect
          </h2>
          <p className="mb-4 leading-relaxed">
            We collect two main types of information through our Service:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong className="text-gray-900">Non-Personal Information:</strong> This information
              cannot be reasonably linked back to you and may include anonymized or de-identified
              personal data. We use it to improve the Service.
            </li>
            <li>
              <strong className="text-gray-900">Personal Information:</strong> This information can
              be reasonably linked to you and is collected primarily through the registration
              process and contact forms on the vee.vet Platform.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            Categories of Personal Information Collected (Non-Financial)
          </h3>
          <div className="space-y-3">
            <div>
              <strong className="text-gray-900">Identifiers:</strong> Full name (first and last),
              email address, physical address, current location, telephone number and professional
              license numbers.
            </div>
            <div>
              <strong className="text-gray-900">Profile/Registration Data:</strong> Employment or
              education information and date of birth.
            </div>
            <div>
              <strong className="text-gray-900">Communications:</strong> The contents of any
              communication you send to us, including messages through the Platform, emails, texts,
              chats, or phone calls with our Support team (note: online chats may be recorded and
              shared with service providers; phone calls may be recorded and transcribed for
              customer service/training).
            </div>
            <div>
              <strong className="text-gray-900">Voluntary Submissions:</strong> A photograph of you
              (if you attend a vee.vet-sponsored event or trade show) and any other information you
              voluntarily provide (e.g., exchanging business cards, responding to surveys, or
              providing feedback).
            </div>
            <div>
              <strong className="text-gray-900">Social Media Interaction:</strong> If you interact
              with us or log in through a social media service, we may access information like your
              name, email address, age, gender, and location, depending on your social media
              settings.
            </div>
            <div>
              <strong className="text-gray-900">Inferences:</strong> Information drawn from the data
              above to create a profile reflecting your preferences and characteristics.
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6 text-gray-900">
            Categories of Financial Information Collected
          </h3>
          <div className="space-y-3">
            <div>
              <strong className="text-gray-900">No Storage of Sensitive Payment Data:</strong> We do
              not collect, store, or process any sensitive payment card data, such as full credit
              card numbers, CVV codes, bank account numbers, or routing numbers, in our databases or
              systems.
            </div>
            <div>
              <strong className="text-gray-900">Use of Third-Party Processor:</strong> All purchases
              and transactions are processed directly by our authorized payment processor, Stripe.
              The information you provide at the time of purchase goes directly to Stripe and does
              not route through vee.vet systems or tools.
            </div>
            <div>
              <strong className="text-gray-900">Stripe's Role and Security:</strong> Stripe is
              solely responsible for the encryption, storage, and processing of your sensitive
              payment data, ensuring it meets industry security standards (PCI-DSS compliance).
              Their collection, use, and disclosure of your personal information are governed by
              their own privacy policy.
            </div>
            <div>
              <strong className="text-gray-900">Information We Retain:</strong> To manage your
              account, track transactions, and fulfill legal and tax obligations, we retain
              non-sensitive transaction details including:
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>The date, time, and amount of the transaction</li>
                <li>The billing address and name associated with the card</li>
                <li>
                  A secure token provided by Stripe that references your payment method (this token
                  is useless outside of the Stripe ecosystem)
                </li>
                <li>
                  The last four digits of the payment card (or similar identifier) for user
                  verification and reference purposes
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Information Collected via Technology */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            Information Collected via Technology
          </h2>
          <p className="mb-4 leading-relaxed">
            To improve the quality of our products, we track information provided by your browser or
            our App when you use the Service. This technical data collection may include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-gray-900">Usage Details:</strong> The referring URL (website
              you came from), browser type, IP address, device type, time and date of access,
              referring/exit pages and URLs, platform types, viewed webpages, and links clicked.
            </li>
            <li>
              <strong className="text-gray-900">Activity Monitoring:</strong> Keystrokes typed,
              movement of the mouse or pointer, and preferences generated based on submitted data.
            </li>
            <li>
              <strong className="text-gray-900">Location Data:</strong> Precise geolocation, if you
              permit it.
            </li>
          </ul>
          <p className="mt-4 leading-relaxed">
            This information is collected through the interaction of our website technology with
            your browser or device, including the use of cookies and web beacons (Internet tags,
            pixel tags, or clear GIFs).
          </p>
        </section>

        {/* Cookies */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Understanding Cookies</h2>
          <p className="mb-4 leading-relaxed">
            Cookies are small text files with a unique identifier sent to your browser and stored on
            your hard drive. They help us collect information and record your preferences, both
            individually and in aggregate.
          </p>

          <h3 className="text-xl font-semibold mb-4 text-gray-900">How We Use Cookies</h3>
          <p className="mb-4 leading-relaxed">
            We use both persistent cookies (which remain on your computer until you delete them) and
            session cookies (which expire when you close your browser).
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 p-3 text-left font-semibold text-gray-900">
                    Cookie Type
                  </th>
                  <th className="border border-gray-300 p-3 text-left font-semibold text-gray-900">
                    Purpose
                  </th>
                  <th className="border border-gray-300 p-3 text-left font-semibold text-gray-900">
                    Who Serves Them?
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-3">Strictly Necessary</td>
                  <td className="border border-gray-300 p-3">
                    Essential for the vee.vet Platform to operate and deliver the Service, including
                    authentication, payment processing, security, and fighting spam/abuse. These
                    cookies cannot be refused (though you can block/delete via browser settings).
                  </td>
                  <td className="border border-gray-300 p-3">Google Cloud, Firebase, Stripe</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3">Analytical / Performance</td>
                  <td className="border border-gray-300 p-3">
                    Track user behavior in an aggregated and encoded form to carry out web
                    analytics, provide usage statistics, measure errors, and test site designs to
                    improve the platform.
                  </td>
                  <td className="border border-gray-300 p-3">Google Analytics, vee.vet</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3">Targeting</td>
                  <td className="border border-gray-300 p-3">
                    Used to make advertising more relevant to you by preventing repetitive ads and
                    selecting ads based on your interests. May be used for targeting after you leave
                    our site.
                  </td>
                  <td className="border border-gray-300 p-3">Sendgrid</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            Managing Your Cookie Preferences
          </h3>
          <p className="mb-3 leading-relaxed">You have the right to accept or reject cookies:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              You can set or update your web browser controls to accept or refuse cookies. Consult
              your browser's help menu for instructions.
            </li>
            <li>
              Rejecting cookies may restrict your access to some functionality and areas of our
              site.
            </li>
            <li>
              You may opt out of certain third-party cookies universally by using opt-out links like
              https://www.networkadvertising.org/choices or https://www.aboutads.info/choices/.
            </li>
            <li>
              Most advertising networks provide a way to opt out of targeted advertising, which must
              be done on every device and browser you use.
            </li>
          </ul>
        </section>

        {/* How We Use Information */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            How We Use and Share Information
          </h2>
          <p className="mb-4 leading-relaxed">
            We do not sell, trade, or rent your personal information to third parties without your
            consent, except as outlined below.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            Use and Disclosure of Personal Information
          </h3>
          <div className="space-y-3">
            <div>
              <strong className="text-gray-900">To Provide the Service:</strong> We use your
              information to authenticate and personalize the vee.vet Platform, enable access to the
              Service, and ensure proper device functionality.
            </div>
            <div>
              <strong className="text-gray-900">Communication:</strong> We use personal information
              to communicate with you about your account, respond to your questions, solicit
              feedback, provide technical support, and inform you about promotional offers.
            </div>
            <div>
              <strong className="text-gray-900">Business Operations:</strong> We may disclose
              personal information to vendors who perform services for us to enable us to provide
              the Service.
            </div>
            <div>
              <strong className="text-gray-900">Payment Processing:</strong> We use your information
              to collect and remit payments on behalf of users, sharing it only to the extent
              necessary to provide this service.
            </div>
            <div>
              <strong className="text-gray-900">Security and Integrity:</strong> We use personal
              information to protect the security and integrity of the Platform and our business.
            </div>
            <div>
              <strong className="text-gray-900">Legal Compliance and Safety:</strong> We may share
              personal information with outside parties if we believe, in good faith, that access,
              use, preservation, or disclosure is reasonably necessary to meet applicable legal
              processes.
            </div>
            <div>
              <strong className="text-gray-900">Business Transfers:</strong> Your personal
              information may be transferred as an asset in the event of a merger, acquisition, or
              sale of assets.
            </div>
          </div>
        </section>

        {/* Security and Retention */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Security and Retention</h2>

          <h3 className="text-xl font-semibold mb-3 text-gray-900">How We Protect Information</h3>
          <p className="mb-4 leading-relaxed">
            We implement security measures to protect your information from unauthorized access,
            including encryption, firewalls, and secure socket layer technology. Your account is
            protected by a password, and we urge you to keep it safe and log out after each use.
            However, no measure is a 100% guarantee, and by using our Service, you acknowledge and
            agree to assume these inherent risks.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-gray-900">Record Retention</h3>
          <p className="leading-relaxed">
            We retain your personal information for as long as needed or permitted in light of the
            purposes for which it was obtained, to provide the applicable service, comply with legal
            obligations, resolve disputes, and enforce our agreements.
          </p>
        </section>

        {/* Your Choices and Rights */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Your Choices and Rights</h2>

          <h3 className="text-xl font-semibold mb-3 text-gray-900">Managing Your Preferences</h3>
          <div className="space-y-3">
            <div>
              <strong className="text-gray-900">Removal/Opt-Out:</strong> You can opt out of
              promotional communications, remove your information from our database (where
              possible), or cancel your account by contacting us at legal@vee.vet.
            </div>
            <div>
              <strong className="text-gray-900">Unsubscribing:</strong> You can prevent us from
              contacting you for marketing purposes by following the unsubscribe instructions in any
              promotional email.
            </div>
            <div>
              <strong className="text-gray-900">Cookies:</strong> Most browsers accept cookies by
              default, but you can change your settings to decline or delete them.
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6 text-gray-900">
            Correcting, Updating, and Accessing Information
          </h3>
          <p className="leading-relaxed">
            Upon request and identity authentication, we will provide you with information about the
            personal data we have collected. You have the right to request the correction,
            modification, or deletion of your personal information. Requests are typically addressed
            within 45 days.
          </p>
        </section>

        {/* Third Party Links */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            Links to Third-Party Websites
          </h2>
          <p className="leading-relaxed">
            Our Platform may include links to or compatibility with other websites or applications.
            This Privacy Policy only applies to information collected by us through the vee.vet
            Platform and the Service. We are not responsible for the privacy practices or content of
            third-party sites, and you should review their privacy statements as needed.
          </p>
        </section>

        {/* California Rights */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Your California Rights</h2>
          <p className="mb-4 leading-relaxed">
            If you are a California resident, state law grants you the following rights regarding
            your personal information:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-gray-900">Right to Know:</strong> You can request to know what
              personal information we have collected, used, disclosed, and "sold" or "shared" about
              you.
            </li>
            <li>
              <strong className="text-gray-900">Right to Correct:</strong> You can request that we
              correct inaccuracies in your personal information.
            </li>
            <li>
              <strong className="text-gray-900">Right to Delete:</strong> You can request that we
              delete personal information we have about you.
            </li>
            <li>
              <strong className="text-gray-900">Right to Opt Out:</strong> You have the right to opt
              out of the selling or sharing of your personal information by emailing us at
              legal@vee.vet.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6 text-gray-900">Exercising Your Rights</h3>
          <p className="leading-relaxed">
            To exercise any of these rights, please submit a request to legal@vee.vet. We will
            verify your identity by logging into your account or using your email/a third-party
            provider. You may designate an authorized agent, but we will require written proof of
            their permission and verification of your identity. We strive to respond to all
            verifiable requests within 45 days.
          </p>
        </section>

        {/* Changes to Policy */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Changes to This Policy</h2>
          <p className="leading-relaxed">
            We reserve the right to change this policy at any time. We will post a notification on
            the vee.vet Platform and inform you of any material changes in advance. It is your
            responsibility to periodically review this Privacy Policy for updates.
          </p>
        </section>

        {/* Contact Us */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Contact Us</h2>
          <p className="mb-4 leading-relaxed">
            If you have any questions about this Privacy Policy or wish to contact us regarding your
            rights as a California resident, please contact us:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <p>
              <strong className="text-gray-900">Email:</strong> legal@vee.vet
              <br />
              <strong className="text-gray-900">Mail:</strong> 524 East Rollins Rd Suite B 1005,
              Round Lake Beach, IL 60073
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
