"use client";

import Image from "next/image";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

const Hero = () => {
  const handleScroll = () => {};

  return (
    <div className="hero">
      <div className="flex-1 pt-36 padding-x">
        <h1 className="hero__title">
          Stay on top of your budget with our intuitive — Money Tracker app
        </h1>

        <p className="hero__subtitle pb-10">
          Effortlessly monitor your expenses and manage your finances
        </p>

        <SignedIn>
          <Link href="/dashboard">
            <button className="text-white rounded-full bg-emerald-600 min-w-[130px] min-h-[50px]">
              Get Started
            </button>
          </Link>
        </SignedIn>
        <SignedOut>
          <SignInButton redirectUrl="localhost:3000/dashboard">
            <button className="text-white rounded-full bg-emerald-600 min-w-[130px] min-h-[50px]">
              Get Started
            </button>
          </SignInButton>
        </SignedOut>
      </div>
      <div className="hero__image-container">
        <div className="hero__image">
          <Image src="/money.svg" alt="hero" fill className="object-contain" />
        </div>
        <div className="hero__image-overlay"></div>
      </div>
    </div>
  );
};

export default Hero;
