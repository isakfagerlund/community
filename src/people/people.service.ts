/**
 * Data Model Interfaces
 */
import { BasePerson, Person } from './person.interface';
import { People } from './people.interface';
import { db } from '../database/db';

/**
 * In-Memory Store
 */

let people: People = {
  1: {
    id: 1,
    name: 'Isak Fagerlund',
    description: 'Working as a Software Engineer. Has his own podcast.',
    country: '🇸🇪',
    address: 'Frankfurter Allee 108',
  },
  2: {
    id: 2,
    name: 'Xiao Wen Fagerlund',
    description: 'Working at Vinted. Loves interior design',
    country: '🇩🇪',
    address: 'Frankfurter Allee 108',
  },
  3: {
    id: 3,
    name: 'Andres Witke',
    description:
      'Working for church. Has a daughter called Joy. Married to Sheila.',
    country: '🇪🇸',
    address: 'Hagenauer Strasse 14',
  },
};

/**
 * Service Methods
 */

export const findAll = async (): Promise<Person[]> => {
  const hits = db.prepare('SELECT * FROM people');
  return hits.all();
};

export const find = async (id: number): Promise<Person> => people[id];

export const create = async (newItem: BasePerson): Promise<Person> => {
  const id = new Date().valueOf();

  const newItemWithId = {
    id,
    ...newItem,
  };
};

export const update = async (
  id: number,
  itemUpdate: BasePerson
): Promise<Person | null> => {};

export const remove = async (id: number): Promise<null | void> => {};
