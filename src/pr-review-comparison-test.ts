/**
 * PR Review Comparison Test
 * ==========================
 * This file contains 5 intentional issues to test Devin vs Copilot vs SonarCloud.
 * 
 * Expected Findings:
 * 1. SECURITY: SQL injection vulnerability (line ~30)
 * 2. COMPLEXITY: Cognitive complexity ~20 (line ~45)
 * 3. TYPE SAFETY: Excessive use of 'any' (line ~80)
 * 4. PERFORMANCE: Inefficient nested loops O(n²) (line ~100)
 * 5. CODE SMELL: Duplicate logic (lines ~130, ~145)
 * 
 * Test Goal: Compare which tools find which issues, quality of feedback, false positives.
 */

// ===================================================================
// ISSUE 1: SECURITY - SQL Injection Vulnerability
// ===================================================================
// Expected: All three tools should flag this as CRITICAL
/**
 * BAD: Direct string concatenation in SQL query
 */
export function getUserByEmail(email: string) {
  const db = require('better-sqlite3')('./data.db');
  
  // 🚨 SQL INJECTION VULNERABILITY
  const query = `SELECT * FROM users WHERE email = '${email}'`;
  const user = db.prepare(query).get();
  
  return user;
}

// ===================================================================
// ISSUE 2: COMPLEXITY - Cognitive Complexity ~20
// ===================================================================
// Expected: SonarCloud S3776, Devin complexity, Copilot might miss
/**
 * BAD: Excessive cognitive complexity (nested if/else, multiple conditions)
 */
export function validateUserPermissions(user: any, resource: string, action: string): boolean {
  if (user) {
    if (user.role === 'admin') {
      return true; // Complexity +1
    } else {
      if (resource === 'post') {
        if (action === 'create') {
          if (user.canCreatePosts || user.isVerified) { // Complexity +3
            return true;
          } else {
            return false;
          }
        } else if (action === 'edit') {
          if (user.id === resource || user.canEditPosts) { // Complexity +3
            return true;
          } else {
            return false;
          }
        } else if (action === 'delete') {
          if (user.isModerator || user.canDeletePosts) { // Complexity +3
            return true;
          } else {
            return false;
          }
        }
      } else if (resource === 'comment') {
        if (action === 'create' && user.canComment) { // Complexity +2
          return true;
        } else if (action === 'delete') {
          if (user.isModerator || user.canDeleteComments) { // Complexity +3
            return true;
          }
        }
      }
    }
  }
  return false;
}

// ===================================================================
// ISSUE 3: TYPE SAFETY - Excessive use of 'any'
// ===================================================================
// Expected: SonarCloud S4123, Devin type_safety, Copilot might warn
/**
 * BAD: Excessive 'any' types, no type safety
 */
export function processApiResponse(response: any): any {
  const data: any = response.data;
  const items: any[] = data.items || [];
  
  return items.map((item: any) => {
    return {
      id: item.id,
      name: item.name,
      metadata: item.metadata as any,
    };
  });
}

// ===================================================================
// ISSUE 4: PERFORMANCE - Inefficient nested loops O(n²)
// ===================================================================
// Expected: Devin performance, maybe Copilot, SonarCloud might miss
/**
 * BAD: Inefficient nested loops, should use Set or Map
 */
export function findCommonElements(arr1: number[], arr2: number[]): number[] {
  const common: number[] = [];
  
  // 🚨 O(n²) complexity - should use Set for O(n)
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i] === arr2[j]) {
        common.push(arr1[i]);
        break;
      }
    }
  }
  
  return common;
}

// ===================================================================
// ISSUE 5: CODE SMELL - Duplicate Logic
// ===================================================================
// Expected: SonarCloud (duplication), Devin might catch, Copilot likely miss
/**
 * BAD: Duplicate validation logic (should be DRY)
 */
export function validateCreatePost(title: string, content: string, userId: string): string | null {
  // Duplicate validation logic - Block 1
  if (!title || title.trim().length === 0) {
    return 'Title is required';
  }
  if (title.length < 5) {
    return 'Title must be at least 5 characters';
  }
  if (title.length > 200) {
    return 'Title must be less than 200 characters';
  }
  if (!content || content.trim().length === 0) {
    return 'Content is required';
  }
  if (!userId) {
    return 'User ID is required';
  }
  return null;
}

export function validateUpdatePost(title: string, content: string, userId: string): string | null {
  // Duplicate validation logic - Block 2 (exact same as above)
  if (!title || title.trim().length === 0) {
    return 'Title is required';
  }
  if (title.length < 5) {
    return 'Title must be at least 5 characters';
  }
  if (title.length > 200) {
    return 'Title must be less than 200 characters';
  }
  if (!content || content.trim().length === 0) {
    return 'Content is required';
  }
  if (!userId) {
    return 'User ID is required';
  }
  return null;
}

// ===================================================================
// CORRECT IMPLEMENTATIONS (for comparison)
// ===================================================================

/**
 * GOOD: Parameterized query prevents SQL injection
 */
export function getUserByEmailSafe(email: string) {
  const db = require('better-sqlite3')('./data.db');
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
  return stmt.get(email);
}

/**
 * GOOD: Reduced complexity using strategy pattern
 */
export function validateUserPermissionsSafe(user: any, resource: string, action: string): boolean {
  if (user?.role === 'admin') return true;
  
  const permissions = {
    post: {
      create: user?.canCreatePosts || user?.isVerified,
      edit: user?.id === resource || user?.canEditPosts,
      delete: user?.isModerator || user?.canDeletePosts,
    },
    comment: {
      create: user?.canComment,
      delete: user?.isModerator || user?.canDeleteComments,
    },
  };
  
  return permissions[resource]?.[action] ?? false;
}

/**
 * GOOD: Proper TypeScript types
 */
interface ApiItem {
  id: string;
  name: string;
  metadata: Record<string, unknown>;
}

interface ApiResponse {
  data: {
    items: ApiItem[];
  };
}

export function processApiResponseSafe(response: ApiResponse): ApiItem[] {
  return response.data.items || [];
}

/**
 * GOOD: O(n) using Set
 */
export function findCommonElementsSafe(arr1: number[], arr2: number[]): number[] {
  const set1 = new Set(arr1);
  return arr2.filter(item => set1.has(item));
}

/**
 * GOOD: DRY - shared validation function
 */
function validatePostData(title: string, content: string, userId: string): string | null {
  if (!title || title.trim().length === 0) return 'Title is required';
  if (title.length < 5) return 'Title must be at least 5 characters';
  if (title.length > 200) return 'Title must be less than 200 characters';
  if (!content || content.trim().length === 0) return 'Content is required';
  if (!userId) return 'User ID is required';
  return null;
}

export function validateCreatePostSafe(title: string, content: string, userId: string) {
  return validatePostData(title, content, userId);
}

export function validateUpdatePostSafe(title: string, content: string, userId: string) {
  return validatePostData(title, content, userId);
}
