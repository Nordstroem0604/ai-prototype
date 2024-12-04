import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-8 sm:p-20 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-[family-name:var(--font-geist-sans)]">
      {/* Header Section */}
      <header className="w-full max-w-5xl text-center">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4">
          Welcome to <span className="text-blue-600 dark:text-blue-400">FinSight AI</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
          Your trusted partner in financial insights, powered by cutting-edge machine learning and language models.
        </p>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center gap-12 w-full max-w-5xl">
        {/* Hero Image */}
        <Image
          src="/globe.svg"
          alt="Financial Insights"
          width={250}
          height={150}
          className="rounded-lg shadow-lg"
          priority
        />

        {/* Features List */}
        <section className="grid sm:grid-cols-3 gap-8 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2">Personalized Insights</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Understand your financial data like never before with insights tailored to your needs.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2">AI-Powered Accuracy</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Leverage advanced machine learning algorithms for data-driven decisions.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2">Interactive Reports</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Dive into intuitive and interactive reports to track your progress with ease.
            </p>
          </div>
        </section>

        {/* Call-to-Action */}
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="/get-started"
            className="rounded-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 text-lg font-semibold transition"
          >
            Get Started
          </a>
          <a
            href="/learn-more"
            className="rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 px-6 py-3 text-lg font-semibold transition"
          >
            Learn More
          </a>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="w-full max-w-5xl flex justify-between items-center py-4 border-t border-gray-200 dark:border-gray-800">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} FinSight AI. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a href="/privacy-policy" className="text-sm hover:underline">
            Privacy Policy
          </a>
          <a href="/terms-of-service" className="text-sm hover:underline">
            Terms of Service
          </a>
        </div>
      </footer>
    </div>
  );
}

