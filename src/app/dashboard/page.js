'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  // This would be fetched from API in a real implementation
  const [students, setStudents] = useState([
    { id: 1, name: 'Alex Johnson', level: 3, nextLesson: '2025-03-20T15:00:00' },
    { id: 2, name: 'Maya Smith', level: 5, nextLesson: '2025-03-19T16:30:00' },
    { id: 3, name: 'Ethan Brown', level: 2, nextLesson: '2025-03-21T14:00:00' },
    { id: 4, name: 'Olivia Davis', level: 7, nextLesson: '2025-03-22T10:00:00' },
  ]);

  // Mock upcoming lessons
  const upcomingLessons = [
    { id: 1, date: '2025-03-19T16:30:00', student: 'Maya Smith', type: 'private' },
    { id: 2, date: '2025-03-20T15:00:00', student: 'Alex Johnson', type: 'private' },
    { id: 3, date: '2025-03-21T14:00:00', student: 'Ethan Brown', type: 'private' },
    { id: 4, date: '2025-03-22T10:00:00', student: 'Group Lesson (4)', type: 'group' },
  ];

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Enter Skateboarding</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><Link href="/dashboard" className="font-medium">Dashboard</Link></li>
              <li><Link href="/students" className="hover:text-secondary">Students</Link></li>
              <li><Link href="/schedule" className="hover:text-secondary">Schedule</Link></li>
              <li><Link href="/profile" className="hover:text-secondary">Profile</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Instructor Dashboard</h2>
          <div className="flex space-x-4">
            <button className="btn-secondary">
              New Lesson
            </button>
            <button className="btn-primary">
              Add Student
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="card">
            <h3 className="text-xl font-bold mb-4 text-primary">Upcoming Lessons</h3>
            {upcomingLessons.length > 0 ? (
              <ul className="divide-y">
                {upcomingLessons.map((lesson) => (
                  <li key={lesson.id} className="py-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{lesson.student}</p>
                      <p className="text-sm text-gray-600">{formatDate(lesson.date)}</p>
                    </div>
                    <span className="px-3 py-1 bg-accent-gray/30 rounded-full text-sm">
                      {lesson.type === 'private' ? 'Private' : 'Group'}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No upcoming lessons scheduled.</p>
            )}
            <div className="mt-4">
              <Link href="/schedule" className="text-secondary hover:underline">
                View Full Schedule →
              </Link>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-4 text-primary">Recent Progress</h3>
            <div className="space-y-4">
              <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded">
                <p className="font-medium">Maya Smith completed Level 5</p>
                <p className="text-sm text-gray-600">Yesterday at 4:30 PM</p>
              </div>
              <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                <p className="font-medium">Alex Johnson mastered "Toe-Side Carve"</p>
                <p className="text-sm text-gray-600">March 15, 2025 at 3:15 PM</p>
              </div>
              <div className="p-3 bg-purple-50 border-l-4 border-purple-500 rounded">
                <p className="font-medium">Ethan Brown started Level 2</p>
                <p className="text-sm text-gray-600">March 14, 2025 at 2:00 PM</p>
              </div>
            </div>
            <div className="mt-4">
              <Link href="/progress" className="text-secondary hover:underline">
                View All Progress Updates →
              </Link>
            </div>
          </div>
        </div>

        <div className="card mb-8">
          <h3 className="text-xl font-bold mb-4 text-primary">Your Students</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Next Lesson
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{student.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-primary/10 text-primary">
                        Level {student.level}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(student.nextLesson)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link href={`/students/${student.id}`} className="text-secondary hover:underline mr-4">
                        View
                      </Link>
                      <Link href={`/students/${student.id}/progress`} className="text-primary hover:underline">
                        Track Progress
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <Link href="/students" className="text-secondary hover:underline">
              View All Students →
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-primary text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-75">© 2025 Enter Skateboarding. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
