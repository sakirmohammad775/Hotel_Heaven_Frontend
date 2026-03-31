import React from 'react';
// Import your images from assets here
// import offer1 from '../assets/offer-breakfast.jpg';

const Offers = () => {
  const offerData = [
    {
      id: 1,
      title: "Free Breakfast Included",
      image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88", // Replace with local asset
      description: "",
    },
    {
      id: 2,
      title: "10% for advanced booking",
      image: "https://images.unsplash.com/photo-1540518614846-7eded433c457", // Replace with local asset
      description: "",
    },
    {
      id: 3,
      title: "Benefit from a 15% discount, making your reservations with a minimum of 15 days in advance",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b", // Replace with local asset
      showButton: true,
    }
  ];

  return (
    <section className="bg-white py-24 px-6 md:px-12 lg:px-24">
      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="font-serif text-2xl tracking-widest text-stone-800">Offers</h2>
      </div>

      {/* Offers Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {offerData.map((offer) => (
          <div 
            key={offer.id} 
            className="group relative h-[500px] overflow-hidden cursor-pointer shadow-lg"
          >
            {/* Background Image with Dark Overlay */}
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
              <img 
                src={offer.image} 
                alt={offer.title} 
                className="w-full h-full object-cover"
              />
              {/* Image Overlay (Matching your 4th screenshot style) */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>
            </div>

            {/* Content Overlay */}
            <div className="relative h-full flex flex-col justify-center items-center text-center p-8 z-10">
              <h3 className={`text-white font-serif tracking-wide leading-relaxed ${offer.showButton ? 'text-sm mb-6' : 'text-2xl'}`}>
                {offer.title}
              </h3>
              
              {offer.showButton && (
                <button className="bg-white text-black px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-stone-200">
                  View Offer
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Offers;



