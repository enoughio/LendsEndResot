import { Metadata } from 'next';
import Fotter from '@/components/Fotter';
import { Heart, Target, Eye, Award, Users, Leaf, Shield, MapPin, Quote } from 'lucide-react';
import Image  from 'next/image';

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Land's End Resort at Sumiran Forest - our story, mission, and commitment to conservation. 600 acres of protected forest, 300 acres of woodland, 90 acres of water bodies, and 100 acres of organic farms.",
  openGraph: {
    title: "About Land's End Resort | Sumiran Forest Conservation",
    description: "Discover our story, mission, and commitment to protecting 600 acres of pristine forest near Bhopal with community-led conservation.",
    images: ['/about/aboutHero.png'],
  },
};


export default function AboutPage() {

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
  

      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[500px] overflow-hidden pt-3 sm:pt-0">
        <div className="absolute inset-0">
          <Image
            src="/about/aboutHero.png"
            alt="Sumiran Resort"
            className="w-full h-full object-cover"
            width={1920}
            height={600}
  />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center">
          <div className="text-white max-w-2xl">
            {/* <p className="text-green-400 mb-2 text-sm md:text-base">About Us</p> */}
            <h2 className="text-white mb-3 md:mb-4 text-2xl md:text-4xl lg:text-5xl">Living Lightly. Listening Deeply.</h2>
            <p className="text-base md:text-xl text-gray-200 leading-relaxed">
              Sumiran is not a resort in nature—it is nature, thoughtfully lived in.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
        {/* Our Story Section */}
        <section className="mb-12 md:mb-20">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="mb-4 md:mb-6">
                <h2 className="text-gray-900 text-2xl md:text-4xl">Our Story</h2>
                <div className="w-12 h-1 bg-green-600 mt-1"></div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
                Land&apos;s End Resort at Sumiran Forest is not a resort in nature—it is nature, thoughtfully lived in. Nestled near Bhopal, Madhya Pradesh, Sumiran represents a living ecological landscape, protected and nurtured through community stewardship.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
                Our vast landscape encompasses 300 acres of community-conserved forest, 90 acres of natural water bodies, 100 acres of organic farms, and 110+ acres of lush green forest cover. With an AQI consistently below 10 and naturally alkaline drinking water, Sumiran offers not just a retreat, but a return to harmony with the earth.
              </p>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                We believe in living lightly and listening deeply. Every experience here is designed to slow you down, help you breathe consciously, and reconnect with nature, self, and stories. Our commitment to sustainable living means all meals are organic and locally sourced, and we practice minimal waste and respectful coexistence with the forest and its inhabitants.
              </p>
            </div>
            <div className="relative order-1 md:order-2">
              <Image
                src="/gallery/riverrafting.jpeg"
                alt="Resort property"
                width={500}
                height={500}
                className="w-full h-[250px] md:h-[400px] object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-12 md:mb-20">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Mission */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-6 md:p-8 text-white">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-white/20 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <Target className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <h3 className="text-white mb-3 md:mb-4 text-xl md:text-2xl">Our Mission</h3>
              <p className="text-green-50 leading-relaxed text-sm md:text-base">
                To create immersive ecological living experiences that help people slow down, breathe consciously, and reconnect with nature, self, and stories. We practice respectful and sustainable living, minimizing our environmental impact while fostering deep connections between people, community, and the forest.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 md:p-8 text-white">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-white/20 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <Eye className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <h3 className="text-white mb-3 md:mb-4 text-xl md:text-2xl">Our Vision</h3>
              <p className="text-gray-200 leading-relaxed text-sm md:text-base">
                To be a sanctuary where forests, farms, and water bodies exist in harmonious balance, protected through mindful stewardship and sustainable practices. We envision Sumiran as a living example of community-conserved ecological landscapes where people can experience nature authentically while contributing to its preservation.
              </p>
            </div>
          </div>
        </section>

        {/* Message from Founder */}
        <section className="mb-12 md:mb-20">
          <div className="bg-gray-50 rounded-lg p-6 md:p-12">
            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6 mb-4 md:mb-6">
              <Quote className="w-10 h-10 md:w-12 md:h-12 text-green-600 flex-shrink-0" />
              <div>
                <h2 className="text-gray-900 mb-4 md:mb-6 text-xl md:text-3xl">A Message from Our Founder</h2>
                <div className="space-y-3 md:space-y-4">
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                    &quot;When we first set foot on this land, we knew we had found something special. The symphony of bird calls at dawn, the rustle of leaves as wildlife moved through the undergrowth, the pristine river flowing through ancient trees—it was nature in its purest form.
                  </p>
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                    At Sumiran, we believe that experiencing nature isn&apos;t just about seeing wildlife or enjoying beautiful landscapes. It&apos;s about understanding our place in the larger ecosystem, recognizing that we are guests in their home, and learning to tread lightly on this Earth.
                  </p>
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                    Over the years, I&apos;ve watched with immense pride as Sumiran has become more than just a resort. It&apos;s a community of passionate individuals—our dedicated team, supportive local partners, and thousands of guests who&apos;ve returned home as ambassadors for conservation.
                  </p>
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                    Whether you&apos;re here for a day or a week, I hope Sumiran touches your soul the way this forest touched mine. Welcome to our jungle home.&quot;
                  </p>
                </div>
                <div className="mt-6 md:mt-8 flex items-center gap-3 md:gap-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-300 rounded-full flex-shrink-0"></div>
                  <div>
                    <p className="text-gray-900 text-sm md:text-base">Dr. Arjun Malhotra</p>
                    <p className="text-gray-600 text-xs md:text-sm">Founder & Wildlife Conservationist</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-12 md:mb-20">
          <div className="mb-6 md:mb-8">
            <h2 className="text-gray-900 text-2xl md:text-4xl">What Defines Us</h2>
            <div className="w-12 h-1 bg-green-600 mt-1"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="p-5 md:p-6 border border-gray-200 rounded-lg hover:border-green-500 transition-colors">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                <Leaf className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
              </div>
              <h3 className="text-gray-900 mb-2 md:mb-3 text-base md:text-lg">Living Lightly</h3>
              <p className="text-gray-600 text-sm md:text-base">
                We practice minimal waste, use organic and locally sourced food, and tread lightly on the earth. Every choice we make honors the forest and its inhabitants.
              </p>
            </div>

            <div className="p-5 md:p-6 border border-gray-200 rounded-lg hover:border-green-500 transition-colors">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                <Heart className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
              </div>
              <h3 className="text-gray-900 mb-2 md:mb-3 text-base md:text-lg">Listening Deeply</h3>
              <p className="text-gray-600 text-sm md:text-base">
                We create space for slowing down, conscious breathing, and deep listening—to nature, to ourselves, and to each other&apos;s stories.
              </p>
            </div>

            <div className="p-5 md:p-6 border border-gray-200 rounded-lg hover:border-green-500 transition-colors">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                <Users className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
              </div>
              <h3 className="text-gray-900 mb-2 md:mb-3 text-base md:text-lg">Community Partnership</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Our success is intertwined with local communities. We employ locally, source locally, and invest in community development.
              </p>
            </div>

            <div className="p-5 md:p-6 border border-gray-200 rounded-lg hover:border-green-500 transition-colors">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                <Shield className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
              </div>
              <h3 className="text-gray-900 mb-2 md:mb-3 text-base md:text-lg">Responsible Tourism</h3>
              <p className="text-gray-600 text-sm md:text-base">
                We limit our guest capacity to minimize environmental impact and ensure quality experiences for both visitors and wildlife.
              </p>
            </div>
          </div>
        </section>

        {/* Awards & Recognition */}
        <section className="mb-12 md:mb-20">
          <div className="mb-6 md:mb-8">
            <h2 className="text-gray-900 text-2xl md:text-4xl">Awards & Recognition</h2>
            <div className="w-12 h-1 bg-green-600 mt-1"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="p-5 md:p-6 bg-green-50 rounded-lg">
              <Award className="w-8 h-8 md:w-10 md:h-10 text-green-600 mb-3 md:mb-4" />
              <h4 className="text-gray-900 mb-2 text-sm md:text-base">Best Eco-Resort 2023</h4>
              <p className="text-gray-600 mb-2 text-xs md:text-sm">National Tourism Board</p>
              <p className="text-xs md:text-sm text-gray-500">Recognized for outstanding commitment to sustainable tourism practices and environmental conservation.</p>
            </div>

            <div className="p-5 md:p-6 bg-green-50 rounded-lg">
              <Award className="w-8 h-8 md:w-10 md:h-10 text-green-600 mb-3 md:mb-4" />
              <h4 className="text-gray-900 mb-2 text-sm md:text-base">Wildlife Conservation Award</h4>
              <p className="text-gray-600 mb-2 text-xs md:text-sm">Wildlife Protection Society</p>
              <p className="text-xs md:text-sm text-gray-500">Honored for significant contributions to habitat preservation and wildlife corridor protection initiatives.</p>
            </div>

            <div className="p-5 md:p-6 bg-green-50 rounded-lg">
              <Award className="w-8 h-8 md:w-10 md:h-10 text-green-600 mb-3 md:mb-4" />
              <h4 className="text-gray-900 mb-2 text-sm md:text-base">Sustainable Business Leader</h4>
              <p className="text-gray-600 mb-2 text-xs md:text-sm">Green Tourism Council</p>
              <p className="text-xs md:text-sm text-gray-500">Acknowledged for implementing zero-waste operations and renewable energy systems across the resort.</p>
            </div>

            <div className="p-5 md:p-6 bg-green-50 rounded-lg">
              <Award className="w-8 h-8 md:w-10 md:h-10 text-green-600 mb-3 md:mb-4" />
              <h4 className="text-gray-900 mb-2 text-sm md:text-base">Community Impact Award</h4>
              <p className="text-gray-600 mb-2 text-xs md:text-sm">Regional Development Board</p>
              <p className="text-xs md:text-sm text-gray-500">Celebrated for creating sustainable livelihoods and supporting local community development programs.</p>
            </div>

            <div className="p-5 md:p-6 bg-green-50 rounded-lg">
              <Award className="w-8 h-8 md:w-10 md:h-10 text-green-600 mb-3 md:mb-4" />
              <h4 className="text-gray-900 mb-2 text-sm md:text-base">Excellence in Hospitality</h4>
              <p className="text-gray-600 mb-2 text-xs md:text-sm">Hospitality Industry Awards</p>
              <p className="text-xs md:text-sm text-gray-500">Awarded for maintaining exceptional service standards while upholding environmental responsibility.</p>
            </div>

            <div className="p-5 md:p-6 bg-green-50 rounded-lg">
              <Award className="w-8 h-8 md:w-10 md:h-10 text-green-600 mb-3 md:mb-4" />
              <h4 className="text-gray-900 mb-2 text-sm md:text-base">Heritage Conservation</h4>
              <p className="text-gray-600 mb-2 text-xs md:text-sm">Cultural Heritage Foundation</p>
              <p className="text-xs md:text-sm text-gray-500">Recognized for preserving indigenous knowledge and traditional forest management practices.</p>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="mb-12 md:mb-20">
          <div className="mb-6 md:mb-8">
            <h2 className="text-gray-900 text-2xl md:text-4xl">Meet Our Team</h2>
            <div className="w-12 h-1 bg-green-600 mt-1"></div>
            <p className="text-gray-600 mt-3 md:mt-4 text-sm md:text-base">
              Behind every memorable experience at Sumiran is a dedicated team of professionals who share a deep passion for nature and hospitality.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="text-center">
              <div className="w-20 h-20 md:w-32 md:h-32 bg-gray-300 rounded-full mx-auto mb-3 md:mb-4"></div>
              <h4 className="text-gray-900 mb-1 text-sm md:text-base">Dr. Arjun Malhotra</h4>
              <p className="text-gray-600 mb-1 md:mb-2 text-xs md:text-sm">Founder & Director</p>
              <p className="text-xs text-gray-500 hidden md:block">Wildlife Biologist with 20+ years in conservation</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 md:w-32 md:h-32 bg-gray-300 rounded-full mx-auto mb-3 md:mb-4"></div>
              <h4 className="text-gray-900 mb-1 text-sm md:text-base">Priya Sharma</h4>
              <p className="text-gray-600 mb-1 md:mb-2 text-xs md:text-sm">General Manager</p>
              <p className="text-xs text-gray-500 hidden md:block">15 years in luxury hospitality management</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 md:w-32 md:h-32 bg-gray-300 rounded-full mx-auto mb-3 md:mb-4"></div>
              <h4 className="text-gray-900 mb-1 text-sm md:text-base">Vikram Singh</h4>
              <p className="text-gray-600 mb-1 md:mb-2 text-xs md:text-sm">Chief Naturalist</p>
              <p className="text-xs text-gray-500 hidden md:block">Expert tracker with deep knowledge of local wildlife</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 md:w-32 md:h-32 bg-gray-300 rounded-full mx-auto mb-3 md:mb-4"></div>
              <h4 className="text-gray-900 mb-1 text-sm md:text-base">Meera Patel</h4>
              <p className="text-gray-600 mb-1 md:mb-2 text-xs md:text-sm">Sustainability Director</p>
              <p className="text-xs text-gray-500 hidden md:block">Environmental scientist focused on eco-tourism</p>
            </div>
          </div>

          <div className="mt-6 md:mt-8 p-4 md:p-6 bg-gray-50 rounded-lg text-center">
            <p className="text-gray-700 text-sm md:text-base">
              Our team includes 45+ dedicated professionals including naturalists, guides, hospitality staff, and conservation experts, 
              with 80% of our team members from local communities.
            </p>
          </div>
        </section>

        {/* Our Impact */}
        <section className="mb-12 md:mb-20">
          <div className="mb-6 md:mb-8">
            <h2 className="text-gray-900 text-2xl md:text-4xl">Our Conservation Impact</h2>
            <div className="w-12 h-1 bg-green-600 mt-1"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="order-2 md:order-1">
              <p className="text-gray-700 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
                Since 2015, we&apos;ve been committed to giving back more than we take. Our conservation initiatives go beyond maintaining our property—we actively work to restore and protect the broader ecosystem.
              </p>
              
              <div className="space-y-4 md:space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-2xl md:text-3xl text-green-600">10,000+</div>
                  </div>
                  <h4 className="text-gray-900 mb-1 text-sm md:text-base">Trees Planted</h4>
                  <p className="text-gray-600 text-xs md:text-sm">Native species reforestation across degraded areas of the forest reserve</p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-2xl md:text-3xl text-green-600">5 km</div>
                  </div>
                  <h4 className="text-gray-900 mb-1 text-sm md:text-base">Wildlife Corridors Protected</h4>
                  <p className="text-gray-600 text-xs md:text-sm">Secured critical pathways for elephant and tiger movement</p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-2xl md:text-3xl text-green-600">500+</div>
                  </div>
                  <h4 className="text-gray-900 mb-1 text-sm md:text-base">Students Educated</h4>
                  <p className="text-gray-600 text-xs md:text-sm">Annual environmental education programs for local school children</p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-2xl md:text-3xl text-green-600">100%</div>
                  </div>
                  <h4 className="text-gray-900 mb-1 text-sm md:text-base">Renewable Energy</h4>
                  <p className="text-gray-600 text-xs md:text-sm">Solar-powered operations with zero carbon emissions</p>
                </div>
              </div>
            </div>
            <Image
                src="/gallery/con1.jpeg"
              alt="Conservation efforts"
              width={500}
              height={500}
              className="w-full h-[250px] md:h-96 object-cover rounded-lg shadow-lg order-1 md:order-2"
            />
          </div>
        </section>

        {/* Location */}
        <section className="mb-12 md:mb-20">
          <div className="mb-6 md:mb-8">
            <h2 className="text-gray-900 text-2xl md:text-4xl">Where We Are</h2>
            <div className="w-12 h-1 bg-green-600 mt-1"></div>
          </div>

          <div className="bg-gray-50 rounded-lg p-5 md:p-8">
            <div className="flex items-start gap-3 md:gap-4">
              <MapPin className="w-5 h-5 md:w-6 md:h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-gray-900 mb-2 md:mb-3 text-lg md:text-xl">Land&apos;s End Resort, Sumiran Forest</h3>
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-4 text-sm md:text-base">
                  Located near Bhopal, Madhya Pradesh, Sumiran Forest is a living ecological landscape spanning over 600 acres. Our community-conserved space includes 300 acres of forest, 90 acres of natural water bodies, 100 acres of organic farms, and 110+ acres of green forest cover.
                </p>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                  With an AQI consistently below 10, Sumiran offers some of the cleanest air in India. Our naturally alkaline drinking water comes straight from the earth, pure and nourishing. Sumiran is not just a destination—it&apos;s a sanctuary where forests, farms, and water bodies exist in harmonious balance, protected through mindful stewardship and sustainable practices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl md:rounded-2xl p-6 md:p-12 text-center text-white">
          <h2 className="text-white mb-3 md:mb-4 text-xl md:text-3xl">Become Part of Our Story</h2>
          <p className="text-base md:text-xl text-green-50 mb-6 md:mb-8 max-w-2xl mx-auto">
            Join us in our mission to protect nature while creating unforgettable memories. Your visit directly supports conservation efforts and local communities.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            <button className="w-full sm:w-auto px-6 md:px-8 py-2.5 md:py-3 bg-white text-green-600 rounded-lg hover:bg-gray-100 transition-colors text-sm md:text-base">
              Plan Your Visit
            </button>
            <button className="w-full sm:w-auto px-6 md:px-8 py-2.5 md:py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors text-sm md:text-base">
              Contact Us
            </button>
          </div>
        </section>
      </div>

    <Fotter />
    </div>
  );
}