// Intelligent Search Database - Expanded with Real Content
const searchData = [
    { 
        id: 1, 
        title: "JavaScript Programming Guide", 
        content: "JavaScript is a versatile programming language that powers modern web applications. Learn about ES6 features, closures, promises, async/await, and functional programming concepts. This comprehensive guide covers everything from basic syntax to advanced patterns used in frameworks like React and Node.js.",
        category: "tech",
        author: "Sarah Johnson",
        date: "2026-01-15",
        readTime: "12 min",
        tags: ["JavaScript", "Programming", "Web Development"],
        icon: "fa-brands fa-js"
    },
    { 
        id: 2, 
        title: "React.js: Building Modern User Interfaces", 
        content: "React.js has revolutionized front-end development with its component-based architecture and virtual DOM. This guide explores React hooks, state management with Redux and Context API, performance optimization, and best practices for building scalable web applications. Learn about server-side rendering, React Router, and modern patterns like compound components and render props.",
        category: "tech",
        author: "Michael Chen",
        date: "2026-02-20",
        readTime: "15 min",
        tags: ["React", "Frontend", "UI/UX"],
        icon: "fa-brands fa-react"
    },
    { 
        id: 3, 
        title: "Python for Data Science Mastery", 
        content: "Python has become the go-to language for data science and machine learning. This comprehensive course covers NumPy, Pandas, Matplotlib, and Scikit-learn libraries. Learn data manipulation, visualization, statistical analysis, and machine learning algorithms. Includes real-world projects in predictive modeling, natural language processing, and computer vision.",
        category: "ai",
        author: "Dr. Emily Roberts",
        date: "2026-01-28",
        readTime: "20 min",
        tags: ["Python", "Data Science", "Machine Learning"],
        icon: "fa-brands fa-python"
    },
    { 
        id: 4, 
        title: "Data Science Fundamentals Explained", 
        content: "Data science is the art of extracting insights from data using statistics, mathematics, and computer science. This guide covers the entire data science lifecycle: data collection, cleaning, exploratory analysis, feature engineering, model selection, and deployment. Learn about regression, classification, clustering, and dimensionality reduction techniques with practical examples.",
        category: "ai",
        author: "Prof. James Wilson",
        date: "2026-03-05",
        readTime: "18 min",
        tags: ["Data Science", "Statistics", "AI"],
        icon: "fa-solid fa-database"
    },
    { 
        id: 5, 
        title: "Full-Stack Web Development: The Complete Guide", 
        content: "Full-stack development requires proficiency in front-end and back-end technologies. This comprehensive guide covers HTML5, CSS3, JavaScript ES6, Node.js, Express, MongoDB, and deployment. Learn about responsive design, RESTful APIs, authentication, authorization, database modeling, and cloud deployment with Docker and AWS. Build real-world projects from scratch.",
        category: "tech",
        author: "David Kim",
        date: "2026-02-10",
        readTime: "25 min",
        tags: ["Web Development", "Full-Stack", "MERN"],
        icon: "fa-solid fa-code"
    },
    { 
        id: 6, 
        title: "Cross-Platform Mobile App Development", 
        content: "Build apps for iOS and Android with React Native and Flutter. This guide covers component architecture, state management, navigation, native modules, and deployment to app stores. Learn about platform-specific styling, performance optimization, and integration with cloud services. Includes case studies of successful mobile apps built with cross-platform frameworks.",
        category: "tech",
        author: "Lisa Park",
        date: "2026-03-12",
        readTime: "14 min",
        tags: ["Mobile", "React Native", "Flutter"],
        icon: "fa-solid fa-mobile-screen"
    },
    { 
        id: 7, 
        title: "Cloud Computing: AWS, Azure, and GCP", 
        content: "Cloud computing has transformed how businesses deploy and scale applications. This guide covers the three major cloud providers: AWS, Microsoft Azure, and Google Cloud. Learn about compute services (EC2, VM, Compute Engine), storage (S3, Blob, Cloud Storage), databases, networking, and serverless computing. Includes cost optimization strategies and security best practices.",
        category: "tech",
        author: "Robert Chang",
        date: "2026-02-25",
        readTime: "22 min",
        tags: ["Cloud", "AWS", "Azure", "GCP"],
        icon: "fa-solid fa-cloud"
    },
    { 
        id: 8, 
        title: "Cybersecurity: Protecting Digital Assets", 
        content: "Cybersecurity is essential in today's connected world. This guide covers network security, ethical hacking, cryptography, incident response, and security frameworks. Learn about vulnerability assessment, penetration testing, security monitoring, and compliance (GDPR, HIPAA). Understand common attack vectors and how to defend against them in both on-premise and cloud environments.",
        category: "tech",
        author: "Maria Garcia",
        date: "2026-01-20",
        readTime: "16 min",
        tags: ["Cybersecurity", "Security", "Hacking"],
        icon: "fa-solid fa-shield-halved"
    },
    { 
        id: 9, 
        title: "Artificial Intelligence: Concepts and Applications", 
        content: "Artificial Intelligence is reshaping industries and daily life. This guide covers the foundations of AI: neural networks, deep learning, reinforcement learning, and natural language processing. Learn about AI applications in healthcare, finance, autonomous vehicles, and robotics. Includes practical projects in computer vision, speech recognition, and language translation using popular frameworks like TensorFlow and PyTorch.",
        category: "ai",
        author: "Dr. Alan Turing",
        date: "2026-03-18",
        readTime: "20 min",
        tags: ["AI", "Deep Learning", "Neural Networks"],
        icon: "fa-solid fa-robot"
    },
    { 
        id: 10, 
        title: "Database Management: SQL and NoSQL", 
        content: "Database design and management is crucial for any application. This guide covers relational databases (PostgreSQL, MySQL) and NoSQL databases (MongoDB, Redis, Cassandra). Learn about schema design, query optimization, indexing, ACID properties, and distributed systems. Understand when to use SQL vs. NoSQL, and how to implement database migrations and backup strategies.",
        category: "tech",
        author: "Chris Anderson",
        date: "2026-02-05",
        readTime: "17 min",
        tags: ["Database", "SQL", "NoSQL", "MongoDB"],
        icon: "fa-solid fa-database"
    },
    { 
        id: 11, 
        title: "Graphic Design: Principles and Practice", 
        content: "Graphic design combines creativity with technical skills to communicate visually. This guide covers design principles (balance, contrast, hierarchy), typography, color theory, and composition. Learn industry-standard tools like Adobe Photoshop, Illustrator, and Figma. Includes practical projects in logo design, branding, poster design, and UI/UX wireframing.",
        category: "design",
        author: "Emma Davis",
        date: "2026-01-25",
        readTime: "13 min",
        tags: ["Design", "Photoshop", "Illustrator"],
        icon: "fa-solid fa-pen-fancy"
    },
    { 
        id: 12, 
        title: "Digital Marketing: Strategy and Execution", 
        content: "Digital marketing is essential for modern business growth. This comprehensive guide covers SEO, content marketing, social media, email marketing, and paid advertising (PPC). Learn about marketing analytics, customer journey mapping, conversion rate optimization, and ROI measurement. Includes case studies of successful digital marketing campaigns and best practices for different platforms.",
        category: "business",
        author: "Mark Thompson",
        date: "2026-03-08",
        readTime: "19 min",
        tags: ["Marketing", "SEO", "Social Media"],
        icon: "fa-solid fa-chart-line"
    },
    { 
        id: 13, 
        title: "Machine Learning: Algorithms Demystified", 
        content: "Machine learning algorithms power the AI revolution. This guide covers supervised learning (linear regression, decision trees, SVMs), unsupervised learning (clustering, PCA), and reinforcement learning. Learn about model evaluation, hyperparameter tuning, feature engineering, and handling imbalanced datasets. Includes practical implementations using scikit-learn and real-world datasets.",
        category: "ai",
        author: "Dr. Sophia Lee",
        date: "2026-02-28",
        readTime: "21 min",
        tags: ["Machine Learning", "Algorithms", "AI"],
        icon: "fa-solid fa-chart-scatter"
    },
    { 
        id: 14, 
        title: "UI/UX Design: Creating Exceptional Experiences", 
        content: "User experience design is critical for product success. This guide covers UX research methods (interviews, surveys, user testing), information architecture, wireframing, prototyping, and usability testing. Learn about design systems, interaction design, and accessibility (WCAG guidelines). Includes practical projects in product design for web and mobile applications.",
        category: "design",
        author: "Laura Martinez",
        date: "2026-02-15",
        readTime: "16 min",
        tags: ["UI/UX", "Design", "User Experience"],
        icon: "fa-solid fa-paintbrush"
    },
    { 
        id: 15, 
        title: "Business Analytics: Data-Driven Decision Making", 
        content: "Business analytics transforms data into actionable insights. This guide covers descriptive analytics, predictive analytics, and prescriptive analytics. Learn about business intelligence tools (Tableau, Power BI), KPI development, dashboard design, and reporting. Understand how to use analytics for strategic planning, operational efficiency, and competitive advantage.",
        category: "business",
        author: "John Miller",
        date: "2026-03-01",
        readTime: "14 min",
        tags: ["Analytics", "Business", "BI"],
        icon: "fa-solid fa-chart-pie"
    }
];

