import { useEffect } from "react";
import { Zap, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section className="bg-gradient-to-b from-pink-50 to-purple-50 overflow-hidden">
      <div className="container mx-auto px-6 py-6 lg:py-12 -mt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-6rem)]">
          {/* Left Content */}
          <div className="space-y-8" data-aos="fade-right">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">New Arrivals 2024</span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-6xl lg:text-7xl font-bold leading-tight text-gray-900">
                Next-Gen{" "}
                <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Electronics
                </span>
                <br />
                Await You
              </h1>

              <p
                className="text-lg text-gray-600 max-w-lg leading-relaxed"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                Experience the future of technology with our curated collection
                of premium gadgets and electronics. Quality guaranteed,
                innovation delivered.
              </p>
            </div>

            {/* Buttons */}
            <div
              className="flex flex-wrap gap-4"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <Link to={"/product"}>
                <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg cursor-pointer font-medium shadow-lg hover:opacity-90 transition-opacity flex items-center gap-2">
                  Shop Collection
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
              <button className="px-6 py-3 cursor-pointer border-2 border-gray-200 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Explore Deals
              </button>
            </div>

            {/* Stats */}
            <div
              className="flex gap-12 mt-12"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  500+
                </div>
                <div className="text-gray-500 text-sm mt-1">Products</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  50K+
                </div>
                <div className="text-gray-500 text-sm mt-1">Customers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  4.9
                </div>
                <div className="text-gray-500 text-sm mt-1">Rating</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div data-aos="fade-left" data-aos-delay="300">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <img
                  src="https://i.pinimg.com/1200x/99/64/a2/9964a202c67115b1f40714082848c312.jpg"
                  alt="Premium electronics collection"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Customer Card Overlay */}
              <div className="absolute bottom-8 left-8 right-8 bg-white rounded-2xl p-4 shadow-lg transform transition-transform duration-500 hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm border-2 border-white">
                        A
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm border-2 border-white">
                        C
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        2,847 Happy Customers
                      </div>
                      <div className="text-xs text-gray-500">This week</div>
                    </div>
                  </div>
                  <Star className="w-6 h-6 fill-pink-500 text-pink-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
