"use client";

import { useEffect, useRef } from "react";

export default function FeedClient({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const toggleMode = document.querySelector("._layout_swithing_btn_link");
    const layout = document.querySelector("._layout_main_wrapper");
    let darkMode = false;

    toggleMode?.addEventListener("click", () => {
      darkMode = !darkMode;
      layout?.classList.toggle("_dark_wrapper", darkMode);
    });

    const profileDropShowBtn = document.querySelector<HTMLElement>("#_profile_drop_show_btn");
    const profileDropdown = document.querySelector<HTMLElement>("#_prfoile_drop");
    let isDropShow = false;

    profileDropShowBtn?.addEventListener("click", () => {
      isDropShow = !isDropShow;
      profileDropdown?.classList.toggle("show", isDropShow);
    });

    const timelineDropShowBtn = document.querySelector<HTMLElement>("#_timeline_show_drop_btn");
    const timelineDropdown = document.querySelector<HTMLElement>("#_timeline_drop");
    let isDropTimelineShow = false;

    timelineDropShowBtn?.addEventListener("click", () => {
      isDropTimelineShow = !isDropTimelineShow;
      timelineDropdown?.classList.toggle("show", isDropTimelineShow);
    });
  }, []);

  return <>{children}</>;
}
