import { motion as Motion } from "motion/react";
const SectionHeading = ({ subHeading = "", heading = "" }) => {
  return (
    <Motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      viewport={{ once: true }}
      className="mb-5"
    >
      <p className="text-muted-foreground text-sm">{subHeading}</p>
      <h2 className="text-2xl font-bold">{heading}</h2>
    </Motion.div>
  );
};

export default SectionHeading;
