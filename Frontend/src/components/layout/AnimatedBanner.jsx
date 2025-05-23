import React, { useEffect, useState } from "react";
import "../../styles/AnimatedBanner.css";

const sentences = [
  "Unlimited number of events.",
  "Book your favorite events anytime.",
  "Experience moments that matter.",
];

const TYPE_SPEED = 100;     // ms per character when typing
const DELETE_SPEED = 50;    // ms per character when deleting
const PAUSE_AFTER = 1500;   // ms to wait after full sentence

export default function AnimatedBanner() {
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = sentences[sentenceIndex];
    let timeout;

    if (!isDeleting && charIndex <= current.length) {
      // TYPING
      timeout = setTimeout(() => {
        setCharIndex((i) => i + 1);
      }, TYPE_SPEED);
    } else if (isDeleting && charIndex >= 0) {
      // DELETING
      timeout = setTimeout(() => {
        setCharIndex((i) => i - 1);
      }, DELETE_SPEED);
    } else if (!isDeleting && charIndex > current.length) {
      // Pause before deleting
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, PAUSE_AFTER);
    } else if (isDeleting && charIndex < 0) {
      // Move to next sentence
      setIsDeleting(false);
      setSentenceIndex((i) => (i + 1) % sentences.length);
      setCharIndex(0);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, sentenceIndex]);

  return (
    <div className="animated-banner">
      <h2 className="typing-text">
        {sentences[sentenceIndex].substring(0, Math.max(0, charIndex))}
      </h2>
    </div>
  );
}
