import React from 'react';

const LuxuryService = () => {
  return (
    <section className="bg-[#f2f0ef] flex flex-col md:flex-row items-center">
      {/* Left Side: Professional Lifestyle Image */}
      <div className="md:w-1/2 w-full h-[600px] lg:h-[800px]">
        <img 
          src="https://images.unsplash.com/photo-1507679799987-c73779587ccf" 
          alt="Luxury Business Lifestyle" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side: Content */}
      <div className="md:w-1/2 w-full px-12 lg:px-24 py-16 space-y-8">
        <div className="space-y-4">
          <h2 className="text-4xl lg:text-5xl font-serif text-stone-800 leading-tight">
            Luxury & Comfort <br />
            <span className="text-stone-400 font-light italic">Our services and wonders of Prague</span>
          </h2>
        </div>

        <p className="text-stone-500 text-sm md:text-base leading-relaxed font-light max-w-lg">
          See-through delicate embroidered organza blue lining luxury acetate—mix stretch pleat detailing. 
          Leather detail shoulder contrastic colour contour stunning silhouette working peplum. 
          Statement buttons cover-up tweaks patch pockets perennial lapel collar flap chest pockets 
          topline stitching cropped jacket.
        </p>

        <div className="pt-6">
          <button className="border-b border-stone-300 pb-2 text-[#b1a494] uppercase text-[10px] tracking-[0.4em] font-bold hover:text-stone-800 hover:border-stone-800 transition-all">
            View more
          </button>
        </div>
      </div>
    </section>
  );
};

export default LuxuryService;