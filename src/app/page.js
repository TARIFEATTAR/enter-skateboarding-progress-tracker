import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-white p-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Enter Skateboarding</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><Link href="/login" className="hover:text-secondary">Login</Link></li>
              <li><Link href="/register" className="hover:text-secondary">Register</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="py-16 bg-gradient-to-b from-primary to-primary/90 text-white">
          <div className="container mx-auto text-center px-4">
            <h2 className="text-4xl font-bold mb-6">Skateboard Progress Tracker</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Track student progress through our 12-level curriculum, from beginner to intermediate skateboarding skills.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/register" className="btn-secondary px-8 py-3 rounded-md text-lg">
                Get Started
              </Link>
              <Link href="/curriculum" className="bg-white text-primary px-8 py-3 rounded-md text-lg hover:bg-opacity-90 transition-all">
                View Curriculum
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="card">
                <h3 className="text-xl font-bold mb-4 text-primary">Progress Tracking</h3>
                <p>Track student progress through all 12 levels of the skateboarding curriculum with visual skill trees.</p>
              </div>
              <div className="card">
                <h3 className="text-xl font-bold mb-4 text-primary">Media Documentation</h3>
                <p>Upload photos and videos to document student progress and create visual timelines of skill development.</p>
              </div>
              <div className="card">
                <h3 className="text-xl font-bold mb-4 text-primary">Lesson Scheduling</h3>
                <p>Schedule private or group lessons with integrated calendar and automated reminders.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-accent-gray/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Curriculum</h2>
            <div className="grid md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((level) => (
                <div key={level} className="card border-t-4 border-primary">
                  <h3 className="text-xl font-bold mb-2">Level {level}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {level === 1 && "Skateboard Anatomy"}
                    {level === 2 && "Safe Skateboarding"}
                    {level === 3 && "Orientation & Stance"}
                    {level === 4 && "8 Steps of Stance"}
                  </p>
                  <Link href={`/curriculum/${level}`} className="text-secondary font-medium hover:underline">
                    View Details →
                  </Link>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/curriculum" className="btn-primary">
                View All 12 Levels
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold">Enter Skateboarding</h2>
              <p className="text-sm opacity-75">Progress tracking for skateboard instructors</p>
            </div>
            <div>
              <p className="text-sm opacity-75">© 2025 Enter Skateboarding. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
