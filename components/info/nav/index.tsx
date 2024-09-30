"use client";
import { useState } from "react";
import Des from "./des";
import TrailerSection from "./trailer";
import CharactersList from "./characters";
import { Character } from "@/types/utils";
import type { Trailer } from "@/types/utils";
import { motion } from "framer-motion";

export default function Nav({
  desSection,
  characters,
  title,
  video,
}: {
  desSection: string;
  characters: Character[] | undefined;
  video: Trailer | undefined;
  title: string;
}) {
  const buttons = ["Description", "Characters", "Trailer"];
  const [activeTab, setActiveTab] = useState("Description");

  // Render the content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case "Description":
        return <Des content={desSection} />;
      case "Characters":
        return <CharactersList characters={characters} />;
      case "Trailer":
        return <TrailerSection title={title} video={video} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex gap-7 justify-center relative">
        {buttons.map((text) => (
          <button
            key={text}
            onClick={() => setActiveTab(text)}
            className={`relative p-5 font-semibold border-b-4 ${
              activeTab === text
                ? "border-red-500 text-red-500"
                : "border-transparent"
            }`}
          >
            {text}
            {activeTab === text && (
              <span
                className="absolute left-1/2 transform -translate-x-1/2 top-[105%]"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "5px solid transparent",
                  borderRight: "5px solid transparent",
                  borderTop: "5px solid #ef4444",
                }}
              ></span>
            )}
          </button>
        ))}
      </div>

      {/* Display the selected content */}
      <motion.div
        key={activeTab} // Ensure animation works on content change
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mt-5"
      >
        {renderContent()}
      </motion.div>
    </div>
  );
}
