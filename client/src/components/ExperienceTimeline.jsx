import { motion } from "framer-motion";

const entries = [
  {
    company: "Tata Consultancy Services - Mumbai",
    role: "Graduate Trainee | Multi Commodity Exchange Of India (Client Office)",
    period: "Jan 2025 — Jun 2025",
    details: [
      "Developed a Spring Boot API with IBM Db2, achieving reliable T7 FIXML trade message latency tracking and improved monitoring accuracy",
      "Implemented latency percentile calculations and SLA compliance tracking, enhancing system uptime by 15% and reducing downtime incidents.",
      "Conducted analysis on OpenShift RMS microservices logs and pod health metrics, identifying issues that cut incident resolution time by 20%",
      "Optimized backend workflows and tested APIs with Postman, reducing average API response time by 200ms for smoother integrations",
      "SpringBoot, IBM Db2, Apache Ignite, Apache Kafka, OpenShift, FeignClient, Postman, Microservices, RESTful APIs",
    ],
  },
  {
    company: "Tata Consultancy Services - Chennai",
    role: "Graduate Trainee | Training Project MindStone – TCS Initial Training",
    period: "Aug 2024 — Dec 2024",
    details: [
      "Automated deployments by containerizing services with Docker, achieving consistent and reliable application runtime environments",
      "Built and configured CI/CD pipelines with Jenkins and GitHub Actions for authentication APIs, shortening release cycles by 30%",
      "Secured and integrated MongoDB with automated backup strategies, improving reliability and reducing data recovery time during failures",
      "Monitored container health and application logs, boosting issue detection speed by 20% and enhancing system stability.",
      "Collaborated in Agile sprints with cross-functional teams, streamlining delivery workflows and accelerating feature delivery.",
      "Docker, CI/CD (Jenkins/GitHub Actions), MongoDB, React, Django, Postman, Agile",
    ],
  },
];

export default function ExperienceTimeline() {
  return (
    <div className="relative px-4 md:px-8 my-8">
      <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-[color-mix(in_srgb,var(--accent)_50%,transparent)]" />

      <motion.ul
        className="space-y-8 ml-8 md:ml-12 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
        }}
        role="list"
        aria-label="Experience timeline"
      >
        {entries.map((e, idx) => (
          <motion.li
            key={idx}
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0 },
            }}
            className="card-surface p-4 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-accent timeline-dot" />
              <h4 className="text-lg font-semibold text-primary">
                {e.company} — {e.role}
              </h4>
            </div>
            <p className="text-secondary text-sm mt-1">{e.period}</p>
            <ul className="list-disc list-inside mt-3 space-y-1 text-sm text-secondary">
              {e.details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
