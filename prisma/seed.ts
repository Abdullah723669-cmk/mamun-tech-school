import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const courses = [
  {
    title: 'Programming Language — Python',
    slug: 'python',
    description: `Master Python from the ground up in this comprehensive course designed for aspiring developers, data scientists, and automation engineers. Python is the world's most popular programming language, used by companies like Google, Netflix, NASA, and Instagram. 

    You'll start with the fundamentals — variables, data types, control flow, functions, and object-oriented programming — before moving into advanced topics like decorators, generators, context managers, and asynchronous programming.

    By the end of this course, you'll be able to build real-world applications, automate repetitive tasks, work with APIs, manipulate data with Pandas and NumPy, and deploy Python scripts to the cloud.`,
    shortDesc: 'Master Python programming from basics to advanced — the world\'s most versatile language for web dev, data science, and automation.',
    image: '/images/python-banner.png',
    price: 8500,
    duration: '3 Months',
    level: 'Beginner to Advanced',
    category: 'Programming',
    instructor: 'Mamun Rashid',
    instructorBio: 'Mamun Rashid is a Senior Software Engineer with 8+ years of experience in Python development. He has worked with global tech companies and has trained over 2,000 students. He holds a BSc in Computer Science and multiple Python certifications.',
    instructorAvatar: '/images/instructor-mamun.jpg',
    highlights: JSON.stringify([
      '50+ hours of HD video content',
      'Real-world project-based learning',
      'Python 3.12 latest features covered',
      'Data Science & Automation modules',
      'Certificate of completion',
      'Lifetime access to course materials',
      '24/7 Discord community support',
      'Weekly live Q&A sessions'
    ]),
    requirements: JSON.stringify([
      'No prior programming experience needed',
      'A computer with internet connection',
      'Willingness to practice daily for best results',
      'Basic computer literacy'
    ]),
    curriculum: JSON.stringify([
      {
        module: 'Module 1: Python Fundamentals',
        lessons: ['Introduction to Python & Setup', 'Variables & Data Types', 'String Manipulation', 'Numbers & Math Operations', 'User Input & Output']
      },
      {
        module: 'Module 2: Control Flow',
        lessons: ['If/Elif/Else Statements', 'For & While Loops', 'Break, Continue & Pass', 'List Comprehensions', 'Pattern Matching (match/case)']
      },
      {
        module: 'Module 3: Functions & Modules',
        lessons: ['Defining & Calling Functions', 'Arguments & Return Values', 'Lambda Functions', 'Built-in Modules', 'Creating Your Own Modules']
      },
      {
        module: 'Module 4: OOP in Python',
        lessons: ['Classes & Objects', 'Inheritance & Polymorphism', 'Encapsulation & Abstraction', 'Magic/Dunder Methods', 'Decorators & Properties']
      },
      {
        module: 'Module 5: Advanced Python',
        lessons: ['File I/O & Context Managers', 'Error Handling & Exceptions', 'Generators & Iterators', 'Async/Await Programming', 'Working with APIs (Requests)']
      },
      {
        module: 'Module 6: Capstone Projects',
        lessons: ['Web Scraper with BeautifulSoup', 'Task Automation Bot', 'REST API with FastAPI', 'Data Analysis with Pandas', 'Deployment to Cloud']
      }
    ]),
    featured: true,
    totalStudents: 1247,
    rating: 4.9
  },
  {
    title: 'DevOps Engineering',
    slug: 'devops',
    description: `Transform into a DevOps engineer and master the complete CI/CD ecosystem in this industry-leading course. DevOps engineers are among the highest-paid professionals in tech, with average salaries exceeding $120,000 globally.

    You'll learn Linux administration, Docker containerization, Kubernetes orchestration, Jenkins pipelines, Terraform infrastructure-as-code, AWS cloud services, monitoring with Prometheus & Grafana, and security best practices.

    This hands-on course uses real enterprise projects to teach you how to bridge the gap between development and operations teams, automate deployments, ensure system reliability, and build scalable cloud infrastructure.`,
    shortDesc: 'Become a DevOps engineer — master Docker, Kubernetes, CI/CD pipelines, AWS, Terraform, and modern cloud infrastructure.',
    image: '/images/devops-banner.png',
    price: 12000,
    duration: '4 Months',
    level: 'Intermediate to Advanced',
    category: 'DevOps & Cloud',
    instructor: 'Rafiqul Islam',
    instructorBio: 'Rafiqul Islam is a DevOps Architect with 10+ years experience at Amazon and local tech startups. AWS Certified Solutions Architect and Kubernetes administrator with deep expertise in building resilient cloud systems.',
    instructorAvatar: '/images/instructor-rafiq.jpg',
    highlights: JSON.stringify([
      '70+ hours of hands-on labs',
      'Real production environment setup',
      'AWS Free Tier labs included',
      'Docker & Kubernetes mastery',
      'CI/CD pipeline implementation',
      'Infrastructure as Code with Terraform',
      'Industry-recognized certificate',
      'Job placement assistance'
    ]),
    requirements: JSON.stringify([
      'Basic Linux command line knowledge',
      'Understanding of web applications',
      'AWS Free Tier account (free)',
      'At least 8GB RAM laptop recommended'
    ]),
    curriculum: JSON.stringify([
      {
        module: 'Module 1: Linux & Bash',
        lessons: ['Linux Fundamentals', 'Shell Scripting', 'System Administration', 'Networking Basics', 'SSH & Security']
      },
      {
        module: 'Module 2: Docker & Containers',
        lessons: ['Docker Architecture', 'Building Docker Images', 'Docker Compose', 'Container Networking', 'Docker Registry & Hub']
      },
      {
        module: 'Module 3: Kubernetes',
        lessons: ['K8s Architecture & Components', 'Deployments & Services', 'ConfigMaps & Secrets', 'Helm Charts', 'Kubernetes Monitoring']
      },
      {
        module: 'Module 4: CI/CD Pipelines',
        lessons: ['Git Workflows', 'Jenkins Setup & Pipelines', 'GitHub Actions', 'Automated Testing Integration', 'Blue-Green Deployments']
      },
      {
        module: 'Module 5: Cloud & IaC',
        lessons: ['AWS Core Services (EC2, S3, RDS)', 'Terraform Fundamentals', 'Infrastructure Automation', 'CloudFormation', 'Cost Optimization']
      },
      {
        module: 'Module 6: Monitoring & Security',
        lessons: ['Prometheus & Grafana', 'ELK Stack', 'DevSecOps Practices', 'Incident Response', 'Capstone: Full Pipeline Project']
      }
    ]),
    featured: true,
    totalStudents: 834,
    rating: 4.8
  },
  {
    title: 'Custom AI Agent Creation',
    slug: 'ai-agents',
    description: `Step into the frontier of artificial intelligence by building your own intelligent AI agents from scratch. This cutting-edge course teaches you how to design, develop, and deploy autonomous AI systems that can reason, plan, use tools, and complete complex multi-step tasks without human intervention.

    You'll master LangChain, LangGraph, OpenAI API, Anthropic Claude, vector databases (Pinecone, ChromaDB), RAG (Retrieval-Augmented Generation), function calling, and agentic frameworks. You'll build agents that can browse the web, write and execute code, manage files, send emails, and interact with APIs.

    This is the most in-demand skill in the AI industry right now — companies are paying premium salaries for engineers who can build production-grade AI agent systems.`,
    shortDesc: 'Build autonomous AI agents from scratch using LangChain, OpenAI, RAG, and multi-agent frameworks — the hottest skill in tech.',
    image: '/images/ai-agents-banner.png',
    price: 15000,
    duration: '3 Months',
    level: 'Intermediate',
    category: 'Artificial Intelligence',
    instructor: 'Dr. Nazmul Hasan',
    instructorBio: 'Dr. Nazmul Hasan holds a PhD in Machine Learning from BUET. Former AI Researcher at Google Brain, now building AI products at his startup. Published 15+ papers on autonomous agent systems and multi-modal AI.',
    instructorAvatar: '/images/instructor-nazmul.jpg',
    highlights: JSON.stringify([
      '60+ hours of cutting-edge content',
      'Build 10+ production AI agents',
      'OpenAI, Claude & Gemini APIs covered',
      'RAG system implementation',
      'Multi-agent orchestration',
      'Vector database mastery',
      'Deploy agents to production',
      'Access to premium AI tools'
    ]),
    requirements: JSON.stringify([
      'Python programming knowledge (intermediate)',
      'Basic understanding of APIs',
      'OpenAI API key (costs ~$5/month for labs)',
      'Enthusiasm for AI/ML concepts'
    ]),
    curriculum: JSON.stringify([
      {
        module: 'Module 1: AI Agent Foundations',
        lessons: ['What are AI Agents?', 'LLM Fundamentals & Prompt Engineering', 'OpenAI & Claude API Mastery', 'Function Calling & Tool Use', 'Agent Memory Systems']
      },
      {
        module: 'Module 2: LangChain Framework',
        lessons: ['LangChain Architecture', 'Chains & Prompts', 'Output Parsers', 'Document Loaders', 'LangChain Tools']
      },
      {
        module: 'Module 3: RAG Systems',
        lessons: ['Vector Embeddings Theory', 'ChromaDB & Pinecone', 'Document Chunking Strategies', 'Semantic Search', 'Hybrid RAG Systems']
      },
      {
        module: 'Module 4: Advanced Agent Patterns',
        lessons: ['ReAct Agent Pattern', 'Plan-and-Execute Agents', 'Multi-Agent Systems with LangGraph', 'Agent Evaluation & Testing', 'Guardrails & Safety']
      },
      {
        module: 'Module 5: Production Agents',
        lessons: ['Code Interpreter Agent', 'Web Research Agent', 'Email & Calendar Agent', 'Data Analysis Agent', 'Customer Support Agent']
      },
      {
        module: 'Module 6: Deployment & Scaling',
        lessons: ['FastAPI for Agent Deployment', 'Streaming Responses', 'Monitoring Agent Performance', 'Cost Optimization', 'Capstone: Full Agentic App']
      }
    ]),
    featured: true,
    totalStudents: 612,
    rating: 4.95
  },
  {
    title: 'AI Automation with n8n',
    slug: 'n8n-automation',
    description: `Harness the power of n8n — the world's most flexible open-source workflow automation platform — to build powerful AI-powered automations without writing complex code. n8n lets you connect 400+ apps and services with visual workflows, AI nodes, and custom JavaScript.

    In this course, you'll learn to automate business processes, integrate AI capabilities (ChatGPT, Gemini, image recognition) into workflows, build intelligent chatbots, set up webhook-driven automations, create scheduled jobs, and connect your favorite tools like Gmail, Slack, Notion, Airtable, and hundreds more.

    Whether you're a business owner wanting to save hours of manual work, or a developer looking to add automation superpowers to your toolkit, this course will transform how you work.`,
    shortDesc: 'Master n8n workflow automation — connect 400+ apps, build AI-powered workflows, and automate your business processes with zero limits.',
    image: '/images/n8n-banner.png',
    price: 10000,
    duration: '2 Months',
    level: 'Beginner to Intermediate',
    category: 'AI Automation',
    instructor: 'Mamun Rashid',
    instructorBio: 'Mamun Rashid is a certified n8n expert and automation consultant who has built 500+ production workflows for businesses across Asia and Europe. He runs this very school on n8n automation backends.',
    instructorAvatar: '/images/instructor-mamun.jpg',
    highlights: JSON.stringify([
      '40+ hours of practical automation',
      'Build 20+ real automation workflows',
      'AI integration with ChatGPT & Gemini',
      'Webhook mastery & HTTP requests',
      '400+ app integrations covered',
      'Self-hosting n8n on VPS',
      'Business automation templates',
      'Certificate of automation expertise'
    ]),
    requirements: JSON.stringify([
      'No coding experience required',
      'Basic understanding of web/apps',
      'Free n8n.cloud account or local install',
      'Logical thinking mindset'
    ]),
    curriculum: JSON.stringify([
      {
        module: 'Module 1: n8n Fundamentals',
        lessons: ['n8n Architecture & Setup', 'Visual Workflow Builder', 'Triggers & Node Types', 'Data Flow & Expressions', 'Error Handling & Retries']
      },
      {
        module: 'Module 2: Core Integrations',
        lessons: ['HTTP Request & Webhooks', 'Gmail & Email Automation', 'Google Sheets Integration', 'Slack & Discord Bots', 'Airtable & Notion Sync']
      },
      {
        module: 'Module 3: AI-Powered Workflows',
        lessons: ['OpenAI / ChatGPT Nodes', 'AI Text Processing & Summarization', 'Image Recognition Automation', 'AI Email Responder', 'Sentiment Analysis Workflows']
      },
      {
        module: 'Module 4: Advanced n8n',
        lessons: ['Sub-workflows & Modular Design', 'JavaScript Code Nodes', 'Scheduling & Cron Jobs', 'API Authentication Patterns', 'Database Connections (PostgreSQL, MySQL)']
      },
      {
        module: 'Module 5: Business Automation',
        lessons: ['Lead Generation Automation', 'Invoice & Payment Workflows', 'CRM Automation', 'Social Media Scheduling', 'E-commerce Order Processing']
      },
      {
        module: 'Module 6: Deployment & Scaling',
        lessons: ['Self-hosting n8n on VPS', 'Docker Deployment', 'Queue Mode for High Volume', 'Security Best Practices', 'Capstone: Full Business Automation System']
      }
    ]),
    featured: false,
    totalStudents: 923,
    rating: 4.85
  },
  {
    title: 'Data Analysis with R',
    slug: 'data-analysis-r',
    description: `R is the gold standard language for statistical analysis, used by data scientists, researchers, statisticians, and academics worldwide. This comprehensive course takes you from R basics to advanced statistical modeling and machine learning.

    You'll learn data manipulation with dplyr and tidyr, data visualization with ggplot2 (the most beautiful charting library available), statistical testing, regression analysis, time series forecasting, clustering, and machine learning with the tidymodels framework.

    By the end of the course, you'll be able to analyze real datasets, draw meaningful insights, and present findings with professional-quality visualizations that will impress stakeholders and potential employers.`,
    shortDesc: 'Master data analysis with R — from statistical fundamentals to machine learning, using dplyr, ggplot2, and tidymodels.',
    image: '/images/r-banner.png',
    price: 9500,
    duration: '3 Months',
    level: 'Beginner to Intermediate',
    category: 'Data Science',
    instructor: 'Fatema Khanam',
    instructorBio: 'Fatema Khanam is a Data Scientist with an MSc in Statistics from DU. She has 6+ years experience in R programming for academic research and corporate analytics. Published author of "Applied R for Business Analytics".',
    instructorAvatar: '/images/instructor-fatema.jpg',
    highlights: JSON.stringify([
      '55+ hours of statistical content',
      'Real datasets from diverse industries',
      'ggplot2 visualization mastery',
      'Statistical testing & inference',
      'Machine learning with tidymodels',
      'R Markdown report generation',
      'Published research methodology',
      'Certificate recognized by universities'
    ]),
    requirements: JSON.stringify([
      'Basic math/statistics knowledge helpful',
      'R and RStudio installed (both free)',
      'No prior programming needed',
      'Interest in working with data'
    ]),
    curriculum: JSON.stringify([
      {
        module: 'Module 1: R Fundamentals',
        lessons: ['R & RStudio Setup', 'Data Types & Structures', 'Vectors, Lists & Data Frames', 'Control Flow in R', 'Functions & Apply Family']
      },
      {
        module: 'Module 2: Data Manipulation',
        lessons: ['Importing Data (CSV, Excel, JSON)', 'dplyr: filter, select, mutate', 'Data Joining & Merging', 'tidyr: pivot & reshape', 'Handling Missing Data']
      },
      {
        module: 'Module 3: Data Visualization',
        lessons: ['ggplot2 Grammar of Graphics', 'Chart Types & When to Use', 'Themes & Custom Styling', 'Interactive Plots with Plotly', 'Dashboard with Shiny']
      },
      {
        module: 'Module 4: Statistical Analysis',
        lessons: ['Descriptive Statistics', 'Probability Distributions', 'Hypothesis Testing (t-test, chi-square)', 'Correlation & Regression', 'ANOVA & Non-parametric Tests']
      },
      {
        module: 'Module 5: Machine Learning',
        lessons: ['tidymodels Framework', 'Linear & Logistic Regression', 'Decision Trees & Random Forest', 'Clustering (K-means)', 'Model Evaluation & Cross-validation']
      },
      {
        module: 'Module 6: Reporting & Projects',
        lessons: ['R Markdown Reports', 'Quarto Documents', 'Healthcare Data Analysis Project', 'Financial Analysis Project', 'Capstone: Full Analytical Report']
      }
    ]),
    featured: false,
    totalStudents: 445,
    rating: 4.7
  },
  {
    title: 'Data Visualization with Power BI',
    slug: 'power-bi',
    description: `Power BI is Microsoft's industry-leading business intelligence platform, used by over 5 million organizations worldwide. This hands-on course teaches you everything you need to become a Power BI expert — from connecting to data sources and transforming data with Power Query, to building stunning interactive dashboards and publishing them to the cloud.

    You'll master DAX (Data Analysis Expressions) — the formula language that unlocks Power BI's full potential — create complex calculations, build data models with proper relationships, design mobile-responsive reports, and implement row-level security for enterprise deployments.

    A Power BI skill is a passport to business analyst, data analyst, and BI developer roles with salaries ranging from ৳40,000 to ৳1,50,000+ per month in Bangladesh.`,
    shortDesc: 'Become a Power BI expert — master DAX, Power Query, interactive dashboards, and enterprise BI solutions used by Fortune 500 companies.',
    image: '/images/power-bi-banner.png',
    price: 8000,
    duration: '2 Months',
    level: 'Beginner to Advanced',
    category: 'Business Intelligence',
    instructor: 'Ariful Islam',
    instructorBio: 'Ariful Islam is a Microsoft Certified Power BI Data Analyst Associate with 7+ years in business intelligence. Former BI Lead at a multinational FMCG company, now helping businesses make data-driven decisions.',
    instructorAvatar: '/images/instructor-ariful.jpg',
    highlights: JSON.stringify([
      '45+ hours of visual learning',
      '15+ real business dashboards built',
      'DAX from beginner to expert',
      'Power Query data transformation',
      'Microsoft certification preparation',
      'Enterprise Row-Level Security',
      'Power BI Service & Cloud',
      'Job-ready portfolio projects'
    ]),
    requirements: JSON.stringify([
      'Power BI Desktop installed (free download)',
      'Basic Excel knowledge helpful',
      'No programming experience needed',
      'Windows PC (Power BI Desktop is Windows-only)'
    ]),
    curriculum: JSON.stringify([
      {
        module: 'Module 1: Power BI Foundations',
        lessons: ['Power BI Desktop Overview', 'Connecting to Data Sources', 'Power Query Editor Basics', 'Creating Your First Report', 'Publishing to Power BI Service']
      },
      {
        module: 'Module 2: Data Transformation',
        lessons: ['Power Query M Language', 'Cleaning & Shaping Data', 'Merging & Appending Queries', 'Custom Columns & Measures', 'Handling Errors & Nulls']
      },
      {
        module: 'Module 3: Data Modeling',
        lessons: ['Star Schema Design', 'Relationships & Cardinality', 'Calculated Columns vs Measures', 'Role-Playing Dimensions', 'Date Table Best Practices']
      },
      {
        module: 'Module 4: DAX Mastery',
        lessons: ['DAX Fundamentals & Syntax', 'CALCULATE & Context Transition', 'Time Intelligence Functions', 'FILTER, ALL & ALLEXCEPT', 'Advanced DAX Patterns']
      },
      {
        module: 'Module 5: Dashboard Design',
        lessons: ['Visualization Best Practices', 'Custom Visuals & AppSource', 'Drillthrough & Bookmarks', 'Mobile Layout Design', 'Report Themes & Branding']
      },
      {
        module: 'Module 6: Enterprise & Certification',
        lessons: ['Row-Level Security', 'Power BI Dataflows', 'Performance Optimization', 'PL-300 Exam Prep', 'Capstone: Executive Sales Dashboard']
      }
    ]),
    featured: false,
    totalStudents: 678,
    rating: 4.8
  }
]

