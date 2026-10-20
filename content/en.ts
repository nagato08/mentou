import type { SiteContent } from "./types";

const CENTER = "1765 Taschereau Boulevard";

const en: SiteContent = {
  labels: {
    services: "Services",
    subjects: "Subjects",
    regions: "Areas",
    pricing: "Pricing",
    about: "About",
    seeAll: "See all",
    learnMore: "Learn more",
    faqTitle: "Frequently asked questions",
    relatedTitle: "You may also like",
    ctaTitle: "Ready to get started?",
    ctaBody: "Choose your plan and book your hours online. We will then contact you to schedule the sessions.",
    ctaButton: "Request a tutor",
    center: "Our centre",
    centerAddress: CENTER,
    centerBody: "In-person sessions take place at your home or at our centre on Taschereau Boulevard.",
    regionsHome: "Serving the South Shore",
    regionsHomeBody: "In-home and in-centre tutoring in Longueuil, Brossard, Candiac, Saint-Constant and throughout Montérégie. Online everywhere in Québec.",
    monteregie: "All of Montérégie",
    breadcrumbHome: "Home",
  },

  hubs: {
    services: {
      metaTitle: "Our tutoring services",
      metaDescription: "Academic tutoring, personal development, in-home, in-centre or online tutoring, and preparation for ministry exams and the EUF.",
      kicker: "Services",
      title: "Complete support, from subjects to confidence",
      intro: "Choose the service that fits your child's needs. All of our services can be combined.",
    },
    subjects: {
      metaTitle: "Subjects taught in high school and CEGEP",
      metaDescription: "Tutoring in math, science, physics, chemistry, programming and French, from Secondary 1 to CEGEP, regular and enriched profiles.",
      kicker: "Subjects",
      title: "The subjects we teach",
      intro: "From Secondary 1 to 5, regular and enriched profiles, up to CEGEP science and French courses.",
    },
    regions: {
      metaTitle: "Tutoring on the South Shore and in Montérégie",
      metaDescription: "In-home and in-centre tutoring in Longueuil, Brossard, Candiac, Saint-Constant and throughout Montérégie. Online tutoring everywhere in Québec.",
      kicker: "Areas served",
      title: "Tutoring on the South Shore and throughout Montérégie",
      intro: "Our tutors come to your home on the South Shore and welcome students at our centre. For the rest of Québec, online tutoring is available.",
    },
    pricing: {
      metaTitle: "Tutoring pricing",
      metaDescription: "Monthly plan at $500 (12 h per week in person), in-person tutoring at $45 per hour and online tutoring at $30 per hour.",
      kicker: "Pricing",
      title: "Clear pricing, no surprises",
      intro: "Three simple plans. Hours are booked and paid for securely online.",
    },
  },

  services: [
    {
      slug: "tutorat-scolaire",
      label: "Academic tutoring",
      summary: "Personalized support in the subjects where your child needs help.",
      metaTitle: "Academic tutoring for high school and CEGEP",
      metaDescription: "Personalized academic tutoring from Secondary 1 to CEGEP: homework help, understanding concepts, catch-up and study methods.",
      kicker: "Services",
      title: "Personalized academic tutoring",
      intro: "A tutor who follows your child's curriculum, fills the gaps and helps them take back control of their grades.",
      image: "/images/tutorat.jpeg",
      imageAlt: "Student doing homework with notebooks and a laptop",
      highlights: ["Secondary 1 to 5 and CEGEP", "Regular and enriched profiles", "At home, at the centre or online"],
      sections: [
        {
          title: "What we work on together",
          items: [
            "Homework help and understanding concepts seen in class",
            "Catch-up after a difficult term",
            "Exam and test preparation",
            "Study methods, note-taking and organization",
          ],
        },
        {
          title: "A plan tailored to each student",
          body: "At first contact, we review your child's difficulties, goals and schedule. The tutor then builds a work plan that follows the school curriculum and adjusts over the sessions.",
        },
        {
          title: "Who is it for?",
          items: [
            "Students whose grades are slipping or who failed a term",
            "Students aiming for the enriched profile or a selective program",
            "CEGEP students stuck on a science or French course",
          ],
        },
      ],
      faq: [
        { q: "How many sessions before we see progress?", a: "It depends on the student and their gaps. Regular weekly support usually gives the best results. The monthly plan (12 hours per week) is designed for that." },
        { q: "Does the tutor follow the school curriculum?", a: "Yes. The tutor works from the concepts seen in class, your child's homework and upcoming tests." },
      ],
    },
    {
      slug: "developpement-personnel",
      label: "Personal development",
      summary: "Confidence, discipline and leadership to succeed at school and beyond.",
      metaTitle: "Personal development for teens",
      metaDescription: "Personal development coaching for young people: self-confidence, discipline, organization, public speaking and leadership.",
      kicker: "Services",
      title: "Personal development: confidence, discipline, leadership",
      intro: "Good grades are not enough. We also help young people believe in themselves, get organized and find their place.",
      image: "/images/mentorat.jpeg",
      imageAlt: "Young people working together in front of a whiteboard",
      highlights: ["Self-confidence", "Discipline and organization", "Public speaking and leadership"],
      sections: [
        {
          title: "The skills we build",
          items: [
            "Self-confidence and self-esteem",
            "Discipline, time management and work organization",
            "Public speaking and communication",
            "Leadership, independence and responsibility",
          ],
        },
        {
          title: "Built into tutoring",
          body: "Personal development is part of our support. During sessions, the tutor helps the student set goals, keep commitments and manage exam stress. The monthly plan combines academic tutoring and personal development.",
        },
        {
          title: "Signs they need it",
          items: [
            "They get discouraged quickly or say they are \"not good\"",
            "They leave everything to the last minute",
            "They don't dare ask questions or speak up in class",
          ],
        },
      ],
      faq: [
        { q: "Is personal development offered separately?", a: "It is built into our support, especially in the monthly plan. Tell us about your needs and we will adapt the sessions." },
        { q: "From what age?", a: "We support high school and CEGEP students." },
      ],
    },
    {
      slug: "tutorat-a-domicile",
      label: "In-home and in-centre",
      summary: "In-person sessions at your home or at our centre on Taschereau Boulevard.",
      metaTitle: "In-home tutoring on the South Shore",
      metaDescription: "In-person tutoring at home in Longueuil, Brossard, Candiac, Saint-Constant and Montérégie, or at our centre at 1765 Taschereau Boulevard.",
      kicker: "Services",
      title: "In-home and in-centre tutoring",
      intro: "A tutor by your child's side, at home or at our centre. The ideal format for students who need structure.",
      image: "/images/junior.jpg",
      imageAlt: "Student working on a tablet during a session",
      highlights: ["$45 per hour", "$500 monthly plan", "South Shore and Montérégie"],
      sections: [
        {
          title: "Two in-person options",
          items: [
            "At home: the tutor comes to you, on the South Shore and in Montérégie",
            `At our centre: ${CENTER}, a calm space for studying`,
          ],
        },
        {
          title: "Why in person?",
          body: "Having a tutor present helps the student stay focused, get organized and keep up the pace. It is often the most effective format for a student who is falling behind or lacks motivation.",
        },
        {
          title: "Cities served",
          items: ["Longueuil", "Brossard", "Candiac", "Saint-Constant", "Throughout Montérégie"],
        },
      ],
      faq: [
        { q: "What is the in-person rate?", a: "$45 per hour, or $500 per month for the monthly plan, which includes 12 hours per week. Taxes extra." },
        { q: "My address is outside these cities. Is it possible?", a: "We cover all of Montérégie. Enter your address in the form and we will confirm the options. Online tutoring is available everywhere in Québec." },
      ],
    },
    {
      slug: "tutorat-en-ligne",
      label: "Online tutoring",
      summary: "Video sessions anywhere in Québec, at $30 per hour.",
      metaTitle: "Online tutoring everywhere in Québec",
      metaDescription: "Online video tutoring for high school and CEGEP, anywhere in Québec, at $30 per hour.",
      kicker: "Services",
      title: "Online tutoring, everywhere in Québec",
      intro: "The same quality of support as in person, with no travel and more flexible hours.",
      image: "/images/tutorat1.jpeg",
      imageAlt: "Student in an online tutoring session",
      highlights: ["$30 per hour", "Everywhere in Québec", "Flexible hours"],
      sections: [
        {
          title: "How it works",
          items: [
            "Video sessions with screen sharing",
            "Working on the student's exercises, homework and exams",
            "A computer or tablet with an internet connection is all you need",
          ],
        },
        {
          title: "Ideal for",
          items: [
            "Families outside the South Shore",
            "Busy schedules (sports, work, commuting)",
            "Independent CEGEP students who want targeted help",
          ],
        },
      ],
      faq: [
        { q: "Is online tutoring as effective?", a: "For most students, yes, especially from Secondary 3 and at CEGEP. For students who struggle to focus, we recommend in-person sessions." },
        { q: "What equipment is needed?", a: "A computer or tablet with a camera, microphone and internet connection." },
      ],
    },
    {
      slug: "preparation-examens",
      label: "Exam preparation",
      summary: "Ministry exams in Secondary 4 and 5 and the uniform French exam at CEGEP.",
      metaTitle: "Ministry exam and EUF preparation",
      metaDescription: "Preparation for Secondary 4 and 5 ministry exams, regular and enriched profiles, and for the uniform French exam (EUF) at CEGEP.",
      kicker: "Services",
      title: "Ministry exam and EUF preparation",
      intro: "Year-end exams weigh heavily in the final grade. Targeted preparation makes the difference.",
      image: "/images/lecture.jpeg",
      imageAlt: "Stack of books on a study desk",
      highlights: ["Secondary 4 and 5", "Regular and enriched", "EUF at CEGEP"],
      sections: [
        {
          title: "Ministry exams, Secondary 4 and 5",
          body: "We prepare students for ministry exams in regular and enriched profiles: review of key concepts, exam-style exercises and time management.",
        },
        {
          title: "Uniform French exam (EUF)",
          body: "At CEGEP, the EUF is required to obtain the college diploma (DEC). We work on analysis, critical essay structure and language quality.",
        },
        {
          title: "Our method",
          items: [
            "Assessment of strengths and gaps",
            "Review plan spread over the weeks before the exam",
            "Practice exams in real conditions",
            "Stress management strategies",
          ],
        },
      ],
      faq: [
        { q: "When should preparation start?", a: "Ideally several weeks before the exam, to review without pressure. But it is never too late for an intensive review." },
      ],
    },
  ],

  subjects: [
    {
      slug: "mathematiques",
      label: "Math",
      summary: "From Secondary 1 to integral calculus, regular and enriched profiles.",
      metaTitle: "Math tutor, high school and CEGEP",
      metaDescription: "Math tutoring from Secondary 1 to 5 (regular and enriched), ministry exams, differential and integral calculus, linear algebra, probability and statistics.",
      kicker: "Subjects",
      title: "Math tutoring",
      intro: "Math is the subject where gaps build up fastest. A tutor spots and fills them before they block what comes next.",
      image: "/images/tutorat.jpeg",
      imageAlt: "Student doing math exercises",
      highlights: ["Regular and enriched", "Ministry exams", "CEGEP courses"],
      sections: [
        { title: "High school (Secondary 1 to 5)", items: ["Math, regular profile", "Math, enriched profile", "Secondary 4 and 5 ministry exam preparation"] },
        { title: "CEGEP", items: ["Differential calculus", "Integral calculus", "Linear algebra", "Probability and statistics"] },
      ],
      faq: [
        { q: "My child wants to move to the enriched profile. Can you help?", a: "Yes. We work on more advanced concepts and problem-solving methods to help them succeed in enriched math." },
      ],
    },
    {
      slug: "sciences",
      label: "Science",
      summary: "High school science, regular and enriched, and cell biology at CEGEP.",
      metaTitle: "Science tutor, high school and CEGEP",
      metaDescription: "Science tutoring from Secondary 1 to 5, regular and enriched profiles, ministry exam preparation and cell biology at CEGEP.",
      kicker: "Subjects",
      title: "Science tutoring",
      intro: "Understanding rather than memorizing: we help students connect theory, labs and problems.",
      image: "/images/mentorat.jpeg",
      imageAlt: "Young people working together on a project",
      highlights: ["Regular and enriched", "Ministry exams", "Cell biology"],
      sections: [
        { title: "High school (Secondary 1 to 5)", items: ["Science, regular profile", "Science, enriched profile", "Secondary 4 ministry exam preparation"] },
        { title: "CEGEP", items: ["Cell biology"] },
      ],
      faq: [
        { q: "Do you help with lab reports?", a: "Yes, we help students understand the process and structure their reports, without doing the work for them." },
      ],
    },
    {
      slug: "physique",
      label: "Physics",
      summary: "High school physics and CEGEP natural science physics courses.",
      metaTitle: "Physics tutor, high school and CEGEP",
      metaDescription: "Physics tutoring in high school and CEGEP: mechanics, electricity and magnetism, waves and modern physics.",
      kicker: "Subjects",
      title: "Physics tutoring",
      intro: "Physics requires both solid math foundations and a good understanding of phenomena. We work on both.",
      image: "/images/tutorat1.jpeg",
      imageAlt: "Tutoring session in front of a screen",
      highlights: ["High school", "Mechanics", "Electricity and magnetism"],
      sections: [
        { title: "High school", items: ["Physics"] },
        { title: "CEGEP", items: ["Mechanics", "Electricity and magnetism", "Waves and modern physics"] },
      ],
      faq: [
        { q: "My child is good at math but struggles with physics. Why?", a: "Physics requires translating a concrete problem into equations. It is a skill that can be learned, with clear problem-solving methods." },
      ],
    },
    {
      slug: "chimie",
      label: "Chemistry",
      summary: "General chemistry and solution chemistry at CEGEP.",
      metaTitle: "Chemistry tutor at CEGEP",
      metaDescription: "Chemistry tutoring at CEGEP: general chemistry and solution chemistry, in person on the South Shore or online.",
      kicker: "Subjects",
      title: "Chemistry tutoring",
      intro: "Stoichiometry, equilibria, solutions: we help students master natural science chemistry courses.",
      image: "/images/lecture.jpeg",
      imageAlt: "Books and study notes",
      highlights: ["General chemistry", "Solution chemistry", "CEGEP"],
      sections: [
        { title: "CEGEP", items: ["General chemistry", "Solution chemistry"] },
        { title: "Our approach", body: "We go back to basic concepts when needed, then practise many exam-style exercises to build speed and confidence." },
      ],
      faq: [
        { q: "Do you offer high school chemistry?", a: "Our chemistry offering targets CEGEP. For high school, see our science and physics services, or tell us about your needs." },
      ],
    },
    {
      slug: "programmation",
      label: "Programming",
      summary: "High school programming and programming in science at CEGEP.",
      metaTitle: "Programming tutor, high school and CEGEP",
      metaDescription: "Programming tutoring for high school students and the CEGEP programming in science course.",
      kicker: "Subjects",
      title: "Programming tutoring",
      intro: "Learning to think like a programmer: break down a problem, write clear code and find your own bugs.",
      image: "/images/tutorat1.jpeg",
      imageAlt: "Student in front of a computer",
      highlights: ["High school", "Programming in science", "Logic and problem solving"],
      sections: [
        { title: "High school", items: ["Programming"] },
        { title: "CEGEP", items: ["Programming in science"] },
      ],
      faq: [
        { q: "My child has never programmed. Is that a problem?", a: "No. We start from their level and move forward step by step." },
      ],
    },
    {
      slug: "francais",
      label: "French",
      summary: "High school French, CEGEP French 101, 102 and 103, and EUF preparation.",
      metaTitle: "French tutor, high school and CEGEP",
      metaDescription: "French tutoring from Secondary 1 to 5, ministry exams, CEGEP French 101, 102, 103 and uniform French exam preparation.",
      kicker: "Subjects",
      title: "French tutoring",
      intro: "Reading, writing, grammar, analysis: French affects every subject. We help students express themselves clearly and confidently.",
      image: "/images/lecture.jpeg",
      imageAlt: "Stack of books on a desk",
      highlights: ["Secondary 1 to 5", "French 101, 102, 103", "EUF preparation"],
      sections: [
        { title: "High school (Secondary 1 to 5)", items: ["French reading and writing", "Grammar and spelling", "Ministry exam preparation"] },
        { title: "CEGEP", items: ["French 101", "French 102", "French 103", "Uniform French exam (EUF) preparation"] },
      ],
      faq: [
        { q: "What is the EUF?", a: "The uniform French exam is required to obtain the college diploma (DEC). It is based on a critical essay." },
      ],
    },
  ],

  regions: [
    {
      slug: "longueuil",
      label: "Longueuil",
      summary: "In-home, in-centre and online tutoring in Longueuil.",
      metaTitle: "Tutor in Longueuil, high school and CEGEP",
      metaDescription: "In-home tutoring in Longueuil and at our centre at 1765 Taschereau Boulevard. Math, science, physics, chemistry, French, high school to CEGEP.",
      kicker: "Areas",
      title: "Tutoring in Longueuil",
      intro: "Live in Longueuil? Our tutors come to your home, or welcome your child at our Taschereau Boulevard centre.",
      image: "/images/junior.jpg",
      imageAlt: "Student in a tutoring session",
      highlights: ["In-home", "At the Taschereau Blvd centre", "High school and CEGEP"],
      sections: [
        {
          title: "Our services in Longueuil",
          items: [
            "In-home tutoring in every area of Longueuil",
            `Sessions at our centre, ${CENTER}`,
            "Online tutoring if you prefer to stay home",
          ],
        },
        {
          title: "For high school and CEGEP students",
          body: "We support students from Longueuil high schools and South Shore CEGEPs in math, science, physics, chemistry, programming and French.",
        },
      ],
      faq: [
        { q: "Where is your centre?", a: `At ${CENTER}. We confirm access details when scheduling sessions.` },
      ],
    },
    {
      slug: "brossard",
      label: "Brossard",
      summary: "In-home and online tutoring in Brossard, close to our centre.",
      metaTitle: "Tutor in Brossard, high school and CEGEP",
      metaDescription: "In-home tutoring in Brossard and at our centre on Taschereau Boulevard. Help in math, science, physics and French, high school to CEGEP.",
      kicker: "Areas",
      title: "Tutoring in Brossard",
      intro: "Brossard families can choose an in-home tutor or our nearby centre on Taschereau Boulevard.",
      image: "/images/tutorat.jpeg",
      imageAlt: "Student doing homework",
      highlights: ["In-home", "Centre nearby", "High school and CEGEP"],
      sections: [
        {
          title: "Our services in Brossard",
          items: ["In-home tutoring throughout Brossard", `Sessions at our centre, ${CENTER}`, "Online tutoring at $30 per hour"],
        },
        {
          title: "Exam preparation",
          body: "We prepare Brossard Secondary 4 and 5 students for ministry exams, in regular and enriched profiles.",
        },
      ],
      faq: [
        { q: "How much is an in-home tutor in Brossard?", a: "$45 per hour, or $500 per month with the monthly plan of 12 hours per week. Taxes extra." },
      ],
    },
    {
      slug: "candiac",
      label: "Candiac",
      summary: "In-home and online tutoring in Candiac.",
      metaTitle: "Tutor in Candiac, high school and CEGEP",
      metaDescription: "In-home tutoring in Candiac for high school and CEGEP students: math, science, physics, chemistry, programming and French.",
      kicker: "Areas",
      title: "Tutoring in Candiac",
      intro: "In Candiac, our tutors come to your home to support your child in their subjects and their confidence.",
      image: "/images/mentorat.jpeg",
      imageAlt: "Young people in a work session",
      highlights: ["In-home", "Online", "High school and CEGEP"],
      sections: [
        {
          title: "Our services in Candiac",
          items: ["In-home tutoring in Candiac", "Online tutoring for more flexibility", "Sessions possible at our Taschereau Boulevard centre"],
        },
        {
          title: "Complete support",
          body: "Beyond academic tutoring, we help Candiac youth build confidence, discipline and independence.",
        },
      ],
      faq: [
        { q: "Do tutors travel to Candiac?", a: "Yes, in-home tutoring is offered in Candiac. Enter your address in the request form." },
      ],
    },
    {
      slug: "saint-constant",
      label: "Saint-Constant",
      summary: "In-home and online tutoring in Saint-Constant.",
      metaTitle: "Tutor in Saint-Constant, high school and CEGEP",
      metaDescription: "In-home tutoring in Saint-Constant for high school and CEGEP: math, science, physics, chemistry and French. Online tutoring also available.",
      kicker: "Areas",
      title: "Tutoring in Saint-Constant",
      intro: "In Saint-Constant, get an in-home tutor or online sessions, depending on your schedule.",
      image: "/images/tutorat1.jpeg",
      imageAlt: "Online tutoring session",
      highlights: ["In-home", "Online", "High school and CEGEP"],
      sections: [
        {
          title: "Our services in Saint-Constant",
          items: ["In-home tutoring in Saint-Constant", "Online tutoring at $30 per hour", "Ministry exam and EUF preparation"],
        },
        {
          title: "Subjects taught",
          body: "Math (regular and enriched), science, physics, programming and French in high school, plus the main CEGEP natural science and French courses.",
        },
      ],
      faq: [
        { q: "Can we combine in-home and online?", a: "Yes. You can book in-person hours and online hours according to your needs." },
      ],
    },
  ],

  about: {
    slug: "a-propos",
    label: "About",
    summary: "Who we are and how we support students.",
    metaTitle: "About Mentou Academy",
    metaDescription: "Mentou Academy supports high school and CEGEP students with academic tutoring and personal development, on the South Shore and online.",
    kicker: "About",
    title: "Helping students succeed, and grow",
    intro: "Mentou Academy was born from a conviction: a student who regains confidence also improves their grades.",
    image: "/images/mentorat.jpeg",
    imageAlt: "Young people working together",
    highlights: ["Academic tutoring", "Personal development", "South Shore and online"],
    sections: [
      {
        title: "Our mission",
        body: "To support every high school and CEGEP student so they understand their subjects, become more independent and develop the confidence, discipline and leadership that will serve them for life.",
      },
      {
        title: "Our approach",
        items: [
          "Thoughtful matching between student and tutor",
          "A work plan that follows the school curriculum",
          "Personal development built into the sessions",
          "Regular updates for parents",
        ],
      },
      {
        title: "Where to find us",
        body: `Our centre is located at ${CENTER}. We also offer in-home tutoring in Longueuil, Brossard, Candiac, Saint-Constant and throughout Montérégie, and online tutoring everywhere in Québec.`,
      },
    ],
    faq: [],
  },
};

export default en;
