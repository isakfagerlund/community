/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from 'express';
import * as PeopleService from './people.service';
import { BasePerson, Person } from './person.interface';

/**
 * Router Definition
 */

export const peopleRouter = express.Router();

/**
 * Controller Definitions
 */

// # get all people
// GET /api/people

peopleRouter.get('/', async (req: Request, res: Response) => {
  try {
    const people: Person[] = await PeopleService.findAll();
    console.log(people)

    res.status(200).send(people);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// # get a single person using id
// GET /api/people/:id

peopleRouter.get('/:id', async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const person: Person = await PeopleService.find(id);

    if (person) {
      return res.status(200).send(person);
    }

    res.status(404).send('Person was not found');
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// # create a person
// POST /api/people

peopleRouter.post('/', async (req: Request, res: Response) => {
  try {
    const person: Person = req.body;

    const newPerson = await PeopleService.create(person);

    res.status(201).send(newPerson);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// # update a person using an id parameter
// PUT /api/people/:id

peopleRouter.put('/:id', async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const personUpdate: Person = req.body;

    const existingPerson = await PeopleService.find(id);

    if (existingPerson) {
      const updatedPerson = await PeopleService.update(id, personUpdate);
      return res.status(200).json(updatedPerson);
    }

    const newPerson = await PeopleService.create(personUpdate);

    res.status(201).json(newPerson);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// # remove a person using an id parameter
// DELETE /api/people/:id
peopleRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);

    await PeopleService.remove(id);

    res.sendStatus(204);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
