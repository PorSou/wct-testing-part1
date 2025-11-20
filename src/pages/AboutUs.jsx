import React, { useEffect } from "react";
import { teamMembers } from "../data";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AboutUs() {
  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-in-out" });
  }, []);

  return (
    <div className="w-full flex flex-col gap-32">
      {/* Top Section */}
      <section
        className="w-full bg-blue-100/50 py-28"
        data-aos="fade-down"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-20 lg:px-32 flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-2xl space-y-6">
            <h2 className="text-5xl font-extrabold text-purple-800">
              About <span className="text-pink-700">Electronics</span>
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              A simple and trusted platform where electronics enthusiasts and
              businesses connect and grow.
            </p>
            <button className="mt-4 bg-purple-500 text-white px-8 py-3 rounded-xl shadow hover:bg-purple-700 transition transform hover:-translate-y-1 hover:scale-105">
              Learn More
            </button>
          </div>

          <img
            src="https://cdn-icons-png.flaticon.com/512/1048/1048949.png"
            alt="Electronics Illustration"
            className="w-64 md:w-96 mt-10 md:mt-0 drop-shadow-lg rounded-xl"
            data-aos="zoom-in"
          />
        </div>
      </section>

      {/* Middle Section */}
      <section className=" max-w-7xl mx-auto px-6 md:px-20 lg:px-32 grid md:grid-cols-2 gap-16 items-start">
        <img
          src="https://i.pinimg.com/736x/35/47/48/354748471cbad482eccf036d1db1a86c.jpg"
          alt="Electronics Work"
          className="w-full rounded-xl shadow-lg object-cover h-96"
          data-aos="fade-right"
        />

        <div className="space-y-5 mt-15" data-aos="fade-left" data-aos-delay="100">
          <h3 className="text-3xl font-bold text-purple-900">Who We Are</h3>
          <p className="text-gray-700 leading-relaxed text-lg">
            Our platform is dedicated to the electronics field, created to
            empower enthusiasts and professionals to find projects quickly and
            collaborate effectively. We connect electronics makers, developers,
            and engineers with businesses seeking reliable technical support.
            From circuit design to robotics, IoT development, and embedded
            systems, we make innovation easier for everyone.
          </p>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-20 lg:px-32 grid md:grid-cols-2 gap-16">
        <div
          className="p-8 bg-white rounded-2xl shadow-md space-y-4 border border-gray-200 transform hover:-translate-y-2 hover:shadow-xl transition"
          data-aos="fade-up"
        >
          <h4 className="text-2xl font-bold text-orange-500">Our Vision</h4>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our vision is to create a trusted platform where electronics
            hobbyists, students, and professionals collaborate to bring ideas to
            life. We aim to encourage innovation, creativity, and knowledge
            sharing through meaningful projects, teamwork, and a supportive
            community.
          </p>
        </div>

        <div
          className="p-8 bg-white rounded-2xl shadow-md space-y-4 border border-gray-200 transform hover:-translate-y-2 hover:shadow-xl transition"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <h4 className="text-2xl font-bold text-blue-600">Our Mission</h4>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our mission is to connect electronics enthusiasts through a simple,
            safe, and collaborative platform. Whether you are a beginner or an
            expert, we provide access to learning resources, project matches,
            and a community where new ideas can grow and evolve.
          </p>
        </div>
      </section>

      {/* Our Teams Section */}
      <section className="w-full max-w-6xl mx-auto py-12">
        <h2
          className="text-center text-4xl mb-10 font-bold text-purple-500"
          data-aos="fade-down"
        >
          Our Teams
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="relative h-80 rounded-xl shadow-md overflow-hidden bg-cover bg-center group transform hover:scale-105 transition duration-700 ease-in-out"
              style={{ backgroundImage: `url(${member.img})` }}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Text overlay */}
              <div className="absolute bottom-4 left-0 right-0 text-center text-white px-3 bg-opacity-30 rounded-t-md py-2">
                <h4 className="font-semibold text-lg">{member.name}</h4>
                <p className="text-sm opacity-90">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
