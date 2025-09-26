import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Testimonials({ testimonials }) {
  const [idx, setIdx] = useState(0);

  const next = () => setIdx((i) => (i + 1) % testimonials.length);
  const prev = () =>
    setIdx((i) => (i - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!testimonials || testimonials.length === 0) {
    return <div className="text-center py-4">No testimonials available.</div>;
  }

  const t = testimonials[idx];

  return (
    <div className="relative max-w-6xl mx-auto p-4">
      <div className="overflow-hidden card-surface p-6 min-h-[140px] rounded-lg shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35 }}
          >
            <p className="text-lg">“{t.quote}”</p>
            <p className="mt-3 text-secondary">— {t.name}</p>
            <div className="flex justify-between mt-4">
              <button
                className="btn-primary"
                onClick={prev}
                aria-label="Previous testimonial"
              >
                Prev
              </button>
              <button
                className="btn-primary"
                onClick={next}
                aria-label="Next testimonial"
              >
                Next
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
