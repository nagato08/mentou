"use client";

import dynamic from "next/dynamic";

/**
 * Lazy wrapper for GSAP animations.
 * Loads GSAP only after initial page render to keep TBT/bootup time low.
 */
const GsapAnimations = dynamic(() => import("./GsapAnimations"), {
  ssr: false,
  loading: () => null,
});

export default function GsapAnimationsLazy() {
  return <GsapAnimations />;
}
