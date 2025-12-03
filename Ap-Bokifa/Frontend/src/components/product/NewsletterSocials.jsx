import React from "react";

export default function NewsletterSocials() {
  return (
    <section className="bg-white py-12 md:py-16 px-6 border-y border-gray-200">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* LEFT: Title + Description */}
        <div className="space-y-4">
          <h2 className="text-4xl font-serif text-gray-900">
            Stay in the know
          </h2>
          <p className="text-gray-600 text-base leading-relaxed max-w-xl">
            Subscribe to our newsletter and stay updated on latest offers,
            discounts and events near you.
          </p>
        </div>

        {/* RIGHT: Input + Socials */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-end gap-6 w-full">
          {/* subscription input */}
          <form
            className="w-full lg:w-[620px]"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative">
              <input
                type="email"
                aria-label="Email"
                placeholder="Email id"
                className="w-full bg-gray-50 rounded-full py-4 pl-6 pr-36 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-0"
              />

              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 bg-transparent text-green-800 font-medium px-6 rounded-full inline-flex items-center gap-2 hover:bg-white  transition-all duration-300 focus:outline-none"
                aria-label="Subscribe"
              >
                <span className="hidden sm:inline">Subscribe</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </form>

          {/* Social icons (hard-coded). On small screens they will center under the input. */}
          <div className="flex gap-3 items-center justify-center lg:justify-start w-full lg:w-auto">
            {/* outer square: white background, thin border; inner circle contains colored background + white svg */}

            {/* Facebook */}
            <a
              href="#"
              aria-label="Facebook"
              className="inline-flex items-center justify-center w-12 h-12 p-1 bg-white  rounded-full  hover:shadow-xl transition-transform transform hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#1877F2]">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  role="img"
                  viewBox="0 0 18 18"
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                >
                  <path d="M16.42.61c.27 0 .5.1.69.28.19.2.28.42.28.7v15.44c0 .27-.1.5-.28.69a.94.94 0 01-.7.28h-4.39v-6.7h2.25l.31-2.65h-2.56v-1.7c0-.4.1-.72.28-.93.18-.2.5-.32 1-.32h1.37V3.35c-.6-.06-1.27-.1-2.01-.1-1.01 0-1.83.3-2.45.9-.62.6-.93 1.44-.93 2.53v1.97H7.04v2.65h2.24V18H.98c-.28 0-.5-.1-.7-.28a.94.94 0 01-.28-.7V1.59c0-.27.1-.5.28-.69a.94.94 0 01.7-.28h15.44z" />
                </svg>
              </div>
            </a>

            {/* X */}
            <a
              href="#"
              aria-label="X"
              className="inline-flex items-center justify-center w-12 h-12 p-1 bg-white  rounded-full hover:shadow-xl transition-transform transform hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-5 h-5 text-white"
                >
                  <path d="M9.4893 6.77491L15.3176 0H13.9365L8.87577 5.88256L4.8338 0H0.171875L6.28412 8.89547L0.171875 16H1.55307L6.8973 9.78782L11.1659 16H15.8278L9.48896 6.77491H9.4893ZM7.59756 8.97384L6.97826 8.08805L2.05073 1.03974H4.17217L8.14874 6.72795L8.76804 7.61374L13.9371 15.0075H11.8157L7.59756 8.97418V8.97384Z" />
                </svg>
              </div>
            </a>

            {/* Instagram */}
            <a
              href="#"
              aria-label="Instagram"
              className="inline-flex items-center justify-center w-12 h-12 p-1 bg-white  rounded-full hover:shadow-xl transition-transform transform hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af]">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  role="img"
                  viewBox="0 0 18 18"
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                >
                  <path d="M8.77 1.58c2.34 0 2.62.01 3.54.05.86.04 1.32.18 1.63.3.41.17.7.35 1.01.66.3.3.5.6.65 1 .12.32.27.78.3 1.64.05.92.06 1.2.06 3.54s-.01 2.62-.05 3.54a4.79 4.79 0 01-.3 1.63c-.17.41-.35.7-.66 1.01-.3.3-.6.5-1.01.66-.31.12-.77.26-1.63.3-.92.04-1.2.05-3.54.05s-2.62 0-3.55-.05a4.79 4.79 0 01-1.62-.3c-.42-.16-.7-.35-1.01-.66-.31-.3-.5-.6-.66-1a4.87 4.87 0 01-.3-1.64c-.04-.92-.05-1.2-.05-3.54s0-2.62.05-3.54c.04-.86.18-1.32.3-1.63.16-.41.35-.7.66-1.01.3-.3.6-.5 1-.65.32-.12.78-.27 1.63-.3.93-.05 1.2-.06 3.55-.06zm0-1.58C6.39 0 6.09.01 5.15.05c-.93.04-1.57.2-2.13.4-.57.23-1.06.54-1.55 1.02C1 1.96.7 2.45.46 3.02c-.22.56-.37 1.2-.4 2.13C0 6.1 0 6.4 0 8.77s.01 2.68.05 3.61c.04.94.2 1.57.4 2.13.23.58.54 1.07 1.02 1.56.49.48.98.78 1.55 1.01.56.22 1.2.37 2.13.4.94.05 1.24.06 3.62.06 2.39 0 2.68-.01 3.62-.05.93-.04 1.57-.2 2.13-.41a4.27 4.27 0 001.55-1.01c.49-.49.79-.98 1.01-1.56.22-.55.37-1.19.41-2.13.04-.93.05-1.23.05-3.61 0-2.39 0-2.68-.05-3.62a6.47 6.47 0 00-.4-2.13 4.27 4.27 0 00-1.02-1.55A4.35 4.35 0 0014.52.46a6.43 6.43 0 00-2.13-.41A69 69 0 008.77 0z" />
                  <path d="M8.8 4a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 7.43a2.92 2.92 0 110-5.85 2.92 2.92 0 010 5.85zM13.43 5a1.05 1.05 0 100-2.1 1.05 1.05 0 000 2.1z" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
