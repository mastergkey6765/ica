import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Intentionally left routing/navbar/footer wrapping here if it needs to be injected globally */}
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}
