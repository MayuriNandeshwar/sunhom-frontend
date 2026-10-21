import React from "react";

interface LegalLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function LegalLayout({ title, children }: LegalLayoutProps) {
  return (
    <main className="bg-[#F7F5F2]">
      {/* Push content below navbar */}
      <div className="pt-32 md:pt-36">
        <div className="max-w-4xl mx-auto px-6 pb-20">
          
          {/* PAGE TITLE */}
          <header className="mb-12 text-center">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-black">
              {title}
            </h1>
          </header>

          {/* CONTENT */}
          <section className="legal-content font-epilogue text-black/80 leading-relaxed space-y-6 text-left">
            {children}
          </section>
        </div>
      </div>
    </main>
  );
}
