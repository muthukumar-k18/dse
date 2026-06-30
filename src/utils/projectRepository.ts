import projectsData from '../data/projects.json';

interface Project {
  id: number;
  remId: string;
  name: string;
  description: string;
  module: string;
  progress: number;
  status: string;
  priority: 'High' | 'Medium' | 'Low';
  createdDate: string;
  team: string;
  targetTech: string;
  sourceTech: string;
  pipelineType?: string;
}

interface ProjectsDatabase {
  projects: Project[];
  lastUpdated: string;
}

class ProjectRepository {
  private data: ProjectsDatabase;

  constructor() {
    // Load initial data from JSON
    this.data = {
      projects: [...projectsData.projects],
      lastUpdated: projectsData.lastUpdated
    };
    
    // Check if there's data in localStorage
    const storedData = localStorage.getItem('aaf_projects');
    if (storedData) {
      try {
        this.data = JSON.parse(storedData);
      } catch (e) {
        console.error('Failed to parse stored projects data', e);
      }
    }
  }

  /**
   * Get all projects
   */
  getAllProjects(): Project[] {
    return [...this.data.projects];
  }

  /**
   * Get project by ID
   */
  getProjectById(id: number): Project | undefined {
    return this.data.projects.find(p => p.id === id);
  }

  /**
   * Get project by REM ID
   */
  getProjectByRemId(remId: string): Project | undefined {
    return this.data.projects.find(p => p.remId === remId);
  }

  /**
   * Add new project
   */
  addProject(project: Omit<Project, 'id'>): Project {
    const newId = Math.max(...this.data.projects.map(p => p.id), 0) + 1;
    const newProject: Project = {
      ...project,
      id: newId,
    };
    
    this.data.projects.push(newProject);
    this.data.lastUpdated = new Date().toISOString();
    this.save();
    
    return newProject;
  }

  /**
   * Update existing project
   */
  updateProject(id: number, updates: Partial<Project>): Project | null {
    const index = this.data.projects.findIndex(p => p.id === id);
    if (index === -1) return null;

    this.data.projects[index] = {
      ...this.data.projects[index],
      ...updates,
      id: this.data.projects[index].id // Prevent ID change
    };
    
    this.data.lastUpdated = new Date().toISOString();
    this.save();
    
    return this.data.projects[index];
  }

  /**
   * Delete project
   */
  deleteProject(id: number): boolean {
    const index = this.data.projects.findIndex(p => p.id === id);
    if (index === -1) return false;

    this.data.projects.splice(index, 1);
    this.data.lastUpdated = new Date().toISOString();
    this.save();
    
    return true;
  }

  /**
   * Get projects by status
   */
  getProjectsByStatus(status: string): Project[] {
    return this.data.projects.filter(p => p.status === status);
  }

  /**
   * Get projects by priority
   */
  getProjectsByPriority(priority: 'High' | 'Medium' | 'Low'): Project[] {
    return this.data.projects.filter(p => p.priority === priority);
  }

  /**
   * Search projects
   */
  searchProjects(query: string): Project[] {
    const lowerQuery = query.toLowerCase();
    return this.data.projects.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.remId.toLowerCase().includes(lowerQuery) ||
      p.module.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Get statistics
   */
  getStats() {
    const total = this.data.projects.length;
    const inProgress = this.data.projects.filter(p => p.status === 'In Progress').length;
    const completed = this.data.projects.filter(p => p.status === 'Completed').length;
    const review = this.data.projects.filter(p => p.status === 'Review').length;
    
    const avgProgress = total > 0
      ? Math.round(this.data.projects.reduce((sum, p) => sum + p.progress, 0) / total)
      : 0;

    return {
      total,
      inProgress,
      completed,
      review,
      avgProgress,
      highPriority: this.data.projects.filter(p => p.priority === 'High').length,
      mediumPriority: this.data.projects.filter(p => p.priority === 'Medium').length,
      lowPriority: this.data.projects.filter(p => p.priority === 'Low').length,
    };
  }

  /**
   * Save to localStorage (simulates database persistence)
   */
  private save(): void {
    try {
      localStorage.setItem('aaf_projects', JSON.stringify(this.data));
    } catch (e) {
      console.error('Failed to save projects data', e);
    }
  }

  /**
   * Export data as JSON string
   */
  exportToJSON(): string {
    return JSON.stringify(this.data, null, 2);
  }

  /**
   * Download projects.json file
   */
  downloadProjectsJSON(): void {
    const jsonStr = this.exportToJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'projects.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Get last updated timestamp
   */
  getLastUpdated(): string {
    return this.data.lastUpdated;
  }

  /**
   * Reset to initial data
   */
  reset(): void {
    this.data = {
      projects: [...projectsData.projects],
      lastUpdated: new Date().toISOString()
    };
    this.save();
  }
}

// Create singleton instance
export const projectRepository = new ProjectRepository();

// Export types
export type { Project, ProjectsDatabase };
