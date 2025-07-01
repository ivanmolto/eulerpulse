import { RiGithubFill, RiTwitterXFill, RiEarthFill } from "@remixicon/react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="md:hidden py-16 px-4 xl:px-0">
      <footer id="footer" className="relative mx-auto flex  flex-wrap pt-4">
        <div className="mx-auto flex w-full justify-center lg:w-fit lg:flex-col">
          <div>
            <div className="mt-4 flex items-center justify-center">
              {/* Social Icons */}
              <a
                href="https://x.com/ivanmolto"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-700 dark:text-gray-300 transition-colors duration-200 hover:text-red-400"
              >
                <RiTwitterXFill className="size-6" />
              </a>
              <Link
                href="https://github.com/ivanmolto/eulerpulse"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-700 dark:text-gray-300 transition-colors duration-200 hover:text-red-400"
              >
                <RiGithubFill className="size-6" />
              </Link>
              <Link
                href="https://www.ivanmolto.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-700 dark:text-gray-300 transition-colors duration-200 hover:text-red-400"
              >
                <RiEarthFill className="size-6" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
