Manager = require "./Oddq"

describe "OddqGridManager", ->
  manager = new Manager

  describe "toCubic", ->
    it "doit convertir des coordonnees cubic en coordonnees oddq", ->
      # given
      coord =
        col: 10
        row: 5
      # when
      oddq = manager.toCubic coord
      # then
      expect( oddq.x ).toBe 10
      expect( oddq.y ).toBe -10
      expect( oddq.z ).toBe 0