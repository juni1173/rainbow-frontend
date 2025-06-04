"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("id_token") || null;
    if (token) {
      router.replace("/dashboard");
    } else {
      router.replace("/auth/sign-in");
    }
  }, [router]);

  return null;
}
