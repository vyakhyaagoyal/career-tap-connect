
import NavBar from "@/components/NavBar";

const About = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-tr from-[#fafdff] via-[#f5efff] to-[#e7f0ff]">
    <NavBar />
    <div className="flex-1 px-4 py-10 max-w-4xl mx-auto w-full">
      <h1 className="text-4xl font-extrabold mb-6 text-center">About SwipeHire</h1>
      <div className="bg-white border rounded-lg p-8 shadow-lg flex flex-col gap-6 text-lg text-gray-700">
        <p>
          SwipeHire is revolutionizing the job market by blending the intuitive, engaging experience of modern dating apps with the seriousness and professionalism of career platforms. Our mission is to make hiring and job hunting faster, more efficient, and genuinely enjoyable for everyone involved.
        </p>
        <p>
          We believe in a world where talent meets opportunity seamlessly. For job seekers, this means discovering roles that truly match their skills and aspirations through a fun, swipe-based interface. For recruiters, it means finding the perfect candidate without sifting through endless, irrelevant applications.
        </p>
        <p>
          With features like AI-powered matching, resume scoring, and robust verification for both candidates and companies, SwipeHire is building a trusted ecosystem that prioritizes quality and transparency. Say goodbye to job scams and hiring fatigue—the future of recruitment is here.
        </p>
      </div>
    </div>
  </div>
);

export default About;
