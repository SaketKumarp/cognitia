"use client";

import { Card } from "@/components/ui/card";

export default function FormSectionCard({ title, children }: any) {
  return (
    <Card className="p-5 bg-neutral-900/60 border border-neutral-800/60 rounded-2xl shadow-md backdrop-blur-lg hover:border-neutral-700 transition">
      <h2 className="text-lg font-semibold text-neutral-200 mb-3">{title}</h2>
      {children}
    </Card>
  );
}
