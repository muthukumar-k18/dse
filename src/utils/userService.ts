import usersData from '../data/users.json';

export interface UserAccess {
  canCreateProjects: boolean;
  canViewDashboard: boolean;
  canManageRisks: boolean;
  canSignDocuments: boolean;
  canAccessCode360: boolean;
  canViewAllProjects: boolean;
}

export interface User {
  id: string;
  fullName: string;
  initials: string;
  email: string;
  roles: string[];
  primaryRole: string;
  access: UserAccess;
}

class UserService {
  private readonly STORAGE_KEY = 'current_user_id';

  getAllUsers(): User[] {
    return usersData.users as User[];
  }

  getUserById(userId: string): User | null {
    const user = usersData.users.find(u => u.id === userId);
    return user ? (user as User) : null;
  }

  getUserByName(fullName: string): User | null {
    const user = usersData.users.find(u => u.fullName === fullName);
    return user ? (user as User) : null;
  }

  getCurrentUser(): User | null {
    const userId = localStorage.getItem(this.STORAGE_KEY);
    if (userId) {
      return this.getUserById(userId);
    }
    // Default to Pramod Nair if no user is set
    return this.getUserById('user001');
  }

  setCurrentUser(userId: string): boolean {
    const user = this.getUserById(userId);
    if (user) {
      localStorage.setItem(this.STORAGE_KEY, userId);
      return true;
    }
    return false;
  }

  getUsersByRole(role: string): User[] {
    return usersData.users.filter(u => u.roles.includes(role)) as User[];
  }

  hasAccess(userId: string, permission: keyof UserAccess): boolean {
    const user = this.getUserById(userId);
    return user ? user.access[permission] : false;
  }

  switchRole(userId: string, role: string): boolean {
    const user = this.getUserById(userId);
    if (user && user.roles.includes(role)) {
      // Update the user's primary role in localStorage
      localStorage.setItem(`${userId}_active_role`, role);
      return true;
    }
    return false;
  }

  getActiveRole(userId: string): string {
    const storedRole = localStorage.getItem(`${userId}_active_role`);
    if (storedRole) {
      const user = this.getUserById(userId);
      if (user && user.roles.includes(storedRole)) {
        return storedRole;
      }
    }
    const user = this.getUserById(userId);
    return user ? user.primaryRole : '';
  }

  clearCurrentUser(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

export const userService = new UserService();
