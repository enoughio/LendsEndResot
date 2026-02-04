import { TreePine, Heart, Target, Eye, Award, Users, Leaf, Shield, MapPin, Quote } from 'lucide-react';
import Image  from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-slate-800 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <TreePine className="w-6 h-6" />
              <h1 className="text-white">Sumiran Resort</h1>
            </div>
            <nav className="flex items-center gap-6">
              <a href="#" className="text-white hover:text-green-400 transition-colors">Resort</a>
              <a href="#" className="text-white hover:text-green-400 transition-colors border-b-2 border-green-500 pb-1">About</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {/* TODO: Re-enable booking functionality */}
            {/* <button className="px-4 py-2 border border-white rounded-lg hover:bg-white/10 transition-colors">
              Book Now
            </button> */}
            <button className="px-4 py-2 bg-white text-slate-800 rounded-lg hover:bg-gray-100 transition-colors">
              Free Call
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-teal-500 rounded-full"></div>
              <span className="text-sm">Guest</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
          width={1920}
          height={600}
            src="https://images.unsplash.com/photo-1767324672969-48e788321404?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqdW5nbGUlMjByZXNvcnQlMjBuaWdodCUyMHN0YXJzfGVufDF8fHx8MTc3MDE4OTIyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Sumiran Resort"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <p className="text-green-400 mb-2">About Us</p>
            <h2 className="text-white mb-4">Where Nature Meets Soul</h2>
            <p className="text-xl text-gray-200 leading-relaxed">
              For nearly a decade, we&apos;ve been creating meaningful connections between people and nature, one experience at a time.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Our Story Section */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <h2 className="text-gray-900">Our Story</h2>
                <div className="w-12 h-1 bg-green-600 mt-1"></div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                Land&apos;s End Resort at Sumiran Forest is not a resort in nature—it is nature, thoughtfully lived in. Nestled near Bhopal, Madhya Pradesh, Sumiran represents a living ecological landscape, protected and nurtured through community stewardship.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Our vast landscape encompasses 300 acres of community-conserved forest, 90 acres of natural water bodies, 100 acres of organic farms, and 110+ acres of lush green forest cover. With an AQI consistently below 10 and naturally alkaline drinking water, Sumiran offers not just a retreat, but a return to harmony with the earth.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We believe in living lightly and listening deeply. Every experience here is designed to slow you down, help you breathe consciously, and reconnect with nature, self, and stories. Our commitment to sustainable living means all meals are organic and locally sourced, and we practice minimal waste and respectful coexistence with the forest and its inhabitants.
              </p>
            </div>
            <div className="relative">
              <Image
                width={800}
                height={400}
                src="https://images.unsplash.com/photo-1565214988145-8e826f79d8c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXNvcnQlMjBqdW5nbGUlMjBidWlsZGluZ3xlbnwxfHx8fDE3NzAxODkyMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Resort property"
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-8 text-white">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-white mb-4">Our Mission</h3>
              <p className="text-green-50 leading-relaxed">
                To provide transformative wilderness experiences that inspire conservation, foster environmental stewardship, and create lasting connections between people and nature. We are committed to operating with the highest standards of sustainability while supporting local communities and protecting wildlife habitats for future generations.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-8 text-white">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-white mb-4">Our Vision</h3>
              <p className="text-gray-200 leading-relaxed">
                To be recognized globally as a pioneer in sustainable jungle tourism, where luxury and conservation coexist seamlessly. We envision a future where Sumiran serves as a model for eco-tourism, demonstrating that world-class hospitality can thrive in harmony with nature while actively contributing to wildlife preservation and community development.
              </p>
            </div>
          </div>
        </section>


        {/* Message from Founder */}
        <section className="mb-20">
          <div className="bg-gray-50 rounded-lg p-12">
            <div className="flex items-start gap-6 mb-6">
              <Quote className="w-12 h-12 text-green-600 shrink-0" />
              <div>
                <h2 className="text-gray-900 mb-6">A Message from Our Founder</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    &quot;When we first set foot on this land, we knew we had found something special. The symphony of bird calls at dawn, the rustle of leaves as wildlife moved through the undergrowth, the pristine river flowing through ancient trees—it was nature in its purest form, and it needed to be shared, but responsibly.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    At Sumiran, we believe that experiencing nature isn&apos;t just about seeing wildlife or enjoying beautiful landscapes. It&apos;s about understanding our place in the larger ecosystem, recognizing that we are guests in their home, and learning to tread lightly on this Earth. Every guest who walks through our gates becomes part of our conservation story.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Over the years, I&apos;ve watched with immense pride as Sumiran has become more than just a resort. It&apos;s a community of passionate individuals—our dedicated team, supportive local partners, and thousands of guests who&apos;ve returned home as ambassadors for conservation. Together, we&apos;ve planted over 10,000 trees, protected critical wildlife corridors, and supported education programs for local children.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Whether you&apos;re here for a day or a week, I hope Sumiran touches your soul the way this forest touched mine. Welcome to our jungle home.&quot;
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                  <div>
                    <p className="text-gray-900">Dr. Arjun Malhotra</p>
                    <p className="text-gray-600">Founder & Wildlife Conservationist</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-gray-900">What Defines Us</h2>
            <div className="w-12 h-1 bg-green-600 mt-1"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 border border-gray-200 rounded-lg hover:border-green-500 transition-colors">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-gray-900 mb-3">Conservation First</h3>
              <p className="text-gray-600">
                Every decision we make prioritizes the wellbeing of the forest and its inhabitants. We&apos;re stewards, not owners, of this land.
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg hover:border-green-500 transition-colors">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-gray-900 mb-3">Authentic Experiences</h3>
              <p className="text-gray-600">
                We believe in genuine connections with nature. No artificial experiences, just raw, unfiltered wilderness encounters.
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg hover:border-green-500 transition-colors">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-gray-900 mb-3">Community Partnership</h3>
              <p className="text-gray-600">
                Our success is intertwined with local communities. We employ locally, source locally, and invest in community development.
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg hover:border-green-500 transition-colors">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-gray-900 mb-3">Responsible Tourism</h3>
              <p className="text-gray-600">
                We limit our guest capacity to minimize environmental impact and ensure quality experiences for both visitors and wildlife.
              </p>
            </div>
          </div>
        </section>

        {/* Awards & Recognition */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-gray-900">Awards & Recognition</h2>
            <div className="w-12 h-1 bg-green-600 mt-1"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-green-50 rounded-lg">
              <Award className="w-10 h-10 text-green-600 mb-4" />
              <h4 className="text-gray-900 mb-2">Best Eco-Resort 2023</h4>
              <p className="text-gray-600 mb-2">National Tourism Board</p>
              <p className="text-sm text-gray-500">Recognized for outstanding commitment to sustainable tourism practices and environmental conservation.</p>
            </div>

            <div className="p-6 bg-green-50 rounded-lg">
              <Award className="w-10 h-10 text-green-600 mb-4" />
              <h4 className="text-gray-900 mb-2">Wildlife Conservation Award</h4>
              <p className="text-gray-600 mb-2">Wildlife Protection Society</p>
              <p className="text-sm text-gray-500">Honored for significant contributions to habitat preservation and wildlife corridor protection initiatives.</p>
            </div>

            <div className="p-6 bg-green-50 rounded-lg">
              <Award className="w-10 h-10 text-green-600 mb-4" />
              <h4 className="text-gray-900 mb-2">Sustainable Business Leader</h4>
              <p className="text-gray-600 mb-2">Green Tourism Council</p>
              <p className="text-sm text-gray-500">Acknowledged for implementing zero-waste operations and renewable energy systems across the resort.</p>
            </div>

            <div className="p-6 bg-green-50 rounded-lg">
              <Award className="w-10 h-10 text-green-600 mb-4" />
              <h4 className="text-gray-900 mb-2">Community Impact Award</h4>
              <p className="text-gray-600 mb-2">Regional Development Board</p>
              <p className="text-sm text-gray-500">Celebrated for creating sustainable livelihoods and supporting local community development programs.</p>
            </div>

            <div className="p-6 bg-green-50 rounded-lg">
              <Award className="w-10 h-10 text-green-600 mb-4" />
              <h4 className="text-gray-900 mb-2">Excellence in Hospitality</h4>
              <p className="text-gray-600 mb-2">Hospitality Industry Awards</p>
              <p className="text-sm text-gray-500">Awarded for maintaining exceptional service standards while upholding environmental responsibility.</p>
            </div>

            <div className="p-6 bg-green-50 rounded-lg">
              <Award className="w-10 h-10 text-green-600 mb-4" />
              <h4 className="text-gray-900 mb-2">Heritage Conservation</h4>
              <p className="text-gray-600 mb-2">Cultural Heritage Foundation</p>
              <p className="text-sm text-gray-500">Recognized for preserving indigenous knowledge and traditional forest management practices.</p>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-gray-900">Meet Our Team</h2>
            <div className="w-12 h-1 bg-green-600 mt-1"></div>
            <p className="text-gray-600 mt-4">
              Behind every memorable experience at Sumiran is a dedicated team of professionals who share a deep passion for nature and hospitality.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h4 className="text-gray-900 mb-1">Dr. Arjun Malhotra</h4>
              <p className="text-gray-600 mb-2">Founder & Director</p>
              <p className="text-sm text-gray-500">Wildlife Biologist with 20+ years in conservation</p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h4 className="text-gray-900 mb-1">Priya Sharma</h4>
              <p className="text-gray-600 mb-2">General Manager</p>
              <p className="text-sm text-gray-500">15 years in luxury hospitality management</p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h4 className="text-gray-900 mb-1">Vikram Singh</h4>
              <p className="text-gray-600 mb-2">Chief Naturalist</p>
              <p className="text-sm text-gray-500">Expert tracker with deep knowledge of local wildlife</p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h4 className="text-gray-900 mb-1">Meera Patel</h4>
              <p className="text-gray-600 mb-2">Sustainability Director</p>
              <p className="text-sm text-gray-500">Environmental scientist focused on eco-tourism</p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-lg text-center">
            <p className="text-gray-700">
              Our team includes 45+ dedicated professionals including naturalists, guides, hospitality staff, and conservation experts, 
              with 80% of our team members from local communities.
            </p>
          </div>
        </section>

        {/* Our Impact */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-gray-900">Our Conservation Impact</h2>
            <div className="w-12 h-1 bg-green-600 mt-1"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <Image
              width={800}
              height={384}
              src="https://images.unsplash.com/photo-1767601047787-f2a9194e6749?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBjb25zZXJ2YXRpb24lMjBuYXR1cmV8ZW58MXx8fHwxNzcwMTM1MjMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Conservation efforts"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            <div>
              <p className="text-gray-700 leading-relaxed mb-6">
                Since 2015, we&apos;ve been committed to giving back more than we take. Our conservation initiatives go beyond maintaining our property—we actively work to restore and protect the broader ecosystem.
              </p>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-3xl text-green-600">10,000+</div>
                  </div>
                  <h4 className="text-gray-900 mb-1">Trees Planted</h4>
                  <p className="text-gray-600">Native species reforestation across degraded areas of the forest reserve</p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-3xl text-green-600">5 km</div>
                  </div>
                  <h4 className="text-gray-900 mb-1">Wildlife Corridors Protected</h4>
                  <p className="text-gray-600">Secured critical pathways for elephant and tiger movement</p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-3xl text-green-600">500+</div>
                  </div>
                  <h4 className="text-gray-900 mb-1">Students Educated</h4>
                  <p className="text-gray-600">Annual environmental education programs for local school children</p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-3xl text-green-600">100%</div>
                  </div>
                  <h4 className="text-gray-900 mb-1">Renewable Energy</h4>
                  <p className="text-gray-600">Solar-powered operations with zero carbon emissions</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-gray-900">Where We Are</h2>
            <div className="w-12 h-1 bg-green-600 mt-1"></div>
          </div>

          <div className="bg-gray-50 rounded-lg p-8">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-gray-900 mb-2">Land&apos;s End Resort, Sumiran Forest</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Located near Bhopal, Madhya Pradesh, Sumiran Forest is a living ecological landscape spanning over 600 acres. Our community-conserved space includes 300 acres of forest, 90 acres of natural water bodies, 100 acres of organic farms, and 110+ acres of green forest cover.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  With an AQI consistently below 10, Sumiran offers some of the cleanest air in India. Our naturally alkaline drinking water comes straight from the earth, pure and nourishing.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Sumiran is not just a destination—it&apos;s a sanctuary where forests, farms, and water bodies exist in harmonious balance, protected through mindful stewardship and sustainable practices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-12 text-center text-white">
          <h2 className="text-white mb-4">Become Part of Our Story</h2>
          <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
            Join us in our mission to protect nature while creating unforgettable memories. Your visit directly supports conservation efforts and local communities.
          </p>
          <div className="flex items-center justify-center gap-4">
            {/* TODO: Re-enable booking functionality */}
            {/* <button className="px-8 py-3 bg-white text-green-600 rounded-lg hover:bg-gray-100 transition-colors">
              Plan Your Visit
            </button> */}
            <button className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors">
              Contact Us
            </button>
          </div>
        </section>
      </div>

          </div>
  );
}



