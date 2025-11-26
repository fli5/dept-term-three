import React from 'react';
import './BasicInformation.scss';
import { BasicInfoData } from './BasicInformation.types';
import { Label, Card, HeroImage } from '@fli5/react-library';

export const BasicInformation: React.FC<BasicInfoData> = ({
  name,
  title,
  email,
  location,
  bio,
  heroImage,
}) => {
  return (
    <section className="basic-info-section">
      <HeroImage
        src={heroImage}
        alt="Developer workspace"
        title={name}
        subtitle={title}
        height="400px"
      />
      <div className="basic-info-hero-content">
        <Card title="About Me" content={bio} backgroundColor="#f0f9ff" />
        <div className="basic-info-labels">
          <Label text={`📧 ${email}`} />
          <Label text={`📍 ${location}`} />
        </div>
      </div>
    </section>
  );
};