const blogPosts = [
  {
    title: 'The Rise of AI Agents: How Autonomous AI is Changing Software Development',
    slug: 'rise-of-ai-agents',
    excerpt: 'AI agents are no longer science fiction. In 2024-2025, companies like Anthropic, OpenAI, and Google have released agent frameworks that can autonomously browse the web, write code, and complete complex tasks.',
    content: `<h2>What Are AI Agents?</h2><p>AI agents are autonomous software systems powered by large language models (LLMs) that can perceive their environment, make decisions, use tools, and take actions to achieve goals — without constant human intervention.</p><p>Unlike traditional chatbots that simply respond to queries, AI agents can plan multi-step actions, remember past interactions, use external tools like web browsers and code interpreters, and even collaborate with other AI agents.</p><h2>Key Frameworks Driving the Revolution</h2><p>Several frameworks have emerged as industry standards for building AI agents...</p>`,
    image: '/images/ai-agents-banner.png',
    category: 'Artificial Intelligence',
    tags: 'AI, Agents, LangChain, OpenAI, Future of Tech',
    published: true
  },
  {
    title: 'n8n vs Zapier vs Make: Which Automation Platform is Best in 2025?',
    slug: 'n8n-vs-zapier-vs-make',
    excerpt: 'We compare the three most popular workflow automation platforms in 2025 — n8n, Zapier, and Make (formerly Integromat) — across pricing, features, ease of use, and AI capabilities.',
    content: `<h2>The Automation Platform Wars of 2025</h2><p>With AI transforming every business process, workflow automation has become a critical skill. But which platform should you choose?</p><h2>n8n: The Open-Source Champion</h2><p>n8n stands out as the most powerful and flexible option, particularly for developers and technical users. Its self-hosting capability means unlimited workflows at a fraction of the cost of competitors...</p>`,
    image: '/images/n8n-banner.png',
    category: 'AI Automation',
    tags: 'n8n, Zapier, Make, Automation, Comparison',
    published: true
  },
  {
    title: 'Why Python Remains the #1 Language for Data Science in 2025',
    slug: 'python-data-science-2025',
    excerpt: 'Despite the emergence of new languages and tools, Python continues to dominate data science and machine learning. Here\'s why and what you should focus on learning.',
    content: `<h2>Python\'s Unshakeable Dominance</h2><p>According to Stack Overflow\'s 2024 Developer Survey, Python is the most popular programming language for the third year running. In data science specifically, Python\'s market share exceeds 90%.</p><h2>The Ecosystem is Unmatched</h2><p>Libraries like NumPy, Pandas, Scikit-learn, PyTorch, and TensorFlow have created an ecosystem so rich that no competing language comes close...</p>`,
    image: '/images/python-banner.png',
    category: 'Programming',
    tags: 'Python, Data Science, Machine Learning, Programming',
    published: true
  }
]

