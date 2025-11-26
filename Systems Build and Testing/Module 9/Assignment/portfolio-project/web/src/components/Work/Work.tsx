import React from 'react';
import { Code } from 'lucide-react';
import './Work.scss';
import { WorkItem } from './Work.types';
import { Label, Button, Card, Img } from '@fli5/react-library';

interface WorkProps {
  works: WorkItem[];
}

export const Work: React.FC<WorkProps> = ({ works }) => {
  return (
    <section className="work-section">
      <div className="work-section-header">
        <Code size={32} color="#2563eb" />
        <h2 className="work-section-title">Featured Work</h2>
      </div>
      <div className="work-grid">
        {works.map((work, idx) => (
          <div key={idx} className="work-item">
            <Img
              src={work.image}
              alt={work.title}
              width="100%"
              height="200px"
            />
            <Card title={work.title} content={work.description} />
            <div className="work-tech-list">
              {work.techList.map((tech, i) => (
                <Label key={i} text={tech} />
              ))}
            </div>
            <Button
              text="View Project →"
              onClick={() => window.open(work.link, '_blank')}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
