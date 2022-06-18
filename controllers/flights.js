import { Flight } from "../models/flight.js"

function newFlight(req, res) {
  res.render("flights/new", {
    title: "Add Flight"
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

function index(req, res) {
  Flight.find({})
  .then(flights => {
    res.render('flights/index', {
      title: "All Flights",
      flights: flights //passes flights array to the HTML doc as 'movies'
    })
  })
  .catch(error => {
    console.log(error)
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
  Flight.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(flight => {
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

export {
  newFlight as new,
  create,
  index,
  deleteFlight as delete,
  show,
  edit,
  update
}