"use client";

import * as React from "react";
import FaqSection from "@/components/page/public/faq/FaqSection";

const FaqContainer: React.FC = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const handleToggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <FaqSection
      state={{ openIndex }}
      service={{ onToggleAccordion: handleToggleAccordion }}
    />
  );
};

export default FaqContainer;
