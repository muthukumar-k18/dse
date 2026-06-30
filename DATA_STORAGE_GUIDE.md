# Data Storage Guide - Active Projects Information

## Where is the "Active Projects" data stored?

### 📦 Primary Data Source

**File**: `/src/data/projects.json`

This is the **initial data file** that contains the project information when the app first loads.

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
    // ... more projects
  ],
  "lastUpdated": "2026-03-01T10:30:00Z"
}
```

### 💾 Runtime Storage

**Location**: Browser's `localStorage`

**Key**: `aaf_projects`

When the app runs:
1. On first load, data is read from `/src/data/projects.json`
2. Data is stored in browser's localStorage
3. All subsequent operations (create, update, delete) work with localStorage
4. Data persists across page refreshes

### 🔧 Repository Management

**File**: `/src/utils/projectRepository.ts`

This file provides all CRUD operations:
- `getAllProjects()` - Get all projects
- `addProject()` - Add new project
- `updateProject()` - Update existing project
- `deleteProject()` - Delete project
- `getActiveProjects()` - Get only active projects
- `searchProjects()` - Search by keyword
- `downloadProjectsJSON()` - Export as JSON file

## Dashboard Display Locations

### 1. **AAFMigrationExpert_Dashboard.tsx** ✅ DYNAMIC
- **Line 47**: Stats card shows `activeProjects.length`
- **Line 156**: Subtitle shows `{activeProjects.length} active projects`
- **Line 38**: Loads data via `projectRepository.getAllProjects()`

### 2. **AAFUserPage.tsx** ✅ DYNAMIC
- **Line 40**: Stats card shows `activeProjects.length`
- **Line 146**: Subtitle shows `{activeProjects.length} active projects`
- **Line 36**: Loads data via `projectRepository.getAllProjects()`

### 3. **Create_Project.tsx** ✅ INTEGRATED
- **Line 3**: Imports projectRepository
- **Line 82**: Saves new projects via `projectRepository.addProject()`
- Creates new projects that automatically appear in dashboard

## The Numbers You See

### "12" or "123" = Number of Active Projects

This number comes from: **`activeProjects.length`**

Which is calculated from:
```typescript
const projects = projectRepository.getAllProjects();
setActiveProjects(projects);
```

### Initial State
- When you first load the app: Shows count from `/src/data/projects.json` (currently 4 projects)
- After creating projects: Shows count from `localStorage` (4 + newly created)

### Other Stats (Currently Static)

These are **hardcoded** and don't change:
- **Pipelines Running**: `'8'`
- **Success Rate**: `'94.2%'`
- **Code Analyzed**: `'2.4M'`

## How to Update Projects Data

### Option 1: Create Projects via UI
1. Click "New Migration" button
2. Fill out the form
3. Submit - automatically saved to localStorage
4. Count updates immediately on dashboard

### Option 2: Download Updated JSON
1. Click the 💾 icon in the dashboard header
2. Downloads current state as `projects.json`
3. Replace `/src/data/projects.json` if you want to update the initial data

### Option 3: Direct localStorage Edit
1. Open browser DevTools > Application > Local Storage
2. Find key: `aaf_projects`
3. Edit the JSON directly
4. Refresh page to see changes

## Data Flow Diagram

```
Initial Load:
projects.json → projectRepository → localStorage → Dashboard Display

Creating New Project:
Create Form → projectRepository.addProject() → localStorage → Dashboard Updates

Page Refresh:
localStorage → projectRepository → Dashboard Display
```

## Summary

**Q: Where is "12" stored?**
A: It's not stored as "12". It's calculated dynamically as `activeProjects.length` from the localStorage data.

**Q: Where do I update the initial data?**
A: `/src/data/projects.json`

**Q: Where is runtime data stored?**
A: Browser's `localStorage` under key `aaf_projects`

**Q: How do I export current data?**
A: Click the 💾 icon in the dashboard header

**Q: Which files show dynamic counts?**
A: 
- ✅ `/src/app/AAFMigrationExpert_Dashboard.tsx`
- ✅ `/src/app/AAFUserPage.tsx`
