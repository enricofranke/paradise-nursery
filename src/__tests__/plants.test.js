import { describe, expect, it } from 'vitest'
import { allPlants, plantCategories } from '../data/plants.js'

describe('plant catalogue', () => {
  it('has at least three categories', () => {
    expect(plantCategories.length).toBeGreaterThanOrEqual(3)
  })

  it('has at least six plants per category', () => {
    for (const category of plantCategories) {
      expect(category.plants.length, category.name).toBeGreaterThanOrEqual(6)
    }
  })

  it('has globally unique plant ids and names', () => {
    const ids = allPlants.map((p) => p.id)
    const names = allPlants.map((p) => p.name)
    expect(new Set(ids).size).toBe(ids.length)
    expect(new Set(names).size).toBe(names.length)
  })

  it('every plant has image, description and a positive numeric cost', () => {
    for (const plant of allPlants) {
      expect(plant.image, plant.id).toMatch(/^https:\/\//)
      expect(plant.description, plant.id).toBeTruthy()
      expect(Number.isFinite(plant.cost) && plant.cost > 0, plant.id).toBe(true)
    }
  })
})
