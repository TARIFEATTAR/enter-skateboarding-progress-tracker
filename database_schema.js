// MongoDB Schema for Skateboard Instructor Progress Tracking Application

// User Schema - For all users in the system (admin, instructors, parents, students)
const UserSchema = {
  _id: "ObjectId", // MongoDB auto-generated ID
  email: "String", // Unique email for login
  password: "String", // Hashed password
  role: "String", // Enum: 'admin', 'instructor', 'parent', 'student'
  firstName: "String",
  lastName: "String",
  profilePicture: "String", // URL to profile image
  contactInfo: {
    phone: "String",
    address: "String",
    city: "String",
    state: "String",
    zipCode: "String"
  },
  socialLogin: {
    google: { id: "String", token: "String" },
    apple: { id: "String", token: "String" },
    facebook: { id: "String", token: "String" }
  },
  isActive: "Boolean", // Account status
  createdAt: "Date",
  updatedAt: "Date"
};

// Student Schema - Extended information for student users
const StudentSchema = {
  _id: "ObjectId",
  userId: "ObjectId", // Reference to User if they have login
  parentIds: ["ObjectId"], // References to parent Users
  firstName: "String",
  lastName: "String",
  dateOfBirth: "Date",
  age: "Number",
  currentLevel: "Number", // 1-12 based on curriculum
  emergencyContact: {
    name: "String",
    relationship: "String",
    phone: "String"
  },
  medicalNotes: "String",
  joinedDate: "Date",
  homeLocationId: "ObjectId", // Reference to Location
  createdAt: "Date",
  updatedAt: "Date"
};

// Instructor Schema - Extended information for instructor users
const InstructorSchema = {
  _id: "ObjectId",
  userId: "ObjectId", // Reference to User
  specializations: ["String"], // Array of specializations
  bio: "String",
  experience: "Number", // Years of experience
  certifications: ["String"],
  locationIds: ["ObjectId"], // References to Locations they work at
  availability: [{
    dayOfWeek: "Number", // 0-6 (Sunday-Saturday)
    startTime: "String", // HH:MM format
    endTime: "String" // HH:MM format
  }],
  createdAt: "Date",
  updatedAt: "Date"
};

// Location Schema - For skateboarding schools/locations
const LocationSchema = {
  _id: "ObjectId",
  name: "String",
  address: "String",
  city: "String",
  state: "String",
  zipCode: "String",
  phone: "String",
  email: "String",
  description: "String",
  isActive: "Boolean",
  createdAt: "Date",
  updatedAt: "Date"
};

// Skill Schema - Based on the curriculum levels and skills
const SkillSchema = {
  _id: "ObjectId",
  name: "String", // Name of the skill
  description: "String", // Detailed description
  level: "Number", // 1-12 based on curriculum
  order: "Number", // Order within level
  isBonus: "Boolean", // Whether it's a bonus trick
  prerequisites: ["ObjectId"], // References to prerequisite Skills
  demonstrationVideo: "String", // URL to demo video
  objective: "String", // Learning objective
  createdAt: "Date",
  updatedAt: "Date"
};

// StudentSkill Schema - Tracking student progress on specific skills
const StudentSkillSchema = {
  _id: "ObjectId",
  studentId: "ObjectId", // Reference to Student
  skillId: "ObjectId", // Reference to Skill
  status: "String", // Enum: 'not_started', 'in_progress', 'mastered'
  instructorId: "ObjectId", // Reference to Instructor who verified
  instructorNotes: "String",
  completionDate: "Date",
  progressMediaIds: ["ObjectId"], // References to ProgressMedia
  createdAt: "Date",
  updatedAt: "Date"
};

// Lesson Schema - For scheduling and tracking lessons
const LessonSchema = {
  _id: "ObjectId",
  instructorId: "ObjectId", // Reference to Instructor
  studentIds: ["ObjectId"], // References to Students
  locationId: "ObjectId", // Reference to Location
  startTime: "Date",
  endTime: "Date",
  lessonType: "String", // Enum: 'private', 'group', 'camp'
  status: "String", // Enum: 'scheduled', 'completed', 'canceled'
  notes: "String",
  skillsWorked: ["ObjectId"], // References to Skills
  createdAt: "Date",
  updatedAt: "Date"
};

// ProgressMedia Schema - For photos/videos of student progress
const ProgressMediaSchema = {
  _id: "ObjectId",
  studentId: "ObjectId", // Reference to Student
  skillId: "ObjectId", // Optional reference to Skill
  lessonId: "ObjectId", // Reference to Lesson
  mediaType: "String", // Enum: 'photo', 'video'
  url: "String", // URL to media file
  notes: "String",
  recordedDate: "Date",
  createdAt: "Date",
  updatedAt: "Date"
};

// ProgressReport Schema - For lesson reports and feedback
const ProgressReportSchema = {
  _id: "ObjectId",
  studentId: "ObjectId", // Reference to Student
  lessonId: "ObjectId", // Reference to Lesson
  instructorId: "ObjectId", // Reference to Instructor
  reportDate: "Date",
  skillsWorked: ["ObjectId"], // References to Skills
  progressNotes: "String",
  recommendations: "String",
  sentStatus: "Boolean", // Whether report was sent to parents
  createdAt: "Date",
  updatedAt: "Date"
};

// Certificate Schema - For level completion certificates
const CertificateSchema = {
  _id: "ObjectId",
  studentId: "ObjectId", // Reference to Student
  level: "Number", // 1-12 based on curriculum
  instructorId: "ObjectId", // Reference to Instructor who issued
  issueDate: "Date",
  pdfUrl: "String", // URL to certificate PDF
  createdAt: "Date",
  updatedAt: "Date"
};

// Notification Schema - For system notifications
const NotificationSchema = {
  _id: "ObjectId",
  userId: "ObjectId", // Reference to User
  type: "String", // Enum: 'lesson_reminder', 'progress_update', 'system_announcement', etc.
  title: "String",
  message: "String",
  isRead: "Boolean",
  createdAt: "Date",
  updatedAt: "Date"
};

// Message Schema - For in-app messaging
const MessageSchema = {
  _id: "ObjectId",
  senderId: "ObjectId", // Reference to User
  recipientId: "ObjectId", // Reference to User
  subject: "String",
  content: "String",
  isRead: "Boolean",
  createdAt: "Date",
  updatedAt: "Date"
};

// Curriculum Schema - For storing the 12-level curriculum structure
const CurriculumSchema = {
  _id: "ObjectId",
  level: "Number", // 1-12
  title: "String", // e.g., "SKATEBOARD ANATOMY"
  objective: "String", // Learning objective
  skills: [{
    name: "String", // e.g., "BOARD", "TRUCKS", "WHEELS"
    description: "String",
    isRequired: "Boolean"
  }],
  bonusTrick: {
    name: "String",
    description: "String"
  },
  createdAt: "Date",
  updatedAt: "Date"
};

// Curriculum data based on the PDF
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
    objective: "Here we are gong to apply what we learned from the 8 steps method and go for our first push!",
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
      { name: "FAKIE 180 (FS)", description: "180 turn from fakie position", isRequired: true },
      { name: "FULL CIRCLE (BS)", description: "Complete backside circle in bowl", isRequired: true },
      { name: "FULL CIRCLE (FS)", description: "Complete frontside circle in bowl", isRequired: true }
    ],
    bonusTrick: { name: "FULL UNDERFLIP", description: "Advanced flip trick" }
  }
];
