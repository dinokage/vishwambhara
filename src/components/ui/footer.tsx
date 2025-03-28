import { Facebook, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <footer className="bg-gradient-to-l from-[#1783C8] to-[#76D6FA] text-black mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-col-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center mb-4">
                
              </div>
              <p className="text-sm mb-4">
                An exclusive One-Stop Facility for guaranteed energy efficient solutions related to Air Compressors,
                Pumps, Valves,Drive Engineering & Material handling.
              </p>
              <div>
                <h4 className="font-bold mb-2">FOLLOW US</h4>
                <div className="flex space-x-2">
                  <a href="#" className="w-8 h-8 bg-[#1d9bf0] rounded-sm flex items-center justify-center">
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a href="#" className="w-8 h-8 bg-[#1877f2] rounded-sm flex items-center justify-center">
                    <Facebook className="h-4 w-4" />
                  </a>
                  <a href="#" className="w-8 h-8 bg-[#0076b2] rounded-sm flex items-center justify-center">
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="hover:text-[#00aeef]">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-[#00aeef]">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="hover:text-[#00aeef]">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#00aeef]">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-4">Contact US</h3>
              <div className="space-y-4">
                <p className="text-sm">
                  Classique Engineering Enterprises
                  <br /># 39-11-3/2, 1st Floor, Above Punjab National Bank of Commerce, Muraliinagar, Bank Street,
                  Sector -11,
                  <br />
                  Visakhapatnam - 530007, AP, India.
                </p>
                <p className="text-sm">info@classique.co.in & kk@classique.co.in</p>
                <p className="text-sm">+91 - 9348754999 | +91 - 8096666686</p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-[#606060] mt-8 pt-4 text-xs text-center">
            <p>
              • Terms & Conditions - Privacy Policy - Sitemap &nbsp;&nbsp; powered by catchway{" "}
              <span className="text-[#00aeef]">classique.com</span>
            </p>
          </div>
        </div>
      </footer>
  )
}

export default Footer