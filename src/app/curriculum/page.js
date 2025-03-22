'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

// Mock curriculum data - in a real app, this would come from the database
const curriculumData = [
  {
    level: 1,
    title: "SKATEBOARD ANATOMY",
    objective: "Here you will learn about each skateboard component and it's function. You will also learn how to tune your skateboard for optimum performance.",
    skills: [
      { name: "BOARD", description: "Understanding the skateboard deck", isRequired: true },
      { name: "TRUCKS", description: "Understanding truck components and function", isRequired: true },
      { name: "WHEELS", description: "Understanding wheel hardness and size", isRequired: true },
      { name: "BEARINGS", description: "Understanding bearing function and maintenance", isRequired: true },
      { name: "GRIPTAPE", description: "Understanding griptape purpose and application", isRequired: true },
      { name: "BOLTS", description: "Understanding hardware assembly", isRequired: true }
    ],
    bonusTrick: { name: "UNDER FLIP", description: "Flipping the board upside down and back" }
  },
  {
    level: 2,
    title: "SAFE SKATEBOARDING",
    objective: "Here we are going to learn all about safety. From how to properly wear your safety equipment - including your helmet and pads, to learning how to correctly fall so as to avoid getting injured.",
    skills: [
      { name: "THE HELMET", description: "Proper helmet fitting and wearing", isRequired: true },
      { name: "THE PADS", description: "Proper pad fitting and wearing", isRequired: true },
      { name: "HOW TO FALL", description: "Safe falling techniques to prevent injury", isRequired: true }
    ]
  },
  {
    level: 3,
    title: "ORIENTATION & STANCE",
    objective: "Here we are going to learn the difference between the goofy & regular footed stance. After understanding what each stance means, we are going to help you select your stance.",
    skills: [
      { name: "REGULAR", description: "Left foot forward stance", isRequired: true },
      { name: "GOOFY", description: "Right foot forward stance", isRequired: true }
    ]
  },
  {
    level: 4,
    title: "8 STEPS OF STANCE",
    objective: "Learning the correct way to stand on your skateboard is probably the most important part of learning to skateboard.",
    skills: [
      { name: "8 STEPS ON GRASS", description: "Practicing stance steps on grass", isRequired: true },
      { name: "8 STEPS ON CONCRETE", description: "Practicing stance steps on concrete", isRequired: true },
      { name: "BACK FOOT ON AND OFF", description: "Practicing stepping on and off with back foot", isRequired: true }
    ]
  },
  {
    level: 5,
    title: "YOUR FIRST PUSH!",
    objective: "Here we are going to apply what we learned from the 8 steps method and go for our first push!",
    skills: [
      { name: "WALK PUSH", description: "Walking while pushing the board", isRequired: true },
      { name: "STRAIGHT PUSH", description: "Pushing in a straight line", isRequired: true }
    ]
  },
  {
    level: 6,
    title: "STOPPING YOUR BOARD",
    objective: "There are a few ways to stop a skateboard, for now we are going to concern ourselves with two of the most common; jumping off or bailing out and using the back foot to stop.",
    skills: [
      { name: "JUMPING OFF", description: "Safely dismounting the board", isRequired: true },
      { name: "BACK FOOT STOP", description: "Using back foot to brake", isRequired: true }
    ],
    bonusTrick: { name: "PRIMO", description: "Balancing the board on its side" }
  },
  {
    level: 7,
    title: "HOW TO CARVE",
    objective: "Carving is another name for turning, here we are going to learn how to apply pressure to the sides of our skateboard to create a turn.",
    skills: [
      { name: "THE CARVE EXPLAINED", description: "Understanding weight distribution for turning", isRequired: true },
      { name: "TOE-SIDE CARVE", description: "Turning toward toes", isRequired: true },
      { name: "HEEL-SIDE CARVE", description: "Turning toward heels", isRequired: true }
    ]
  },
  {
    level: 8,
    title: "NAVIGATION",
    objective: "Now that we know how to carve, its time to see how we maneuver around obstacles, let see how you do with the cones.",
    skills: [
      { name: "GOAL TO LEFT", description: "Navigating to left target", isRequired: true },
      { name: "GOAL TO RIGHT", description: "Navigating to right target", isRequired: true },
      { name: "WAVY LANE", description: "Navigating through a curved path", isRequired: true },
      { name: "PAC MAN", description: "Navigating through a complex path", isRequired: true }
    ]
  },
  {
    level: 9,
    title: "TAILWORK",
    objective: "One more lesson before we go to the skatepark! This lesson we are going to learn how to manipulate our board and body by learning how to use the tail of the board.",
    skills: [
      { name: "TIC TOC ON GRASS", description: "Practicing tail balance on grass", isRequired: true },
      { name: "KICK TURN (BS)", description: "Backside kick turn using tail", isRequired: true },
      { name: "KICK TURN (FS)", description: "Frontside kick turn using tail", isRequired: true }
    ]
  },
  {
    level: 10,
    title: "THE SKATEPARK",
    objective: "Congratulations you made it to the park! You are really shredding now. Let's learn some of the basics on the banks.",
    skills: [
      { name: "ETIQUETTE", description: "Skatepark rules and etiquette", isRequired: true },
      { name: "FAKIE ON BANK", description: "Riding backward on bank", isRequired: true },
      { name: "GO UP/DOWN BANK", description: "Navigating inclines", isRequired: true },
      { name: "180'S ON FLAT", description: "Basic 180 degree turns", isRequired: true }
    ]
  },
  {
    level: 11,
    title: "RAMPS & TRANSITIONS",
    objective: "Super awesome! You have come along way. Now its time to accelerate your skills and your speed with pumps and ramp work!",
    skills: [
      { name: "PUMPING UP", description: "Generating speed on transitions", isRequired: true },
      { name: "PUMP BACK & FORTH", description: "Maintaining speed on ramps", isRequired: true },
      { name: "BACKSIDE HORSE SHOE TURN", description: "Backside turn on transition", isRequired: true },
      { name: "FRONTSIDE HORSE SHOE TURN", description: "Frontside turn on transition", isRequired: true }
    ]
  },
  {
    level: 12,
    title: "BOWLS & TRICKS",
    objective: "Carving and bowl skating is at the heart of skateboarding. This will be your last set of skills before moving on to the intermediate level. You have come so far!",
    skills: [
      { name: "KICKTURN (BS)", description: "Advanced backside kick turns", isRequired: true },
      { name: "KICKTURN (FS)", description: "Advanced frontside kick turns", isRequired: true },
      { name: "CROSS OVER", description: "Crossing feet during turns", isRequired: true },
      { name: "CARVE (BS)", description: "Backside carving in bowl", isRequired: true },
      { name: "CARVE (FS)", description: "Frontside carving in bowl", isRequired: true },
      { name: "DROP IN", description: "Dropping into ramps", isRequired: true },
      { name: "FAKIE 180 (FS)", description: "180 turn from fakie position", isRequired: true }
    ],
    bonusTrick: { name: "FULL UNDERFLIP", description: "Advanced flip trick" }
  }
];

