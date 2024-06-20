"use client";
import React, {
  useCallback,
  useRef,
  useEffect,
  MouseEventHandler,
} from "react";
import { useRouter } from "next/navigation";

function ModalWrapper({ children }: { children: React.ReactNode }) {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    document.body.classList.remove("overflow-hidden");
    router.back();
  }, [router]);

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss],
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("overflow-hidden");
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div
      ref={overlay}
      className="fixed bottom-0 left-0 right-0 top-0 z-10 mx-auto flex max-h-screen justify-center bg-black/60"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="absolute top-[5%] flex max-h-[90%] max-w-screen-2xl justify-center"
      >
        {children}
      </div>
    </div>
  );
}

export default ModalWrapper;
