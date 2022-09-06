/**
 * Data Model Interfaces
 */
import { BasePerson, Person } from './person.interface';
import { db } from '../database/db';

/**
 * Service Methods
 */

export const findAll = async (): Promise<Person[]> => {
  const hits = db.prepare('SELECT * FROM people');
  return hits.all();
};

export const find = async (id: number | bigint): Promise<Person> => {
  const hits = db.prepare(`SELECT * FROM people WHERE id = ${id}`);
  return hits.get();
};

export const create = async (newItem: BasePerson): Promise<Person> => {
  const id = new Date().valueOf();
  const insert = db.prepare(
    'INSERT INTO people (id, name, description, address, country) VALUES (@id, @name, @description, @address, @country)'
  );

  const newItemWithId = {
    id,
    ...newItem,
  };

  const { lastInsertRowid } = insert.run(newItemWithId);
  return find(lastInsertRowid);
};

export const update = async (
  id: number,
  itemUpdate: BasePerson
): Promise<Person | null> => {
  const item = await find(id);
  interface UpdatedItem {
    [key: string]: string | number;
  }

  const updatedItem: UpdatedItem = {
    ...item,
    ...itemUpdate,
  };

  for (const item in updatedItem) {
    const stmt = db.prepare(`UPDATE people SET ${item} = ? WHERE id = ${id}`);
    stmt.run(updatedItem[item])
  }

  return find(id)
};

export const remove = async (id: number): Promise<null | void> => {
  const item = await find(id)

  if(!item) {
    throw new Error("Can't find the person");
  }

  const stmt = db.prepare(`DELETE from people WHERE id = ${id}`);
  stmt.run()
};