export default function Curriculum() {
  const { user, isAuthenticated } = useAuth();
  const [selectedLevel, setSelectedLevel] = useState(null);

  const handleLevelClick = (level) => {
    setSelectedLevel(level === selectedLevel ? null : level);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Enter Skateboarding</h1>
          <nav>
            <ul className="flex space-x-6">
              {isAuthenticated ? (
                <>
                  <li><Link href="/dashboard" className="hover:text-secondary">Dashboard</Link></li>
                  <li><Link href="/curriculum" className="font-medium">Curriculum</Link></li>
                  <li><Link href="/profile" className="hover:text-secondary">Profile</Link></li>
                </>
              ) : (
                <>
                  <li><Link href="/" className="hover:text-secondary">Home</Link></li>
                  <li><Link href="/login" className="hover:text-secondary">Login</Link></li>
                  <li><Link href="/register" className="hover:text-secondary">Register</Link></li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Skateboarding Curriculum</h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            Our comprehensive 12-level curriculum takes students from complete beginners to intermediate skateboarders ready for more advanced challenges.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {curriculumData.map((level) => (
            <div 
              key={level.level} 
              className={`card border-t-4 ${selectedLevel === level.level ? 'border-secondary' : 'border-primary'} cursor-pointer transition-all hover:shadow-lg`}
              onClick={() => handleLevelClick(level.level)}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">Level {level.level}</h3>
                <span className="px-3 py-1 bg-primary/10 rounded-full text-sm font-medium text-primary">
                  {level.skills.length} Skills
                </span>
              </div>
              <h4 className="text-lg font-medium mb-2">{level.title}</h4>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {level.objective}
              </p>
              <button 
                className={`text-${selectedLevel === level.level ? 'secondary' : 'primary'} font-medium hover:underline flex items-center`}
              >
                {selectedLevel === level.level ? 'Hide Details' : 'View Details'}
              </button>
            </div>
          ))}
        </div>

        {selectedLevel && (
          <div className="card border-l-4 border-secondary mb-8">
            <div className="mb-6">
              <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-2 inline-block">
                Level {selectedLevel}
              </span>
              <h3 className="text-2xl font-bold mb-2">{curriculumData[selectedLevel-1].title}</h3>
              <p className="text-gray-600">
                {curriculumData[selectedLevel-1].objective}
              </p>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-bold mb-3">Skills</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {curriculumData[selectedLevel-1].skills.map((skill, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-md">
                    <h5 className="font-medium">{skill.name}</h5>
                    <p className="text-sm text-gray-600">{skill.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {curriculumData[selectedLevel-1].bonusTrick && (
              <div>
                <h4 className="text-lg font-bold mb-3">Bonus Trick</h4>
                <div className="p-3 bg-secondary/10 rounded-md">
                  <h5 className="font-medium">{curriculumData[selectedLevel-1].bonusTrick.name}</h5>
                  <p className="text-sm text-gray-600">{curriculumData[selectedLevel-1].bonusTrick.description}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="bg-primary text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-75">© 2025 Enter Skateboarding. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
