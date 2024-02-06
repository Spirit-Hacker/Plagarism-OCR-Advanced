import { Link } from "react-scroll";

export function Footer() {
  return (
    <footer className="bg-[#000814] -my-[100px] pt-24">
      <div className="mx-auto w-full max-w-7xl p-4 py-4 lg:py-6"> {/* Adjusted padding */}
        <hr className="my-4 border-gray-400 sm:mx-auto lg:my-6" /> {/* Adjusted margin and padding */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-400 sm:text-center">
            © {new Date().getFullYear()}
            {" Plagarism Detection Website"}
            <Link
              activeClass="active"
              to={"home"}
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              className="font-bold"
            >
              . All Rights Reserved.
            </Link>
          </span>          
        </div>
      </div>
    </footer>
  );
}

export default Footer;
