import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TechTree = ({ badgesByCategory }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  if (!badgesByCategory || badgesByCategory.length === 0) {
    return <div>No badges to display</div>;
  }

  const numBadges = badgesByCategory.flatMap((cat) => cat.badges).length;
  const centerX = 0;
  const centerY = 0;
  const radius = 200;

  const initialPositions = Array.from({ length: numBadges }, (_, index) => {
    const angle = (index / numBadges) * 2 * Math.PI;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  });

  let globalIndex = 0;

  const renderCategory = (category) => (
    <div className="mb-8" key={category.name}>
      <h3 className="text-xl font-bold mb-4">{category.name}</h3>
      <div className="flex flex-wrap justify-center gap-6">
        {category.badges.map((badge, idx) => {
          const pos = initialPositions[globalIndex];
          const element = (
            <motion.img
              key={globalIndex}
              src={badge}
              alt={`${category.name} badge ${idx + 1}`}
              initial={{ x: pos.x, y: pos.y, opacity: 0 }}
              animate={animate ? { x: 0, y: 0, opacity: 1 } : {}}
              transition={{
                duration: 1,
                delay: globalIndex * 0.1,
                ease: "easeOut",
              }}
              className="w-32 h-8 object-contain"
            />
          );
          globalIndex++;
          return element;
        })}
      </div>
    </div>
  );

  return (
    <section className="my-10 px-5">
      {badgesByCategory.map(renderCategory)}
    </section>
  );
};

export default TechTree;
