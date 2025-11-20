import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface MindMattersDB extends DBSchema {
  users: {
    key: string;
    value: {
      id: string;
      name: string;
      email: string;
      password: string;
      createdAt: string;
      assessments: any[];
      moodHistory: any[];
    };
    indexes: { 'by-email': string };
  };
  assessments: {
    key: string;
    value: {
      id: string;
      userId: string;
      date: string;
      mood: string;
      answers: Record<number, string>;
    };
    indexes: { 'by-user': string };
  };
  moods: {
    key: string;
    value: {
      id: string;
      userId: string;
      date: string;
      mood: string;
    };
    indexes: { 'by-user': string };
  };
}

let db: IDBPDatabase<MindMattersDB>;

export async function initDB() {
  if (!db) {
    db = await openDB<MindMattersDB>('mind-matters-db', 1, {
      upgrade(db) {
        // Users store
        const userStore = db.createObjectStore('users', {
          keyPath: 'id'
        });
        userStore.createIndex('by-email', 'email', { unique: true });

        // Assessments store
        const assessmentStore = db.createObjectStore('assessments', {
          keyPath: 'id'
        });
        assessmentStore.createIndex('by-user', 'userId');

        // Moods store
        const moodStore = db.createObjectStore('moods', {
          keyPath: 'id'
        });
        moodStore.createIndex('by-user', 'userId');
      }
    });
  }
  return db;
}

// User operations
export async function createUser(userData: Omit<MindMattersDB['users']['value'], 'id'>) {
  await initDB();
  const id = crypto.randomUUID();
  const user = { ...userData, id };
  await db.add('users', user);
  return user;
}

export async function getUserByEmail(email: string) {
  await initDB();
  return await db.getFromIndex('users', 'by-email', email);
}

export async function updateUser(id: string, data: Partial<MindMattersDB['users']['value']>) {
  await initDB();
  const user = await db.get('users', id);
  if (!user) throw new Error('User not found');
  const updatedUser = { ...user, ...data };
  await db.put('users', updatedUser);
  return updatedUser;
}

// Assessment operations
export async function saveAssessment(assessment: Omit<MindMattersDB['assessments']['value'], 'id'>) {
  await initDB();
  const id = crypto.randomUUID();
  const newAssessment = { ...assessment, id };
  await db.add('assessments', newAssessment);
  return newAssessment;
}

export async function getUserAssessments(userId: string) {
  await initDB();
  return await db.getAllFromIndex('assessments', 'by-user', userId);
}

// Mood operations
export async function saveMood(mood: Omit<MindMattersDB['moods']['value'], 'id'>) {
  await initDB();
  const id = crypto.randomUUID();
  const newMood = { ...mood, id };
  await db.add('moods', newMood);
  return newMood;
}

export async function getUserMoods(userId: string) {
  await initDB();
  return await db.getAllFromIndex('moods', 'by-user', userId);
}

// Initialize the database
initDB().catch(console.error);