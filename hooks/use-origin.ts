import React, { useEffect, useState } from 'react'

export default function useOrigin() {
  //  生成url原始链接
  const [mounted, setMounted] = useState(false);

  useEffect(() => { 
    setMounted(true);
   }, []);

   const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : "";

   if (!mounted) return "";

  return origin;
}