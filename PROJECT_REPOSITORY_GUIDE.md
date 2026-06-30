# Project Repository System

## Overview
This system uses a JSON file (`/src/data/projects.json`) as a data repository combined with localStorage for persistence.

## How It Works

### Data Flow
1. **Initial Load**: On first visit, the app reads from `/src/data/projects.json`
2. **Runtime**: All project data is stored in browser's `localStorage`
3. **Persistence**: Changes persist across page refreshes via localStorage
4. **Export**: You can download updated data back to a JSON file

### Key Files

**`/src/data/projects.json`**
- Initial project data repository
- Contains: Project name, description, TUNA ID, status, progress %, priority, team, tech stack

**`/src/utils/projectRepository.ts`**
- Repository class with all CRUD operations
- Manages localStorage persistence
- Provides export/download functionality

### Using the Repository

```typescript
import { projectRepository } from '../utils/projectRepository';

// Get all projects
const projects = projectRepository.getAllProjects();

// Add new project
const newProject = projectRepository.addProject({
  tunaId: 'TUNA-1234',
  name: 'Java 11 → 17 Migration',
  description: 'Upgrading core services to Java 17',
  module: 'Core Services',
  progress: 0,
  status: 'In Progress',
  priority: 'High',
  createdDate: '2026-03-01',
  team: 'Platform Engineering',
  targetTech: 'Java 17',
  sourceTech: 'Java 11'
});

// Update project
projectRepository.updateProject(1, { 
  progress: 85,
  status: 'Review' 
});

// Delete project
projectRepository.deleteProject(1);

// Search projects
const results = projectRepository.searchProjects('java');

// Get statistics
const stats = projectRepository.getStats();
```

### Exporting Data

**Option 1: Download Button**
- Click the 💾 icon in the AAF Migration Expert dashboard header
- This downloads a `projects.json` file with current data
- You can replace `/src/data/projects.json` with this file if needed

**Option 2: Programmatic Export**
```typescript
import { projectRepository } from '../utils/projectRepository';

// Get JSON string
const jsonData = projectRepository.exportToJSON();

// Download file
projectRepository.downloadProjectsJSON();
```

### Data Persistence

**localStorage Key**: `aaf_projects`

The data structure stored:
```json
{
  "projects": [
    {
      "id": 1,
      "tunaId": "TUNA-4521",
      "name": "Java 8 → 17 Migration",
      "description": "Upgrading Core Banking API...",
      "module": "Core Banking API",
      "progress": 78,
      "status": "In Progress",
      "priority": "High",
      "createdDate": "2026-02-15",
      "team": "Platform Engineering",
      "targetTech": "Java 17",
      "sourceTech": "Java 8"
    }
  ],
  "lastUpdated": "2026-03-01T12:00:00Z"
}
```

### Reset to Initial Data

To clear localStorage and reload from the original JSON:
```typescript
projectRepository.reset();
```

## Integration with Create Project

When creating a new project in the Create_Project page, integrate like this:

```typescript
import { projectRepository } from '../utils/projectRepository';
import { useNavigate } from 'react-router';

// Inside your component
const navigate = useNavigate();

const handleCreateProject = () => {
  const newProject = projectRepository.addProject({
    tunaId: selectedTunaId,
    name: projectName,
    description: projectDescription,
    module: moduleName,
    progress: 0,
    status: 'In Progress',
    priority: selectedPriority,
    createdDate: new Date().toISOString().split('T')[0],
    team: teamName,
    targetTech: targetTechnology,
    sourceTech: sourceTechnology
  });

  // Navigate back to dashboard
  navigate('/aaf-migration-expert');
};
```

## Benefits

✅ **No Backend Required**: Works entirely in the browser
✅ **Persistent**: Data survives page refreshes  
✅ **Exportable**: Download data as JSON anytime
✅ **Type-Safe**: Full TypeScript support
✅ **Easy to Use**: Simple API for all operations
✅ **Testable**: Clear separation of concerns

## Notes

- Browser localStorage has a ~5-10MB limit (plenty for project data)
- Data is scoped to the origin (domain)
- Clearing browser data will reset to initial JSON
- For production, replace with a real database backend
