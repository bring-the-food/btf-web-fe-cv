import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  // description: "Welcome to our amazing website",
  openGraph: {
    title: "Privacy Policy",
    // description: "Welcome to our amazing website",
  },
};

const Page = () => {
  return (
    <>
      <div className="container_fluid">
        <h4 className="font-caprasimo clamp-[text,2.7rem,5.5rem] text-center clamp-[leading,3.6rem,6.72rem] clamp-[mb,5.25rem,7.75rem]">
          Privacy Policy
        </h4>
      </div>

      <div className="bg-[#FFF9E9]">
        <div className="container_fluid py-[115px] text-[#310909] font-medium clamp-[text,lg,2xl] clamp-[leading,1.9rem,3.15rem] tracking-[0.32px]">
          <p>
            <span className="font-semibold">Last Updated:</span> January 26,
            2026
          </p>
          <br />
          <p>
            This Privacy Policy describes how Bring this food logistics limited
            (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses,
            and shares your personal information when you use our services
            through our website or mobile applications (collectively, the
            &quot;Platform&quot;). It applies to all customers, vendors, and
            riders who use our services.
          </p>

          <br />

          <ul className="list-decimal space-y-10">
            <li>
              <h3 className="font-bold">Information We Collect</h3>

              <p>
                We collect information directly from you, from third parties,
                and automatically through your use of our Platform.
              </p>

              <div className="mt-6 space-y-6">
                <h5 className="font-semibold">Personal Information</h5>
                <ul className="list-disc ml-6 mt-4 space-y-4">
                  <li>
                    <span className="font-semibold">For Customers:</span> When
                    you create an account, we collect your name, phone number,
                    and delivery address. When you place an order, we collect
                    order details. We may collect your email address later in
                    your user journey to communicate with you about your account
                    and our services. Secure third-party payment processors
                    handle all payment information.
                  </li>
                  <li>
                    <span className="font-semibold">For Vendors:</span> When you
                    register your business, we collect your business name,
                    contact information, menu details, bank account information,
                    and other business-related data.
                  </li>
                  <li>
                    <span className="font-semibold">For Riders:</span> When you
                    apply to be a rider, we collect your name, contact
                    information, vehicle details, bank account information, and
                    other personal and professional information required for a
                    background check.
                  </li>
                </ul>
              </div>
            </li>

            <li>
              <h3 className="font-bold">How We Use Your Information</h3>
              <p>
                We use the information we collect for the following purposes:
              </p>

              <ul className="list-disc ml-6 mt-4 space-y-4">
                <li>
                  <span className="font-semibold">
                    To Provide Our Services:
                  </span>{" "}
                  To process and fulfill your orders, manage your account, and
                  provide customer support.
                </li>
                <li>
                  <span className="font-semibold">For Communication:</span> To
                  send you updates about your orders, important service
                  announcements, and promotional offers.
                </li>
                <li>
                  <span className="font-semibold">
                    To Improve Our Platform:
                  </span>{" "}
                  To analyze user behavior, troubleshoot technical issues, and
                  improve the functionality and features of our app and
                  services.
                </li>
                <li>
                  <span className="font-semibold">
                    For Security and Fraud Prevention:
                  </span>{" "}
                  To protect our Platform and its users from fraudulent activity
                  and unauthorized access.
                </li>
                <li>
                  <span className="font-semibold">
                    For Business Operations:
                  </span>{" "}
                  To process payments, calculate rider earnings, and manage our
                  relationships with vendors and riders.
                </li>
              </ul>
            </li>

            <li>
              <h3 className="font-bold">How We Share Your Information</h3>

              <p>We may share your information in the following ways:</p>

              <ul className="list-disc ml-6 mt-4 space-y-4">
                <li>
                  <span className="font-semibold">
                    With Vendors and Riders:
                  </span>{" "}
                  We share necessary information (like your name, delivery
                  address, and order details) with the vendor and the rider to
                  enable them to fulfill your order.
                </li>
                <li>
                  <span className="font-semibold">
                    With Third-Party Service Providers:
                  </span>{" "}
                  We work with third-party vendors, consultants, and other
                  service providers who need access to your information to
                  perform services on our behalf, such as payment processing,
                  data analysis, and marketing assistance.
                </li>
                <li>
                  <span className="font-semibold">
                    For Legal and Compliance Purposes:
                  </span>{" "}
                  We may disclose your information if required to do so by law,
                  to respond to legal requests, or to protect our rights,
                  property, or safety.
                </li>
              </ul>
            </li>

            <li>
              <h3 className="font-bold">Data Security</h3>
              <p>
                We take reasonable measures to protect the information we
                collect from loss, theft, misuse, unauthorized access,
                disclosure, alteration, and destruction. However, no data
                transmission over the internet or data storage system can be
                guaranteed to be 100% secure.
              </p>
            </li>

            <li>
              <h3 className="font-bold">Your Choices and Rights</h3>
              <p>
                You have certain rights regarding your personal information,
                including the right to:
              </p>
              <ul className="list-disc ml-6 mt-4 space-y-4">
                <li>Access and review your information.</li>
                <li>Correct or update your information.</li>
                <li>Request the deletion of your account and personal data</li>
                <li>
                  Opt-out of receiving promotional communications from us.
                </li>
              </ul>
            </li>

            <li>
              <h3 className="font-bold">Deleting your Account</h3>
              <p>
                You may delete your account at any time using either of the
                following methods:
              </p>
              <div className="mt-4 space-y-4">
                <div>
                  <span className="font-semibold">
                    1. Delete within the app
                  </span>
                  <p>
                    Navigate to the account settings in the app and select
                    &ldquo;Delete My Account.&rdquo; This will immediately and
                    permanently remove your account and all associated data.
                  </p>
                </div>
                <div>
                  <span className="font-semibold">2. Request via email</span>
                  <p>
                    Send an email to{" "}
                    <a
                      href="mailto:info@bringthisfood.com"
                      className="font-semibold hover:underline"
                    >
                      info@bringthisfood.com
                    </a>{" "}
                    with the subject line: &ldquo;Delete My Account.&rdquo;
                    Please include your registered email address and username.
                    We will process the deletion within 2-3 business days of
                    getting your request
                  </p>
                </div>
              </div>
              <p className="mt-4">
                Once your account is deleted, all personal data is permanently
                removed. We do not retain any information after deletion.
              </p>
            </li>

            <li>
              <h3 className="font-bold">Changes to This Privacy Policy</h3>
              <p>
                We may update this Privacy Policy from time to time. If we make
                any material changes, we will notify you by posting the new
                policy on the Platform and updating the &quot;Last Updated&quot;
                date at the top of this policy.
              </p>
            </li>

            <li>
              <h3 className="font-bold">Contact Us</h3>

              <p>
                If you have any questions about this Privacy Policy or our data
                practices, please contact us at:
              </p>
              <a
                href="mailto:info@bringthisfood.com"
                className="font-semibold hover:underline"
              >
                info@bringthisfood.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Page;
