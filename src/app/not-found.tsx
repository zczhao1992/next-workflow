import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">页面没找到</h2>
        <p className="text-muted-foreground mb-8 max-w-md"></p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/"
            className="flex items-center justify-center px-4 py-2 
          bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            回到首页
          </Link>
        </div>
      </div>
      <div className="mt-12 text-center">
        <footer className="text-sm text-muted-foreground"></footer>
      </div>
    </div>
  );
}

export default NotFoundPage;
