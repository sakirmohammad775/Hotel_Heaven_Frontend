import React from "react";

const CheckoutSummary = ({ data }) => {
  // ✅ Get data safely from props
  const { basePrice = 80, totalPrice = 80, rooms = 1 } = data || {};

  // ✅ Calculations
  const accommodationTax = (totalPrice * 0.2).toFixed(2);
  const feesAmount = (totalPrice * 0.45).toFixed(2);
  const feesTax = (parseFloat(feesAmount) * 0.12).toFixed(2);

  const finalTotal = (
    parseFloat(totalPrice) +
    parseFloat(accommodationTax) +
    parseFloat(feesAmount) +
    parseFloat(feesTax)
  ).toFixed(2);

  return (
    <div className="bg-[#1e2d35] text-white p-8 rounded-sm sticky top-24">
      <div className="flex justify-between items-baseline mb-8">
        <span className="text-4xl font-serif tracking-tighter">
          ${finalTotal}
        </span>
        <span className="text-[10px] uppercase tracking-widest opacity-60">
          / Total
        </span>
      </div>

      <div className="space-y-4 border-t border-white/10 pt-6">
        <div className="flex justify-between text-xs tracking-widest uppercase">
          <span>Standard Room ({rooms}x):</span>
          <span>${totalPrice}</span>
        </div>

        <div className="space-y-2 text-[10px] opacity-70 tracking-widest uppercase pl-2 border-l border-white/10 ml-1">
          <div className="flex justify-between">
            <span>Accommodation Tax:</span>
            <span>${accommodationTax}</span>
          </div>
          <div className="flex justify-between">
            <span>Fees Amount:</span>
            <span>${feesAmount}</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span>Fees Tax Amount:</span>
            <span>${feesTax}</span>
          </div>
        </div>

        <div className="flex justify-between text-xs font-bold tracking-[0.2em] uppercase pt-2 text-[#b1a494]">
          <span>Room Subtotal:</span>
          <span>${finalTotal}</span>
        </div>
      </div>

      <div className="mt-12 space-y-2 border-t border-white/10 pt-6 text-[10px] tracking-widest uppercase opacity-60">
        <div className="flex justify-between">
          <span>Subtotal (excl. taxes):</span>
          <span>
            $
            {(
              parseFloat(totalPrice) + parseFloat(feesAmount)
            ).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Taxes:</span>
          <span>
            $
            {(
              parseFloat(accommodationTax) + parseFloat(feesTax)
            ).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;