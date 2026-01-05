import React from "react";
import { Link } from "react-router-dom";
import MattersToUs from "../components/common/MattersToUs";

const FadeInSection = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const domRef = React.useRef();

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    });

    const { current } = domRef;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-700 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const PrivacyPolicy = () => {
  const privacyData = [
    {
      title: "Great New Apartments In The Best Cities",
      content: (
        <>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua{" "}
          <span className="text-[#5BBB7B]">Torado </span>
          commodo viverr maecenas accumsan lacus vel facilisis lorem ipsum is
          simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industry's standard dummy text ever since the
          specimen book. It has survived not only five centuries specimen book.
          It has survived not only five centuries when an unknown specimen book.
          It has survived not only five centuries printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five.
        </>
      ),
    },
    {
      title: (
        <>
          <span className="text-[#5BBB7B]">Torado</span> From Connecting With
          Potential Employers Today
        </>
      ),
      content: (
        <>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua quis ipsum
          suspendisse ultrices gravida. Risus commodo viverr maecenas accumsan
          lacus vel facilisis. Lorem Ipsum is simply dummy text of the printing
          and typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text specimen book. It has survived not only five centuries
          specimen book. It has survived not only five centuries ever since the
          when an unknown printer took a galley of type and scrambled it to make
          a type specimen book. It has survived not onlyspecimen book. It has
          survived not only five centuries five.
        </>
      ),
    },
    {
      title: "Hey Job Seeker, It's Time To Get Up And Get Hired",
      content: (
        <>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua quis ipsum
          suspendisse ultrices gravida. Risus commodo viverr maecenas accumsan
          lacus vel facilisis. Lorem Ipsum is simply dummy text of the printing
          and typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the when an unknown printer took a galley of
          type and scrambled it to make a type specimen book. It has survived
          not only not only five centuries.Lorem Ipsum is simply dummy text of
          the printing and typesetting industry. Lorem Ipsum hasspecimen book.
          It has survived not only five centuries been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled.
        </>
      ),
    },
    {
      title: "Hey Job Pleaders, It's Period To Get Up And Get Hiring",
      content: (
        <>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua quis ipsum
          suspendisse ultrices gravida. Risus commodo viverr maecenas accumsan
          lacus vel facilisis. Lorem Ipsum is simply dummy text of the printing
          and typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the when an unknown printer took a galley of
          type and scrambled it to make a type specimen book. It has survived
          not onlyspecimen book. It has survived not only five centuries five.
        </>
      ),
    },
    {
      title: "How To Improve Digital Marketing For Fast SEO",
      content: (
        <>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua quis ipsum
          suspendisse ultrices gravida. Risus commodo viverr maecenas accumsan
          lacus vel facilisis. Lorem Ipsum is simply dummy text of the printing
          and typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever specimen book. It has survived not only five centuries
          specimen book. It has survived not only five centuries since the when
          an unknown printer took a galley of type and scrambled it to make a
          type specimen book. It has specimen book. It has survived not only
          five centuries survived not only five.
        </>
      ),
    },
    {
      title: "We Treat All Our Employees In A Friendly Manner",
      content: (
        <>
          Lorem ipsum dolor sit amet, consectetur adipiscing typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the when an unknown printer took a galley of type and scrambled
          it to make a type specimen book. It has specimen book. It has survived
          not only not only five centuries survived not only five
          centuries.Lorem Ipsum is simply dummy text.
        </>
      ),
    },
    {
      title: "How To Make a Perfect Cv That Attracts the Attention",
      content: (
        <>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
          <span className="text-[#5BBB7B]">Torado</span>
          Ipsum suspendisse ultriciy five centuries text ever since the specimen
          book. It has survived not only five centuries specimen book. It has
          survived not only five centuries when specimen book. It has survived
          not only five centuries when specimen book. It has survived not only
          five centuries an unknown printer took a galley of type and scrambled
          it to make a type specimen book. It has survived not only five.
        </>
      ),
    },
    {
      title: "Hey Job Seeker, It's Time To Get Up And Get Hired",
      content: (
        <>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua quis ipsum
          suspendisse ultrices gravida. Risus commodo viverr maecenas accumsan
          lacus vel facilisis. Lorem Ipsum is simply dummy text of the printing
          typesetting industry centuries centuries{" "}
          <span className="text-[#5BBB7B]">hello@torado.com</span> Lorem Ipsum
          is simply dummy text of the printing specimen book. It has survived
          only five centuries and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s.
        </>
      ),
    },
  ];

  return (
    <main className="font-sans text-[#002333]">
      {/* 1. Page Header */}
      <section className="bg-[#f0f5fa] py-10 md:py-20 text-center border-b border-slate-100">
        <FadeInSection>
          <h1 className="text-2xl md:text-[40px] font-bold text-[#002333] mb-3 tracking-tight">
            Privacy Policy
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm md:text-[15px] font-medium">
            <Link
              to="/"
              className="text-slate-500 hover:text-[#5BBB7B] transition-colors"
            >
              Home
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-[#5BBB7B]">Privacy Policy</span>
          </div>
        </FadeInSection>
      </section>

      {/* 2. Text Content */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {privacyData.map((item, idx) => (
            <FadeInSection key={idx} delay={idx * 100}>
              <h3 className="text-lg font-bold text-[#002333] mb-4">
                {item.title}
              </h3>
              <p className="text-gray-500 text-[15px] md:text-base font-medium leading-[2.2]">
                {item.content}
              </p>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* 3. Matters To You */}
      <FadeInSection delay={100}>
        <MattersToUs
          title="What Matters To You Matters To Us"
          description="Salary. Diversity. Benefits. Location. Everything you're looking for."
          ctaTitle="On Untapped, You Own Your Story!"
          ctaDescription="Unlike other job platforms, we never assume your gender, race or ethnicity."
          ctaButtonText="Read Why"
        />
      </FadeInSection>
    </main>
  );
};

export default PrivacyPolicy;
