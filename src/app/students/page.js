'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

// Mock student data - in a real app, this would come from the database
const mockStudents = [
  { 
    id: 1, 
    firstName: 'Alex', 
    lastName: 'Johnson', 
    age: 10, 
    currentLevel: 3, 
    joinedDate: '2024-12-15',
    nextLesson: '2025-03-20T15:00:00',
    parent: { name: 'Sarah Johnson', email: 'sarah@example.com', phone: '555-123-4567' },
    progress: [
      { level: 1, completed: true, completionDate: '2025-01-10' },
      { level: 2, completed: true, completionDate: '2025-02-05' },
      { level: 3, completed: false, skills: [
        { name: 'REGULAR', status: 'mastered' },
        { name: 'GOOFY', status: 'in_progress' }
      ]}
    ]
  },
  { 
    id: 2, 
    firstName: 'Maya', 
    lastName: 'Smith', 
    age: 12, 
    currentLevel: 5, 
    joinedDate: '2024-11-20',
    nextLesson: '2025-03-19T16:30:00',
    parent: { name: 'David Smith', email: 'david@example.com', phone: '555-987-6543' },
    progress: [
      { level: 1, completed: true, completionDate: '2024-12-05' },
      { level: 2, completed: true, completionDate: '2024-12-20' },
      { level: 3, completed: true, completionDate: '2025-01-15' },
      { level: 4, completed: true, completionDate: '2025-02-10' },
      { level: 5, completed: false, skills: [
        { name: 'WALK PUSH', status: 'mastered' },
        { name: 'STRAIGHT PUSH', status: 'in_progress' }
      ]}
    ]
  },
  { 
    id: 3, 
    firstName: 'Ethan', 
    lastName: 'Brown', 
    age: 8, 
    currentLevel: 2, 
    joinedDate: '2025-01-10',
    nextLesson: '2025-03-21T14:00:00',
    parent: { name: 'Jessica Brown', email: 'jessica@example.com', phone: '555-456-7890' },
    progress: [
      { level: 1, completed: true, completionDate: '2025-02-15' },
      { level: 2, completed: false, skills: [
        { name: 'THE HELMET', status: 'mastered' },
        { name: 'THE PADS', status: 'mastered' },
        { name: 'HOW TO FALL', status: 'in_progress' }
      ]}
    ]
  },
  { 
    id: 4, 
    firstName: 'Olivia', 
    lastName: 'Davis', 
    age: 14, 
    currentLevel: 7, 
    joinedDate: '2024-10-05',
    nextLesson: '2025-03-22T10:00:00',
    parent: { name: 'Michael Davis', email: 'michael@example.com', phone: '555-789-0123' },
    progress: [
      { level: 1, completed: true, completionDate: '2024-10-25' },
      { level: 2, completed: true, completionDate: '2024-11-15' },
      { level: 3, completed: true, completionDate: '2024-12-05' },
      { level: 4, completed: true, completionDate: '2024-12-20' },
      { level: 5, completed: true, completionDate: '2025-01-10' },
      { level: 6, completed: true, completionDate: '2025-02-05' },
      { level: 7, completed: false, skills: [
        { name: 'THE CARVE EXPLAINED', status: 'mastered' },
        { name: 'TOE-SIDE CARVE', status: 'mastered' },
        { name: 'HEEL-SIDE CARVE', status: 'in_progress' }
      ]}
    ]
  }
];

export default function Students() {
  const { user, isAuthenticated } = useAuth();
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');

  useEffect(() => {
    // In a real app, this would be an API call
    setStudents(mockStudents);
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Filter students based on search term and level filter
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLevel = levelFilter === 'all' || student.currentLevel === parseInt(levelFilter);
    
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Enter Skateboarding</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><Link href="/dashboard" className="hover:text-secondary">Dashboard</Link></li>
              <li><Link href="/students" className="font-medium">Students</Link></li>
              <li><Link href="/curriculum" className="hover:text-secondary">Curriculum</Link></li>
              <li><Link href="/profile" className="hover:text-secondary">Profile</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Students</h2>
          <button className="btn-primary">
            Add New Student
          </button>
        </div>

        <div className="card mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="levelFilter" className="text-gray-700 whitespace-nowrap">
                Filter by Level:
              </label>
              <select
                id="levelFilter"
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Levels</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i+1} value={i+1}>Level {i+1}</option>
                ))}
              </select>
            </div>
          </div>

          {filteredStudents.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Age
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Current Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined Date
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
                  {filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{student.firstName} {student.lastName}</div>
                        <div className="text-sm text-gray-500">{student.parent.name} (Parent)</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {student.age}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-primary/10 text-primary">
                          Level {student.currentLevel}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(student.joinedDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(student.nextLesson).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
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
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No students found matching your search criteria.</p>
            </div>
          )}
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
