import React, { useEffect } from "react";
import { useRouter } from "next/router";

function index() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  }, []);

  return null; // Poderia retornar um fallback
}

export default index;
