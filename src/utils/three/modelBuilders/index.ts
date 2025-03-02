
import { createMealModel } from './mealModel';
import { createWorkoutModel } from './workoutModel';
import { createNotesModel } from './notesModel';
import { createGoalsModel } from './goalsModel';
import { ModelType } from '../modelTypes';
import * as THREE from 'three';

export function createModels(): Record<string, THREE.Group> {
  return {
    meal: createMealModel(),
    workout: createWorkoutModel(),
    notes: createNotesModel(),
    goals: createGoalsModel()
  };
}

export { createMealModel, createWorkoutModel, createNotesModel, createGoalsModel };
