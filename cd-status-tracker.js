// GitHub Action: cd-status-tracker
// Purpose: Emulate Bamboo's environment/version tracking by writing deployment metadata
// to a central status file or external API for audit and rollback support.

const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const path = require('path');

(async () => {
  try {
    const environment = core.getInput('environment');
    const version = core.getInput('version');
    const deployedBy = github.context.actor;
    const timestamp = new Date().toISOString();

    const deployInfo = {
      environment,
      version,
      deployedBy,
      timestamp,
      repo: github.context.repo.repo,
      owner: github.context.repo.owner,
      sha: github.context.sha
    };

    const outPath = core.getInput('output-path') || '.github/deployment-status.json';
    const fullPath = path.resolve(outPath);

    let data = {};
    if (fs.existsSync(fullPath)) {
      const raw = fs.readFileSync(fullPath);
      data = JSON.parse(raw);
    }

    data[environment] = deployInfo;

    fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
    core.setOutput("deployment-info", JSON.stringify(deployInfo));

    console.log(`Deployment info written to ${fullPath}`);
  } catch (error) {
    core.setFailed(`Action failed: ${error.message}`);
  }
})();