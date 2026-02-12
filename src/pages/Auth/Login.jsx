import LoginForm from "@/components/login-form";
import React from "react";

export default function Login() {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-2">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-500" />

        {/* Logo Section */}
        <div className="relative z-20 flex items-center text-lg font-medium">
          <div className="mr-2 flex h-8 w-8 items-center justify-center rounded bg-white/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
              <path d="m3.3 7 8.7 5 8.7-5" />
              <path d="M12 22V12" />
            </svg>
          </div>
          <span className="font-bold tracking-tight">Enterprise HRMS</span>
        </div>

        {/* Main Content */}
        <div className="relative z-20 mt-auto mb-auto max-w-md">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-6 leading-tight">
            Empowering your workforce.
          </h1>
          <p className="text-lg text-blue-100/80 leading-relaxed">
            Streamline your operations, manage talent effectively, and drive
            organizational growth with our unified human capital management
            platform.
          </p>
        </div>

        {/* Stats Section */}
        <div className="relative z-20 mt-auto">
          <div className="h-px w-full bg-white/20 mb-8" />
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="text-3xl font-bold">10k+</div>
              <div className="text-sm text-blue-100/60 mt-1">
                Active Employees
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold">99.9%</div>
              <div className="text-sm text-blue-100/60 mt-1">
                Uptime Reliability
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LoginForm */}
      <div className="flex items-center justify-center ">
        <div className=" w-full ">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
