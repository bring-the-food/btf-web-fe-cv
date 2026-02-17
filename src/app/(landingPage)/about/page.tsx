import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  // description: "Welcome to our amazing website",
  openGraph: {
    title: "About",
    // description: "Welcome to our amazing website",
  },
};

const Page = () => {
  return (
    <>
      <div className="container_fluid">
        <h4 className="font-caprasimo clamp-[text,2.7rem,5.5rem] text-center clamp-[leading,3.6rem,6.72rem] clamp-[mb,5.25rem,7.75rem]">
          About BTF
        </h4>
      </div>

      <div className="bg-[#FFF9E9]">
        <div className="container_fluid py-[115px] text-[#310909] font-medium clamp-[text,lg,2xl] clamp-[leading,1.9rem,3.15rem] tracking-[0.32px]">
          <ul className="space-y-10">
            <li>
              <h3 className="font-bold">About Us</h3>
              <p>
                Bring This Food (BTF) builds technology that empowers the food
                industry. Our solutions help restaurants, grocery vendors, and
                food entrepreneurs run smarter, faster, and more connected
                businesses.
              </p>
            </li>

            <li>
              {/* <h3 className="font-bold">Our Story</h3> */}
              <p>
                We provide digital platforms that simplify ordering, payments,
                and customer engagement. Our analytics tools give businesses
                insights into customer trends and operations, while our
                integrations connect food businesses seamlessly with customers
                and partners.
                <br />
                <br />
                Food is at the heart of every community, and technology should
                make it easier for businesses to grow, serve, and succeed.
                That&apos;s why BTF is creating the digital backbone of
                today&apos;s food industry.
              </p>
            </li>

            <li>
              <h3 className="font-bold">Who We Serve</h3>

              {/* <p>
                We believe that a great delivery service should be more than
                just a convenience; it should be a partnership.
              </p> */}

              <ul className="list-disc ml-6 mt-4 space-y-4">
                <li>
                  <span className="font-semibold">Restaurants and cafés:</span>{" "}
                  We streamlined operations and stronger customer engagement.
                </li>
                <li>
                  <span className="font-semibold">Grocery vendors:</span>{" "}
                  Digital tools to manage inventory, track sales, and connect
                  with customers.
                </li>
                <li>
                  <span className="font-semibold">
                    Food vendors and caterers:
                  </span>{" "}
                  Platforms to expand reach and simplify management.
                </li>
                <li>
                  <span className="font-semibold">Delivery partners:</span>{" "}
                  Technology that ensures reliability and transparency.
                </li>
                <li>
                  <span className="font-semibold">
                    Collaborators and investors:
                  </span>{" "}
                  Opportunities to shape the future of food-tech together.
                </li>
              </ul>
            </li>

            <li>
              <h3 className="font-bold">Our Vision</h3>
              <p>
                We see a food industry where technology is not just support, but
                a driver of growth — connecting people, businesses, and
                communities through smarter systems.
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
                    href="https://wa.me/2349113727132"
                    className="font-semibold hover:underline"
                    target="_blank"
                  >
                    +2349113727132
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
