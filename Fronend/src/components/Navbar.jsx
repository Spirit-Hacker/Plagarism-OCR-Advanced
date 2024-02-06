import React, { useEffect, useLayoutEffect, useState } from "react";
// import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import gsap from "gsap";


const menuItems = [
    
];


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const bearerToken = Cookies.get("bearerToken");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigate = useNavigate();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const timeLine = gsap.timeline();
      timeLine.from(".logoAnimate, .nav1, .nav2", {
        y: -50 + "px",
        delay: 0.6,
        duration: 1,
        stagger: 0.3,
        opacity: 0,
      })
    });

    return () => ctx.revert();
  }, []);

  return (
    <header className="w-full bg-[#000814] text-white border-b-[1px] border-gray-800">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex flex-row items-center justify-center">
          <Link
            to="/"
            className="font-bold flex items-center space-x-2 cursor-pointer"
          >
            <div className="text-lg md:text-[22px] font-[500] font-sans logoAnimate hover:text-yellow-300 hover:duration-200">Plagiarism Checker</div>
          </Link>
        </div>

        <div className="text-white flex gap-10">
            <div onClick={() => navigate("/")} className="nav2 hover:text-yellow-300 cursor-pointer">Home</div>
            <div onClick={() => navigate("/text-plagarism")} className="nav2 hover:text-yellow-300 cursor-pointer">Check Text</div>
            <div onClick={() => navigate("/document-plagarism")} className="nav2 hover:text-yellow-300 cursor-pointer">Check File</div>
            <div onClick={() => navigate("/image-plagiarism-check")} className="nav2 hover:text-yellow-300 cursor-pointer">OCR</div>
            <div onClick={() => navigate("/compare-text")} className="nav2 hover:text-yellow-300 cursor-pointer">Compare Texts</div>
            <div onClick={() => navigate("/compare-file")} className="nav2 hover:text-yellow-300 cursor-pointer">Compare Files</div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
