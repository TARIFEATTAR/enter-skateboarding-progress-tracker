'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function MediaUpload() {
  const { user, isAuthenticated } = useAuth();
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [mediaType, setMediaType] = useState('photo');
  const [notes, setNotes] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Mock students data - would come from API in real app
  const students = [
    { id: '1', name: 'Alex Johnson', level: 3 },
    { id: '2', name: 'Maya Smith', level: 5 },
    { id: '3', name: 'Ethan Brown', level: 2 },
    { id: '4', name: 'Olivia Davis', level: 7 },
  ];

  // Mock skills based on selected student's level
  const getSkillsForLevel = (level) => {
    const skillsByLevel = {
      2: [
        { id: 's1', name: 'THE HELMET' },
        { id: 's2', name: 'THE PADS' },
        { id: 's3', name: 'HOW TO FALL' },
      ],
      3: [
        { id: 's4', name: 'REGULAR' },
        { id: 's5', name: 'GOOFY' },
      ],
      5: [
        { id: 's6', name: 'WALK PUSH' },
        { id: 's7', name: 'STRAIGHT PUSH' },
      ],
      7: [
        { id: 's8', name: 'THE CARVE EXPLAINED' },
        { id: 's9', name: 'TOE-SIDE CARVE' },
        { id: 's10', name: 'HEEL-SIDE CARVE' },
      ],
    };
    
    return skillsByLevel[level] || [];
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleStudentChange = (e) => {
    const studentId = e.target.value;
    setSelectedStudent(studentId);
    setSelectedSkill(''); // Reset skill when student changes
    
    // Find student level to load appropriate skills
    const student = students.find(s => s.id === studentId);
    if (student) {
      // Skills would be loaded based on student level
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedStudent || !selectedSkill || !file) {
      setError('Please fill in all required fields and upload a file');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // In a real app, this would be an API call to upload the file
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful upload
      setSuccess(true);
      
      // Reset form after successful upload
      setTimeout(() => {
        setSelectedStudent('');
        setSelectedSkill('');
        setMediaType('photo');
        setNotes('');
        setFile(null);
        setPreview(null);
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError('Failed to upload media. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
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
              <li><Link href="/media" className="font-medium">Media</Link></li>
              <li><Link href="/profile" className="hover:text-secondary">Profile</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Upload Media</h2>
          <p className="text-gray-600">Document student progress with photos and videos</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="card">
            {success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-green-600 mb-2">Upload Successful!</h3>
                <p className="text-gray-600">The media has been successfully uploaded and attached to the student's progress.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                  </div>
                )}
                
                <div className="mb-4">
                  <label htmlFor="student" className="block text-gray-700 font-medium mb-2">
                    Student <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="student"
                    value={selectedStudent}
                    onChange={handleStudentChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Select a student</option>
                    {students.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.name} (Level {student.level})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="skill" className="block text-gray-700 font-medium mb-2">
                    Skill <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="skill"
                    value={selectedSkill}
                    onChange={(e) => setSelectedSkill(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    disabled={!selectedStudent}
                  >
                    <option value="">Select a skill</option>
                    {selectedStudent && getSkillsForLevel(students.find(s => s.id === selectedStudent)?.level).map((skill) => (
                      <option key={skill.id} value={skill.id}>
                        {skill.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Media Type <span className="text-red-500">*</span>
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="mediaType"
                        value="photo"
                        checked={mediaType === 'photo'}
                        onChange={() => setMediaType('photo')}
                        className="mr-2"
                      />
                      Photo
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="mediaType"
                        value="video"
                        checked={mediaType === 'video'}
                        onChange={() => setMediaType('video')}
                        className="mr-2"
                      />
                      Video
                    </label>
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="file" className="block text-gray-700 font-medium mb-2">
                    Upload File <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    id="file"
                    accept={mediaType === 'photo' ? "image/*" : "video/*"}
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {mediaType === 'photo' ? 'Accepted formats: JPG, PNG, GIF' : 'Accepted formats: MP4, MOV, AVI'}
                  </p>
                </div>

                <div className="mb-6">
                  <label htmlFor="notes" className="block text-gray-700 font-medium mb-2">
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Add any notes about this media..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary py-2 rounded-md"
                  disabled={loading}
                >
                  {loading ? 'Uploading...' : 'Upload Media'}
                </button>
              </form>
            )}
          </div>

          <div>
            <div className="card mb-4">
              <h3 className="text-xl font-bold mb-4">Preview</h3>
              {preview ? (
                <div className="border rounded-lg overflow-hidden">
                  {mediaType === 'photo' ? (
                    <img src={preview} alt="Preview" className="w-full h-auto" />
                  ) : (
                    <video src={preview} controls className="w-full h-auto">
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              ) : (
                <div className="border rounded-lg bg-gray-100 h-64 flex items-center justify-center text-gray-500">
                  {mediaType === 'photo' ? 'Photo preview will appear here' : 'Video preview will appear here'}
                </div>
              )}
            </div>

            <div className="card">
              <h3 className="text-xl font-bold mb-4">Tips for Good Documentation</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Ensure good lighting when taking photos or videos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Capture the entire movement for skill demonstrations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>For before/after comparisons, use consistent angles</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Keep videos under 30 seconds for better loading times</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Add detailed notes to help track progress over time</span>
                </li>
              </ul>
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
