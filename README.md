# CD Status Tracker

This GitHub Action tracks deployment status per environment and writes a metadata file for visibility and auditing — similar to what Atlassian Bamboo offers.

## Inputs

- `environment` (required): Name of the deployment environment.
- `version` (required): Deployment version or tag.
- `output-path` (optional): File path to store deployment metadata.

## Outputs

- `deployment-info`: A JSON string of deployment details.

## Example

```yaml
- name: Track deployment
  uses: your-username/cd-status-tracker@v1
  with:
    environment: production
    version: ${{ github.sha }}
```

This action updates or creates a JSON file like:

```json
{
  "production": {
    "environment": "production",
    "version": "abc123",
    "deployedBy": "octocat",
    "timestamp": "2025-04-11T12:34:56Z",
    "repo": "my-repo",
    "owner": "my-org",
    "sha": "abc123"
  }
}
```