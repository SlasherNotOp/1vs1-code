
// import { AppBar } from "./components/AppBar";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div className="bg-white">
      {/* <AppBar/> */}
      <Navbar/>
      <HeroSection/>
    </div>
  );
}
