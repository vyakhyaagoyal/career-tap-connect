
import NavBar from "@/components/NavBar";

const About = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-tr from-[#fafdff] via-[#f5efff] to-[#e7f0ff]">
    <NavBar />
    <div className="flex-1 px-4 py-10 max-w-4xl mx-auto w-full">
      <h1 className="text-4xl font-extrabold mb-6 text-center">About SwipeHire</h1>
      <div className="bg-white border rounded-lg p-8 shadow-lg flex flex-col gap-6 text-lg text-gray-700">
        <p>
          <strong>SwipeHire</strong> is a collaborative project developed by a team of passionate individuals who are committed to revolutionizing the job search experience.
          <br />
          Soumya Agrawal
          <br />
          Saee Joshi
          <br />
          Vyakhya Goyal
        </p>
        
      </div>
    </div>
  </div>
);

export default About;
