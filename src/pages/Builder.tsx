
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ResumeBuilder from "@/components/ResumeBuilder";

const Builder = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <div className="pt-24 pb-10">
        <ResumeBuilder />
      </div>
      <Footer />
    </div>
  );
};

export default Builder;
