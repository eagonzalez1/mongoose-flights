import { Router } from 'express'
import * as flightsCtrl from "../controllers/flights.js"

const router = Router()

// // GET -- localhost:3000/todos
// router.get('/', flightsCtrl.index)

// GET -- localhost:3000/todos/new
router.get('/new', flightsCtrl.new)

// // GET -- localhost:3000/flights/:id
// router.get('/:id', flightsCtrl.show)

// // GET -- localhost:3000/flights/:id/edit
// router.get('/:id/edit', flightsCtrl.edit)

// POST -- localhost:3000/flights
router.post('/', flightsCtrl.create)

// // DELETE -- localhost:3000/flights/:id
// router.delete('/:id', flightsCtrl.delete)

// // PUT -- localhost:3000/flights/:id
// router.put('/:id', flightsCtrl.update)

export {
  router
}