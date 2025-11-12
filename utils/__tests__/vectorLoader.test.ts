import { describe, it, expect } from 'vitest';
import {
  getRoles,
  getRoleById,
  getRolesByCompany,
  getAllTechnologies,
  getRecentRoles,
  getDatasetMetadata,
  validateRole,
  validateChunk,
} from '../vectorLoader';

describe('vectorLoader', () => {
  describe('getRoles', () => {
    it('should return an array of roles', () => {
      const roles = getRoles();

      expect(Array.isArray(roles)).toBe(true);
      expect(roles.length).toBeGreaterThan(0);
    });

    it('should return roles with required fields', () => {
      const roles = getRoles();
      const firstRole = roles[0];

      expect(firstRole).toHaveProperty('role_id');
      expect(firstRole).toHaveProperty('title');
      expect(firstRole).toHaveProperty('company');
      expect(firstRole).toHaveProperty('location');
      expect(firstRole).toHaveProperty('timeframe');
      expect(firstRole).toHaveProperty('summary');
      expect(firstRole).toHaveProperty('core_tech');
      expect(firstRole).toHaveProperty('highlights');
    });

    it('should have timeframe with start and end properties', () => {
      const roles = getRoles();
      const firstRole = roles[0];

      expect(firstRole.timeframe).toHaveProperty('start');
      expect(firstRole.timeframe).toHaveProperty('end');
      expect(typeof firstRole.timeframe.start).toBe('string');
    });

    it('should have non-empty highlights array', () => {
      const roles = getRoles();
      const firstRole = roles[0];

      expect(Array.isArray(firstRole.highlights)).toBe(true);
      expect(firstRole.highlights.length).toBeGreaterThan(0);
    });

    it('should have highlights with description and source', () => {
      const roles = getRoles();
      const firstRole = roles[0];
      const firstHighlight = firstRole.highlights[0];

      expect(firstHighlight).toHaveProperty('description');
      expect(firstHighlight).toHaveProperty('source');
      expect(firstHighlight.source).toHaveProperty('path');
      expect(firstHighlight.source).toHaveProperty('page');
      expect(firstHighlight.source).toHaveProperty('section');
    });
  });

  describe('getRoleById', () => {
    it('should return a role when given a valid role_id', () => {
      const roles = getRoles();
      const firstRole = roles[0];
      const foundRole = getRoleById(firstRole.role_id);

      expect(foundRole).toBeDefined();
      expect(foundRole?.role_id).toBe(firstRole.role_id);
    });

    it('should return undefined for invalid role_id', () => {
      const foundRole = getRoleById('non_existent_role_id');

      expect(foundRole).toBeUndefined();
    });
  });

  describe('getRolesByCompany', () => {
    it('should return a Map of roles grouped by company', () => {
      const rolesByCompany = getRolesByCompany();

      expect(rolesByCompany).toBeInstanceOf(Map);
      expect(rolesByCompany.size).toBeGreaterThan(0);
    });

    it('should group roles correctly', () => {
      const rolesByCompany = getRolesByCompany();
      const roles = getRoles();

      // Check that each company in the map has at least one role
      rolesByCompany.forEach((companyRoles, company) => {
        expect(Array.isArray(companyRoles)).toBe(true);
        expect(companyRoles.length).toBeGreaterThan(0);
        companyRoles.forEach(role => {
          expect(role.company).toBe(company);
        });
      });

      // Check that total count matches
      let totalCount = 0;
      rolesByCompany.forEach(companyRoles => {
        totalCount += companyRoles.length;
      });
      expect(totalCount).toBe(roles.length);
    });
  });

  describe('getAllTechnologies', () => {
    it('should return an array of unique technologies', () => {
      const technologies = getAllTechnologies();

      expect(Array.isArray(technologies)).toBe(true);
      expect(technologies.length).toBeGreaterThan(0);

      // Check for uniqueness
      const uniqueTechs = new Set(technologies);
      expect(uniqueTechs.size).toBe(technologies.length);
    });

    it('should return sorted technologies', () => {
      const technologies = getAllTechnologies();
      const sorted = [...technologies].sort();

      expect(technologies).toEqual(sorted);
    });
  });

  describe('getRecentRoles', () => {
    it('should return roles sorted by start date (most recent first)', () => {
      const recentRoles = getRecentRoles();

      expect(Array.isArray(recentRoles)).toBe(true);

      // Check that dates are in descending order
      for (let i = 0; i < recentRoles.length - 1; i++) {
        const current = new Date(recentRoles[i].timeframe.start);
        const next = new Date(recentRoles[i + 1].timeframe.start);
        expect(current.getTime()).toBeGreaterThanOrEqual(next.getTime());
      }
    });

    it('should respect the limit parameter', () => {
      const limit = 3;
      const recentRoles = getRecentRoles(limit);

      expect(recentRoles.length).toBeLessThanOrEqual(limit);
    });

    it('should default to 5 roles when no limit is provided', () => {
      const recentRoles = getRecentRoles();
      const allRoles = getRoles();

      expect(recentRoles.length).toBeLessThanOrEqual(5);
      expect(recentRoles.length).toBeLessThanOrEqual(allRoles.length);
    });
  });

  describe('getDatasetMetadata', () => {
    it('should return dataset metadata', () => {
      const metadata = getDatasetMetadata();

      expect(metadata).toHaveProperty('schemaVersion');
      expect(metadata).toHaveProperty('generatedAt');
      expect(metadata).toHaveProperty('sourceDocument');
      expect(metadata).toHaveProperty('totalRoles');
    });

    it('should have correct total roles count', () => {
      const metadata = getDatasetMetadata();
      const roles = getRoles();

      expect(metadata.totalRoles).toBe(roles.length);
    });
  });

  describe('validateRole', () => {
    it('should return true for valid role', () => {
      const roles = getRoles();
      const firstRole = roles[0];

      expect(validateRole(firstRole)).toBe(true);
    });

    it('should return false for invalid role', () => {
      expect(validateRole(null)).toBe(false);
      expect(validateRole(undefined)).toBe(false);
      expect(validateRole({})).toBe(false);
      expect(validateRole({ role_id: 'test' })).toBe(false);
      expect(validateRole('not an object')).toBe(false);
    });
  });

  describe('validateChunk', () => {
    it('should return true for valid chunk structure', () => {
      const validChunk = {
        chunk_id: 'test_chunk',
        text: 'Test text',
        metadata: {
          role_id: 'test_role',
          company: 'Test Company',
          title: 'Test Title',
          timeframe: { start: '2024-01', end: null },
          core_tech: ['Test'],
          chunk_type: 'summary',
          source_path: 'test.pdf',
        },
      };

      expect(validateChunk(validChunk)).toBe(true);
    });

    it('should return false for invalid chunk', () => {
      expect(validateChunk(null)).toBe(false);
      expect(validateChunk(undefined)).toBe(false);
      expect(validateChunk({})).toBe(false);
      expect(validateChunk({ chunk_id: 'test' })).toBe(false);
      expect(validateChunk('not an object')).toBe(false);
    });
  });
});
