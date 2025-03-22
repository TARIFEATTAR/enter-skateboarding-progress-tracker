'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

// This would come from the database in a real application
const curriculumData = [
  {
    level: 1,
    title: "SKATEBOARD ANATOMY",
    skills: [
      { name: "BOARD", description: "Understanding the skateboard deck" },
      { name: "TRUCKS", description: "Understanding truck components and function" },
      { name: "WHEELS", description: "Understanding wheel hardness and size" },
      { name: "BEARINGS", description: "Understanding bearing function and maintenance" },
      { name: "GRIPTAPE", description: "Understanding griptape purpose and application" },
      { name: "BOLTS", description: "Understanding hardware assembly" }
    ],
    bonusTrick: { name: "UNDER FLIP", description: "Flipping the board upside down and back" }
  },
  {
    level: 2,
    title: "SAFE SKATEBOARDING",
    skills: [
      { name: "THE HELMET", description: "Proper helmet fitting and wearing" },
      { name: "THE PADS", description: "Proper pad fitting and wearing" },
      { name: "HOW TO FALL", description: "Safe falling techniques to prevent injury" }
    ]
  },
  {
    level: 3,
    title: "ORIENTATION & STANCE",
    skills: [
      { name: "REGULAR", description: "Left foot forward stance" },
      { name: "GOOFY", description: "Right foot forward stance" }
    ]
  }
];

export default function StudentProgress({ params }) {
  const { user, isAuthenticated } = useAuth();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('progress');
  const studentId = params.id;

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchStudent = async () => {
      try {
        // Mock data - would be fetched from API
        const mockStudents = [
          { 
            id: "1", 
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
                { name: 'REGULAR', status: 'mastered', date: '2025-02-20' },
                { name: 'GOOFY', status: 'in_progress', date: '2025-03-15' }
              ]}
            ],
            media: [
              { id: 1, type: 'photo', url: '/images/placeholder.jpg', date: '2025-02-20', skill: 'REGULAR' },
              { id: 2, type: 'video', url: '/videos/placeholder.mp4', date: '2025-03-15', skill: 'GOOFY' }
            ],
            notes: [
              { id: 1, date: '2025-02-20', content: 'Alex is making great progress with the regular stance. Very comfortable and balanced.' },
              { id: 2, date: '2025-03-15', content: 'Started working on goofy stance today. Needs more practice but showing good potential.' }
            ]
          }
        ];
        
        const foundStudent = mockStudents.find(s => s.id === studentId);
        setStudent(foundStudent);
      } catch (error) {
        console.error('Error fetching student:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [studentId]);

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'mastered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'not_started':
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'mastered':
        return 'Mastered';
      case 'in_progress':
        return 'In Progress';
      case 'not_started':
      default:
        return 'Not Started';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-xl">Loading student data...</p>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="card text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Student Not Found</h2>
          <p className="mb-6">The student you're looking for doesn't exist or you don't have permission to view their profile.</p>
          <Link href="/students" className="btn-primary">
            Back to Students
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Enter Skateboarding</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><Link href="/dashboard" className="hover:text-secondary">Dashboard</Link></li>
              <li><Link href="/students" className="hover:text-secondary">Students</Link></li>
              <li><Link href="/curriculum" className="hover:text-secondary">Curriculum</Link></li>
              <li><Link href="/profile" className="hover:text-secondary">Profile</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <Link href="/students" className="text-primary hover:underline flex items-center">
            ← Back to Students
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="card md:w-1/3">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-gray-600">
                {student.firstName.charAt(0)}{student.lastName.charAt(0)}
              </div>
              <h2 className="text-2xl font-bold">{student.firstName} {student.lastName}</h2>
              <p className="text-gray-600">Age: {student.age}</p>
            </div>

            <div className="border-t pt-4">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Current Level</h3>
                <p className="text-lg font-semibold">Level {student.currentLevel}: {curriculumData[student.currentLevel-1]?.title || ''}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Joined Date</h3>
                <p>{formatDate(student.joinedDate)}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Next Lesson</h3>
                <p>{new Date(student.nextLesson).toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Parent Information</h3>
              <p className="font-medium">{student.parent.name}</p>
              <p className="text-gray-600">{student.parent.email}</p>
              <p className="text-gray-600">{student.parent.phone}</p>
            </div>
          </div>

          <div className="md:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="flex border-b">
                <button 
                  className={`px-6 py-3 font-medium ${activeTab === 'progress' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'}`}
                  onClick={() => setActiveTab('progress')}
                >
                  Progress Tracking
                </button>
                <button 
                  className={`px-6 py-3 font-medium ${activeTab === 'media' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'}`}
                  onClick={() => setActiveTab('media')}
                >
                  Media
                </button>
                <button 
                  className={`px-6 py-3 font-medium ${activeTab === 'notes' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'}`}
                  onClick={() => setActiveTab('notes')}
                >
                  Notes
                </button>
              </div>

              <div className="p-6">
                {activeTab === 'progress' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">Skill Progress</h3>
                      <button className="btn-secondary text-sm">Update Progress</button>
                    </div>

                    <div className="space-y-8">
                      {student.progress.map((level) => (
                        <div key={level.level} className="border rounded-lg overflow-hidden">
                          <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
                            <div>
                              <h4 className="font-bold">Level {level.level}: {curriculumData[level.level-1]?.title || ''}</h4>
                              {level.completed && (
                                <p className="text-sm text-gray-600">Completed on {formatDate(level.completionDate)}</p>
                              )}
                            </div>
                            {level.completed ? (
                              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                Completed
                              </span>
                            ) : (
                              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                In Progress
                              </span>
                            )}
                          </div>
                          
                          {!level.completed && level.skills && (
                            <div className="p-4">
                              <h5 className="font-medium mb-3">Skills</h5>
                              <div className="space-y-2">
                                {level.skills.map((skill, index) => (
                                  <div key={index} className="flex justify-between items-center p-2 border rounded">
                                    <div>
                                      <p className="font-medium">{skill.name}</p>
                                      {skill.date && <p className="text-xs text-gray-500">Last updated: {formatDate(skill.date)}</p>}
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(skill.status)}`}>
                                      {getStatusLabel(skill.status)}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'media' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">Media Documentation</h3>
                      <button className="btn-secondary text-sm">Upload New</button>
                    </div>

                    {student.media && student.media.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {student.media.map((item) => (
                          <div key={item.id} className="border rounded-lg overflow-hidden">
                            <div className="h-48 bg-gray-200 flex items-center justify-center">
                              {item.type === 'photo' ? (
                                <div className="text-gray-500">Photo Placeholder</div>
                              ) : (
                                <div className="text-gray-500">Video Placeholder</div>
                              )}
                            </div>
                            <div className="p-3">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-medium">{item.skill}</span>
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                  {item.type === 'photo' ? 'Photo' : 'Video'}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">{formatDate(item.date)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">No media documentation yet.</p>
                    )}
                  </div>
                )}

                {activeTab === 'notes' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">Instructor Notes</h3>
                      <button className="btn-secondary text-sm">Add Note</button>
                    </div>

                    {student.notes && student.notes.length > 0 ? (
                      <div className="space-y-4">
                        {student.notes.map((note) => (
                          <div key={note.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-600">{formatDate(note.date)}</span>
                            </div>
                            <p>{note.content}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">No notes yet.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
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
