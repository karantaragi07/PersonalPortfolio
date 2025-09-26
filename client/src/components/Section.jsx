export default function Section({ id, className = "", title, children }) {
  return (
    <section
      id={id}
      role="region"
      aria-labelledby={`${id}-label`}
      className={`flex flex-col justify-center items-center py-16 ${className}`}
    >
      {title && (
        <h2 id={`${id}-label`} className="text-3xl font-bold mb-8">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
