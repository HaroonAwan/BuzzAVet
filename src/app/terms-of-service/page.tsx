import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions - vee.vet',
  description: 'Terms & Conditions and User Agreement for Vets Unleashed LLC (vee.vet)',
};

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Terms & Conditions and User Agreement</h1>
        <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        {/* Acceptance of the User Agreement */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            Acceptance of the User Agreement
          </h2>
          <p className="mb-4">
            This User Agreement is a legally binding contract between Vets Unleashed LLC (the
            Company) and you (the User), which is an individual or professional organization that
            registers for an account and acknowledges assenting to the terms of this User Agreement
            by clicking and signing below.
          </p>
          <p className="mb-4">
            Vets Unleashed LLC ("vee.vet") provides users access to its websites, webapps, mobile
            apps, associated technology platforms, tools (e.g., dashboards), and interfaces,
            collectively known as the "vee.vet Platform," along with all information, content, and
            services available through it.
          </p>
          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            Key Points on Agreement and Representation:
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Any individual registering an account with vee.vet must warrant that they have the
              authority to act on behalf of the User and are authorized to bind the User to this
              Agreement.
            </li>
            <li>
              You confirm your agreement to this User Agreement by accessing or using the vee.vet
              Platform or any Services, or by expressly acknowledging it during the account
              registration or login process.
            </li>
            <li>
              If you do not agree to all terms and conditions, you are not authorized to access or
              use the vee.vet Platform or Services and must refrain from doing so.
            </li>
          </ul>
        </section>

        {/* Mandatory Arbitration */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            Mandatory Arbitration and Dispute Resolution
          </h2>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
            <p className="font-semibold text-gray-900">MANDATORY ARBITRATION NOTICE:</p>
            <p>
              Any disputes between you and vee.vet or any affiliated party will be resolved through
              binding arbitration. By accepting this Agreement, you are waiving your right to a
              trial by jury and your right to participate as a plaintiff or class member in any
              class action or representative proceeding.
            </p>
          </div>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-gray-900">Venue for Arbitration:</strong> Arbitration
              proceedings will be administered by the American Arbitration Association (AAA) under
              its commercial dispute rules and shall be held in Chicago, Illinois.
            </li>
            <li>
              <strong className="text-gray-900">Exceptions:</strong> Intellectual property
              violations seeking solely injunctive relief may be addressed in the applicable court.
            </li>
          </ul>
        </section>

        {/* Amendments */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Amendments to the Agreement</h2>
          <p className="mb-4">
            Any text changes to this document will be shared with users through email within 24
            hours of the change with vee.vet reserving all rights to amend this User Agreement.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              A link to the Agreement is shown at login as well as various other places such as
              home/landing pages of our apps and websites. By completing the login process, you
              accept any amendments made since your last acceptance. You should review the Agreement
              each time you log in.
            </li>
            <li>
              <strong className="text-gray-900">Refusal of Changes:</strong> If you do not agree to
              any changes, you must discontinue all access to the vee.vet Platform and cease all use
              of the Services. Continued access or use after a change becomes effective constitutes
              your acceptance of the modified Agreement.
            </li>
          </ul>
        </section>

        {/* Description of Platform and Services */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            Description of the Platform and Services
          </h2>
          <p className="mb-4">The vee.vet Platform is a marketplace connecting:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              <strong className="text-gray-900">Professionals:</strong> Licensed veterinarians and
              other qualified veterinary professionals such as vet technicians and students.
            </li>
            <li>
              <strong className="text-gray-900">Practices:</strong> Veterinary hospitals, offices,
              or other facilities engaged in veterinary medicine.
            </li>
          </ul>
          <p className="mb-4">
            Practices seek Professionals on a contract basis to perform Veterinary Services during
            temporary working arrangements called a "Shift".
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              The Platform allows Practices to define Shifts and Professionals to offer their
              services for those Shifts.
            </li>
            <li>
              Professionals can also showcase their schedule and the type of services they want to
              offer in advance.
            </li>
            <li>
              The final decision by a Professional to offer a Shift, and by a Practice to accept it,
              rests in the sole discretion of that party.
            </li>
            <li>
              vee.vet is a passive marketplace facilitator and is not liable for any Veterinary
              Services. Users agree to hold vee.vet harmless and indemnify vee.vet for any
              third-party claims related to Veterinary Services.
            </li>
            <li>
              vee.vet reserves the right to modify, discontinue, suspend, or cancel the Platform,
              Services, or Content with or without notice, and is not liable for any such changes.
            </li>
          </ul>
          <p className="mt-4">
            <strong className="text-gray-900">Beta Services:</strong> Any trial, free, or beta
            functionality is provided on an "AS IS" AND WITH ALL FAULTS basis. You assume all risks,
            and vee.vet has no obligations or liability for your use of Beta Services.
          </p>
        </section>

        {/* Account Registration */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            Account Registration, Login, and Confidentiality
          </h2>
          <p className="mb-4">
            Access to the vee.vet Platform requires completing the registration process and meeting
            all specified requirements.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              vee.vet reserves the right to refuse, suspend, or terminate any account at any time in
              its sole discretion.
            </li>
            <li>You must keep your password and other access credentials confidential.</li>
            <li>
              You are solely responsible for all activities regarding your account and password,
              including unauthorized use. You must notify vee.vet immediately if you suspect
              unauthorized use.
            </li>
            <li>You may only create one provider account and one practice account per User.</li>
          </ul>
        </section>

        {/* Accuracy of Information */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            Accuracy of Information and Background Checks
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              You must provide additional information and documents (e.g., professional licensing)
              during registration and throughout your use of the Platform.
            </li>
            <li>
              You represent and warrant that all information, documents, and materials you provide
              are, and will remain, accurate, correct, current, and complete at all times.
            </li>
            <li>
              You authorize vee.vet to obtain information about you, including background, credit,
              and other checks (criminal, professional, or financial).
            </li>
            <li>
              If any information is found to be inaccurate or the results of any investigation are
              unsatisfactory to vee.vet, vee.vet reserves the right to suspend or terminate your
              access and/or deactivate your account.
            </li>
          </ul>
        </section>

        {/* Privacy Policy and Data License */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            Privacy Policy and Data License
          </h2>
          <p className="mb-4">
            Your use of the vee.vet Platform is governed by this "Terms & Conditions and User
            Agreement" and the separate vee.vet Privacy Policy, which is located at{' '}
            <a href="/privacy-policy" className="text-blue-600 hover:text-blue-800 underline">
              /privacy-policy
            </a>{' '}
            and is hereby incorporated into and made a part of this "Terms & Conditions and User
            Agreement". By accepting this "Terms & Conditions and User Agreement", you also agree to
            the Privacy Policy's terms concerning how vee.vet collects, uses, and shares your
            information ("Your Data").
          </p>
          <p>
            You grant vee.vet a worldwide, non-exclusive license to use Your Data as necessary to
            provide and improve the Services, and to use Your Data in an aggregated,
            non-identifiable format for any purpose not prohibited by law. You represent and warrant
            that you have all rights necessary to grant these licenses.
          </p>
        </section>

        {/* Professional and Practice Responsibilities */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            Professional and Practice Responsibilities
          </h2>

          <h3 className="text-xl font-semibold mb-3 text-gray-900">For Professionals:</h3>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>
              You must be duly licensed in the jurisdiction where Veterinary Services are performed,
              as indicated through the Platform, with no active license disciplinary actions against
              you with your license in good standing to practice veterinary medicine.
            </li>
            <li>
              You must perform Veterinary Services as directed by the Practice in a professional,
              competent, and timely manner.
            </li>
            <li>
              You must arrive at the Practice on time for your Shift and perform the services for
              the entire Shift, unless otherwise agreed and documented through the Platform.
            </li>
            <li>
              You agree not to demand, request, or accept payment or compensation from the Practice
              except through transactions completed through the vee.vet Platform.
            </li>
            <li>
              You are responsible for all applicable federal, state, and local taxes based on your
              services and payments received. vee.vet is not responsible for paying, withholding, or
              reporting any taxes.
            </li>
          </ul>
          <p className="mb-6">
            Failure to comply with these requirements may result in suspension or termination of
            your account and, to the extent permitted by law, a reduction or elimination of your
            Shift Pay.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-gray-900">For Practices:</h3>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>
              You must be duly authorized to operate and engage in the practice of veterinary
              medicine in the relevant jurisdiction.
            </li>
            <li>
              You must operate in accordance with all applicable laws, regulations, and industry
              best practices.
            </li>
            <li>
              You must supervise the performance of the Veterinary Services and exercise due care
              and judgment in utilizing any Professional.
            </li>
            <li>
              You agree not to pay any compensation to a Professional for a Shift except through
              transactions completed through the vee.vet Platform.
            </li>
          </ul>
          <p>
            Failure to comply with these requirements may result in the suspension or termination of
            your access and/or deactivation of your account.
          </p>
        </section>

        {/* Payments, Fees, and Compensation */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            Payments, Fees, and Compensation
          </h2>

          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            Professional Compensation (Shift Pay):
          </h3>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>
              vee.vet acts as a pass-through entity, transferring Shift Pay from the Practice to the
              Professional. vee.vet does not retain these funds as its own income.
            </li>
            <li>
              Shift Pay is the amount agreed upon by the Professional and the Practice when they
              agree to the Shift.
            </li>
            <li>
              For certain shift types the professionals will be eligible for bonus pay based on
              their performance and practice's prior approval. Such amounts can be paid along with
              or as a separate transaction to the Professional.
            </li>
            <li>
              vee.vet reserves the right to adjust or withhold all or part of a Professional's
              payment if it believes the Professional attempted to defraud the Practice or vee.vet,
              or to resolve a complaint raised by a Practice.
            </li>
            <li>
              Payments are made by direct deposit using the banking information you provide. You are
              responsible for ensuring this information is correct and up to date.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            Payments to vee.vet (Shift Fees and Third-Party Fees):
          </h3>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>
              vee.vet receives a Shift Fee for each Shift matched through the Platform. The Shift
              Fee is determined and displayed to the Practice at the time of Shift acceptance.
            </li>
            <li>
              vee.vet is also reimbursed for any third-party charges, such as processing fees (Third
              Party Fees).
            </li>
            <li>
              The Practice agrees to pay vee.vet the sum of: (a) all compensation owed to the
              Professional (including Shift Pay and any required taxes), (b) the Shift Fee, and (c)
              any applicable Third-Party Fees.
            </li>
            <li>
              vee.vet does not charge Shift Fees for bonus payments to Professionals but may charge
              Third-Party Fees as needed.
            </li>
            <li>
              Practices must have a current and valid payment mechanism on file through the vee.vet
              Platform as a precondition to using its functionality.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            Direct Placement (Direct Hiring) Policy:
          </h3>
          <p>
            vee.vet users are not blocked from offering direct placements to other platform users.
            vee.vet does not play any role in hiring a Professional by a Practice and is not liable
            for any outcomes resulting from such hiring. All users (Practices and Professionals)
            hiring or being hired by an individual or a business entity that they came to know about
            through vee.vet must do their own due diligence before hiring or being hired.
          </p>
        </section>

        {/* Conduct and Prohibited Activities */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            Conduct and Prohibited Activities
          </h2>
          <p className="mb-4">
            As a condition of using the Platform, you agree to follow a basic set of conduct rules.
            You will not, for example:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Share your Password or transfer/sell your account.</li>
            <li>
              Use the Platform in connection with discrimination (based on race, gender, religion,
              etc.).
            </li>
            <li>
              Harass, threaten, or abuse other people or post Content that is unlawful, fraudulent,
              defamatory, vulgar, or abusive.
            </li>
            <li>
              Post Content that violates any third party's copyright, patent, trademark, or other
              intellectual property rights.
            </li>
            <li>Post Content containing viruses or harmful code.</li>
            <li>
              Impersonate any other person, misrepresent a relationship with any entity (including
              vee.vet), or adopt a false identity.
            </li>
            <li>Manipulate the Platform to hide your identity.</li>
            <li>
              "Frame" or "mirror" any part of the Platform or use automated devices (like robots or
              spiders) to retrieve, index, or "data mine" Content without prior written
              authorization.
            </li>
            <li>
              Reverse engineer, decipher, decompile, or otherwise disassemble any portion of the
              Platform.
            </li>
            <li>Send any bulk unsolicited advertising (junk mail, "spam").</li>
          </ul>
          <p className="mt-4">
            Violation of these rules may result in the suspension or termination of your account and
            access to the Platform and Services without notice.
          </p>
        </section>

        {/* Extended Prohibited Activities */}
        <section>
          <p className="mb-4">
            You are prohibited from using or attempting to use the Services (i) for any unlawful,
            unauthorized, fraudulent, or malicious purpose, (ii) in any manner that could damage,
            disable, overburden, or impair any server, or the network(s) connected to any server,
            (iii) in any manner that could interfere with any other party's use and enjoyment of the
            Services, (iv) to gain unauthorized access to any other accounts, computer systems, or
            networks connected to any server or systems through hacking, password mining or any
            other means, (v) to access systems, data, or information not intended by vee.vet to be
            made accessible to a user, (vi) to obtain any materials, or information through any
            means not intentionally made available by vee.vet, (vii) to reverse engineer,
            disassemble or decompile any section or technology on the Services, or (viii) for any
            use other than the business purpose for which it was intended.
          </p>
          <p className="mb-4">
            In addition, in connection with your use of the Services, you agree you will not: (a)
            upload or transmit any message, information, data, text, software or images, or other
            content that is unlawful, harmful, threatening, abusive, harassing, tortious,
            defamatory, vulgar, obscene, libelous, or inappropriate with respect to race, gender,
            sexuality, ethnicity, or other intrinsic characteristic, or that may invade another's
            right of privacy or publicity; (b) create a false identity or duplicative accounts for
            the purpose of misleading others or impersonate any person or entity, including, without
            limitation, any vee.vet representative, or falsely state or otherwise misrepresent your
            affiliation with a person or entity; (c) upload or transmit any material that you do not
            have a right to reproduce, display or transmit under any law or under contractual or
            fiduciary relationships (such as nondisclosure agreements); (d) upload files that
            contain viruses, trojan horses, worms, time bombs, cancel-bots, corrupted files, spyware
            or any other similar software or programs that may damage the operation of another's
            computer or property of another; (e) delete any author attributions, legal notices or
            proprietary designations or labels that you upload to any communication feature; (f) use
            communication features in a manner that adversely affects the availability of its
            resources to other users (e.g., excessive shouting, use of all caps, or flooding
            continuous posting of repetitive text); (g) upload or transmit any unsolicited
            advertising, promotional materials, "junk mail," "spam," "chain letters," "pyramid
            schemes," "phishing" or any other form of solicitation, commercial or otherwise; (h)
            violate any applicable local, state, national or international law; (i) upload or
            transmit any material that infringes any patent, trademark, service mark, trade secret,
            copyright or other proprietary rights of any party; (j) delete or revise any material
            posted by any other person or entity; (k) manipulate or otherwise display the Services
            by using framing, mirroring or similar navigational technology; (l) probe, scan, test
            the vulnerability of or breach the authentication measures of, the Service or any
            related networks or systems; (m) register, subscribe, attempt to register, attempt to
            subscribe, unsubscribe, or attempt to unsubscribe, any party for any services or any
            contests, promotions or sweepstakes if you are not expressly authorized by such party to
            do so; (n) harvest or otherwise collect information about others, including email
            addresses; (o) use any robot, spider, scraper, or other automated or manual means to
            access the Service, or copy, download, distribute or reproduce any content or
            information on the Service; or (p) assist or permit any person in engaging in any of
            these activities.
          </p>
          <p className="mb-4">
            vee.vet reserves the right to take whatever lawful actions it may deem appropriate in
            response to actual or suspected violations of the foregoing. vee.vet may cooperate with
            legal authorities and/or third parties in the investigation of any suspected or alleged
            crime or civil wrong.
          </p>
          <p className="mb-4">
            Except as may be provided in the Privacy Policy or prohibited by applicable law, vee.vet
            reserves the right at all times to disclose any information as vee.vet deems necessary
            to satisfy any applicable law, regulation, legal process or governmental request, or to
            edit, refuse to post or to remove any information or materials, in whole or in part, in
            vee.vet's sole discretion.
          </p>
          <p>
            vee.vet reserves the right to monitor general use of the Services at any time as it
            deems appropriate and to remove any materials that, in vee.vet's sole discretion, may be
            illegal, may subject vee.vet to liability, may violate the Terms of Use or are, in the
            sole discretion of vee.vet, inconsistent with vee.vet's purpose for the Services.
          </p>
        </section>

        {/* Disclaimer of Warranties and Limitation of Liability */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            Disclaimer of Warranties and Limitation of Liability
          </h2>

          <h3 className="text-xl font-semibold mb-3 text-gray-900">Warranty Disclaimers:</h3>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>The use of the vee.vet Platform, Services, and Content is at your SOLE RISK.</li>
            <li>They are provided on an "AS IS" AND/OR "AS AVAILABLE" basis.</li>
            <li>
              vee.vet expressly disclaims all warranties of any kind, whether expressed or implied,
              including implied warranties of title, merchantability, fitness for a particular
              purpose, and non-infringement.
            </li>
            <li>
              vee.vet is a passive conduit between Professionals and Practices. The User is SOLELY
              RESPONSIBLE for any decision to hire or utilize a Professional.
            </li>
            <li>
              vee.vet is not responsible for the conduct (online or offline) of any User. You are
              solely responsible for your interactions with other Users.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 text-gray-900">Limitation of Liability:</h3>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>
              vee.vet shall not be liable for any punitive, indirect, incidental, special,
              consequential, or exemplary damages (including loss of profits, data, or goodwill).
            </li>
            <li>
              The aggregate liability of vee.vet to you is limited to the greater of $1,200 or the
              amount you have paid to vee.vet in the twelve months before the action giving rise to
              liability.
            </li>
            <li>
              vee.vet shall not be responsible or liable for any Veterinary Services or any related
              acts or omissions by any Professional.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 text-gray-900">Indemnity:</h3>
          <p className="mb-3">
            You agree to indemnify and hold harmless vee.vet from any liability, loss, cost, or
            claim (including reasonable attorneys' fees) arising out of or in connection with:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your use of the Platform or Services.</li>
            <li>Your violation of this Agreement or any third party's rights.</li>
            <li>
              Any claim related to tax, employment status, misclassification, wage disputes, or
              workers' compensation.
            </li>
          </ul>
        </section>

        {/* Limitation of Liability (Extended) */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">LIMITATION OF LIABILITY</h2>
          <p className="mb-4">
            vee.vet, its affiliates and any of its, or their, directors, officers, employees or
            agents shall not, under any circumstances, be liable for direct, consequential,
            incidental, indirect or special damages of any kind, or any other damages whatsoever,
            including, without limitation, those resulting from loss of use, data or profits, and
            whether resulting from the use or inability of use of any contents of the Services, or
            any other cause, even if such cause involves negligence, or if we have been apprised of
            the likelihood of such damages occurring.
          </p>
          <p>
            The above limitation, or exclusion, may not apply to you to the extent that applicable
            law prohibits the limitation or exclusion of liability for incidental or consequential
            damages.
          </p>
        </section>

        {/* Disclaimer of Warranties (Extended) */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">DISCLAIMER OF WARRANTIES</h2>
          <div className="bg-gray-100 p-4 rounded">
            <p className="mb-3">
              YOU UNDERSTAND AND AGREE THAT THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS
              AVAILABLE" BASIS AND THAT VEE.VET DOES NOT ASSUME ANY RESPONSIBILITY FOR PROMPT OR
              PROPER DELIVERY, OR RETENTION OF ANY PERSONAL INFORMATION. VEE.VET EXPRESSLY DISCLAIMS
              ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO,
              THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
              NON-INFRINGEMENT.
            </p>
            <p className="mb-3">
              VEE.VET MAKES NO WARRANTY THAT (1) THE SERVICES WILL MEET YOUR REQUIREMENTS, (2) THE
              SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE OR ERROR-FREE, (3) THE QUALITY OF ANY
              INFORMATION OR OTHER MATERIAL OBTAINED BY YOU THROUGH THE SERVICES WILL MEET YOUR
              EXPECTATIONS, AND (4) ANY ERRORS IN THE SERVICES WILL BE CORRECTED.
            </p>
            <p className="mb-3">
              ANY MATERIAL DOWNLOADED OR OTHERWISE OBTAINED THROUGH THE USE OF THE SERVICES IS DONE
              AT YOUR OWN DISCRETION AND RISK AND YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO
              YOUR COMPUTER SYSTEM OR LOSS OF DATA THAT RESULTS FROM THE DOWNLOAD OF ANY SUCH
              MATERIAL.
            </p>
            <p className="mb-3">
              NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY YOU FROM VEE.VET OR
              THROUGH OR FROM THE SERVICES SHALL CREATE ANY WARRANTY NOT EXPRESSLY STATED IN THESE
              TERMS OF USE.
            </p>
            <p>
              SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN WARRANTIES. ACCORDINGLY, SOME
              OF THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU.
            </p>
          </div>
        </section>

        {/* Binding Arbitration */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">BINDING ARBITRATION</h2>
          <p>
            Any controversy or claim between the parties or arising out of these Terms of Use or any
            use of the Services shall be determined by one disinterested arbitrator in binding
            arbitration pursuant to the Commercial Arbitration Rules and the Supplementary
            Procedures for Online Arbitration of the American Arbitration Association (the "AAA").
            The arbitrator shall be experienced in agreements for information technology services,
            either as an attorney or as an information technology professional. If the parties fail
            to appoint an arbitrator within forty-five (45) days of the institution of the
            arbitration, the AAA shall select the arbitrator promptly thereafter. Any requests for
            accelerated emergency or preliminary relief shall be submitted pursuant to the AAA's
            Optional Rules for Emergency Measures of Protection. If any such requests are made
            before an arbitration panel is empaneled, then the AAA shall appoint one disinterested
            arbitrator as an arbitration panel to immediately hear and decide such request. The
            arbitration panel shall have the right to grant interim awards. Testimony shall be
            permitted by telephone, video conference and other forms of real-time
            telecommunications. If the arbitrator requires in-person hearings, the hearings shall be
            held in Chicago, Illinois. The arbitral award will be final and binding, and may be
            entered and enforced in any court of competent jurisdiction.
          </p>
        </section>

        {/* Waiver of Jury Trial */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            WAIVER OF JURY TRIAL AND CLASS ACTIONS
          </h2>
          <div className="bg-gray-100 p-4 rounded">
            <p>
              BY ENTERING INTO THESE TERMS OF USE, YOU AND VEE.VET ACKNOWLEDGE AND AGREE TO WAIVE
              CERTAIN RIGHTS TO LITIGATE DISPUTES IN COURT, TO RECEIVE A JURY TRIAL OR TO
              PARTICIPATE AS A PLAINTIFF OR AS A CLASS MEMBER IN ANY CLAIM ON A CLASS OR
              CONSOLIDATED BASIS OR IN A REPRESENTATIVE CAPACITY. YOU AND VEE.VET BOTH AGREE THAT
              ANY ARBITRATION WILL BE CONDUCTED ON AN INDIVIDUAL BASIS AND NOT A CONSOLIDATED,
              CLASS-WIDE OR REPRESENTATIVE BASIS AND THE ARBITRATOR SHALL HAVE NO AUTHORITY TO
              PROCEED WITH AN ARBITRATION ON A CLASS OR REPRESENTATIVE BASIS. THE ARBITRATOR MAY
              AWARD INJUNCTIVE RELIEF ONLY IN FAVOR OF THE INDIVIDUAL PARTY SEEKING RELIEF AND ONLY
              TO THE EXTENT NECESSARY TO PROVIDE RELIEF WARRANTED BY THAT PARTY'S INDIVIDUAL CLAIM.
              IF FOR ANY REASON THE ARBITRATION CLAUSE SET FORTH IN THESE TERMS OF USE IS DEEMED
              INAPPLICABLE OR INVALID, OR TO THE EXTENT THE ARBITRATION CLAUSE ALLOWS FOR LITIGATION
              OF DISPUTES IN COURT, YOU AND VEE.VET BOTH WAIVE, TO THE FULLEST EXTENT ALLOWED BY
              LAW, ANY RIGHT TO PURSUE OR TO PARTICIPATE AS A PLAINTIFF OR AS A CLASS MEMBER IN ANY
              CLAIM ON A CLASS OR CONSOLIDATED BASIS OR IN A REPRESENTATIVE CAPACITY.
            </p>
          </div>
        </section>

        {/* Relationship of Parties */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Relationship of the Parties</h2>
          <p className="mb-4">
            The relationship between you and vee.vet is strictly that of independent contracting
            parties in a direct business relationship.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              This User Agreement is not an employment agreement and does not create an employment
              relationship between you and vee.vet.
            </li>
            <li>
              No joint venture, franchisor-franchisee, partnership, or agency relationship is
              intended or created.
            </li>
            <li>
              vee.vet does not, and shall not be deemed to, supervise, direct, or control any User
              (Professional or Practice) generally or in the performance of Veterinary Services.
            </li>
            <li>
              Users have the sole right to determine when, where, and for how long they use the
              Platform and whether to accept or decline a Shift.
            </li>
          </ul>
        </section>

        {/* Indemnification */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">INDEMNIFICATION</h2>
          <p>
            By accepting these Terms of Use, you agree to indemnify and otherwise hold harmless
            vee.vet and its officers, employees, agents, subsidiaries, affiliates, licensors,
            suppliers and other partners from any direct, indirect, incidental, special,
            consequential or exemplary damages resulting from your use of the Services.
          </p>
        </section>

        {/* Jurisdiction */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">JURISDICTION</h2>
          <p>
            By accessing the Services, you and vee.vet agree that all matters relating to your
            access to, or use of, the Services shall be governed by the statutes and laws of the
            State of Illinois, without regard to its conflicts of laws principles. You and vee.vet
            also agree, and submit to the exclusive personal jurisdiction and venue of the courts of
            the State of Illinois with respect to such matters. vee.vet makes no representation that
            materials contained in the Services are appropriate or available for use in other
            locations, and accessing them from territories where their contents are illegal is
            prohibited. Those who choose to access the Services from other locations do so on their
            own initiative, and are responsible for compliance with local laws.
          </p>
        </section>

        {/* Notices */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">NOTICES</h2>
          <p className="mb-4">
            vee.vet may deliver notice to you under these Terms of Use by means of e-mail, a general
            notice posted on the Platform, or by written communication delivered by first-class U.S.
            mail to the address that you have provided to vee.vet. You may give notice to, or submit
            comment, questions or complaints to, vee.vet at any time via e-mail or by letter
            delivered by first-class postage prepaid U.S. mail or overnight courier to the following
            address:
          </p>
          <div className="bg-gray-50 p-4 rounded border border-gray-200">
            <p className="font-semibold text-gray-900">Vets Unleashed LLC d/b/a vee.vet</p>
            <p>524 East Rollins Rd</p>
            <p>Suite B 1005</p>
            <p>Round Lake Beach, IL 60073</p>
            <p>Email: legal@vee.vet</p>
          </div>
        </section>

        {/* Survival */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">SURVIVAL</h2>
          <p>
            The provisions of these Terms of Use entitled "Limitation of Liability," "Disclaimer of
            Warranties," "Indemnification," "Jurisdiction" and "General Provisions" will survive the
            termination of this Agreement.
          </p>
        </section>

        {/* Disclaimer */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">DISCLAIMER</h2>
          <div className="bg-gray-100 p-4 rounded">
            <p>
              THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, AND ALL USE OF THE
              SERVICES ARE "AT YOUR OWN RISK." VEE.VET MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY
              KIND, EXPRESS OR IMPLIED, REGARDING THE SERVICES, AND EXPRESSLY DISCLAIMS ANY
              WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. VEE.VET DOES NOT
              REPRESENT OR WARRANT THAT USE OF THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE, OR
              THAT INFORMATION CONTAINED ON THE PLATFORM WILL BE ACCURATE, COMPLETE OR UP-TO-DATE.
            </p>
          </div>
        </section>

        {/* General Terms and Governing Law */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            General Terms and Governing Law
          </h2>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>This Agreement constitutes the entire agreement between you and vee.vet.</li>
            <li>
              The relationship between the parties shall be governed by the laws of the State of
              Illinois, without regard to its conflict of law provisions.
            </li>
            <li>
              No third-party beneficiaries exist under this Agreement, except for the App Platform
              Provider (e.g., Apple Store, Google Play) as related to the Software Component
              license.
            </li>
            <li>
              You may not assign or sell any of your rights without vee.vet's prior written consent.
            </li>
          </ul>
        </section>

        {/* General Provisions */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">GENERAL PROVISIONS</h2>
          <p>
            Except as provided in a particular "Legal Notice" on this Platform, these Terms of Use,
            along with the vee.vet Privacy Policy, constitute the entire agreement and understanding
            between you and vee.vet with respect to use of the Services, superseding all prior or
            contemporaneous communications with vee.vet. These Terms of Use are severable, and in
            the event any provision is determined to be invalid or unenforceable, such invalidity or
            unenforceability shall not in any way affect the validity or enforceability of the
            remaining provisions. vee.vet may assign its rights and duties under these Terms of Use
            to any party at any time without notice to you. A printed version of these Terms of Use
            shall be admissible in judicial or administrative proceedings based upon or relating to
            use of the Services to the same extent and subject to the same conditions as other
            business documents and records originally generated and maintained in printed form. The
            section titles of this Agreement are displayed for convenience only and have no legal
            effect. Nothing in this Agreement shall be deemed to confer any third-party rights or
            benefits.
          </p>
        </section>

        {/* Important Notice */}
        <section>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
            <p className="mb-4 font-semibold text-gray-900">
              BY USING THE SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ, ACCEPTED, AND AGREED TO BE
              BOUND BY THESE TERMS OF USE. IF YOU DO NOT AGREE TO THE TERMS OF USE, PLEASE DO NOT
              USE THE SERVICES.
            </p>
            <p className="mb-4">
              Information provided through this User Agreement is not intended to be, and must not
              be taken to be, the practice of veterinary medicine or the practice of other
              healthcare services by vee.vet. Use of the Services does not create a provider/patient
              relationship with vee.vet.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
