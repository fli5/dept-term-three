import './App.scss';
import { Dropdown, Text } from '@fli5/react-library';
import React, { useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { BasicInformation } from './components/BasicInformation/BasicInformation';
import { Work } from './components/Work/Work';
import { Skills } from './components/Skills/Skills';
import { Resources } from './components/Resources/Resources';
import { DeveloperSetup } from './components/DeveloperSetup/DeveloperSetup';

const App: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const sectionOptions = [
    { label: 'All Sections', value: 'all' },
    { label: 'Basic information', value: 'basic' },
    { label: 'Work', value: 'work' },
    { label: 'Skills', value: 'skills' },
    { label: 'Resources', value: 'resources' },
    { label: 'Developer Setup', value: 'setup' },
  ];

  const basicInfo = {
    name: 'Felix Li',
    title:
      'Full Stack Developer | Senior Backend Developer | Software Architect',
    email: 'fli5@academic.rrc.ca',
    location: 'Winnipeg, MB, Canada',
    bio: 'Passionate developer with 5+ years of experience building scalable web applications and distributed systems. I love creating elegant solutions to complex problems and am always eager to learn new technologies.',
    heroImage:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=400&fit=crop',
  };

  const works = [
    {
      title: 'Assignment 14: Building a Portfolio Website',
      description:
        'Build a portfolio website using a React component library that showcases completed coursework. The final deliverable is a dockerized Create React App with a Dockerfile.',
      image:
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop',
      link: 'https://github.com/fli5/portfolio-project',
      techList: ['ESLint', 'Prettier', 'React', 'Sass', 'Docker'],
    },
    {
      title: 'Assignment 13: UI Library Quality Assurance',
      description:
        'Implement QA tooling for a React UI library using Husky, ESLint, Prettier, lint-staged, and GitHub Actions. Ensures code quality and consistency with automated checks on commits and pull requests.',
      image:
        'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=400&fit=crop',
      link: 'https://github.com/fli5/code-quality-check',
      techList: ['ESLint', 'Prettier', 'Husky', 'GitHub Actions', 'Docker'],
    },
    {
      title: 'Assignment 12: React Library with Storybook',
      description:
        'Create a TypeScript-based React component library bundled with Rollup, tested using Jest and React Testing Library, styled with styled-components, and documented interactively via Storybook..',
      image:
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop',
      link: 'https://github.com/fli5/react-library',
      techList: ['Jest', 'StoryBook', 'Rollup', 'Styled-Components'],
    },
    {
      title: 'Assignment 11: Docker File',
      description:
        'Set up a Dockerized development environment using Create React App that displays a simple <h1> “Codin 1” website. Includes Dockerfile and README.md with instructions to run the app on localhost:7775.',
      image:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
      link: 'https://github.com/fli5/dockerized-react',
      techList: ['React', 'Docker', 'Node.js'],
    },
  ];

  const skills = {
    description:
      'I specialize in full-stack web development with a focus on creating performant, user-friendly applications. My expertise spans modern JavaScript frameworks, backend technologies, and cloud infrastructure.',
    languages: ['JavaScript', 'TypeScript', 'HTML', 'CSS'],
    frameworks: ['React', 'Node.js', 'Bootstrap', 'tailwind CSS'],
    tools: ['Git', 'Docker', 'GitHub', 'VSCode'],
  };

  const resources = [
    {
      title: 'MDN Web Docs',
      icon: '📚',
      summary:
        'Comprehensive web development documentation and learning resources for HTML, CSS, and JavaScript.',
      link: 'https://developer.mozilla.org',
    },
    {
      title: 'React Documentation',
      icon: '⚛️',
      summary:
        'Official React documentation with guides, API references, and best practices for building React applications.',
      link: 'https://react.dev',
    },
    {
      title: 'CSS-Tricks',
      icon: '🎨',
      summary:
        'Daily articles about CSS, HTML, JavaScript, and all things related to web design and development.',
      link: 'https://css-tricks.com',
    },
    {
      title: 'Stack Overflow',
      icon: '💡',
      summary:
        'Community-driven Q&A platform for programmers to find solutions and share knowledge.',
      link: 'https://stackoverflow.com',
    },
    {
      title: 'W3Schools',
      icon: '🌐',
      summary:
        'A comprehensive online platform offering tutorials, references, and interactive coding exercises for web development.',
      link: 'https://www.w3schools.com/',
    },
    {
      title: 'GeeksforGeeks',
      icon: '💻',
      summary:
        'GeeksforGeeks is a comprehensive platform for learning computer science, coding, and preparing for technical interviews.',
      link: 'https://www.geeksforgeeks.org/',
    },
  ];

  const devSetup = {
    vscode: {
      theme: 'One Dark Pro',
      extensions:
        'ESLint, Prettier, GitLens, Auto Rename Tag, Path Intellisense, Container Tools, Live Server',
      settings: 'Auto-save enabled, Format on save, Tab size: 2',
    },
    terminal: {
      shell: 'Zsh with Oh My Zsh',
      theme: 'Powerlevel10k',
      plugins: 'git, npm, docker, zsh-autosuggestions',
    },
    font: {
      name: 'Fira Code',
      size: '14px',
      ligatures: 'Enabled',
    },
  };

  const shouldShowSection = (section: string): boolean => {
    return selectedSection === 'all' || selectedSection === section;
  };

  return (
    <div className="portfolio-container">
      <header className="portfolio-header">
        <div className="portfolio-header-content">
          <h1 className="portfolio-title">FELIX'S PORTFOLIO</h1>
          <div className="portfolio-social">
            <a href="https://github.com/fli5">
              <Github size={24} />
            </a>
            <a href="http://www.linkedin.com/in/feng-li-felix">
              <Linkedin size={24} />
            </a>
            <a href="mailto:fli5@academic.rrc.ca">
              <Mail size={24} />
            </a>
          </div>
        </div>
      </header>

      <main className="portfolio-main">
        <div className="portfolio-filters">
          <div className="filter-dropdown">
            <Dropdown
              label="Navigate Portfolio"
              options={sectionOptions}
              value={selectedSection}
              onChange={setSelectedSection}
            />
          </div>
        </div>

        {shouldShowSection('basic') && <BasicInformation {...basicInfo} />}

        {shouldShowSection('work') && <Work works={works} />}

        {shouldShowSection('skills') && <Skills {...skills} />}

        {shouldShowSection('resources') && <Resources resources={resources} />}

        {shouldShowSection('setup') && <DeveloperSetup {...devSetup} />}
      </main>

      <footer className="portfolio-footer">
        <div className="portfolio-footer-content">
          <p className="footer-text">Built with React and custom components</p>
          <p className="footer-copyright">
            © 2025 {basicInfo.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
