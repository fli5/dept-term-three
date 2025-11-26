export interface DevSetupData {
  vscode: {
    theme: string;
    extensions: string;
    settings: string;
  };
  terminal: {
    shell: string;
    theme: string;
    plugins: string;
  };
  font: {
    name: string;
    size: string;
    ligatures: string;
  };
}
