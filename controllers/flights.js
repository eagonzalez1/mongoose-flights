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
    res.redirect(`/new`)
    // res.redirect(`/flights`)
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/new`)
    // res.redirect(`/flights`)
  })
}


// function index(req, res) {
//   Movie.find({})
//   .then(movies => {
//     res.render('movies/index', {
//       title: "All Movies",
//       movies: movies //passes movies array to the HTML doc as 'movies'
//     })
//   })
//   .catch(error => {
//     console.log(error)
//     res.redirect('/')
//   })
// }




export {
  newFlight as new,
  create,
  // index,
}