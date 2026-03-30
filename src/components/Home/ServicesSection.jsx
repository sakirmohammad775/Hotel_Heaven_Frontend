import React from 'react';

const services = [
  {
    id: 1,
    title: "Day Spa",
    description: "Indulge in tailored wellness treatments designed to rejuvenate your spirit in our tranquil sanctuary.",
    image: "https://images.unsplash.com/photo-1544161515-4ae6b91829d2?auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    title: "Gourmet Trip",
    description: "Savor world-class culinary excellence with seasonal menus curated by our award-winning chefs.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Art & Relaxation",
    description: "Explore local cultural wonders and find peace in our meticulously designed gallery spaces.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80",
  }
];

const ServicesSection = () => {
  return (
    <section className="bg-black text-white py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Section Header (Matches 'Discover Experience' style) --- */}
        <div className="flex items-center gap-4 mb-16">
          <div className="w-12 h-[2px] bg-[#b1a494]"></div>
          <h2 className="text-4xl md:text-6xl font-serif uppercase tracking-tighter">
            Discover <span className="block md:inline text-[#b1a494]">Experience</span>
          </h2>
        </div>

        {/* --- Services Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service) => (
            <div key={service.id} className="group cursor-pointer">
              
              {/* Image Container */}
              <div className="relative h-[450px] overflow-hidden rounded-sm mb-6">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                
                {/* Floating 'Learn More' Button (Matches reference image style) */}
                <div className="absolute bottom-6 right-6">
                  <button className="bg-white text-black px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all hover:bg-[#b1a494] hover:text-white">
                    Learn More
                  </button>
                </div>
              </div>

              {/* Text Content */}
              <h3 className="text-2xl font-serif mb-4 group-hover:text-[#b1a494] transition-colors">
                {service.title}
              </h3>
              <p className="text-stone-400 text-sm leading-relaxed font-light line-clamp-3">
                {service.description}
              </p>
              
              {/* Subtle Decorative Line */}
              <div className="mt-6 w-0 h-[1px] bg-[#b1a494] transition-all duration-500 group-hover:w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;