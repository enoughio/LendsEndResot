import React from "react";
import UnderlinedHeading from "./UnderlinedHeading";

const AboutOverview = () => {
  return (
    <div className="">
      <UnderlinedHeading title="Overview"/>

      {/* Text Content */}
      <p className="text-gray-700 md:text-lg xl:text-xl">
        Located in Taksim Gmsuyu, the heart of Istanbul, the CVK Park Bosphorus
        Hotel Istanbul has risen from the ashes of the historic Park Hotel,
        which also served as Foreign Affairs Palace 120 years ago and is hosting
        its guests by assuming this hospitality mission. With its 452 luxurious
        rooms and suites, 8500 m2 SPA and fitness area, 18 meeting rooms
        including 4 dividable ones and 3 terraces with Bosphorus view, Istanbuls
        largest terrace with Bosphorus view (4500 m2) and latest technology
        infrastructure, CVK Park Bosphorus Hotel Istanbul is destined to be the
        popular attraction point of the city. Room and suite categories at
        various sizes with city and Bosphorus view, as well as 68 separate
        luxury suites, are offered to its special guests as a wide variety of
        selection.
      </p>
    </div>
  );
};

export default AboutOverview;
