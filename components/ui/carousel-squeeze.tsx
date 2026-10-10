"use client";

import {
  type ComponentProps,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                   slides                                   */
/* -------------------------------------------------------------------------- */

export type SqueezeSlide = {
  /** Stable key. Falls back to the position in the array. */
  id?: string | number;
  /** The dark opening line under the panels. */
  title: string;
  /** The grey sentence that runs on from the title. */
  description?: string;
  /** Picture for the panel. It crops from the middle as the panel narrows. */
  image?: string;
  /** Alt text for that picture. Leave it out and the picture reads as decoration. */
  imageAlt?: string;
  /** Any CSS background — a gradient, a colour, layers. Used when there is no picture. */
  background?: string;
  /** Sits in the corner of the open panel: a wordmark, a logo, a caption. */
  overlay?: ReactNode;
  /** Text on the button. No text, no button. */
  action?: string;
  /** Where the button goes. */
  href?: string;
  /** Opens the link in a new tab. */
  target?: string;
  /** Runs on activation before following `href`, if present. */
  onAction?: () => void;
};

/* -------------------------------------------------------------------------- */
/*                                  geometry                                  */
/* -------------------------------------------------------------------------- */

/** A number is read as pixels; a string goes through as written, `2rem` and all. */
type Size = number | string;

const size = (value: Size) =>
  typeof value === "number" ? `${value}px` : value;

const clamp = (value: number, low: number, high: number) =>
  Math.max(low, Math.min(high, value));

/**
 * The row is four columns and a tail of slats, and it is a strip that slides
 * rather than a ring that turns.
 *
 * Four columns share out whatever is left once the open card, the slats and the
 * gaps are paid for. The open card starts from a 16:9 block and then gives a
 * little back — hence the negative first share. Column −1 and anything past
 * column 3 is a slat, so a card leaving the front simply narrows to a slat and
 * carries on out of the left edge.
 */
const SHARES = [-0.06, 0.61, 0.3, 0.15];

/** The hovered column takes more room. */
const STRETCHED = [0, 0.71, 0.4, 0.25];

/** Its neighbours give a little up to pay for it. */
const SQUEEZED = [-0.12, 0.59, 0.28, 0.13];

/** One card in the strip. `key` keeps React on the same node as the strip grows. */
type Card = { key: number; slide: number };

/* -------------------------------------------------------------------------- */
/*                                    hooks                                   */
/* -------------------------------------------------------------------------- */

/** True while the reader asks for less movement. */
function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduced(query.matches);
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);

  return reduced;
}

/* -------------------------------------------------------------------------- */
/*                                 component                                  */
/* -------------------------------------------------------------------------- */

/** Uses the portfolio’s self-hosted DM Sans font. */

export type SqueezeCarouselProps = {
  /** The panels, in the order they are read. */
  slides: SqueezeSlide[];
  /** Which panel starts open. Default `0`. */
  defaultIndex?: number;
  /** Called with the panel that just opened. */
  onIndexChange?: (index: number) => void;
  /** Height of the row. Default `clamp(110px, 23cqi, 280px)`. */
  height?: Size;
  /** Width of a slat in the tail. Default `6`. */
  slatWidth?: Size;
  /** Space between slats. Default `6`. */
  slatGap?: Size;
  /** Space between the four columns. Default `10`. */
  gap?: Size;
  /** Corner rounding on a panel. Default `16`. */
  radius?: Size;
  /** Milliseconds the slide takes. Default `1000`. */
  duration?: number;
  /** Widen the panel under the pointer. Default `true`. */
  hoverGrow?: boolean;
  /** Step on by itself. Default `false`. */
  autoplay?: boolean;
  /** Milliseconds a panel stays open under autoplay. Default `6000`. */
  interval?: number;
  /** Show the two arrow buttons. Default `true`. */
  controls?: boolean;
  /** Fill behind the button, the arrows and the focus ring. Defaults to the theme's primary. */
  accent?: string;
  /** What sits on top of that fill — the label and the arrow heads. */
  accentForeground?: string;
  /** What a screen reader calls the carousel. Default `"Featured"`. */
  label?: string;
  /** Extra classes for a single panel. */
  panelClassName?: string;
} & Omit<ComponentProps<"div">, "onSelect">;

