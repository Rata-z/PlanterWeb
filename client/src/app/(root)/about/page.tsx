import FeatureCard from "@/components/featureCard";
import { Icons } from "@/components/icons";
import React from "react";
import { MdMenuBook } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { IoHeartOutline } from "react-icons/io5";
import Link from "next/link";

function About() {
  return (
    <div className="flex min-h-[calc(100vh-6.25rem)] flex-col items-center gap-28 py-10">
      <div className="flex w-[40%] flex-col items-center gap-2">
        <Icons.logo className="h-20 w-16" />
        <h1 className="font-halant text-5xl">Welcome to Planter!</h1>
        <p className="text-left">
          Planter is your go-to platform for everything related to plant care.
          Whether you’re a seasoned gardener, a plant enthusiast, or just
          starting your green journey, Planter offers a space where you can
          share your experiences, seek advice, and learn from fellow plant
          lovers.
        </p>
      </div>
      <div className="flex w-[60%] flex-col items-center gap-5">
        <h1 className="font-halant text-5xl">Features</h1>
        <div className="flex w-full flex-row justify-between">
          <FeatureCard
            text="Share your plant care tips, experiences, and guides."
            icon={<FaPencilAlt size={45} />}
            header="Write"
          />
          <FeatureCard
            text="Explore detailed guides, stories, and expert advices."
            icon={<MdMenuBook size={45} />}
            header="Read"
          />
          <FeatureCard
            text="Engage with users by liking and commenting posts"
            icon={<IoHeartOutline size={45} />}
            header="Interact"
          />
        </div>
        <div className="flex w-full flex-col items-center gap-3 pt-10">
          <h2 className="font-halant text-3xl">Watering Cycles Tracker</h2>
          <p className="w-[80%] text-center">
            Use our mobile application to track the watering cycles of your
            plants. Check your watering schedules directly on the website.
          </p>
          <a
            className="rounded-md border-2 px-2 py-1 font-halant text-lg font-bold opacity-70 transition-opacity hover:opacity-100"
            href="https://github.com/4-Rata/Planter"
            target="_blank"
            rel="noopener noreferrer"
          >
            Details
          </a>
        </div>
      </div>
      <div className="flex w-[45%] flex-col items-center gap-2">
        <h1 className="font-halant text-5xl">Join Us</h1>
        <p className="text-left">
          We invite you to be a part of our community. Whether you’re looking to
          learn, share, or simply connect with other plant enthusiasts, Planter
          is the place for you.{" "}
          <Link className="text-blue-700 dark:text-blue-500" href={"/sign-up"}>
            Sign up
          </Link>{" "}
          today and start your journey towards better plant care with us!
        </p>
      </div>
    </div>
  );
}

export default About;
