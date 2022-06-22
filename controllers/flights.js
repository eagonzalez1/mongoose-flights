import { Flight } from "../models/flight.js"

function newFlight(req, res) {
  const newFlight = new Flight()
  // Obtain the default date
  const dt = newFlight.departs
  console.log(newFlight)
  console.log(dt)
  // Format the date for the value attribute of the input
  const departDate = dt.toISOString().slice(0, 16)
  res.render("flights/new", {
    title: "Add Flight",
    departDate
  })
}

function create(req, res) {
  
  Flight.create(req.body)
  .then(flight => {
    console.log(flight)
    res.redirect(`/flights`)
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/flights`)
  })
}

function index(req,res){
  Flight.find({})
  .then(flights => {
    flights.forEach(flight => {
      if(flight.departs.toISOString() < new Date().toISOString()){
        flight.color = 'red'
      }
    })
    res.render('flights/index', {
    flights: flights,
    title: 'All Flights'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    res.render('flights/show', {
      title: "Show Flight",
      flight: flight
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights')
  })
}

function edit(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    res.render("flights/edit", {
      flight: flight,
      title: "Edit Flight"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id)
  .then(() => {
    res.redirect("/flights")
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function update(req, res) {
  for (let key in req.body) {
    if(req.body[key] === "") delete req.body[key]
  }
  Flight.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(flight => {
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function createTicket(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    flight.tickets.push(req.body)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function deleteTicket(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    flight.tickets = flight.tickets.filter(ticket => {
      return ticket._id.toString() !== req.params.ticketId
    })
    console.log(flight)
    flight.save()
    .then(() => {
        res.redirect(`/flights/${flight._id}`)
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights')
  })
}

export {
  newFlight as new,
  create,
  index,
  deleteFlight as delete,
  show,
  edit,
  update,
  createTicket,
  deleteTicket
}


    // flights.forEach(flight => {
    //   if (flight.departs.toISOString() < new Date().toISOString()) {
    //     flight.color = 'red'
    //   }
    // })