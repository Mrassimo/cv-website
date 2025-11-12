import type { Project, SkillCategory, Experience } from './types';
import {
  SnowflakeIcon, AWSIcon, DbtIcon, AirflowIcon, PolarsIcon, PythonIcon, SQLIcon,
  LangchainIcon, RAGIcon, TensorflowIcon, LookerIcon, TableauIcon, PowerBIIcon,
  AgileIcon, JiraIcon, GitIcon, DockerIcon, VercelIcon, SupabaseIcon, CanvaIcon,
  LlmBiIcon, GeocodingIcon, AhgdIcon, HcfIcon, WestpacIcon, MedibankIcon, CbaIcon, NdiaIcon
} from './components/ui/Icons';

export const PERSONAL_INFO = {
  name: "Massimo Raso",
  title: "Senior Analytics Engineer",
  location: "Sydney, Australia",
  citizen: "Australian Citizen",
  email: "massimoraso2@gmail.com",
  linkedin: "https://linkedin.com/in/massimoraso",
  github: "https://github.com/Mrassimo",
};

export const SECTIONS = [
  { id: 'home', title: 'Home' },
  { id: 'about', title: 'Who I Am' },
  { id: 'aspirations', title: 'Aspirations' },
  { id: 'projects', title: 'Key Projects' },
  { id: 'skills', title: 'Skills' },
  { id: 'experience', title: 'Experience' },
  { id: 'personal', title: 'Personal' },
  { id: 'contact', title: 'Contact' },
];

export const PROJECTS: Project[] = [
  {
    id: 'llm-bi',
    title: 'LLM-Native Business Intelligence Platform',
    impact: [
      'Enabled non-technical stakeholders to get answers from data without SQL, accelerating business insights from hours to minutes.',
      'Presented to 100+ stakeholders, demonstrating LLM-native reporting potential.',
      'Processed 50,000+ lines of business logic into semantic models for LLM consumption.'
    ],
    tech: ['RAG', 'Vector Embeddings', 'Semantic Data Models', 'Python', 'Secure Offline Architecture'],
    github: undefined,
    visual: LlmBiIcon,
  },
  {
    id: 'geocoding',
    title: 'Enterprise Data Quality & Geocoding Platform',
    impact: [
      'Enabled $2M+ in network expansion projects by transforming unreliable address data.',
      'Achieved a 92.4% match rate on complex Australian address data.',
      'Built a reusable geocoding solution for 3M+ customer records.'
    ],
    tech: ['Fuzzy Matching', 'Jaro-Winkler', 'Data Cleansing', 'Python', 'Type 2 SCD'],
    github: undefined,
    visual: GeocodingIcon,
  },
  {
    id: 'ahgd',
    title: 'Australian Health Geography Data (AHGD) Repository',
    impact: [
      'Democratised access to national-scale health analytics for non-technical stakeholders.',
      'Translated complex government data into intuitive, analysis-ready formats.',
      'Ensured business-grade data quality with a multi-layered validation framework.'
    ],
    tech: ['dlt', 'dbt', 'Airflow', 'DuckDB', 'Polars', 'Pydantic'],
    github: 'https://github.com/Mrassimo/ahgd',
    visual: AhgdIcon,
  }
];

export const SKILLS: SkillCategory[] = [
    {
        category: 'Modern Data Stack',
        skills: [
            { name: 'Snowflake', icon: SnowflakeIcon },
            { name: 'AWS', icon: AWSIcon },
            { name: 'dbt', icon: DbtIcon },
            { name: 'Airflow', icon: AirflowIcon },
            { name: 'Polars/Pandas', icon: PolarsIcon },
            { name: 'Python', icon: PythonIcon },
            { name: 'SQL', icon: SQLIcon },
        ]
    },
    {
        category: 'AI & LLM Engineering',
        skills: [
            { name: 'LangChain', icon: LangchainIcon },
            { name: 'RAG', icon: RAGIcon },
            { name: 'TensorFlow', icon: TensorflowIcon },
            { name: 'Vector DBs', icon: VercelIcon }, // Placeholder
            { name: 'Semantic Search', icon: SupabaseIcon }, // Placeholder
        ]
    },
    {
        category: 'Analytics Engineering',
        skills: [
            { name: 'Semantic Models', icon: DbtIcon },
            { name: 'Data Pipelines', icon: AirflowIcon },
            { name: 'A/B Testing', icon: AgileIcon },
            { name: 'BI Modernisation', icon: LookerIcon },
        ]
    },
    {
        category: 'Business Intelligence',
        skills: [
            { name: 'Looker', icon: LookerIcon },
            { name: 'Tableau', icon: TableauIcon },
            { name: 'PowerBI', icon: PowerBIIcon },
        ]
    },
    {
        category: 'Leadership & Tools',
        skills: [
            { name: 'Agile', icon: AgileIcon },
            { name: 'JIRA', icon: JiraIcon },
            { name: 'Git', icon: GitIcon },
            { name: 'Docker', icon: DockerIcon },
            { name: 'Vercel', icon: VercelIcon },
            { name: 'Canva', icon: CanvaIcon },
        ]
    }
];

