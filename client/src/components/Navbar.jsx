import { useEffect, useState } from "react";

const navItems = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#stats", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#tools", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return false;
  });
  const [views, setViews] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  useEffect(() => {
    async function incrementAndFetch() {
      try {
        await fetch("/api/views/increment", { method: "POST" });
        const res = await fetch("/api/views");
        const data = await res.json();
        if (typeof data.count === "number") setViews(data.count);
      } catch (e) {}
    }
    incrementAndFetch();
  }, []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-[color-mix(in_srgb,var(--bg)_85%,transparent)] border-b border-primary/40 transition-colors">
      <nav className="flex items-center py-3 px-3 w-full">
        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2 text-lg font-extrabold tracking-tight mr-auto ml-4 md:ml-20"
        >
          <span className="text-primary">Karan</span>
          <span style={{ color: isDark ? "white" : "var(--secondary)" }}>
            Taragi
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4 ml-auto">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm link-bulge">
              {item.label}
            </a>
          ))}
          <button
            onClick={() => setIsDark(!isDark)}
            className="ml-2 px-2 py-1 rounded-md transition-colors"
            aria-label="Toggle color theme"
            style={{ border: "none", boxShadow: "none" }}
          >
            {isDark ? "🌞" : "🌙"}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden ml-2 px-2 py-1 rounded-md"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ border: "none", boxShadow: "none" }}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>

        {/* Views Counter */}
        <span
          className="ml-3 text-xs font-medium px-2 py-0.5 rounded border"
          style={{
            borderColor: "var(--primary)",
            color: "var(--text)",
            backgroundColor: "transparent",
          }}
        >
          Views: {views ?? "—"}
        </span>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden container-narrow py-2">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm link-bulge"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => {
                setIsDark(!isDark);
                setMobileOpen(false);
              }}
              className="mt-2 w-min px-2 py-1 rounded-md"
              aria-label="Toggle color theme"
              style={{ border: "none", boxShadow: "none" }}
            >
              {isDark ? "🌞" : "🌙"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
