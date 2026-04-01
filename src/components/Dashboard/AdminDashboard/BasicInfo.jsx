const BasicInfo = () => {
  const detailStyle = "border-b border-stone-100 py-6 flex justify-between items-center";
  const labelStyle = "text-[10px] uppercase tracking-[0.3em] text-[#b1a494] font-bold";
  const valueStyle = "text-sm text-[#1e2d35] font-light tracking-wide";

  return (
    <div className="bg-black p-10 min-h-screen">
      <header className="mb-12">
        <h2 className="text-3xl font-serif text-[#1e2d35] lowercase italic tracking-tight">
          General <span className="text-[#b1a494]">Information</span>
        </h2>
        <div className="h-[1px] w-20 bg-[#b1a494] mt-4"></div>
      </header>

      <div className="max-w-3xl">
        <div className={detailStyle}>
          <span className={labelStyle}>Property Name</span>
          <span className={valueStyle}>HotelHeaven Sanctuary</span>
        </div>
        <div className={detailStyle}>
          <span className={labelStyle}>Establishment Type</span>
          <span className={valueStyle}>Luxury Boutique</span>
        </div>
        <div className={detailStyle}>
          <span className={labelStyle}>Registry Status</span>
          <span className="text-[9px] bg-[#1e2d35] text-white px-3 py-1 tracking-widest uppercase">Verified</span>
        </div>
        <div className={detailStyle}>
          <span className={labelStyle}>Star Rating</span>
          <span className="text-[#b1a494] tracking-[0.5em]">★★★★★</span>
        </div>
        <div className={detailStyle}>
          <span className={labelStyle}>Check-In Policy</span>
          <span className={valueStyle}>14:00 HRS</span>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;