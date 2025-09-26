import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

export default function TypingText({
  phrases,
  typingSpeed = 90,
  pause = 900,
  deletingSpeed = 50,
  loop = true,
}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    const current = phrases[index % phrases.length];

    if (!deleting) {
      if (text.length < current.length) {
        timer.current = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          typingSpeed
        );
      } else {
        if (loop) {
          timer.current = setTimeout(() => setDeleting(true), pause);
        }
      }
    } else {
      if (text.length > 0) {
        timer.current = setTimeout(
          () => setText(current.slice(0, text.length - 1)),
          deletingSpeed
        );
      } else {
        setDeleting(false);
        setIndex((i) => i + 1);
      }
    }

    return () => clearTimeout(timer.current);
  }, [text, deleting, index, phrases, typingSpeed, deletingSpeed, pause, loop]);

  return (
    <span>
      <span className="text-accent">{text}</span>
      <span
        className="ml-1 inline-block w-[1ch] bg-current animate-pulse"
        style={{ height: "1em", transform: "translateY(2px)" }}
        aria-hidden="true"
      />
    </span>
  );
}

TypingText.propTypes = {
  phrases: PropTypes.arrayOf(PropTypes.string).isRequired,
  typingSpeed: PropTypes.number,
  pause: PropTypes.number,
  deletingSpeed: PropTypes.number,
  loop: PropTypes.bool,
};
