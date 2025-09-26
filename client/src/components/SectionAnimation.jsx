import { motion } from "framer-motion";

const SectionAnimation = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true, amount: 0.2, margin: "-100px 0px -100px 0px" }}
    >
      {children}
    </motion.div>
  );
};

export default SectionAnimation;
