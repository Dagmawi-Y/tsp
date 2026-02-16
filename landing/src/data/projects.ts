export interface Project {
  id: string;
  title: string;
  briefDescription: string;
  description: string;
  author: string[];
  cohort: string;
  technologies: string[];
  category: string;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl: string[];
  highlights?: string[];
}

export const allProjects: Project[] = [
  {
    id: "1",
    title: "EthioLingo",
    description:
      "EthioLingo is a local Ethiopian language learning app that helps users learn differnt local languages.",
    briefDescription: `
      EthioLingo is a comprehensive language learning mobile application designed to teach local Ethiopian languages such as Amharic, Afan Oromo, and Tigrigna. 
      It provides interactive lessons, quizzes, and exercises to ensure an engaging learning experience. Users can set personalized learning goals, track their progress over time, and continue learning even without internet connectivity, thanks to offline-first functionality. 
      Currently in Phase 2 production, the app features a modern UI/UX, smooth horizontal carousel animations for lessons and screenshots, and seamless data syncing when online. 
      EthioLingo aims to make local language learning accessible, effective, and enjoyable for everyone in Ethiopia and beyond.
  `,
    author: ["Mieraf Abebe", "Hailemeskel Getaneh", "Yohannes"],
    cohort: "Cohort 1",
    category: "Mobile App",
    technologies: [
      "React Native",
      "Node.js",
      "Express",
      "MySQL",
      "SQLite",
      "TailwindCSS",
    ],
    githubUrl: "https://github.com/Hailemeskel-Getaneh/EthioLingo",
    liveUrl: "https://ethiolingo.com",
    imageUrl: [
      "/images/1.jpg",
      "/images/2.png",
      "/images/register.jpg",
      "/images/login.jpg",
      "/images/forgetpass.jpg",
      "/images/resetpass.jpg",
      "/images/verify.jpg",
      "/images/complate.jpg",
      "/images/languageSelection.jpg",
      "/images/timechoose.png",
      "/images/onboarding.jpg",
      "/images/home.png",
      "/images/drower.png",
      "/images/lessons.png",
      "/images/writingpage.png",
      "/images/speakingpage.png",
      "/images/readingpage.png",
      "/images/listeningpage.png",
      "/images/profile.png",
      "/images/editprofile.png",
    ],
    highlights: [
      "Compact, mobile-first UI with smooth horizontal linear motion.",
      "Track users’ learning progress per language",
      "Offline-first experience with seamless syncing.",
      "Supports multiple local languages: Amharic, Afan Oromo, Tigrigna.",
      "Store vocabulary, progress, and audio locally",
      "Gamified lessons: quizzes, matching words, fill-in-the-blank exercises",
    ],
  },
  {
    id: "2",
    title: "E-Self",
    description:
      "E-Self is an online learning platform designed to teach students in an accessible and easy way while enabling teachers to work remotely on the platform.",
    briefDescription: `E-Self opens doors to quality education for every Ethiopian learner
        — no matter where you are or when you study. 
        With affordable courses taught by professionals in clear, modular steps, you gain real skills, 
        earn a recognized certificate, and step confidently into the job market.
          Join us to push our community forward into the technology era!`,
    author: ["Negede Tekleyes and Kalkidan Behailu"],
    cohort: "Cohort 1",
    category: "Web App",
    technologies: ["Next.js", "Nest.js", "PostgreSQL", "Prisma", "TailWindCSS"],
    githubUrl: "https://github.com/NegedeTekleyes/E-self-Lerning",
    liveUrl: "https://e-self-lerning-nbv9.vercel.app",
    imageUrl: [
      "/images/E-HomePage.png",
      "/images/HomePage2.png",
      "/images/StudentSignUp.png",
      "/images/StudentSignin.png",
      "/images/CourseDetailePage.png",
      "/images/CourseDetailePage.png",
      "/images/CartPage.png",
      "/images/HalfPayment.png",
      "/images/FullPayment.png",
      "/images/EditProfileStudent.png",
      "/images/StudPassChan.png",
      "/images/StudSettingPage.png",
      "/images/InstructorSignupPage.png",
      "/images/InstructorHomePag.png",
      "/images/CreateCourse1.png",
      "/images/CreateCourse2.png",
      "/images/CreateCourse3.png",
      "/images/EnrolledStudent.png",
      "/images/StudentListPage.png",
      "/images/InstructorSettingPage.png",
    ],
    highlights: [
      "Accessible Learning Anytime, Anywhere",
      "Learn from any location and at any time — ideal for busy learners across Ethiopia and beyond.",
      "Extremely Affordable",
      "Courses offered at a minimal cost, removing financial barriers to quality education.",
      "Professionally Structured Courses",
      "High-quality lectures delivered by practical professionals in a clear, step-by-step format.",
      "Organized Modular Format",
      "Every course is neatly divided into logical modules with clearly defined requirements — easy to follow and complete.",
      "Job Market Ready",
      "Designed to help learners gain practical skills and confidently enter (or advance in) the job market.",
      "Empowering Ethiopia’s Tech Future",
      "Pushing the Ethiopian community into the technology era by building digital skills and modern knowledge.",
    ],
  },
];

export const categories = ["All", "Web App", "Mobile App", "AI/ML"];
export const cohorts = ["All", "Cohort 1"];

export const getFeaturedProjects = () => allProjects.slice(0, 3);
export const hasMoreProjects = () => allProjects.length > 3;
