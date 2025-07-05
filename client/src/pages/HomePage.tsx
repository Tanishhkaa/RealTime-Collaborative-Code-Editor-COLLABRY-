import React from 'react';
import illustration from '../assets/illustration.svg';
import FormComponent from '../components/forms/FormComponent';
import Logo from '../components/common/logo';
import { Code, Users, Lock, Globe, Users2, Briefcase } from 'lucide-react';

function HomePage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-8">
      <header className="mb-12 flex items-center justify-between">
        <Logo size="md" showTagline={true} />
        <div className="hidden items-center gap-6 sm:flex">
          <a href="#about" className="text-base text-gray-400 transition-colors hover:text-purple-400">About</a>
          <a href="#features" className="text-base text-gray-400 transition-colors hover:text-purple-400">Features</a>
          <a href="#" className="text-base text-gray-400 transition-colors hover:text-purple-400">Docs</a>
          <a href="https://github.com/Tanishhkaa/RealTime-Collaborative-Code-Editor-COLLABRY-" target="_blank" rel="noopener noreferrer" 
            className="rounded-full bg-gray-800 p-2 text-gray-400 transition-colors hover:bg-gray-700 hover:text-purple-400">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
            </svg>
          </a>
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-16">
        {/* Hero Section */}
        <section className="text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Collaborate in <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">real-time</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-400">
            Share code, chat, and collaborate with your team in perfect sync. 
            Join existing rooms or create your own secure space in seconds.
          </p>
          <div className="relative mt-12">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-75 blur-xl"></div>
            <img
              src={illustration}
              alt="Code Sync Illustration"
              className="relative mx-auto w-full max-w-2xl animate-float"
            />
          </div>
        </section>

        {/* Why Choose Collabry Section */}
        <section id="about" className="py-16">
          <div className="text-center">
            <h2 className="mb-8 text-4xl font-bold text-white">
              Why Choose <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Collabry</span>
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-400">
              Collabry is built for developers who value seamless collaboration. Our platform combines real-time code sharing,
              instant messaging, and powerful development tools in one intuitive interface.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-gray-800/50 p-8 backdrop-blur-sm">
              <div className="mb-4 inline-block rounded-lg bg-blue-500/20 p-3">
                <Code className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">Real-time Code Sync</h3>
              <p className="text-gray-400">See changes as they happen and code together in perfect harmony.</p>
            </div>
            <div className="rounded-xl bg-gray-800/50 p-8 backdrop-blur-sm">
              <div className="mb-4 inline-block rounded-lg bg-purple-500/20 p-3">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">Team Collaboration</h3>
              <p className="text-gray-400">Work together seamlessly with your team members in real-time.</p>
            </div>
            <div className="rounded-xl bg-gray-800/50 p-8 backdrop-blur-sm">
              <div className="mb-4 inline-block rounded-lg bg-blue-500/20 p-3">
                <Lock className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">Secure Rooms</h3>
              <p className="text-gray-400">Private, encrypted rooms ensure your code stays safe and secure.</p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16">
          <div className="text-center">
            <h2 className="mb-8 text-4xl font-bold text-white">
              Perfect for Every <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Team</span>
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-400">
              Collabry adapts to your team's needs, whether you're building websites, managing internal tools, or showcasing portfolios.
            </p>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-3">
            {/* Cards remain unchanged */}
          </div>
        </section>

        {/* Join Room Section */}
        <section className="mx-auto w-full max-w-md py-16">
          <FormComponent />
        </section>
      </main>

      <footer className="mt-12 border-t border-gray-800 py-6 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Collabry. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