export const EXPERIENCES: Experience[] = [
  {
    role: 'Senior Business Insights Analyst - Analytics Engineering',
    company: 'HCF',
    period: 'Oct 2024 - Present',
    location: 'Sydney, NSW',
    points: [
      'Translated 3M+ customer records into business-friendly geographic intelligence.',
      'Enabled 100+ product teams with cloud-native AWS frameworks, reducing ad-hoc requests by 20%.',
      'Led Snowflake optimisation achieving 400% performance improvement.',
      'Mentored data team members in Al adoption, RAG implementation, and prompt engineering.'
    ],
    logo: HcfIcon,
  },
  {
    role: 'Financial Crime Consultant (Technical Data Analyst)',
    company: 'Westpac Group',
    period: 'Oct 2022 - Jul 2024',
    location: 'Sydney, NSW',
    points: [
      'Pioneered natural language business querying through a secure RAG/LLM platform.',
      'Improved detection accuracy by 30% with Al-assisted querying for real-time business insights.',
      'Achieved 35% reduction in data processing time through advanced SQL optimisation.',
      'Reduced code complexity by 65% with modular architecture patterns.'
    ],
    logo: WestpacIcon,
  },
  {
    role: 'Senior Reporting Analyst (Technical Data Analyst)',
    company: 'Medibank Private',
    period: 'Feb 2022 - Oct 2022',
    location: 'Remote',
    points: [
      'Achieved 99% performance improvement on a critical reporting suite (6 hours to 3 minutes).',
      'Ensured 100% data integrity by implementing automated validation frameworks.',
      'Reduced manual processing by 20+ hours weekly with real-time data models.'
    ],
    logo: MedibankIcon,
  },
  {
    role: 'Senior Data Specialist (Data Modelling Focus)',
    company: 'Commonwealth Bank',
    period: 'Sep 2020 - Nov 2021',
    location: 'Sydney, NSW',
    points: [
      'Managed petabyte-scale Teradata to cloud migration with zero data loss.',
      'Redesigned ETL processes for modern data architecture.',
      'Designed integration solutions bridging legacy systems with cloud platforms.'
    ],
    logo: CbaIcon,
  },
  {
    role: 'Data Analyst + BI Reporting Analyst Lead',
    company: 'NDIA',
    period: 'Mar 2017 - Sep 2020',
    location: 'Sydney, NSW',
    points: [
      'Led and mentored 2 analysts in programming and data analytics.',
      'Improved reporting speed by 60% through data pipeline automation.',
      'Received 2 awards for technical innovation and coding efficiency.'
    ],
    logo: NdiaIcon,
  }
];

export const getFullPortfolioText = (): string => {
  const info = `
    Name: ${PERSONAL_INFO.name}
    Title: ${PERSONAL_INFO.title}
    Location: ${PERSONAL_INFO.location}
    Citizenship: ${PERSONAL_INFO.citizen}
  `;

  const projects = PROJECTS.map(p => `
    Project: ${p.title}
    Impact: ${p.impact.join('; ')}
    Technologies: ${p.tech.join(', ')}
  `).join('\n');

  const skills = SKILLS.map(s => `
    Skill Category: ${s.category}
    Skills: ${s.skills.map(skill => skill.name).join(', ')}
  `).join('\n');

  const experiences = EXPERIENCES.map(e => `
    Role: ${e.role} at ${e.company} (${e.period})
    Highlights: ${e.points.join('; ')}
  `).join('\n');

  return `This is the portfolio of Massimo Raso.
--- PERSONAL INFO ---
${info}
--- KEY PROJECTS ---
${projects}
--- SKILLS & TECHNOLOGIES ---
${skills}
--- PROFESSIONAL EXPERIENCE ---
${experiences}
  `;
};
