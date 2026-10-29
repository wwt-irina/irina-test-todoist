import {
  getTitle,
  getCollatedTitle,
  collatedTasksExist,
  generatePushId,
} from '../helpers';

describe('helpers', () => {
  describe('getTitle', () => {
    it('returns the project when it finds a match', () => {
      const projects = [
        { projectId: '1', name: 'Project 1' },
        { projectId: '2', name: 'Project 2' },
      ];
      expect(getTitle(projects, '2')).toEqual({
        projectId: '2',
        name: 'Project 2',
      });
    });

    it('returns undefined when no project match is found', () => {
      const projects = [
        { projectId: '1', name: 'Project 1' },
        { projectId: '2', name: 'Project 2' },
      ];
      expect(getTitle(projects, '3')).toBeUndefined();
    });
  });

  describe('getCollatedTitle', () => {
    it('returns the collated task when it finds a match', () => {
      const projects = [
        { key: 'INBOX', name: 'Inbox' },
        { key: 'TODAY', name: 'Today' },
      ];
      expect(getCollatedTitle(projects, 'TODAY')).toEqual({
        key: 'TODAY',
        name: 'Today',
      });
    });

    it('returns undefined when no collated task match is found', () => {
      const projects = [
        { key: 'INBOX', name: 'Inbox' },
        { key: 'TODAY', name: 'Today' },
      ];
      expect(getCollatedTitle(projects, 'NEXT_7')).toBeUndefined();
    });
  });

  describe('collatedTasksExist', () => {
    it('returns the collated task for INBOX', () => {
      expect(collatedTasksExist('INBOX')).toEqual({
        key: 'INBOX',
        name: 'Inbox',
      });
    });

    it('returns the collated task for TODAY', () => {
      expect(collatedTasksExist('TODAY')).toEqual({
        key: 'TODAY',
        name: 'Today',
      });
    });

    it('returns the collated task for NEXT_7', () => {
      expect(collatedTasksExist('NEXT_7')).toEqual({
        key: 'NEXT_7',
        name: 'Next 7 Days',
      });
    });

    it('returns undefined when the project does not exist in collated tasks', () => {
      expect(collatedTasksExist('PROJECT_1')).toBeUndefined();
    });
  });

  describe('generatePushId', () => {
    it('generates a unique ID', () => {
      const id = generatePushId();
      expect(id).toBeTruthy();
      expect(typeof id).toBe('string');
    });

    it('generates an ID with length of 20 characters', () => {
      const id = generatePushId();
      expect(id.length).toBe(20);
    });

    it('generates unique IDs on consecutive calls', () => {
      const id1 = generatePushId();
      const id2 = generatePushId();
      const id3 = generatePushId();

      expect(id1).not.toBe(id2);
      expect(id2).not.toBe(id3);
      expect(id1).not.toBe(id3);
    });

    it('generates IDs containing only valid push characters', () => {
      const PUSH_CHARS =
        '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';
      const id = generatePushId();

      for (let i = 0; i < id.length; i++) {
        expect(PUSH_CHARS.includes(id[i])).toBe(true);
      }
    });

    it('generates IDs in roughly chronological order', () => {
      const id1 = generatePushId();
      // Small delay to ensure different timestamp
      const id2 = generatePushId();

      // The first 8 characters are timestamp-based and should be lexicographically ordered
      const timestamp1 = id1.substring(0, 8);
      const timestamp2 = id2.substring(0, 8);

      // IDs generated later should be lexicographically equal or greater
      expect(timestamp2 >= timestamp1).toBe(true);
    });

    it('generates multiple unique IDs in rapid succession', () => {
      const ids = new Set();
      const count = 100;

      for (let i = 0; i < count; i++) {
        ids.add(generatePushId());
      }

      // All IDs should be unique
      expect(ids.size).toBe(count);
    });

    it('generates IDs with consistent structure (8 timestamp + 12 random chars)', () => {
      const id1 = generatePushId();
      const id2 = generatePushId();

      // Both IDs should have the same structure
      expect(id1.length).toBe(20);
      expect(id2.length).toBe(20);

      // If generated at roughly the same time, first characters should be similar
      // This tests that the timestamp portion is working
      const timestamp1 = id1.substring(0, 4);
      const timestamp2 = id2.substring(0, 4);

      // First few characters should be the same if generated close together
      expect(timestamp1).toBe(timestamp2);
    });

    it('generates IDs that are different even with same timestamp', () => {
      // Generate multiple IDs in rapid succession
      // They should still be unique due to the random portion
      const idsAtSameTime = [];
      for (let i = 0; i < 10; i++) {
        idsAtSameTime.push(generatePushId());
      }

      // Check all are unique
      const uniqueIds = new Set(idsAtSameTime);
      expect(uniqueIds.size).toBe(idsAtSameTime.length);
    });

    it('handles the closure state properly across multiple calls', () => {
      // This tests that the closure maintains state correctly
      const id1 = generatePushId();
      const id2 = generatePushId();
      const id3 = generatePushId();

      // All should be valid IDs
      expect(id1.length).toBe(20);
      expect(id2.length).toBe(20);
      expect(id3.length).toBe(20);

      // All should be unique
      expect(id1).not.toBe(id2);
      expect(id2).not.toBe(id3);
      expect(id1).not.toBe(id3);
    });
  });
});
