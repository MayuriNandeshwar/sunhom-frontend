export default function ProductMeta({ product }: any) {
  const notes = product.fragranceNotes || {
    top: "Cinnamon",
    heart: "Vanilla",
    base: "Warm Spice",
  };

  return (
    <div className="space-y-8">

      {/* DESCRIPTION */}
      <p className="text-gray-700 leading-relaxed">
        {product.description}
      </p>

      {/* FRAGRANCE */}
      <div className="border-t pt-6 space-y-4">

        <h3 className="text-lg font-semibold">
          Fragrance Notes
        </h3>

        <div className="space-y-3">

          <div className="flex justify-between border-b pb-2">
            <span>Top</span>
            <span>{notes.top}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span>Heart</span>
            <span>{notes.heart}</span>
          </div>

          <div className="flex justify-between">
            <span>Base</span>
            <span>{notes.base}</span>
          </div>

        </div>

      </div>

    </div>
  );
}