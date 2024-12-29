import Aos from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
export default function Main() {
  Aos.init({
    startEvent: "DOMContentLoaded",
    duration: 600,
    offset: 120,
    once: false,
  });
  return (
    <div className="dark:bg-slate-900">
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <div className="pt-24 pb-12  container mx-auto px-2 min-h-[calc(100vh-230px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
