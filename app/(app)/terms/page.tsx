import React from 'react';
import { ShieldCheck, Scale, AlertTriangle, CreditCard, Clock, UserCheck } from 'lucide-react';

export default function TermsPage() {
  const lastUpdated = "January 2026";

  return (
    <div className="min-h-screen bg-white px-5 py-25 text-black">
      {/* Header Section */}
      <header className="max-w-[1200px] mx-auto mb-16">
        <h1 className="text-4xl md:text-6xl font-black title-font tracking-tight mb-4">
          Terms & Conditions
        </h1>
        <div className="flex items-center gap-2 text-zinc-400 font-bold tracking-widest text-xs uppercase">
          <span className="w-8 h-[1px] bg-zinc-300"></span>
          Last updated: {lastUpdated}
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto space-y-12">
        
        {/* Section 1: Introduction */}
        <section>
          <h2 className="text-xl font-bold title-font mb-4 flex items-center gap-3">
            <Scale size={24} /> 1. Introduction
          </h2>
          <div className="space-y-4 text-zinc-600 leading-relaxed title-font2">
            <p>Beegee is a web-based rental platform connecting <strong>Listers</strong> (item owners) with <strong>Renters</strong>.</p>
            <p>We operate as a neutral intermediary and do not own, inspect, or physically handle any items. By using Beegee, you agree to these terms.</p>
          </div>
        </section>

        {/* Section 2: Eligibility & Verification */}
        <section className="p-8 rounded-3xl bg-zinc-50 border border-zinc-100">
          <h2 className="text-xl font-bold title-font mb-4 flex items-center gap-3 text-black">
            <UserCheck size={24} /> User Accounts & Verification
          </h2>
          <div className="space-y-4 text-zinc-600 title-font2 text-sm">
            <p>Primarily for university students (Minimum age: 15). Verification is <strong>mandatory</strong> and requires:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-black font-semibold">
              <li>• Student Name</li>
              <li>• Student University Level</li>
              <li>• Mobile Phone Number</li>
              <li>• Personal Photograph</li>
            </ul>
            <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl font-bold text-xs flex items-start gap-2">
              <AlertTriangle size={16} className="shrink-0" />
              BEEGEE DOES NOT REQUEST BVN. NEVER SHARE YOUR BVN WITH ANYONE.
            </div>
          </div>
        </section>

        {/* Section 3: Payments & Escrow */}
        <section>
          <h2 className="text-xl font-bold title-font mb-4 flex items-center gap-3">
            <CreditCard size={24} /> Payments, Fees & Escrow
          </h2>
          <div className="space-y-4 text-zinc-600 title-font2">
            <p>All payments are processed via <strong>Flutterwave</strong>. Funds are held in escrow until both parties confirm completion.</p>
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px] border border-zinc-200 p-4 rounded-2xl">
                <span className="block text-[10px] text-zinc-400 uppercase font-black">Service Fee</span>
                <span className="text-2xl font-black">20%</span>
              </div>
              <div className="flex-1 min-w-[200px] border border-zinc-200 p-4 rounded-2xl">
                <span className="block text-[10px] text-zinc-400 uppercase font-black">Min. Withdrawal</span>
                <span className="text-2xl font-black">₦3,000</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Penalties & Late Returns */}
        <section>
          <h2 className="text-xl font-bold title-font mb-4 flex items-center gap-3">
            <Clock size={24} /> Late Returns & Penalties
          </h2>
          <div className="p-6 border-l-4 border-black bg-zinc-50 rounded-r-2xl">
            <p className="text-lg font-bold title-font">₦500 per hour</p>
            <p className="text-sm text-zinc-500 title-font2">Fees are deducted automatically from your balance. Failure to settle within 2 weeks results in a permanent ban.</p>
          </div>
        </section>

        {/* Section 5: Security & Disputes */}
        <section>
          <h2 className="text-xl font-bold title-font mb-4 flex items-center gap-3">
            <ShieldCheck size={24} /> Enforcement & Insurance
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm title-font2">
            <div className="space-y-2">
              <h4 className="font-black text-black uppercase text-[10px] tracking-widest">Theft Policy</h4>
              <p className="text-zinc-600">Non-return of items leads to account deletion and cooperation with legal authorities using your verified data.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-black text-black uppercase text-[10px] tracking-widest">Insurance Cap</h4>
              <p className="text-zinc-600">Beegee maintains an internal reserve fund. Compensation is discretionary with a max cap of <strong>₦30,000</strong> per item.</p>
            </div>
          </div>
        </section>

        <hr className="border-zinc-100 my-20" />

        {/* Privacy Policy Short Section */}
        <section className="pb-20">
          <h2 className="text-3xl font-black title-font mb-8">Privacy Policy</h2>
          <div className="space-y-6 text-zinc-600 title-font2">
            <p>Your data is securely stored on servers in <strong>France</strong>. Access is restricted to platform founders only.</p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-black mb-2">Data Sharing</h4>
                <p className="text-sm">We do not sell data. It is only disclosed when legally required or for dispute enforcement.</p>
              </div>
              <div>
                <h4 className="font-bold text-black mb-2">User Rights</h4>
                <p className="text-sm">You may request access, correction, or immediate deletion of your data through support.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Footer */}
        <footer className="bg-black text-white p-10 rounded-[40px] mb-10">
          <p className="text-[10px] uppercase font-black tracking-[0.3em] mb-4 opacity-50">Support & Contact</p>
          <div className="grid md:grid-cols-2 gap-6 title-font2">
            <div>
              <p className="font-bold">Bingham University</p>
              <p className="text-zinc-400">Karu, Nasarawa State, Nigeria</p>
            </div>
            <div>
              <p className="font-bold">09043647942</p>
              <p className="font-bold">08101892870</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};
