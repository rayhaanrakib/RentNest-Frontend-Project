"use client";

import { motion } from "framer-motion";
import { Home, RefreshCw, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative min-h-screen bg-foreground text-white overflow-hidden flex items-center justify-center p-4">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[150px] pointer-events-none" />

      <motion.h1
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute text-[18rem] md:text-[28rem] font-bold tracking-tighter text-white/[0.02] select-none pointer-events-none leading-none"
      >
        ERROR
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center max-w-lg w-full space-y-8"
      >
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 mb-4"
        >
          <AlertTriangle className="h-10 w-10 text-red-400" />
        </motion.div>

        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.1]">
          Something broke <br />
          <span className="text-red-400">unexpectedly.</span>
        </h2>

        <p className="text-white/60 text-lg leading-relaxed max-w-md mx-auto">
          We&apos;re sorry for the inconvenience. Our team has been notified. You can
          try again or head back to safety.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <button
            onClick={() => reset()}
            className="group inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-white text-foreground text-sm font-medium hover:bg-slate-200 transition-all shadow-sm hover:shadow-lg hover:-translate-y-0.5"
          >
            <RefreshCw className="h-4 w-4 transition-transform group-hover:rotate-180 duration-500" />
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-transparent text-white text-sm font-medium border border-white/20 hover:bg-white/5 transition-all"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </motion.div>
    </main>
  );
};

export default Error;
