'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Schedule() {
  const { user, isAuthenticated } = useAuth();
  const [view, setView] = useState('week');
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Mock lessons data - would come from API in real app
  const lessons = [
    { 
      id: 1, 
      studentId: '1', 
      studentName: 'Alex Johnson',
      startTime: new Date(2025, 2, 20, 15, 0), // March 20, 2025, 3:00 PM
      endTime: new Date(2025, 2, 20, 16, 0),   // March 20, 2025, 4:00 PM
      type: 'private',
      status: 'scheduled',
      location: 'Main Skatepark'
    },
    { 
      id: 2, 
      studentId: '2', 
      studentName: 'Maya Smith',
      startTime: new Date(2025, 2, 19, 16, 30), // March 19, 2025, 4:30 PM
      endTime: new Date(2025, 2, 19, 17, 30),   // March 19, 2025, 5:30 PM
      type: 'private',
      status: 'scheduled',
      location: 'Main Skatepark'
    },
    { 
      id: 3, 
      studentId: '3', 
      studentName: 'Ethan Brown',
      startTime: new Date(2025, 2, 21, 14, 0), // March 21, 2025, 2:00 PM
      endTime: new Date(2025, 2, 21, 15, 0),   // March 21, 2025, 3:00 PM
      type: 'private',
      status: 'scheduled',
      location: 'Indoor Facility'
    },
    { 
      id: 4, 
      studentIds: ['1', '2', '4'], 
      studentName: 'Group Lesson (4)',
      startTime: new Date(2025, 2, 22, 10, 0), // March 22, 2025, 10:00 AM
      endTime: new Date(2025, 2, 22, 12, 0),   // March 22, 2025, 12:00 PM
      type: 'group',
      status: 'scheduled',
      location: 'Main Skatepark'
    },
  ];

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric'
    });
  };

  // Format time for display
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  // Get the start of the week (Sunday)
  const getStartOfWeek = (date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - day);
    return startOfWeek;
  };

  // Get days of the current week
  const getDaysOfWeek = () => {
    const startOfWeek = getStartOfWeek(currentDate);
    const days = [];
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(day.getDate() + i);
      days.push(day);
    }
    
    return days;
  };

  // Get lessons for a specific day
  const getLessonsForDay = (day) => {
    return lessons.filter(lesson => {
      const lessonDate = new Date(lesson.startTime);
      return lessonDate.getDate() === day.getDate() && 
             lessonDate.getMonth() === day.getMonth() && 
             lessonDate.getFullYear() === day.getFullYear();
    });
  };

  // Navigate to previous week/month
  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (view === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  // Navigate to next week/month
  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (view === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  // Go to today
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Enter Skateboarding</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><Link href="/dashboard" className="hover:text-secondary">Dashboard</Link></li>
              <li><Link href="/students" className="hover:text-secondary">Students</Link></li>
              <li><Link href="/schedule" className="font-medium">Schedule</Link></li>
              <li><Link href="/profile" className="hover:text-secondary">Profile</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Lesson Schedule</h2>
          <button className="btn-primary">
            New Lesson
          </button>
        </div>

        <div className="card mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex items-center space-x-4">
              <button 
                onClick={goToPrevious}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              
              <h3 className="text-xl font-bold">
                {view === 'week' ? (
                  `${formatDate(getStartOfWeek(currentDate))} - ${formatDate(new Date(getStartOfWeek(currentDate).getTime() + 6 * 24 * 60 * 60 * 1000))}`
                ) : (
                  currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                )}
              </h3>
              
              <button 
                onClick={goToNext}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              
              <button 
                onClick={goToToday}
                className="px-3 py-1 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Today
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setView('week')}
                className={`px-3 py-1 rounded-md ${view === 'week' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                Week
              </button>
              <button 
                onClick={() => setView('month')}
                className={`px-3 py-1 rounded-md ${view === 'month' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                Month
              </button>
            </div>
          </div>

          {view === 'week' && (
            <div className="overflow-x-auto">
              <div className="grid grid-cols-7 gap-2 mb-4">
                {getDaysOfWeek().map((day, index) => (
                  <div key={index} className={`text-center p-2 ${day.toDateString() === new Date().toDateString() ? 'bg-primary/10 rounded-md' : ''}`}>
                    <p className="text-sm font-medium">{day.toLocaleDateString('en-US', { weekday: 'short' })}</p>
                    <p className="text-lg font-bold">{day.getDate()}</p>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-2 min-h-[400px]">
                {getDaysOfWeek().map((day, index) => (
                  <div key={index} className="border rounded-md p-2 h-full">
                    {getLessonsForDay(day).length > 0 ? (
                      <div className="space-y-2">
                        {getLessonsForDay(day).map(lesson => (
                          <div 
                            key={lesson.id} 
                            className={`p-2 rounded-md text-sm ${lesson.type === 'private' ? 'bg-blue-50 border-l-4 border-blue-400' : 'bg-purple-50 border-l-4 border-purple-400'}`}
                          >
                            <p className="font-medium">{lesson.studentName}</p>
                            <p className="text-xs text-gray-600">
                              {formatTime(lesson.startTime)} - {formatTime(lesson.endTime)}
                            </p>
                            <p className="text-xs text-gray-600">{lesson.location}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                        No lessons
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === 'month' && (
            <div className="text-center p-8">
              <p className="text-gray-500">Month view is under development</p>
              <p className="text-sm text-gray-400 mt-2">Please use Week view for now</p>
            </div>
          )}
        </div>

        <div className="card">
          <h3 className="text-xl font-bold mb-4">Upcoming Lessons</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {lessons.map((lesson) => (
                  <tr key={lesson.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{lesson.studentName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>{formatDate(lesson.startTime)}</div>
                      <div className="text-sm text-gray-500">{formatTime(lesson.startTime)} - {formatTime(lesson.endTime)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {lesson.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${lesson.type === 'private' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                        {lesson.type === 'private' ? 'Private' : 'Group'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-secondary hover:underline mr-4">
                        Edit
                      </button>
                      <button className="text-red-600 hover:underline">
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
