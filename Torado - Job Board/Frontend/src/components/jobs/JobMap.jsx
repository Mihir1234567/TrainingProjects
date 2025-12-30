import React from "react";

/**
 * JobMap Component
 * Displays a placeholder map using Google Maps Embed API or a static image.
 * Uses an iframe for a more realistic look.
 */
const JobMap = ({ location }) => {
  // Use a generic query if location is not specific
  const query = location ? encodeURIComponent(location) : "New York, USA";

  return (
    <div className="bg-[#F5F7FC] rounded-lg p-8 pb-6">
      <h4 className="text-[18px] font-bold text-[#002333] mb-6">
        Employer Location
      </h4>
      <div className="w-full h-[250px] bg-slate-200 rounded-lg overflow-hidden relative">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src={`https://maps.google.com/maps?q=${query}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
          title="Job Location"
          className="w-full h-full border-0"
        ></iframe>
      </div>
    </div>
  );
};

export default JobMap;
