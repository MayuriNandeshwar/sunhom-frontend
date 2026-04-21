export default function RelatedProducts() {
  return (
    <div>
      <h2 className="text-2xl font-serif mb-8">
        You May Also Like
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-[#f5f3ef] p-6 rounded-xl text-center">
          Product Card
        </div>
      </div>
    </div>
  );
}