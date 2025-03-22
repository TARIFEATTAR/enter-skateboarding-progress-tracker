'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Reports() {
  const { user, isAuthenticated } = useAuth();
  const [selectedStudent, setSelectedStudent] = useState('');
  const [reportType, setReportType] = useState('progress');
  const [loading, setLoading] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(null);

  // Mock students data - would come from API in real app
  const students = [
    { id: '1', name: 'Alex Johnson', level: 3 },
    { id: '2', name: 'Maya Smith', level: 5 },
    { id: '3', name: 'Ethan Brown', level: 2 },
    { id: '4', name: 'Olivia Davis', level: 7 },
  ];

  const handleGenerateReport = async () => {
    if (!selectedStudent) {
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock report data
      const student = students.find(s => s.id === selectedStudent);
      
      if (reportType === 'progress') {
        setGeneratedReport({
          type: 'progress',
          student: student,
          date: new Date().toISOString(),
          content: {
            currentLevel: student.level,
            completedLevels: student.level - 1,
            inProgressSkills: ['REGULAR', 'GOOFY'],
            recentAchievements: ['Mastered THE HELMET', 'Mastered THE PADS'],
            instructorNotes: 'Alex is making great progress and showing good balance. Needs to work on confidence with the goofy stance.'
          }
        });
      } else if (reportType === 'certificate') {
        setGeneratedReport({
          type: 'certificate',
          student: student,
          date: new Date().toISOString(),
          content: {
            level: student.level - 1,
            completionDate: new Date().toISOString(),
            instructor: 'Jordan Richter',
            skills: ['BOARD', 'TRUCKS', 'WHEELS', 'BEARINGS', 'GRIPTAPE', 'BOLTS']
          }
        });
      }
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
              <li><Link href="/reports" className="font-medium">Reports</Link></li>
              <li><Link href="/profile" className="hover:text-secondary">Profile</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Reports & Certificates</h2>
          <p className="text-gray-600">Generate progress reports and achievement certificates</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="card">
            <h3 className="text-xl font-bold mb-6">Generate Report</h3>
            
            <div className="mb-4">
              <label htmlFor="student" className="block text-gray-700 font-medium mb-2">
                Student
              </label>
              <select
                id="student"
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select a student</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name} (Level {student.level})
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Report Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div 
                  className={`border rounded-md p-4 cursor-pointer ${reportType === 'progress' ? 'border-primary bg-primary/5' : 'hover:bg-gray-50'}`}
                  onClick={() => setReportType('progress')}
                >
                  <div className="font-medium mb-1">Progress Report</div>
                  <p className="text-sm text-gray-600">Detailed report of student's progress and skills</p>
                </div>
                <div 
                  className={`border rounded-md p-4 cursor-pointer ${reportType === 'certificate' ? 'border-primary bg-primary/5' : 'hover:bg-gray-50'}`}
                  onClick={() => setReportType('certificate')}
                >
                  <div className="font-medium mb-1">Level Certificate</div>
                  <p className="text-sm text-gray-600">Certificate for completing a curriculum level</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerateReport}
              disabled={!selectedStudent || loading}
              className="w-full btn-primary py-2 rounded-md"
            >
              {loading ? 'Generating...' : 'Generate Report'}
            </button>
          </div>

          <div>
            {generatedReport ? (
              <div className="card">
                {generatedReport.type === 'progress' ? (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">Progress Report</h3>
                      <button className="btn-secondary text-sm">Download PDF</button>
                    </div>
                    
                    <div className="mb-4 pb-4 border-b">
                      <div className="text-sm text-gray-500 mb-1">Student</div>
                      <div className="font-medium">{generatedReport.student.name}</div>
                    </div>
                    
                    <div className="mb-4 pb-4 border-b">
                      <div className="text-sm text-gray-500 mb-1">Date</div>
                      <div>{formatDate(generatedReport.date)}</div>
                    </div>
                    
                    <div className="mb-4 pb-4 border-b">
                      <div className="text-sm text-gray-500 mb-1">Current Level</div>
                      <div className="font-medium">Level {generatedReport.content.currentLevel}</div>
                      <div className="text-sm text-gray-600 mt-1">Completed {generatedReport.content.completedLevels} levels</div>
                    </div>
                    
                    <div className="mb-4 pb-4 border-b">
                      <div className="text-sm text-gray-500 mb-1">Skills In Progress</div>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {generatedReport.content.inProgressSkills.map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4 pb-4 border-b">
                      <div className="text-sm text-gray-500 mb-1">Recent Achievements</div>
                      <ul className="list-disc list-inside text-sm mt-1">
                        {generatedReport.content.recentAchievements.map((achievement, index) => (
                          <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Instructor Notes</div>
                      <p className="text-sm">{generatedReport.content.instructorNotes}</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-center border-b pb-6 mb-6">
                      <div className="text-sm text-gray-500 mb-2">CERTIFICATE OF ACHIEVEMENT</div>
                      <h3 className="text-2xl font-bold mb-1">Level {generatedReport.content.level} Completion</h3>
                      <div className="text-lg">Enter Skateboarding</div>
                    </div>
                    
                    <div className="text-center mb-6">
                      <p className="mb-4">This certifies that</p>
                      <p className="text-xl font-bold mb-4">{generatedReport.student.name}</p>
                      <p className="mb-4">has successfully completed</p>
                      <p className="text-lg font-medium mb-4">Level {generatedReport.content.level}: SKATEBOARD ANATOMY</p>
                      <p className="text-sm text-gray-600 mb-6">Demonstrating proficiency in all required skills</p>
                      
                      <div className="flex justify-center gap-8 text-sm text-gray-600 mt-8">
                        <div>
                          <div className="border-t border-gray-300 pt-2 w-32">
                            {formatDate(generatedReport.content.completionDate)}
                          </div>
                          <div>Date</div>
                        </div>
                        <div>
                          <div className="border-t border-gray-300 pt-2 w-32">
                            {generatedReport.content.instructor}
                          </div>
                          <div>Instructor</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center mt-6">
                      <button className="btn-primary text-sm">Download Certificate</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="card h-full flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <p className="mb-2">Select a student and report type</p>
                  <p className="text-sm">Report preview will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="card mt-8">
          <h3 className="text-xl font-bold mb-6">Report History</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Report Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Generated By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">Maya Smith</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Certificate
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    March 15, 2025
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Jordan Richter
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-secondary hover:underline mr-4">
                      View
                    </button>
                    <button className="text-primary hover:underline">
                      Download
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">Alex Johnson</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      Progress
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    March 10, 2025
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Jordan Richter
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-secondary hover:underline mr-4">
                      View
                    </button>
                    <button className="text-primary hover:underline">
                      Download
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">Ethan Brown</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      Progress
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    March 5, 2025
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Jordan Richter
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-secondary hover:underline mr-4">
                      View
                    </button>
                    <button className="text-primary hover:underline">
                      Download
                    </button>
                  </td>
                </tr>
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
