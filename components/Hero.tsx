"use client";
import Image from "next/image";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="hero">
      <div className="flex-1 pt-36 padding-x">
        <h1 className="hero__title">
          Stay on top of your budget with our intuitive — Money Tracker app
        </h1>

        <p className="hero__subtitle pb-10">
          Effortlessly monitor your expenses and manage your finances
        </p>

        <Link href="/dashboard">
          <button className="text-white rounded-full bg-emerald-600 min-w-[130px] min-h-[50px]">
            Get Started
          </button>
        </Link>

        {/* <button className="text-white rounded-full bg-emerald-600 min-w-[130px] min-h-[50px]">
              Get Started
            </button> */}
      </div>
      <div className="hero__image-container">
        <div className="hero__image">
          <Image
            src="/moneyv2.svg"
            alt="hero"
            fill
            className="object-contain"
          />
        </div>
        {/* <div className="hero__image-overlay"></div> */}
      </div>
    </div>
  );
};

export default Hero;
