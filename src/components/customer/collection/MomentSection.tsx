export default function MomentSection({
  category,
}: {
  category: string;
}) {
  return (
    <section className="bg-[#f5f1ea] py-20 text-center">
      <h2 className="text-3xl font-serif mb-6">
        Where & When to Use SUNHOM {category}
      </h2>
      <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed">
        Designed for refined living, SUNHOM fragrances elevate
        everyday moments into rituals of elegance.
      </p>
    </section>
  );
}