import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./index.css";
import Section from "./components/Section";
import Background from "./components/Background";
import TypingText from "./components/TypingText";
import ExperienceTimeline from "./components/ExperienceTimeline";
import SectionAnimation from "./components/SectionAnimation";
import ProjectCard from "./components/ProjectCard";
import CertificatesSection from "./components/CertificatesSection";

export default function App() {
  const myPhoto = "/images/myPhoto.jpg"; // Fixed path
  const dummyImage = "/images/myPhoto.jpg"; // Fixed path
  const [showLatestWork, setShowLatestWork] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return false;
  });
  const [views, setViews] = useState(null);
  const [projectColumns, setProjectColumns] = useState(1);
  const modalScrollRef = useRef(null);
  const [pullOffset, setPullOffset] = useState(0);
  const readyToCloseRef = useRef(false);
  const projects = useMemo(
    () => [
      {
        title: "BlogPost",
        desc: "A RESTful blogging application where users can create, edit, and manage posts. Built with Spring Boot, MongoDB, and Docker, with Swagger UI for API documentation.",
        image: "/images/blogpost.jpeg",
        github: "https://github.com/karantaragi07/BlogPost",
        tech: ["SpringBoot", "MongoDb", "Swagger Ui", "Docker"],
      },
      {
        title: "Email-Assistant",
        desc: "An AI-powered email assistant that helps draft, summarize, and manage emails efficiently. Built with Spring Boot, React, Gemini API, and packaged as a Chrome Extension with Docker support.",
        image: "/images/emailassistant.jpeg",
        github: "https://github.com/karantaragi07/Email-Assistant",
        tech: [
          "SpringBoot",
          "Gemini Api",
          "Chrome Extension",
          "React",
          "Docker",
        ],
      },
      {
        title: "GameHub",
        desc: "A static UI/UX design for a game discovery platform created in Figma. Focused on clean layout, user-friendly navigation, and modern visual design principles.",
        image: "/images/gamehub.jpeg",
        github: "https://github.com/karantaragi07/gamehub",
        tech: ["Figma"],
      },
      {
        title: "Hospital-Management-System",
        desc: "A microservices-based hospital management system built with Spring Boot and MongoDB. Supports patient and appointment management, containerized with Docker for scalability.",
        image: "/images/hospitalsystem.jpeg",
        github: "https://github.com/karantaragi07/Hospital-Management-System",
        tech: ["Java", "Spring Boot", "MongoDb", "Docker", "microservices"],
      },
      {
        title: "SenseFlow",
        desc: "A microservices-based sensor data pipeline simulating real-time ingestion and processing. Built with Spring Boot, Kafka, and PostgreSQL, orchestrated using Docker Compose.",
        image: "/images/senseflow.jpeg",
        github: "https://github.com/karantaragi07/SenseFlow",
        tech: [
          "Kafka",
          "SpringBoot",
          "PostgreSQL",
          "Docker-Compose",
          "microservices",
        ],
      },
      {
        title: "SkillMatch",
        desc: "A Spring Boot-based platform that matches user skills with suitable job roles. Uses MongoDB for data storage and Docker for containerized deployment.",
        image: "/images/skillmatch.jpeg",
        github: "https://github.com/karantaragi07/SkillMatch",
        tech: ["SpringBoot", "Docker", "MongoDB"],
      },
      {
        title: "karantaragi07",
        desc: "A GitHub profile repository showcasing my projects, contributions, and technical skills. Configured with Markdown and GitHub Actions for automated updates and improved presentation.",
        image: "/images/karantaragi.jpeg",
        github: "https://github.com/karantaragi07/karantaragi07",
        tech: ["Markdown", "GitHub Actions"],
      },
      {
        title: "Interview-Questions-For-Practice",
        desc: "A comprehensive repository of interview questions with solutions covering Java, DSA, system design, and cloud technologies. Includes hands-on topics on AWS, Docker, Kubernetes, microservices, and more for effective preparation.",
        image: "/images/interviewquestion.jpeg",
        github:
          "https://github.com/karantaragi07/Interview-Questions-For-Practice",
        tech: [
          "Java",
          "DSA",
          "System Design",
          "AWS",
          "Databases",
          "Docker",
          "Jenkins",
          "Kafka",
          "Kubernetes",
          "Linux",
          "microservices",
          "SpringBoot",
        ],
      },
      {
        title: "Self-Learning-Notes",
        desc: "A curated collection of technical notes, cheat sheets, and references for quick learning and revision. Covers a wide range of programming, cloud, and system design topics, will add more in future.",
        image: "/images/selflearning.jpeg",
        github: "https://github.com/karantaragi07/Self-Learning-Notes",
        tech: ["Notes", "Cheatsheets", "References"],
      },
    ],
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send");
      alert("Form submitted successfully! Your message has been sent.");
      form.reset();
    } catch (err) {
      alert("Sorry, something went wrong. Please try again later.");
    }
  };

  // Disable page scroll while modal is open and handle Escape to close
  useEffect(() => {
    if (showLatestWork) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const onKeyDown = (e) => {
        if (e.key === "Escape") setShowLatestWork(false);
      };
      window.addEventListener("keydown", onKeyDown);
      return () => {
        document.body.style.overflow = previousOverflow;
        window.removeEventListener("keydown", onKeyDown);
      };
    }
  }, [showLatestWork]);

  // No scroll-based pagination now; render all projects.

  // Pull-to-close behavior on modal: overscroll at top to close (touch and wheel)
  useEffect(() => {
    if (!showLatestWork) return;
    const el = modalScrollRef.current;
    if (!el) return;

    const getThreshold = () =>
      Math.max(160, Math.floor(el.clientHeight * 0.33));
    let startY = 0;
    let trackingTouch = false;
    let atTopAtStart = false;
    let touchStartTime = 0;
    let wheelAccum = 0;
    let wheelTimer = null;
    let topIdleTimer = null;

    // Become "ready" only after being idle at the top briefly
    const handleScroll = () => {
      if (el.scrollTop === 0) {
        if (topIdleTimer) clearTimeout(topIdleTimer);
        topIdleTimer = setTimeout(() => {
          readyToCloseRef.current = true;
        }, 200);
      } else {
        readyToCloseRef.current = false;
        if (topIdleTimer) {
          clearTimeout(topIdleTimer);
          topIdleTimer = null;
        }
      }
    };
    handleScroll();
    el.addEventListener("scroll", handleScroll, { passive: true });
    const onTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) {
        atTopAtStart = el.scrollTop <= 0 && readyToCloseRef.current;
        trackingTouch = atTopAtStart;
        startY = e.touches[0].clientY;
        touchStartTime = Date.now();
        setPullOffset(0);
      }
    };
    const onTouchMove = (e) => {
      if (!trackingTouch) return;
      if (e.touches && e.touches.length > 0) {
        const currentY = e.touches[0].clientY;
        const deltaY = currentY - startY;
        const elapsed = Date.now() - touchStartTime;
        if (deltaY > 0) {
          const clamped = Math.min(deltaY, getThreshold() * 1.2);
          setPullOffset(clamped);
        } else {
          setPullOffset(0);
        }
        if (
          atTopAtStart &&
          readyToCloseRef.current &&
          el.scrollTop <= 0 &&
          deltaY > getThreshold() &&
          elapsed < 700
        ) {
          setShowLatestWork(false);
        }
      }
    };
    const onTouchEnd = () => {
      trackingTouch = false;
      startY = 0;
      atTopAtStart = false;
      // Snap back
      setPullOffset(0);
    };
    const onWheel = (e) => {
      // Only accumulate quick successive upward deltas while at the very top
      if (readyToCloseRef.current && el.scrollTop <= 0 && e.deltaY < 0) {
        wheelAccum += -e.deltaY;
        // Visual stretch on wheel pull
        const clamped = Math.min(wheelAccum, getThreshold() * 1.2);
        setPullOffset(clamped);
        if (wheelTimer) clearTimeout(wheelTimer);
        wheelTimer = setTimeout(() => {
          wheelAccum = 0;
          setPullOffset(0);
        }, 250);
        if (wheelAccum > getThreshold()) {
          setShowLatestWork(false);
          wheelAccum = 0;
          if (wheelTimer) {
            clearTimeout(wheelTimer);
            wheelTimer = null;
          }
          setPullOffset(0);
        }
      } else {
        wheelAccum = 0;
        setPullOffset(0);
        if (wheelTimer) {
          clearTimeout(wheelTimer);
          wheelTimer = null;
        }
      }
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("scroll", handleScroll);
      if (topIdleTimer) clearTimeout(topIdleTimer);
      if (wheelTimer) clearTimeout(wheelTimer);
    };
  }, [showLatestWork]);

  // Dark mode effect
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

  // Views: increment and fetch on load
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
    <div>
      <Background />

      {/* Top-right controls: theme toggle and views */}
      <div className="fixed top-3 right-3 z-40 flex items-center gap-3 px-3 py-2 rounded-md backdrop-blur bg-white/40 dark:bg-gray-800/40">
        <button
          onClick={() => setIsDark(!isDark)}
          className="px-2 py-1 rounded-md transition-colors"
          aria-label="Toggle color theme"
          style={{ border: "none", boxShadow: "none" }}
        >
          {isDark ? "🌞" : "🌙"}
        </button>
        <span
          className="text-xs font-medium px-2 py-0.5 rounded"
          style={{ color: "var(--text)", backgroundColor: "transparent" }}
        >
          Views: {views ?? "—"}
        </span>
      </div>

      {/* Hero Section */}
      <Section
        id="hero"
        className="w-full px-0 py-0 min-h-screen backdrop-blur-lg"
        style={{
          background: isDark
            ? "color-mix(in srgb, #1f2937 96%, #ef4444 4%)" // subtler red tint
            : "rgba(255,255,255,0.40)",
        }}
      >
        <SectionAnimation>
          <div className="m-0 w-full min-h-[70vh] flex flex-col items-center justify-center gap-4 px-6 md:px-12 text-center">
            <p className="text-2xl text-body">Hello, my name is</p>
            <h1 className="text-7xl md:text-9xl font-extrabold text-body">
              Karan Taragi
            </h1>
            <p className="text-2xl text-body">And I am</p>

            <div className="text-3xl md:text-4xl font-medium text-primary w-full max-w-5xl typing-text">
              <TypingText
                phrases={[
                  "SpringBoot Developer",
                  "DevOps Enthusiast",
                  "Exploring Microservice And System Design",
                  "Exploring Cloud Architecture",
                  "Exploring AI And Machine Learning",
                  "Building Scalable And Production Efficient Systems",
                  "Passionate About Learning & Improving Everyday",
                ]}
              />
            </div>

            <div className="mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-cta"
                onClick={() => setShowLatestWork(true)}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                Latest Work
              </motion.button>
            </div>
          </div>
        </SectionAnimation>
      </Section>

      {/* All other sections removed; homepage only as requested */}

      {/* Latest Work Modal */}
      <AnimatePresence mode="wait">
        {showLatestWork && (
          <motion.div
            key="latest-work-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 backdrop-blur-lg"
            style={{
              background: isDark
                ? "color-mix(in srgb, #1f2937 96%, #ef4444 4%)"
                : "rgba(255,255,255,0.40)",
            }}
            aria-modal="true"
            role="dialog"
          >
            <motion.div
              key="latest-work-card"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.1,
              }}
              className="relative h-full w-full overflow-y-auto scroll-smooth no-scrollbar will-change-scroll"
              id="latest-work-scroll-root"
              ref={modalScrollRef}
            >
              {/* Pull-to-close hint */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs opacity-60 select-none">
                Pull down to close
              </div>

              {/* Modal Card container: desktop centered card, mobile full-screen */}
              <div className="min-h-full w-full px-4 py-8 sm:px-6 md:px-8">
                <motion.div
                  className="mx-auto max-w-7xl rounded-2xl p-8 shadow-lg shadow-black/30 backdrop-blur-lg origin-top transition-transform duration-150"
                  style={{
                    transform: `translateY(${pullOffset * 0.35}px) scaleY(${
                      1 + pullOffset / 1200
                    })`,
                    background: isDark
                      ? "color-mix(in srgb, rgba(31,41,55,0.50) 97%, rgba(239,68,68,0.50) 3%)"
                      : "rgba(255,255,255,0.50)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
                >
                  <div className="space-y-20 md:space-y-28">
                    {/* Projects Section (first) */}
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.2,
                        ease: "easeOut",
                      }}
                    >
                      <h2 className="text-3xl md:text-4xl font-extrabold text-primary text-center">
                        Projects
                      </h2>
                      <p className="mt-2 text-center text-sm md:text-base opacity-80">
                        A small collection of my recent work.
                      </p>
                      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((p, i) => (
                          <ProjectCard
                            key={i}
                            image={p.image}
                            title={p.title}
                            description={p.desc}
                            tech={p.tech}
                            githubLink={p.github}
                          />
                        ))}
                      </div>
                    </motion.div>

                    {/* Experience Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{
                        duration: 0.9,
                        delay: 0.1,
                        ease: "easeOut",
                      }}
                    >
                      <h2 className="text-3xl md:text-4xl font-extrabold text-primary text-center">
                        Work Experience
                      </h2>
                      <div className="mt-8">
                        <ExperienceTimeline />
                      </div>
                    </motion.div>

                    {/* Certificates & Courses Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{
                        duration: 0.9,
                        delay: 0.2,
                        ease: "easeOut",
                      }}
                    >
                      <h2 className="text-3xl md:text-4xl font-extrabold text-primary text-center">
                        Certifications & Achievements
                      </h2>
                      <p className="mt-2 text-center text-sm md:text-base opacity-80">
                        Professional certifications and completed courses.
                      </p>
                      <div className="mt-8">
                        <CertificatesSection />
                      </div>
                    </motion.div>

                    {/* LinkedIn Button Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{
                        duration: 0.7,
                        delay: 0.2,
                        ease: "easeOut",
                      }}
                      className="flex justify-center"
                    >
                      <a
                        href="https://www.linkedin.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-12 md:px-16 py-4 rounded-lg border border-gray-300 bg-gray-100/90 dark:border-gray-700 dark:bg-gray-800/60 hover:scale-105 transition-transform text-primary font-semibold text-lg dark:text-white"
                      >
                        LinkedIn
                      </a>
                    </motion.div>

                    {/* Technologies Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 60 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{
                        duration: 1.0,
                        delay: 0.3,
                        ease: "easeOut",
                      }}
                    >
                      <h2 className="text-3xl md:text-4xl font-extrabold text-primary text-center">
                        Technologies
                      </h2>
                      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-4 w-full">
                        {[
                          "Java",
                          "Spring Boot",
                          "Python",
                          "Django",
                          "Kafka",
                          "Maven",
                          "SQL",
                          "PostgreSQL",
                          "Redis",
                          "Docker",
                          "Kubernetes",
                          "GitHub Actions",
                          "AWS",
                          "GCP",
                          "Jenkins",
                          "Linux",
                          "Git",
                          "Bash",
                          "MySQL",
                          "MongoDB",
                          "Pandas",
                          "ScikitLearn",
                          "Seaborn",
                          "Postman",
                          "Selenium",
                          "TensorFlow",
                          "PyTorch",
                          "SciPy",
                          "NumPy",
                          "Matplotlib",
                          "Figma",
                          "Openshift",
                          "Shell Scripting",
                          "IBM Db2",
                          "Jenkins",
                        ].map((skill, idx) => (
                          <div
                            key={idx}
                            className="h-16 flex items-center justify-center rounded-lg border border-gray-300 bg-gray-100/90 dark:border-gray-700 dark:bg-gray-800/60 text-sm font-medium hover:scale-105 transition-transform"
                          >
                            {skill}
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Contact Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.4,
                        ease: "easeOut",
                      }}
                    >
                      <h2 className="text-3xl md:text-4xl font-extrabold text-primary text-center">
                        Contact
                      </h2>
                      <p className="mt-2 text-center text-base opacity-80">
                        Let's talk — fill out the form.
                      </p>
                      <div className="mt-8">
                        <form
                          onSubmit={handleSubmit}
                          className="max-w-2xl mx-auto flex flex-col gap-4 p-8 bg-white rounded-lg shadow-lg"
                        >
                          <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            required
                            className="p-3 border rounded bg-gray-100/90 border-gray-300 dark:bg-white dark:border-gray-300 dark:text-gray-900"
                          />
                          <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            required
                            className="p-3 border rounded bg-gray-100/90 border-gray-300 dark:bg-white dark:border-gray-300 dark:text-gray-900"
                          />
                          <textarea
                            name="message"
                            placeholder="Your Message"
                            required
                            className="p-3 border rounded bg-gray-100/90 border-gray-300 dark:bg-white dark:border-gray-300 dark:text-gray-900"
                            rows="5"
                          ></textarea>
                          <button
                            type="submit"
                            className="px-5 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-transform dark:bg-gray-800/60 dark:text-white dark:border dark:border-primary/60"
                            style={{
                              background:
                                "color-mix(in srgb, var(--primary) 18%, #ffffff)",
                              color: "var(--primary)",
                              border:
                                "1px solid color-mix(in srgb, var(--primary) 45%, transparent)",
                            }}
                          >
                            Send Message
                          </button>
                        </form>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
