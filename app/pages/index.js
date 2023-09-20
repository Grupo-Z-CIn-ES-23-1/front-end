import React, { useEffect } from "react";
import { useRouter } from "next/router";

function Index() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  }, [router]);

  return null; // Poderia retornar um fallback
}

export default Index;