// Autocomplete word bank - expanded
const autocompleteWords = [
    "javascript", "react", "python", "data science", "web development",
    "mobile app", "cloud computing", "cybersecurity", "artificial intelligence",
    "database", "graphic design", "digital marketing", "machine learning",
    "html", "css", "node.js", "express", "mongodb", "sql", "nosql",
    "aws", "azure", "google cloud", "photoshop", "illustrator", "seo",
    "ui/ux", "flutter", "react native", "docker", "kubernetes", "git",
    "linux", "devops", "agile", "scrum", "jira", "figma", "sketch",
    "analytics", "blockchain", "iot", "robotics", "vr", "ar", "typescript",
    "angular", "vue", "svelte", "next.js", "gatsby", "tailwind", "sass",
    "webpack", "babel", "jest", "cypress", "storybook", "graphql",
    "rest api", "microservices", "serverless", "terraform", "ansible"
];

// Common misspellings dictionary
const commonMisspellings = {
    'javascript': 'javascript',
    'javascrpt': 'javascript',
    'javasript': 'javascript',
    'java script': 'javascript',
    'react': 'react',
    'reactjs': 'react',
    'pyhton': 'python',
    'pthon': 'python',
    'datascience': 'data science',
    'data sceince': 'data science',
    'webdevelopment': 'web development',
    'web dev': 'web development',
    'mobileapp': 'mobile app',
    'cloud': 'cloud computing',
    'cyber': 'cybersecurity',
    'ai': 'artificial intelligence',
    'ml': 'machine learning',
    'maching': 'machine',
    'lerning': 'learning',
    'algorithims': 'algorithms',
    'analytics': 'analytics',
    'bussiness': 'business',
    'markting': 'marketing',
    'desgin': 'design',
    'graphic': 'graphic design',
    'photoshop': 'photoshop',
    'illustrator': 'illustrator',
    'full stack': 'full-stack',
    'mern': 'full-stack web development',
    'mean': 'full-stack web development',
    'ui ux': 'ui/ux',
    'seo': 'digital marketing',
    'node': 'node.js',
    'mongo': 'mongodb',
    'sql': 'database management',
    'nosql': 'database management'
};