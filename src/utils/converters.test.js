import { describe, test, expect } from 'vitest';
import { convertToCSV, convertToSQL } from './converters';

describe('convertToCSV', () => {
  test('returns empty string for empty array', () => {
    expect(convertToCSV([])).toBe('');
  });

  test('converts single row', () => {
    const data = [
      {
        id: 1,
        name: 'John'
      }
    ];

    const result = convertToCSV(data);

    expect(result).toBe(
      'id,name\n"1","John"'
    );
  });

  test('converts multiple rows', () => {
    const data = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' }
    ];

    const result = convertToCSV(data);

    expect(result).toContain('"John"');
    expect(result).toContain('"Jane"');
  });
});
describe('convertToSQL', () => {
  test('returns empty string for empty array', () => {
    expect(convertToSQL([])).toBe('');
  });

  test('creates insert statement', () => {
    const data = [
      {
        id: 1,
        name: 'John'
      }
    ];

    const result = convertToSQL(data);

    expect(result).toContain(
      'INSERT INTO mock_table'
    );
  });

  test('supports custom table name', () => {
    const data = [
      {
        id: 1,
        name: 'John'
      }
    ];

    const result = convertToSQL(
      data,
      'users'
    );

    expect(result).toContain(
      'INSERT INTO users'
    );
  });

  test('escapes single quotes', () => {
    const data = [
      {
        name: "O'Brien"
      }
    ];

    const result = convertToSQL(data);

    expect(result).toContain(
      "'O''Brien'"
    );
  });
});