import React, { useState } from 'react';

const Offers = () => {
  const [copiedId, setCopiedId] = useState(null);

  // Enhanced offer data with coupon codes
  const offerData = [
    {
      id: 1,
      title: "Free Breakfast Included",
      image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88",
      description: "",
      couponCode: "BREAKFAST2025",
      discount: 0, // 0 means free breakfast (handled separately)
      discountType: "breakfast", // Special type
      showButton: true,
    },
    {
      id: 2,
      title: "10% Discount on Your Stay",
      image: "https://images.unsplash.com/photo-1540518614846-7eded433c457",
      description: "",
      couponCode: "SAVE10",
      discount: 10,
      discountType: "percentage",
      showButton: true,
    },
    {
      id: 3,
      title: "Benefit from a 15% discount, making your reservations with a minimum of 15 days in advance",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
      couponCode: "ADVANCE15",
      discount: 15,
      discountType: "percentage",
      showButton: true,
    }
  ];

  const handleCopyCoupon = (couponCode) => {
    navigator.clipboard.writeText(couponCode);
    setCopiedId(couponCode);
    setTimeout(() => setCopiedId(null), 2000);
  };

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
              {/* Image Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>
            </div>

            {/* Content Overlay */}
            <div className="relative h-full flex flex-col justify-center items-center text-center p-8 z-10">
              <h3 className="text-white font-serif tracking-wide leading-relaxed text-lg mb-6">
                {offer.title}
              </h3>
              
              {offer.showButton && (
                <button 
                  onClick={() => handleCopyCoupon(offer.couponCode)}
                  className={`px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                    copiedId === offer.couponCode
                      ? 'bg-green-400 text-black'
                      : 'bg-white text-black hover:bg-stone-200'
                  }`}
                >
                  {copiedId === offer.couponCode ? '✓ Copied!' : `Use Code: ${offer.couponCode}`}
                </button>
              )}

              {/* Coupon Code Badge - Optional visual indicator */}
              <div className="mt-4 text-[9px] text-stone-200 tracking-widest uppercase">
                {offer.discountType === 'percentage' && (
                  <span>{offer.discount}% OFF</span>
                )}
                {offer.discountType === 'breakfast' && (
                  <span>Complimentary Breakfast</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Text */}
      <div className="text-center mt-12">
        <p className="text-stone-600 text-[12px] tracking-wide uppercase">
          Click any offer to copy the coupon code and paste it in the checkout page
        </p>
      </div>
    </section>
  );
};

export default Offers;