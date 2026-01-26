import { test, expect } from '@playwright/test';
import { db } from '@/db/drizzle';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * Helper to generate dynamic test data
 * This avoids hardcoded ID collisions
 */
const generateTestUser = () => {
  const id = Math.floor(Math.random() * 1000000);
  return {
    id,
    name: `Test User ${id}`,
    email: `user${id}@example.com`,
  };
};

// Force serial execution to prevent parallel tests from interfering with the same DB table
test.describe.configure({ mode: 'serial' });

test.describe('Console User API', () => {

  test.describe('GET /api/console/user', () => {
    test('should return user data when exists', async ({ request }) => {
      const testUser = generateTestUser();

      // Ensure a clean state for the GET request
      await db.delete(users);
      await db.insert(users).values(testUser);

      try {
        const response = await request.get('/api/console/user');
        expect(response.ok()).toBe(true);

        const data = await response.json();
        expect(data).toMatchObject(testUser);
      } finally {
        await db.delete(users).where(eq(users.id, testUser.id));
      }
    });
  });
});
