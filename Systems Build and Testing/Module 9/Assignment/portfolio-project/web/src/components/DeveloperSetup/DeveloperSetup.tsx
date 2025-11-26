import React from 'react';
import { Terminal } from 'lucide-react';
import './DeveloperSetup.scss';
import { DevSetupData } from './DeveloperSetup.types';
import { Table } from '@fli5/react-library';

export const DeveloperSetup: React.FC<DevSetupData> = ({
  vscode,
  terminal,
  font,
}) => {
  return (
    <section className="dev-setup-section">
      <div className="dev-setup-section-header">
        <Terminal size={32} color="#2563eb" />
        <h2 className="dev-setup-section-title">Developer Setup</h2>
      </div>

      <div className="dev-setup-content">
        <div>
          <h3 className="dev-setup-subsection-title">VS Code Configuration</h3>
          <Table
            headers={['Setting', 'Value']}
            rows={[
              ['Theme', vscode.theme],
              ['Extensions', vscode.extensions],
              ['Settings', vscode.settings],
            ]}
            caption="My VS Code Setup"
          />
        </div>

        <div>
          <h3 className="dev-setup-subsection-title">Terminal Setup</h3>
          <Table
            headers={['Component', 'Configuration']}
            rows={[
              ['Shell', terminal.shell],
              ['Theme', terminal.theme],
              ['Plugins', terminal.plugins],
            ]}
          />
        </div>

        <div>
          <h3 className="dev-setup-subsection-title">Preferred Editor Font</h3>
          <Table
            headers={['Property', 'Value']}
            rows={[
              ['Font Family', font.name],
              ['Font Size', font.size],
              ['Ligatures', font.ligatures],
            ]}
            footer={['Total Settings', '3']}
            backgroundColor="#f9fafb"
          />
        </div>
      </div>
    </section>
  );
};
