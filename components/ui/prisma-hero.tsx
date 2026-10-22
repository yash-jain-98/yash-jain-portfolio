import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";

const ease = [0.16, 1, 0.3, 1] as const;
function useMotionPreference() {
  const initialPreference = useReducedMotion();
  const [reduced, setReduced] = useState(Boolean(initialPreference));
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  return reduced;
}
interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: CSSProperties;
}
export const WordsPullUp = ({
  text,
  className = "",
  showAsterisk = false,
  style,
}: WordsPullUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const reduced = useMotionPreference();
  const words = text.split(" ");
  return (
    <span ref={ref} className={`prisma-words ${className}`} style={style}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={reduced ? false : { y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{
            duration: reduced ? 0 : 0.6,
            delay: reduced ? 0 : i * 0.08,
            ease,
          }}
          className="prisma-word"
          style={{ marginRight: i === words.length - 1 ? 0 : "0.22em" }}
        >
          {word}
          {showAsterisk && i === words.length - 1 && (
            <span className="prisma-asterisk" aria-hidden="true">
              *
            </span>
          )}
        </motion.span>
      ))}
    </span>
  );
};
interface Segment {
  text: string;
  className?: string;
}
interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
  style?: CSSProperties;
}
export const WordsPullUpMultiStyle = ({
  segments,
  className = "",
  style,
}: WordsPullUpMultiStyleProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = useMotionPreference();
  const words = segments.flatMap((segment) =>
    segment.text
      .split(" ")
      .filter(Boolean)
      .map((word) => ({ word, className: segment.className })),
  );
  return (
    <span ref={ref} className={`prisma-words ${className}`} style={style}>
      {words.map((item, i) => (
        <motion.span
          key={i}
          initial={reduced ? false : { y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{
            duration: reduced ? 0 : 0.6,
            delay: reduced ? 0 : i * 0.08,
            ease,
          }}
          className={item.className}
          style={{ marginRight: "0.25em" }}
        >
          {item.word}
        </motion.span>
      ))}
    </span>
  );
};
interface PrismaHeroProps {
  videoSrc?: string;
  poster?: string;
}
const defaultVideo =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4";
export const PrismaHero = ({
  videoSrc = defaultVideo,
  poster = "hero-workspace.png",
}: PrismaHeroProps) => {
  const video = useRef<HTMLVideoElement>(null);
  const reduced = useMotionPreference();
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (reduced) video.current?.pause();
  }, [reduced]);
  async function toggleVideo() {
    if (!video.current) return;
    if (video.current.paused) {
      try {
        await video.current.play();
      } catch {
        setFailed(true);
      }
    } else video.current.pause();
  }
  const entrance = (delay: number) => ({
    initial: reduced ? (false as const) : { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: {
      duration: reduced ? 0 : 0.8,
      delay: reduced ? 0 : delay,
      ease,
    },
  });
  return (
    <div className="prisma-hero tw:relative tw:isolate">
      <img
        className="prisma-backdrop"
        src={poster}
        alt=""
        width="1672"
        height="941"
        fetchPriority="high"
      />
      {!failed && (
        <video
          ref={video}
          className={`prisma-video ${ready ? "is-ready" : ""}`}
          autoPlay={!reduced}
          muted
          loop
          playsInline
          preload={reduced ? "none" : "metadata"}
          src={videoSrc}
          aria-hidden="true"
          tabIndex={-1}
          onLoadedData={() => setReady(true)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => {
            setFailed(true);
            setPlaying(false);
          }}
        />
      )}
      <div className="prisma-wash" aria-hidden="true" />
      <div className="prisma-grain" aria-hidden="true" />
      <div className="prisma-editorial-copy">
        <motion.p className="eyebrow" {...entrance(0.1)}>YASH JAIN · INDEPENDENT DEVELOPER & ANALYST</motion.p>
        <h1 id="hero-title">
          <WordsPullUp text="Digital solutions." />
          <WordsPullUp text="Built for business." className="prisma-title-accent" />
        </h1>
        <motion.p className="prisma-lead" {...entrance(0.25)}>
          Websites that represent your business. Data that informs your decisions.
          Automation that takes care of the repetitive work.
        </motion.p>
        <motion.div className="prisma-actions" {...entrance(0.4)}>
          <a className="prisma-cta" href="#contact">Discuss your project <span><ArrowRight size={19} aria-hidden="true" /></span></a>
          <a className="prisma-work" href="projects/">View the work <ArrowUpRight size={17} aria-hidden="true" /></a>
        </motion.div>
        <motion.div className="prisma-engagement" {...entrance(0.5)}>
          <span className="prisma-signature" aria-hidden="true">yj.</span>
          <p>One point of contact.<br /><strong>From the first brief to the final handoff.</strong></p>
        </motion.div>
      </div>
      <div className="prisma-image-caption" aria-hidden="true"><span>CONSIDERED IN EVERY DETAIL</span><p>Clear thinking.<br />Practical execution.</p></div>
      {!failed && (
        <button
          className="prisma-motion-control"
          type="button"
          onClick={toggleVideo}
          aria-label={
            playing ? "Pause background video" : "Play background video"
          }
        >
          {playing ? (
            <Pause size={13} aria-hidden="true" />
          ) : (
            <Play size={13} aria-hidden="true" />
          )}
          {playing ? "Pause video" : "Play video"}
        </button>
      )}
    </div>
  );
};
