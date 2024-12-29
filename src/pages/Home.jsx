import { useEffect } from "react";
import Banner from "../components/Banner";
import FAQSection from "../components/FAQSection";
import Features from "../components/Features";
import LeaderBoard from "../components/LeaderBoard";

export default function Home() {
  useEffect(() => {
    document.title = "Home | Assignora";
  }, []);
  return (
    <div className="">
      <div className="md:pt-12 pt-5">
        <Banner />
      </div>
      <div className="md:pt-16 md:pb-12 py-6">
        <Features />
      </div>
      <div className="md:pb-12 pb-6">
        <LeaderBoard />
      </div>
      <div className="md:pb-12 py-6">
        <FAQSection />
      </div>
    </div>
  );
}
