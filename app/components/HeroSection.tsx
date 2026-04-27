"use client";

import Link from "next/link";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[280px] sm:min-h-[320px] md:min-h-[380px] py-10 w-[calc(100%-32px)] md:w-[calc(100%-80px)] max-w-[1340px] mx-auto mt-6 sm:mt-8 md:mt-10 mb-4 sm:mb-6 rounded-2xl sm:rounded-[2rem] flex items-center justify-center overflow-hidden bg-[var(--riva-ivory)] shadow-2xl shadow-rose-900/10 border border-black/5">
      {/* Local Shader Background */}
      <div className="absolute inset-0 z-0 opacity-80 mix-blend-multiply" style={{ transform: "translateZ(0)" }}>
        <ShaderGradientCanvas
          style={{
            width: "100%",
            height: "100%",
            position: "absolute"
          }}
          lazyLoad={undefined}
          fov={undefined}
          pixelDensity={1}
          pointerEvents="none"
        >
          <ShaderGradient
            animate="on"
            type="plane"
            wireframe={false}
            shader="defaults"
            uTime={8}
            uSpeed={0.3}
            uStrength={0.1}
            uDensity={1.5}
            uFrequency={0}
            uAmplitude={0}
            positionX={0}
            positionY={0}
            positionZ={0}
            rotationX={50}
            rotationY={0}
            rotationZ={-60}
            color1="#ffffff"
            color2="#e96ec6"
            color3="#712525"
            reflection={0.1}
            // View (camera) props
            cAzimuthAngle={180}
            cPolarAngle={80}
            cDistance={2.8}
            cameraZoom={9.1}
            // Effect props
            lightType="3d"
            brightness={1}
            envPreset="city"
            grain="on"
            // Tool props
            toggleAxis={false}
            zoomOut={false}
            hoverState=""
            // Optional - if using transition features
            enableTransition={false}
          />
        </ShaderGradientCanvas>
      </div>

      {/* Subtle overlay gradient to ensure text readability */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 100%)",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center w-full flex flex-col items-center justify-center px-4">
        <div className="animate-fade-in-up max-w-2xl mx-auto w-full">
          {/* Main heading */}
          <h1
            className="text-3xl leading-[1.15] sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 drop-shadow-md"
            style={{
              fontFamily: "var(--font-heading)",
              color: "white",
            }}
          >
            Accessorize
            <br />
            Your{" "}
            <span className="relative inline-block">
              <span
                style={{
                  color: "#FFE5B4",
                  textShadow: "0 2px 10px rgba(0,0,0,0.25)",
                }}
              >
                Elegance
              </span>
              {/* Underline decoration */}
              <svg
                className="absolute -bottom-1 sm:-bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 8C30 3 70 2 100 5C130 8 170 7 198 4"
                  stroke="url(#grad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient
                    id="grad"
                    x1="0"
                    y1="0"
                    x2="200"
                    y2="0"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#DDA7A5" />
                    <stop offset="1" stopColor="#C5A880" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          {/* CTA buttons */}
          <div className="flex justify-center items-center">
            <Link
              href="/shop"
              className="btn-primary text-xs sm:text-sm py-3 px-8 sm:py-3.5 sm:px-10 shadow-xl shadow-rose-900/10"
            >
              Shop Collection
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
