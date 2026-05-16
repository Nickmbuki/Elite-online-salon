import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  copy?: string;
}

export function SectionHeading({ eyebrow, title, copy }: SectionHeadingProps) {
  return (
    <motion.div
      className="mx-auto max-w-3xl text-center"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 font-display text-4xl leading-tight text-espresso sm:text-5xl">{title}</h2>
      {copy ? <p className="mt-5 text-base leading-8 text-cocoa sm:text-lg">{copy}</p> : null}
    </motion.div>
  );
}
