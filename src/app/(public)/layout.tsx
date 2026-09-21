import { Footer } from "@/components/shared/layout/Footer";
import { Navbar } from "@/components/shared/layout/Navbar";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* Keyboard users can jump straight past the navigation */}
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[120] -translate-y-[200%] rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white shadow-lift transition-transform duration-200 focus:translate-y-0"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;