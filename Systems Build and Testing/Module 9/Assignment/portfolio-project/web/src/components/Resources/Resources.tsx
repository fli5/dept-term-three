import React from 'react';
import './Resources.scss';
import { ResourceItem } from './Resources.types';
import { Button, Card } from '@fli5/react-library';

interface ResourcesProps {
  resources: ResourceItem[];
}

export const Resources: React.FC<ResourcesProps> = ({ resources }) => {
  return (
    <section className="resources-section">
      <h2 className="resources-section-title">Helpful Resources</h2>
      <div className="resources-grid">
        {resources.map((resource, idx) => (
          <div key={idx} className="resources-item">
            <Card
              title={`${resource.icon} ${resource.title}`}
              content={resource.summary}
            />
            <div className="resources-button">
              <Button
                text="Visit Resource"
                backgroundColor="#10b981"
                onClick={() => window.open(resource.link, '_blank')}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