/**
 * A carousel that gives one panel the room and squeezes the rest into slats
 * down the right-hand side. Opening a slat widens it and slides the row along;
 * the copy and the button underneath cross-fade to match.
 */
export function SqueezeCarousel({
  slides,
  defaultIndex = 0,
  onIndexChange,
  height = "clamp(110px, 23cqi, 280px)",
  slatWidth = 6,
  slatGap = 6,
  gap = 10,
  radius = 16,
  duration = 1000,
  hoverGrow = true,
  autoplay = false,
  interval = 6000,
  controls = true,
  accent = "var(--sq-accent, var(--primary, currentColor))",
  accentForeground = "var(--sq-accent-foreground, var(--primary-foreground, white))",
  label = "Featured",
  panelClassName,
  className,
  style,
  ...props
}: SqueezeCarouselProps) {
  const count = slides.length;
  const wrap = (i: number) => ((i % count) + count) % count;

  // Four columns plus a tail of slats. Fewer slides, shorter tail.
  const slats = clamp(count - 4, 1, 3);
  const visible = 4 + slats;

  const reduced = useReducedMotion();
  const ms = reduced ? 0 : duration;

  const ids = useId();
  const seed = useRef(0);
  const strip = useRef<HTMLDivElement>(null);
  const keyboardFocus = useRef(false);
  const busyRef = useRef(false);
  const [busy, setBusy] = useState(false);

  /* --- the strip -------------------------------------------------------- */

  const window0 = () =>
    Array.from({ length: visible }, (_, p) => ({
      key: seed.current++,
      slide: wrap(defaultIndex + p),
    }));

  const [cards, setCards] = useState<Card[]>(window0);
  // Which column each card sits in: its place in the strip plus this. Stepping
  // on pushes it down, so the card that was column 0 becomes column −1 — a
  // slat, on its way out of the left edge.
  const [column, setColumn] = useState(0);
  // Read by the tidy-up below, which runs from a timer and so cannot trust a
  // value captured when it was scheduled.
  const columnRef = useRef(0);
  const forward = useRef(true);
  // How far the strip is slid, counted in slats. Normally the same as
  // `column`; it parts company for the one frame after a trim or before a
  // step back, where the strip has to move without being seen to.
  const [slid, setSlid] = useState(0);
  const [still, setStill] = useState(false);
  const [hover, setHover] = useState(-1);

  const open = cards[-column]?.slide ?? defaultIndex;
  useLayoutEffect(() => {
    if (keyboardFocus.current) {
      strip.current
        ?.querySelector<HTMLButtonElement>('[aria-selected="true"]')
        ?.focus({ preventScroll: true });
      keyboardFocus.current = false;
    }
  }, [open]);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // A step leaves the strip longer than it needs to be. Once the movement has
  // finished, cut it back to the cards on show and put the numbers back to
  // zero — the same picture, so nothing may animate on the way.
  // Stepping on appends to the tail, stepping back prepends to the head, so
  // the cards on show are simply the last or the first of the strip. Counting
  // in from a column number instead would mean trusting a figure captured
  // before the step it belongs to had been applied — which rapid clicking
  // breaks.
  const settle = useCallback(() => {
    setCards((strip) =>
      forward.current ? strip.slice(-visible) : strip.slice(0, visible),
    );
    columnRef.current = 0;
    setColumn(0);
    setSlid(0);
    setStill(true);
    busyRef.current = false;
    setBusy(false);
  }, [visible]);

  useLayoutEffect(() => {
    if (!still) return;
    const id = requestAnimationFrame(() => setStill(false));
    return () => cancelAnimationFrame(id);
  }, [still]);

  const step = useCallback(
    (by: number) => {
      if (count < 2 || by === 0 || busyRef.current) return;
      busyRef.current = true;
      setBusy(true);

      timers.current.forEach(clearTimeout);
      timers.current = [];
      forward.current = by > 0;

      if (by > 0) {
        // The incoming slat joins the tail at full size before anything
        // moves, so the end of the row is never a slat short.
        setCards((strip) => [
          ...strip,
          ...Array.from({ length: by }, (_, k) => ({
            key: seed.current++,
            slide: wrap(strip[strip.length - 1].slide + 1 + k),
          })),
        ]);
        columnRef.current -= by;
        setColumn(columnRef.current);
        setSlid((s) => s - by);
      } else {
        // Going back, the strip has to grow at the front, which shoves
        // everything right. Slide it left by the same amount with no
        // transition, then let it ease home.
        setCards((strip) => [
          ...Array.from({ length: -by }, (_, k) => ({
            key: seed.current++,
            slide: wrap(strip[0].slide - (-by - k)),
          })),
          ...strip,
        ]);
        setSlid((s) => s + by);
        setStill(true);
        timers.current.push(window.setTimeout(() => setSlid(0), 0));
      }

      timers.current.push(window.setTimeout(settle, ms + 20));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count, ms, settle],
  );

  const go = useCallback(
    (to: number) => {
      const here = open;
      if (to === here) return;
      const forward = wrap(to - here);
      step(forward <= count / 2 ? forward : forward - count);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [open, count, step],
  );

  useEffect(() => {
    onIndexChange?.(open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  /* --- autoplay --------------------------------------------------------- */

  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!autoplay || paused || reduced || count < 2) return;
    const timer = window.setTimeout(() => step(1), interval);
    return () => clearTimeout(timer);
  }, [autoplay, paused, reduced, count, open, interval, step]);

  /* --- keyboard --------------------------------------------------------- */

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (
      busyRef.current &&
      ["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
    ) {
      event.preventDefault();
      return;
    }
    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const target = event.key === "Home" ? 0 : count - 1;
      if (target !== open) {
        keyboardFocus.current = true;
        go(target);
      }
      return;
    }
    const moves: Record<string, number | undefined> = {
      ArrowRight: 1,
      ArrowLeft: -1,
    };
    const by = moves[event.key];
    if (by === undefined) return;
    event.preventDefault();
    keyboardFocus.current = true;
    step(by);
  };

  if (!count) return null;

  /* --- render ----------------------------------------------------------- */

  const slat = size(slatWidth);
  const shares =
    hoverGrow && hover >= 0 && hover <= 3 && !reduced ? null : SHARES;

  /** The share a column takes, once the pointer has had its say. */
  const shareOf = (col: number) => {
    if (shares) return SHARES[col];
    return hover === col ? STRETCHED[col] : SQUEEZED[col];
  };

  /** A column's width, worked out in CSS so nothing needs measuring. */
  const widthOf = (col: number) => {
    if (col < 0 || col > 3) return slat;
    if (col === 0)
      return `calc(var(--sq-hero) + var(--sq-room) * ${shareOf(0)})`;
    return `calc(var(--sq-room) * ${shareOf(col)})`;
  };

  const vars = {
    "--sq-h": size(height),
    "--sq-gap": size(gap),
    "--sq-slat-gap": size(slatGap),
    "--sq-radius": size(radius),
    "--sq-ms": `${ms}ms`,
    // easeOutExpo, the curve the original slides on
    "--sq-ease": "cubic-bezier(0.16, 1, 0.3, 1)",
    "--sq-fill": accent,
    "--sq-on-fill": accentForeground,
    // A 16:9 block sets both the open card and the size every picture is
    // drawn at, so a picture keeps one scale however narrow its card gets.
    "--sq-hero": "calc(var(--sq-h) * 16 / 9)",
    "--sq-room": `calc(100cqi - var(--sq-hero) - ${
      slats
    } * var(--sq-slat-gap) - 3 * var(--sq-gap) - ${slats} * ${slat})`,
  } as CSSProperties;

  const move = `translateX(calc(${slid} * (${slat} + var(--sq-gap))))`;

  return (
    <div
      className={cn(
        "squeeze-carousel tw:flex tw:w-full tw:flex-col",
        className,
      )}
      // The breakpoints and widths below read the width this carousel is
      // given, not the width of the window.
      style={{
        containerType: "inline-size",
        fontFamily: "inherit",
        ...vars,
        ...style,
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        setHover(-1);
      }}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      {...props}
    >
      {controls && count > 1 && (
        <div className="tw:mb-4 tw:flex tw:justify-end tw:gap-2">
          <Arrow
            back
            label="Previous"
            disabled={busy}
            onClick={() => step(-1)}
          />
          <Arrow label="Next" disabled={busy} onClick={() => step(1)} />
        </div>
      )}

      <div
        className="tw:w-full tw:overflow-hidden"
        style={{ height: "var(--sq-h)" }}
      >
        <div
          ref={strip}
          role="tablist"
          aria-label={label}
          aria-orientation="horizontal"
          onKeyDown={onKeyDown}
          className="tw:flex tw:h-full tw:w-max"
          style={{
            transform: move,
            transition: still
              ? "none"
              : `transform var(--sq-ms) var(--sq-ease)`,
          }}
        >
          {cards.map((card, place) => {
            const col = place + column;
            const slide = slides[card.slide];
            const front = col === 0;

            return (
              <button
                key={card.key}
                type="button"
                role="tab"
                id={`${ids}-tab-${card.key}`}
                aria-selected={front}
                aria-hidden={col < 0 || col >= visible ? true : undefined}
                aria-controls={`${ids}-panel`}
                aria-label={slide.title}
                tabIndex={front ? 0 : -1}
                onMouseMove={() => hoverGrow && setHover(col)}
                onClick={() => col > 0 && step(col)}
                className={cn(
                  "tw:relative tw:isolate tw:h-full tw:shrink-0 tw:cursor-pointer tw:overflow-hidden tw:bg-muted tw:p-0",
                  "tw:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-offset-2",
                  "tw:focus-visible:ring-[var(--sq-fill)] tw:focus-visible:ring-offset-background",
                  panelClassName,
                )}
                style={{
                  width: widthOf(col),
                  marginLeft:
                    place === 0
                      ? 0
                      : col < 4
                        ? "var(--sq-gap)"
                        : "var(--sq-slat-gap)",
                  borderRadius: `min(var(--sq-radius), calc(${widthOf(col)} / 2))`,
                  transitionProperty: "width, margin-left",
                  transitionDuration: still ? "0s" : "var(--sq-ms)",
                  transitionTimingFunction: "var(--sq-ease)",
                }}
              >
                <Picture slide={slide} />

                {slide.overlay && (
                  <span
                    aria-hidden="true"
                    className="tw:pointer-events-none tw:absolute tw:inset-x-0 tw:bottom-0 tw:flex tw:items-end tw:p-4 tw:pt-16 tw:@lg:p-6 tw:@lg:pt-20"
                    style={{
                      opacity: front ? 1 : 0,
                      transition: `opacity var(--sq-ms) var(--sq-ease)`,
                      backgroundImage:
                        "linear-gradient(to top, rgb(240 245 253 / 0.96), rgb(240 245 253 / 0))",
                    }}
                  >
                    {slide.overlay}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id={`${ids}-panel`}
        role="tabpanel"
        aria-label={slides[open]?.title}
        aria-live="polite"
        className="tw:mt-6 tw:grid tw:@xl:mt-7"
      >
        {slides.map((slide, i) => {
          const shown = i === open;

          return (
            <div
              key={slide.id ?? i}
              aria-hidden={!shown}
              className={cn(
                "tw:col-start-1 tw:row-start-1 tw:flex tw:flex-col tw:gap-4",
                "tw:@xl:flex-row tw:@xl:items-start tw:@xl:justify-between tw:@xl:gap-10",
              )}
              style={{
                opacity: shown ? 1 : 0,
                visibility: shown ? "visible" : "hidden",
                pointerEvents: shown ? "auto" : "none",
                transition: `opacity var(--sq-ms) var(--sq-ease), visibility var(--sq-ms)`,
              }}
            >
              <p className="tw:max-w-[46rem] tw:text-[15px] tw:leading-[1.6] tw:text-balance tw:@lg:text-[17px]">
                <span className="tw:text-foreground">{slide.title}</span>{" "}
                {slide.description && (
                  <span className="tw:text-muted-foreground">
                    {slide.description}
                  </span>
                )}
              </p>

              {slide.action && <Action slide={slide} shown={shown} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   pieces                                   */
/* -------------------------------------------------------------------------- */

/**
 * Drawn at a fixed 16:9 block and centred, never at the width of its card.
 * Left to itself `object-fit: cover` reads whichever edge binds — height while
 * the card is a slat, width once it opens — so the picture would rescale
 * mid-slide and be resampled every frame. One block means one scale: the card
 * only ever changes how much of it you can see.
 */
function Picture({ slide }: { slide: SqueezeSlide }) {
  const box = {
    width: "var(--sq-hero)",
    minWidth: "100%",
  } as const;

  if (slide.image) {
    return (
      <img
        src={slide.image}
        alt={slide.imageAlt ?? ""}
        draggable={false}
        loading="lazy"
        decoding="async"
        className="tw:absolute tw:inset-y-0 tw:left-1/2 tw:h-full tw:max-w-none tw:-translate-x-1/2 tw:object-cover"
        style={box}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className="tw:absolute tw:inset-y-0 tw:left-1/2 tw:-translate-x-1/2"
      style={{ background: slide.background, ...box }}
    />
  );
}

function Arrow({
  back = false,
  label,
  onClick,
  disabled = false,
}: {
  back?: boolean;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "tw:grid tw:size-9 tw:cursor-pointer tw:place-items-center tw:rounded-md",
        "tw:bg-[var(--sq-fill)] tw:text-[var(--sq-on-fill)]",
        "tw:transition-opacity tw:hover:opacity-85 tw:outline-none",
        "tw:focus-visible:ring-2 tw:focus-visible:ring-[var(--sq-fill)]",
        "tw:focus-visible:ring-offset-2 tw:focus-visible:ring-offset-background",
      )}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          d={
            back
              ? "M9.6 2.6 5.1 7.1h9.1v1.8H5.1l4.5 4.5-1.2 1.2-6-6L1.8 8l.6-.6 6-6 1.2 1.2Z"
              : "M6.4 2.6l4.5 4.5H1.8v1.8h9.1l-4.5 4.5 1.2 1.2 6-6 .6-.6-.6-.6-6-6-1.2 1.2Z"
          }
        />
      </svg>
    </button>
  );
}

/** The button under the copy. A link when it has an `href`, a button otherwise. */
function Action({ slide, shown }: { slide: SqueezeSlide; shown: boolean }) {
  const inside = (
    <>
      {slide.action}
      <svg
        width="6"
        height="9"
        viewBox="0 0 6 9"
        fill="none"
        aria-hidden="true"
        className="tw:transition-transform tw:duration-200 tw:group-hover/sq-action:translate-x-0.5"
      >
        <path
          d="M1.2 1 4.7 4.5 1.2 8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );

  const dress = cn(
    "tw:group/sq-action tw:inline-flex tw:shrink-0 tw:cursor-pointer tw:items-center tw:gap-2 tw:rounded-md",
    "tw:bg-[var(--sq-fill)] tw:px-4 tw:py-2.5 tw:text-sm tw:font-medium tw:text-[var(--sq-on-fill)]",
    "tw:transition-opacity tw:hover:opacity-85 tw:outline-none",
    "tw:focus-visible:ring-2 tw:focus-visible:ring-[var(--sq-fill)]",
    "tw:focus-visible:ring-offset-2 tw:focus-visible:ring-offset-background",
  );

  if (slide.href) {
    return (
      <a
        href={slide.href}
        target={slide.target}
        rel={slide.target === "_blank" ? "noreferrer" : undefined}
        tabIndex={shown ? 0 : -1}
        onClick={slide.onAction}
        className={dress}
      >
        {inside}
      </a>
    );
  }

  return (
    <button
      type="button"
      tabIndex={shown ? 0 : -1}
      onClick={slide.onAction}
      className={dress}
    >
      {inside}
    </button>
  );
}

export default SqueezeCarousel;
