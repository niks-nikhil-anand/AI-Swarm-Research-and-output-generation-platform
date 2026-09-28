"use client";

import { useState } from "react";
import { faqs } from "../data/content";
import { icons } from "../data/icons";
import { Accent } from "../ui/Accent";
import { ArrowLink } from "../ui/ButtonLink";
import { Icon } from "../ui/Icon";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq" className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_1.4fr]">
      <div className="flex flex-col">
        <SectionHeader
          eyebrow="FAQ"
          size="lg"
          title={
            <>
              Questions before you <Accent>start.</Accent>
            </>
          }
        />
        <p className="mt-4 max-w-[420px] text-[15px] leading-[1.7] text-muted">
          Something missing? Ask me directly and I’ll add the answer here.
        </p>
        <ArrowLink href="#" className="mt-6 self-start text-[15px]">
          Ask a Question
        </ArrowLink>
      </div>

      <div className="flex flex-col border-t border-line">
        {faqs.map((item, i) => {
          const open = openIndex === i;
          const panelId = `faq-panel-${i}`;
          return (
            <div key={item.q} className="border-b border-line">
              <h3 className="m-0">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="flex min-h-16 w-full items-center justify-between gap-4 border-0 bg-transparent p-0 py-3 text-left text-base font-medium text-fg"
                >
                  {item.q}
                  <Icon
                    d={open ? icons.minus : icons.plus}
                    size={18}
                    strokeWidth={1.8}
                    className={open ? "text-brand-soft" : "text-dim"}
                  />
                </button>
              </h3>
              {open && (
                <p id={panelId} className="m-0 pr-10 pb-[22px] text-[15px] leading-[1.7] text-muted">
                  {item.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
