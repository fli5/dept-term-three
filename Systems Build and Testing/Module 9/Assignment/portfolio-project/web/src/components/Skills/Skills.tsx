import React from 'react';
import { Settings } from 'lucide-react';
import './Skills.scss';
import { SkillsData } from './Skills.types';
import { Label, Card } from '@fli5/react-library';

export const Skills: React.FC<SkillsData> = ({
  description,
  languages,
  frameworks,
  tools,
}) => {
  return (
    <section className="skills-section">
      <div className="skills-section-header">
        <Settings size={32} color="#2563eb" />
        <h2 className="skills-section-title">Skills & Expertise</h2>
      </div>

      <Card
        title="Professional Summary"
        content={description}
        backgroundColor="#fef3c7"
      />

      <div className="skills-grid">
        <div>
          <h3 className="skills-category-title">Languages</h3>
          <div className="skills-list">
            {languages.map((lang, idx) => (
              <Label
                key={idx}
                text={lang}
                backgroundColor="#dbeafe"
                color="#1e40af"
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="skills-category-title">Frameworks</h3>
          <div className="skills-list">
            {frameworks.map((fw, idx) => (
              <Label
                key={idx}
                text={fw}
                backgroundColor="#e9d5ff"
                color="#6b21a8"
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="skills-category-title">Tools</h3>
          <div className="skills-list">
            {tools.map((tool, idx) => (
              <Label
                key={idx}
                text={tool}
                backgroundColor="#d1fae5"
                color="#065f46"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