const testimonials = [
  {
    name: 'Sakib Ahmed',
    role: 'Junior Software Developer at BJIT',
    course: 'Programming Language — Python',
    text: 'Mamun Tech School completely changed my career trajectory. I enrolled in the Python course with zero coding experience and within 3 months, I landed a junior developer role. The curriculum is structured perfectly and Mamun sir\'s teaching style makes even complex concepts easy to understand.',
    rating: 5
  },
  {
    name: 'Nusrat Jahan',
    role: 'DevOps Engineer at Brain Station 23',
    course: 'DevOps Engineering',
    text: 'The DevOps course here is incredible. Hands-on labs, real AWS environment, and the CI/CD pipeline project we built is now in my portfolio. I went from a traditional sysadmin to a DevOps engineer doubling my salary in just 4 months!',
    rating: 5
  },
  {
    name: 'Rifat Hossain',
    role: 'AI Engineer at Shajgoj',
    course: 'Custom AI Agent Creation',
    text: 'Dr. Nazmul\'s AI Agent course is cutting-edge. We learned things that aren\'t even in most university curricula. I\'m now building production AI agents for my company. Worth every taka and more.',
    rating: 5
  },
  {
    name: 'Tahmina Akter',
    role: 'Business Analyst at Grameenphone',
    course: 'Data Visualization with Power BI',
    text: 'I was using Excel for all my reports before this course. Now I create stunning Power BI dashboards that my managers love. The DAX module is particularly excellent — I went from confused to confident in just 2 weeks.',
    rating: 5
  },
  {
    name: 'Mahmudul Hasan',
    role: 'Freelance Automation Consultant',
    course: 'AI Automation with n8n',
    text: 'This n8n course paid for itself 10x over. I now charge ৳50,000 per automation project for clients. Mamun sir\'s practical approach and real business cases made all the difference. Best investment I\'ve made!',
    rating: 5
  }
]

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('Admin@1234', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@mamuntechschool.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@mamuntechschool.com',
      password: hashedPassword,
      role: 'ADMIN',
    }
  })
  console.log('✅ Admin user created:', admin.email)

  // Create demo student
  const studentPassword = await bcrypt.hash('Student@1234', 12)
  const student = await prisma.user.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      name: 'Demo Student',
      email: 'student@example.com',
      password: studentPassword,
      role: 'STUDENT',
    }
  })
  console.log('✅ Demo student created:', student.email)

  // Create courses
  for (const course of courses) {
    const created = await prisma.course.upsert({
      where: { slug: course.slug },
      update: {},
      create: course
    })
    console.log('✅ Course created:', created.title)
  }

  // Create blog posts
  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: post
    })
    console.log('✅ Blog post created:', post.title)
  }

  // Create testimonials
  await prisma.testimonial.deleteMany()
  for (const testimonial of testimonials) {
    await prisma.testimonial.create({ data: testimonial })
    console.log('✅ Testimonial created:', testimonial.name)
  }

  console.log('🎉 Seeding completed successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
