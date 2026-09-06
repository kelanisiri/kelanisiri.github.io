"use client";

import { useEffect } from "react";

function revealNode(el: Element, observer: IntersectionObserver) {
  if (!(el instanceof HTMLElement)) return;
  if (el.classList.contains("is-visible")) return;
  observer.observe(el);
}

export function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );

    document.querySelectorAll(".reveal").forEach((el) => revealNode(el, observer));

    // Re-observe nodes added later (e.g. gallery filter swaps)
    const mutation = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.classList.contains("reveal")) revealNode(node, observer);
          node.querySelectorAll?.(".reveal").forEach((el) => revealNode(el, observer));
        });
      }
    });

    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutation.disconnect();
    };
  }, []);

  return null;
}
