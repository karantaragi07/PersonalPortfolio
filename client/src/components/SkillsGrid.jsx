import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function SkillsGrid({
  badges = [],
  columns = "grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
}) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className={`grid ${columns} gap-4`}
    >
      {badges.map((src, idx) => (
        <motion.img
          variants={item}
          key={idx}
          src={src}
          alt={`Skill badge ${idx + 1}`}
          className="h-10 md:h-12 rounded-lg card-surface p-2 hover:shadow-glow transition-shadow"
        />
      ))}
    </motion.div>
  );
}
