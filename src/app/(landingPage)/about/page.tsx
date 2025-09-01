import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "About | BTF",
};

const Page = () => {
  return (
    <>
      <div className="container_fluid">
        <h4 className="font-caprasimo clamp-[text,2.7rem,5.5rem] text-center clamp-[leading,3.6rem,6.72rem] clamp-[mb,5.25rem,7.75rem]">
          The BTF Story
        </h4>
      </div>

      <div className="bg-[#FFF9E9]">
        <div className="container_fluid py-[115px] text-[#310909] font-medium clamp-[text,lg,2xl] clamp-[leading,1.9rem,3.15rem] tracking-[0.32px]">
          <ul className="space-y-10">
            <li>
              <h3 className="font-bold">Our Mission</h3>
              <p>
                At Bring This Food, we are on a mission to redefine the
                last-mile logistics space. We&apos;re not just a delivery
                service; we&apos;re a technology company relentlessly focused on
                bringing efficiency, professionalism, and empowerment to every
                step of the journey. Our goal is to connect you with the best of
                what your community has to offer, all while creating a seamless,
                reliable experience that builds trust and loyalty.
              </p>
            </li>

            <li>
              <h3 className="font-bold">Our Story</h3>
              <p>
                Bring This Food was born from a personal frustration with the
                status quo. Our founder, Olomola Tejumade, a seasoned brand
                builder and entrepreneur, saw an industry that was underserved
                and chaotic. He saw an opportunity to build something truly
                useful.
                <br />
                <br />
                Fueled by the belief that a great brand is built on a promise
                kept, he set out to build a platform that delivers on that
                promise every single time. From our meticulous systems to our
                seamless technology, every detail has been designed to provide
                an experience that our customers, vendors, and riders can rely
                on.
              </p>
            </li>

            <li>
              <h3 className="font-bold">Our Promise to You</h3>

              <p>
                We believe that a great delivery service should be more than
                just a convenience; it should be a partnership.
              </p>

              <ul className="list-disc ml-6 mt-4 space-y-4">
                <li>
                  <span className="font-semibold">For Our Customers:</span> We
                  promise a professional, reliable, and fast delivery
                  experience. We are committed to getting your order to you on
                  time and in perfect condition.
                </li>
                <li>
                  <span className="font-semibold">For Our Vendors:</span> We
                  promise a platform that helps your business thrive. We provide
                  the tools and logistics you need to reach more customers,
                  increase your sales, and focus on what you do best.
                </li>
                <li>
                  <span className="font-semibold">For Our Riders:</span> We
                  promise an opportunity for empowerment. We provide riders with
                  the training and resources they need to be professional,
                  successful and earn competitively.
                </li>
              </ul>
            </li>

            <li>
              <h3 className="font-bold">Like to Partner With Us?</h3>
              <p>
                Are you a restaurant owner looking to expand your reach? A rider
                seeking a professional, reliable platform? Or an investor
                looking to be part of a high-growth, mission-driven business?
                We&apos;re always looking to grow our community with passionate
                partners. Reach out to us today and let&apos;s work together to
                build something that matters.
              </p>
            </li>

            <li>
              <h3 className="font-bold">Contact Us Today</h3>

              <ul className="list-disc ml-6 mt-4 space-y-4">
                <li>
                  <span className="font-semibold">Email:</span>{" "}
                  <a
                    href="mailto:info@bringthisfood.com"
                    className="font-semibold hover:underline"
                  >
                    info@bringthisfood.com
                  </a>
                </li>
                <li>
                  <span className="font-semibold">Phone:</span>{" "}
                  <a
                    href="tel:+2349036908590"
                    className="font-semibold hover:underline"
                  >
                    +2349036908590
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Page;
