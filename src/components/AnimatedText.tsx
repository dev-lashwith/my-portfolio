import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { getCharProgressRange } from '../utils/motion';

interface CharProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Character: React.FC<CharProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const displayChar = char === ' ' ? '\u00A0' : char;

  return (
    <span className="relative inline-block">
      {/* Invisible placeholder for natural layout spacing and flow */}
      <span className="opacity-0 select-none pointer-events-none" aria-hidden="true">
        {displayChar}
      </span>
      {/* Absolute positioned animated span */}
      <motion.span
        style={{ opacity }}
        className="absolute left-0 top-0"
      >
        {displayChar}
      </motion.span>
    </span>
  );
};

export interface AnimatedTextProps {
  text: string;
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  // Split text into words to ensure robust line breaking without clipping words
  const words = useMemo(() => text.split(' '), [text]);

  // Compute character ranges across the entire text
  const totalLength = text.length;

  let globalCharIndex = 0;
  const wordElements = words.map((word, wordIndex) => {
    const charsInWord: { char: string; index: number; range: [number, number] }[] = [];

    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      charsInWord.push({
        char,
        index: globalCharIndex,
        range: getCharProgressRange(globalCharIndex, totalLength),
      });
      globalCharIndex++;
    }

    // Space after word (except last word)
    const hasSpace = wordIndex < words.length - 1;
    let spaceData: { char: string; index: number; range: [number, number] } | null = null;
    if (hasSpace) {
      spaceData = {
        char: ' ',
        index: globalCharIndex,
        range: getCharProgressRange(globalCharIndex, totalLength),
      };
      globalCharIndex++;
    }

    return (
      <span key={`word-${wordIndex}`} className="inline-block whitespace-nowrap">
        {charsInWord.map((item) => (
          <Character
            key={`char-${item.index}`}
            char={item.char}
            progress={scrollYProgress}
            range={item.range}
          />
        ))}
        {spaceData && (
          <Character
            key={`space-${spaceData.index}`}
            char={spaceData.char}
            progress={scrollYProgress}
            range={spaceData.range}
          />
        )}
      </span>
    );
  });

  return (
    <p
      ref={containerRef}
      className={`font-medium text-center leading-relaxed text-[#D7E2EA] ${className}`}
      aria-label={text}
    >
      {wordElements}
    </p>
  );
};
