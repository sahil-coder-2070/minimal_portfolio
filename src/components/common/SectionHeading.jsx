const SectionHeading = ({ subHeading, heading }) => {
  return (
    <div>
      <p className="text-muted-foreground text-sm">{subHeading}</p>
      <h2 className="text-2xl font-bold">{heading}</h2>
    </div>
  );
};

export default SectionHeading;
