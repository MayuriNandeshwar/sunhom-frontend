"use client";

export default function ProductInfo({ product }: any) {
  const variant = product.variants[0];

  return (
    <div className="space-y-6 sticky top-24">

      <h1 className="text-4xl font-serif text-[#1c1c1c] leading-tight">
        {product.name}
      </h1>

      <p className="text-gray-500">
        Handcrafted Premium Soy Candle
      </p>

      <div className="text-2xl font-semibold">
        ₹ {variant.price}
        <span className="ml-3 text-gray-400 line-through text-base">
          ₹ {variant.mrp}
        </span>
      </div>

      <p className="text-sm text-gray-500">
        Taxes included. Shipping calculated at checkout.
      </p>

      <button className="bg-amber-600 text-white py-3 rounded-full w-full hover:bg-amber-700 transition">
        Add to Cart
      </button>

    </div>
  );
}