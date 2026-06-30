import usersData from '../data/users.json';

export interface User {
  id: string;
  name: string;
  initials: string;
  email: string;
  department: string;
  location: string;
  roles: string[];
  accessibleScreens: string[];
  avatar: string | null;
  isActive: boolean;
  lastLogin: string;
}

class UserManager {
  private users: User[];
  private currentUserId: string;

  constructor() {
    this.users = usersData.users;
    this.currentUserId = usersData.currentUser;
  }

  getCurrentUser(): User | null {
    return this.users.find(user => user.id === this.currentUserId) || null;
  }

  getUserById(userId: string): User | null {
    return this.users.find(user => user.id === userId) || null;
  }

  getUserByInitials(initials: string): User | null {
    return this.users.find(user => user.initials === initials) || null;
  }

  getUsersByRole(role: string): User[] {
    return this.users.filter(user => user.roles.includes(role));
  }

  getAllUsers(): User[] {
    return this.users;
  }

  hasAccess(userId: string, screenPath: string): boolean {
    const user = this.getUserById(userId);
    if (!user) return false;

    // Check if user has exact match or pattern match
    return user.accessibleScreens.some(screen => {
      // Convert route pattern to regex
      const pattern = screen.replace(/:[^/]+/g, '[^/]+');
      const regex = new RegExp(`^${pattern}$`);
      return regex.test(screenPath);
    });
  }

  setCurrentUser(userId: string): boolean {
    const user = this.getUserById(userId);
    if (user) {
      this.currentUserId = userId;
      // In a real app, this would update the backend/localStorage
      localStorage.setItem('currentUserId', userId);
      return true;
    }
    return false;
  }

  getCurrentUserRoles(): string[] {
    const user = this.getCurrentUser();
    return user ? user.roles : [];
  }

  getUserPrimaryRole(userId: string): string {
    const user = this.getUserById(userId);
    return user && user.roles.length > 0 ? user.roles[0] : 'User';
  }

  getCurrentUserPrimaryRole(): string {
    const user = this.getCurrentUser();
    return user && user.roles.length > 0 ? user.roles[0] : 'User';
  }
}

export const userManager = new UserManager();
