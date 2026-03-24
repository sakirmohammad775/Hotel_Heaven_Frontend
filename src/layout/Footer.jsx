import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#1e2d35] text-white pt-16 md:pt-20 pb-8 font-sans">
      {/* Container matches the width of your other sections */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Main Grid: 1 column on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="w-10 h-10 border border-white rounded-full flex items-center justify-center italic font-serif text-xl transition-all group-hover:bg-white group-hover:text-black">
                C
              </div>
              <div className="flex flex-col leading-none">
                <h2 className="text-2xl font-serif tracking-tight uppercase">Carmelína</h2>
                <span className="text-[7px] uppercase tracking-[0.2em] opacity-70">Hotel Booking & Resort</span>
              </div>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed max-w-xs">
              Welcome to Carmelina, where comfort is everything. Beautiful room presentations, 
              straightforward booking & reservation options, & a whole lot more awaits here.
            </p>
            {/* Award Badges from Screenshot */}
            <div className="flex flex-wrap gap-4 opacity-80 grayscale hover:grayscale-0 transition-all">
              <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-[7px] text-center p-1 leading-tight uppercase">Boutique Hotel Awards</div>
              <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-[7px] text-center p-1 leading-tight uppercase">Travellers Choice</div>
              <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-[7px] text-center p-1 leading-tight uppercase">World Luxury</div>
            </div>
          </div>

          {/* Explore Column */}
          <div className="lg:pl-8">
            <h4 className="text-xl font-serif mb-6 md:mb-8 tracking-wide">Explore</h4>
            <ul className="space-y-3 md:space-y-4 text-sm text-stone-400">
              {['Home', 'Our Rooms', 'About Us', 'Offer & Event', 'Contact', 'Service'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(/\s/g, '-')}`} className="hover:text-[#b1a494] transition-colors inline-block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-xl font-serif mb-6 md:mb-8 tracking-wide">Contact</h4>
            <ul className="space-y-4 text-sm text-stone-400">
              <li className="leading-relaxed">
                3949 State 38b Rte Newark Valley,<br />
                New York(NY), 13811
              </li>
              <li className="text-white font-medium hover:text-[#b1a494] transition-colors cursor-pointer">
                +99 (0) 344 956 4050
              </li>
              <li className="text-white font-medium hover:text-[#b1a494] transition-colors cursor-pointer">
                +99 (0) 234 666 7853
              </li>
              <li className="hover:underline cursor-pointer">www.cermelina.com</li>
              <li className="hover:underline cursor-pointer">Cermelina1806@gmail.com</li>
            </ul>
          </div>

          {/* Payment Methods Column */}
          <div className="lg:pl-4">
            <h4 className="text-xl font-serif mb-6 md:mb-8 tracking-wide">Payment methods</h4>
            <p className="text-sm text-stone-400 mb-6 leading-relaxed">
              Pay any way you choose, no matter whether <span className="text-white underline cursor-pointer">it's cash</span> or an <span className="text-white underline cursor-pointer">international payment card</span>, we support all of those payment options.
            </p>
            <div className="flex flex-wrap gap-2">
              {['VISA', 'PayPal', 'MasterCard', 'Amex'].map((card) => (
                <div key={card} className="bg-white/5 border border-white/10 px-3 py-1.5 rounded text-[10px] font-bold tracking-tighter text-white/80">
                  {card}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar: Responsive Flex */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] md:text-[11px] text-stone-500 tracking-wider">
          
          {/* Social Icons from Screenshot */}
          <div className="flex items-center gap-4">
            <span className="uppercase text-stone-400">Get Social:</span>
            <div className="flex gap-3">
              {['f', 't', 'ig', 'tr'].map((icon) => (
                <div key={icon} className="w-7 h-7 border border-white/10 rounded-full flex items-center justify-center text-white/60 hover:bg-white hover:text-black hover:border-white transition-all cursor-pointer uppercase">
                  {icon}
                </div>
              ))}
            </div>
          </div>

          <p className="text-center md:text-left">
            © 2026 Carmelína Hotel by 7iquid, All Rights Reserved
          </p>

          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <span className="opacity-20">/</span>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;