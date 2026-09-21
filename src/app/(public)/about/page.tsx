"use client";

import { motion } from "framer-motion";
import { ArrowRight, Home, Search, ShieldCheck, Target, Users } from "lucide-react";
import Link from "next/link";

const AboutPage = () => {
  const stats = [
    { icon: Home, value: "8,000+", label: "Properties Listed" },
    { icon: Users, value: "15,500+", label: "Active Users" },
    { icon: ShieldCheck, value: "100%", label: "Verified Listings" },
  ];

  const values = [
    { title: "Transparency", desc: "No hidden fees. No fake listings. Just honest and direct communication between tenants and landlords." },
    { title: "Security", desc: "Our verified profile system and secure payment gateway ensure your safety and peace of mind." },
    { title: "Simplicity", desc: "A seamless, intuitive interface designed to make finding or listing a home effortless." },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative py-32 overflow-hidden mesh-bg">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-brand-50 text-brand-700 text-sm font-medium border border-brand-100 mb-6"
          >
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900"
          >
            Redefining the <span className="gradient-text">Rental Experience</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-slate-600 leading-relaxed"
          >
            RentNest was born from a simple idea: finding a home shouldn&apos;t be stressful. We connect trusted landlords with verified tenants through a transparent, secure, and beautifully designed platform.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-4">
                  <stat.icon className="h-6 w-6 text-brand-600" />
                </div>
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-brand-600 font-semibold mb-3"
            >
              <Target className="h-5 w-5" />
              <span className="text-sm uppercase tracking-wider">Our Mission</span>
            </motion.div>
            <h2 className="text-3xl font-bold text-slate-900">Built on Trust and Simplicity</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
              >
                <h3 className="font-bold text-lg text-slate-800 mb-2">{val.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Minimal CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-6"
          >
            Ready to find your next home?
          </motion.h2>
          <Link
            href="/properties"
            className="group inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-white text-foreground text-sm font-medium hover:bg-brand-400 hover:text-white transition-all shadow-sm hover:shadow-lg hover:-translate-y-0.5"
          >
            <Search className="h-4 w-4" />
            Browse Properties
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default AboutPage