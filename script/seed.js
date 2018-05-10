/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {User} = require('../server/db/models')
const {Station} = require('../server/db/models')
const {Broadcast} = require('../server/db/models');
const {User_stations} = require('../server/db/models');

function randomNumber(max) {
  return Math.floor(Math.random() * max);
}

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const stations = await Promise.all([
    Station.create({name: 'Web Design 418', logoUrl: 'http://fakeUrl.com', description: 'Test Description', tags: ['Tech'] }),
    Station.create({name: 'Tech\'d Out', logoUrl: 'http://fakeUrl.com', tags: ['Tech'], description: 'Test Description' }),
    Station.create({name: 'The Script Crypt', logoUrl: 'http://fakeUrl.com', tags: ['Nerd Stuff'] , description: 'Test Description'}),
    Station.create({name: 'Life On Earth', logoUrl: 'http://fakeUrl.com', tags: ['random'] , description: 'Test Description'}),
    Station.create({name: 'New Stock Trends', logoUrl: 'http://fakeUrl.com', tags: ['consumer'] , description: 'Test Description'}),
    Station.create({name: 'How to re-use literally anything', logoUrl: 'http://fakeUrl.com', tags: ['Life Hacks'] , description: 'Test Description'}),
    Station.create({name: 'How to build a "Hackintosh for under $100"', logoUrl: 'http://fakeUrl.com', tags: ['Tech Hacks'] , description: 'Test Description'}),
    Station.create({name: 'Chrome Extensions to increase build proficiency', logoUrl: 'http://fakeUrl.com', tags: ['Dev Tips'] , description: 'Test Description'}),
    Station.create({name: 'Day in the life of a developer', logoUrl: 'http://fakeUrl.com', tags: ['Lifestyle'] , description: 'Test Description'})
  ])

  const broadcasts = await Promise.all([
    Broadcast.create({name: 'This is a test', description: 'Test Broadcast', tags: ['Test Cast'], stationId: 1}),
    Broadcast.create({name: "This is fake", description: "News", tags: ['Tech'], stationId: 2}),
    Broadcast.create({name: "Our first Broadcast", description: "Trial Run", tags: ['Newbies'], stationId: 3}),
    Broadcast.create({name: "This week in Silicon Valley", description: "Walmart goes head-to-head with amazon on big deals", tags: ['Clickbait'], stationId: 4}),
    Broadcast.create({name: "This Week in Nature Valley", description: "Still making Ranch Dressing", tags: ['Ranch'], stationId: 5}),
    Broadcast.create({name: "Let's talk, Google Assistant", description: "Touching on the recently unveiled 'Google Assistant'", tags: ['AI'], stationId: 6}),
    Broadcast.create({name: "Css Grid Vs FlexBox", description: "Which to learn first", tags: ['Tech Talch'], stationId: 7}),
    Broadcast.create({name: "Linux Vs Mac Development", description: "Which is the better enviornment", tags: ['consumer'], stationId: 8}),
    Broadcast.create({name: "Tabs Or Spaces", description: "Little things in development, that end up being a BIG deal", tags: ['Dev Tips'], stationId: 9}),
    Broadcast.create({name: "Nvidia GeForece 1180", description: "Will it be worth the wait, should I just spend thirteen grand on a max spec iMac pro??", tags: ['Nerd Stuff'], stationId: 5})
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')


/*

Station.create({
  name: ,
  logoUrl: ,
  tags: {''},
  description: ''
})

Station.create({name: , logoUrl: , tags: {''} })

Broadcast.create({
  name: ,
  description: ,
  tags: {''},
  stationId: 
})

Broadcast.create({name: , description: , tags: {''}, stationId: })  


*/