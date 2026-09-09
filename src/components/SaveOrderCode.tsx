"use client";

import { useEffect } from "react";

export default function SaveOrderCode({ code }: { code: string }) {
  useEffect(() => {
    try {
      localStorage.setItem("ap_last_order", code);
    } catch {
      /* private mode */
    }
  }, [code]);

  return null;
}
