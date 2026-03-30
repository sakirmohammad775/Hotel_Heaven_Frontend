import React from 'react';

const Contact = () => {
  return (
    <div className="bg-black pt-24">
      {/* SECTION 1: Form & Overlapping Images */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-[2px] bg-black"></div>
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Do you have <br /> any questions?
            </h2>
          </div>

          <form className="space-y-10">
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase">Your name</label>
              <input type="text" className="w-full border-b border-black py-2 outline-none focus:border-stone-400 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase">Your email</label>
              <input type="email" className="w-full border-b border-black py-2 outline-none focus:border-stone-400 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase">Your message</label>
              <textarea rows="1" className="w-full border-b border-black py-2 outline-none focus:border-stone-400 transition-colors resize-none" />
            </div>
            <button className="bg-black text-white px-12 py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-stone-800 transition-all">
              Submit
            </button>
          </form>
        </div>

        {/* Overlapping Image Composition */}
        <div className="relative h-[600px]">
          <div className="absolute right-0 top-0 w-4/5 h-[80%] z-0">
            <img 
              src="https://images.unsplash.com/photo-1590490360182-c33d57733427" 
              alt="Room view" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="absolute left-0 bottom-0 w-3/5 h-[40%] z-10 border-[15px] border-white shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945" 
              alt="Hotel exterior" 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
      </section>

      {/* SECTION 2: Map & Contact Info */}
      <section className="bg-[#eeeeee] grid grid-cols-1 lg:grid-cols-12 items-stretch mt-20">
        {/* Contact Info Text */}
        <div className="lg:col-span-4 p-12 lg:p-24 space-y-12 self-center">
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-stone-500">Address</h4>
            <p className="text-xl font-serif text-stone-800 leading-relaxed">
              Via Serlas 546, 6700 <br /> St. Moritz Switzerland
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-stone-500">Phone</h4>
            <div className="text-stone-800 space-y-2">
              <p className="text-sm font-bold uppercase">Hotel & Restaurant</p>
              <p className="text-xl font-serif">41 (0)54 2344 00</p>
              <p className="text-sm font-bold uppercase mt-4">Wellness & Spa</p>
              <p className="text-xl font-serif">41 (0)54 2344 01</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-stone-500">Email</h4>
            <p className="text-xl font-serif text-stone-800 border-b border-black w-fit">
              revs@hoteller.com
            </p>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="lg:col-span-8 min-h-[500px] bg-stone-200 relative grayscale hover:grayscale-0 transition-all duration-700">
           {/* Replace this div with a Google Maps Iframe or Library component */}
           <iframe 
             title="Hotel Location"
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2777.2472439162953!2d9.839846876939925!3d46.49503377110967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47849998894101e1%3A0xc03f443b7470f5e7!2sSt.%20Moritz%2C%20Switzerland!5e0!3m2!1sen!2s!4v1709923842105!5m2!1sen!2s" 
             className="w-full h-full absolute inset-0 border-0"
             allowFullScreen="" 
             loading="lazy"
           ></iframe>
        </div>
      </section>
    </div>
  );
};

export default Contact;