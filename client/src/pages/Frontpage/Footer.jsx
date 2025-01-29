import { RiFacebookCircleFill, RiTwitterXFill } from "react-icons/ri";
import { IoLogoLinkedin } from "react-icons/io";
import { FaYoutube, FaSquareGithub } from "react-icons/fa6";
import { MdOutlineCopyright } from "react-icons/md";

const Footer = () => {
    return (
        <div className="h-auto bg-blue-600 text-white py-10">
            {/* Top Section */}
            <div className="container mx-auto flex flex-wrap justify-between px-6">
                {/* Column 1 - About */}
                <div className="w-full sm:w-1/5 mb-6 sm:mb-0">
                    <h3 className="font-semibold text-lg mb-2">Pet Adoption</h3>
                    <ul className="space-y-2">
                        <li className="cursor-pointer hover:underline">About</li>
                        <li className="cursor-pointer hover:underline">Blog</li>
                        <li className="cursor-pointer hover:underline">Careers</li>
                        <li className="cursor-pointer hover:underline">Press</li>
                        <li className="cursor-pointer hover:underline">Contact</li>
                    </ul>
                </div>

                {/* Column 2 - For Adopters */}
                <div className="w-full sm:w-1/5 mb-6 sm:mb-0">
                    <h3 className="font-semibold text-lg mb-2">For Adopters</h3>
                    <ul className="space-y-2">
                        <li className="cursor-pointer hover:underline">Find a Pet</li>
                        <li className="cursor-pointer hover:underline">Adoption Process</li>
                        <li className="cursor-pointer hover:underline">Pet Care Tips</li>
                        <li className="cursor-pointer hover:underline">Success Stories</li>
                    </ul>
                </div>

                {/* Column 3 - For Shelters */}
                <div className="w-full sm:w-1/5 mb-6 sm:mb-0">
                    <h3 className="font-semibold text-lg mb-2">For Shelters</h3>
                    <ul className="space-y-2">
                        <li className="cursor-pointer hover:underline">List Pets</li>
                        <li className="cursor-pointer hover:underline">Manage Adoptions</li>
                        <li className="cursor-pointer hover:underline">Shelter Resources</li>
                    </ul>
                </div>

                {/* Column 4 - More */}
                <div className="w-full sm:w-1/5 mb-6 sm:mb-0">
                    <h3 className="font-semibold text-lg mb-2">More</h3>
                    <ul className="space-y-2">
                        <li className="cursor-pointer hover:underline">Help</li>
                        <li className="cursor-pointer hover:underline">Privacy Policy</li>
                        <li className="cursor-pointer hover:underline">Terms & Conditions</li>
                    </ul>
                </div>

                {/* Column 5 - Social Media */}
                <div className="w-full sm:w-1/5 flex flex-col items-start">
                    <h3 className="font-semibold text-lg mb-2">Follow Us</h3>
                    <div className="flex space-x-4">
                        <RiFacebookCircleFill size={25} className="cursor-pointer hover:scale-110" />
                        <RiTwitterXFill size={25} className="cursor-pointer hover:scale-110" />
                        <IoLogoLinkedin size={25} className="cursor-pointer hover:scale-110" />
                        <FaYoutube size={25} className="cursor-pointer hover:scale-110" />
                        <a href="https://github.com/surya391" target="_blank" rel="noopener noreferrer">
                            <FaSquareGithub size={25} className="cursor-pointer hover:scale-110" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="text-center mt-10">
                <div className="text-3xl font-bold tracking-wide"> Pet Adoption System</div>
                <p className="text-sm mt-3">
                    Copyright <MdOutlineCopyright className="inline" /> 2025, Pet Adoption. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Footer;