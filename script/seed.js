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

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123', userName: 'Cody'}),
    User.create({email: 'murphy@email.com', password: '123', userName: 'Murphy'}),
    User.create({email: 'fake@emailcom', password: '123', userName: 'Terry'}),
    User.create({email: 'billMurphy@email.com', password: '234', userName: 'Bill'}),
    User.create({email: 'thomas@email.com', password: '234', userName: 'Thomas'}),
    User.create({email: 'delilah@email.com', password: '234', userName: 'Delilah'}),
    User.create({email: 'jonathon@email.com', password: '234', userName: 'John'}),
    User.create({email: 'william@email.com', password: '234', userName: 'William'}),
    User.create({email: 'richard@email.com', password: '234', userName: 'Richard'}),
    User.create({email: 'kelly@email.com', password: '234', userName: 'Kelly'}),
    User.create({email: 'timothy@email.com', password: '234', userName: 'Timothy'}),
    User.create({email: 'david@email.com', password: '234', userName: 'David'}),
    User.create({email: 'amy@email.com', password: '234', userName: 'Amy'}),
    User.create({email: 'naomi@email.com', password: '234', userName: 'Naomi'}),
    User.create({email: 'ivan@email.com', password: '234', userName: 'Ivan'}),
    User.create({email: 'lois@email.com', password: '234', userName: 'Lois'}),
    User.create({email: 'alison@email.com', password: '234', userName: 'Alison'}),
    User.create({email: 'youngG@email.com', password: '234', userName: 'Young'}),
    User.create({email: 'brian@email.com', password: '234', userName: 'Brian'}),
    User.create({email: 'karen@email.com', password: '234', userName: 'Karen'}),
    User.create({email: 'james@email.com', password: '234', userName: 'James'})
  ])

  const stations = await Promise.all([
    Station.create({name: 'Web Design 418', logoUrl: 'http://fakeUrl.com', description: 'Test Description', tags: ['Tech'] }),
    Station.create({name: 'Tech\'d Out', logoUrl: 'https://s3-us-west-2.amazonaws.com/anchor-generated-image-bank/production/podcast_uploaded_nologo/433449/433449-1524787291548-e60fdacc9a1c2.jpg', tags: ['Tech'], description: 'Test Description' }),
    Station.create({name: 'The Script Crypt', logoUrl: 'http://fakeUrl.com', tags: ['Nerd Stuff'] , description: 'Test Description'}),
    Station.create({name: 'Life On Earth', logoUrl: 'http://fakeUrl.com', tags: ['random'] , description: 'Test Description'}),
    Station.create({name: 'New Stock Trends', logoUrl: 'http://fakeUrl.com', tags: ['consumer'] , description: 'Test Description'}),
    Station.create({name: 'How to re-use literally anything', logoUrl: 'http://fakeUrl.com', tags: ['Life Hacks'] , description: 'Test Description'}),
    Station.create({name: 'How to build a "Hackintosh for under $100"', logoUrl: 'http://fakeUrl.com', tags: ['Tech Hacks'] , description: 'Test Description'}),
    Station.create({name: 'Chrome Extensions to increase build proficiency', logoUrl: 'http://fakeUrl.com', tags: ['Dev Tips'] , description: 'Test Description'}),
    Station.create({name: 'Day in the life of a developer', logoUrl: 'http://fakeUrl.com', tags: ['Lifestyle'] , description: 'Test Description'}),
    Station.create({name: 'Joe Rogan Experiance', logoUrl: 'https://www.google.com/imgres?imgurl=http%3A%2F%2Fstatic1.squarespace.com%2Fstatic%2F57bb65fe2e69cf170f6ef1f0%2Ft%2F57d178c03e00be8ad66911ce%2F1485317938342%2F&imgrefurl=http%3A%2F%2Fwww.jrepodcaststuff.com%2F&docid=FWlftw0oYugkHM&tbnid=wI34sKpGk2MAGM%3A&vet=10ahUKEwjrq_u0joPbAhVls1kKHTEUDo8QMwhEKAMwAw..i&w=429&h=435&bih=826&biw=1440&q=joe%20rogan%20experiance&ved=0ahUKEwjrq_u0joPbAhVls1kKHTEUDo8QMwhEKAMwAw&iact=mrc&uact=8', tags: ['Consumer'], description: 'Conversations about all things that interest the broadcaster, Including guest interatctions and interviews of all types.'}),
    Station.create({name: 'By the Book', logoUrl: 'https://itunes.apple.com/us/podcast/by-the-book/id1217948628?mt=2', tags: ['LifeStyle'], description: 'On each episode, an enthusiastic Jolenta Greenberg and a skeptical Kristen Meinzer pledge to live their lives according to the rules of a new self-help book for two weeks. The results are often hilarious — especially when they enlist their beleaguered partners to join in — and occasionally life-changing.'}),
    Station.create({name: 'PeopleCast', logoUrl: 'http://fake.com', tags: ['Lifestyle'], description: 'Of the people, for the people.'}),
    Station.create({name: 'Game Night', logoUrl: 'http://fake.com', tags: ['Game'], description: 'Game reviews of all kinds, board digital, sport.'})
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
    Broadcast.create({name: "Nvidia GeForece 1180", description: "Will it be worth the wait, should I just spend thirteen grand on a max spec iMac pro??", tags: ['Nerd Stuff'], stationId: 5}),
    Broadcast.create({name: 'Game of Thrones', description: 'A recap/analysis of the popular show.', tags: ['Analysis'], stationId: 5,audioPath: null, isLive: false, isArchived: false}),
    Broadcast.create({name: '20 Questions', description: '20 Questions to ask someone to get a better understanding of who they are and how they think.', tags: ['Mind Games'], stationId: 4,audioPath: null, isLive: false, isArchived: false}),
    Broadcast.create({name: '60 Seeconds', description: 'Second By second recap of the real life news situations, Journalism at it\'s best', tags: ['Lifestyle'], stationId: 4,audioPath: null, isLive: false, isArchived: false}),
    Broadcast.create({name: 'The Illusion', description: 'Step by step \'talk-throughs\' of the oldest magic tricks in the book. With the addition of some of the more popular tricks done by famous magicians.', tags: ['Magic'], stationId: 12,audioPath: null, isLive: false, isArchived: false}),
    Broadcast.create({name: 'Book club', description: 'Tune in to hear recaps of the book of the week. By two notorious book worms, and intermittent special guests.', tags: ['Reading'], stationId: 3,audioPath: null, isLive: false, isArchived: false}),
    Broadcast.create({name: 'Food Is Rad.io', description: 'Rotating Host\'s talking about the best unknown spots in their boroughs.', tags: ['Food', 'Lifestyle'], stationId: 12,audioPath: null, isLive: false, isArchived: false}),
    Broadcast.create({name: 'This week in science', description: 'All the breakthroughs you heard and missed, recapped in a two hour cast.', tags: ['Science', 'Earth Science', 'Learning'], stationId: 4,audioPath: null, isLive: false, isArchived: false}),
    Broadcast.create({name: 'Choosing the right parts for the build.', description: 'Episode 4 of the build a hackintosh for under $100 dollars series.', tags: ['Tech'], stationId: 7,audioPath: null, isLive: false, isArchived: false})
  ])

  const userStations = await Promise.all([
    User_stations.create({userId: 1, stationId: 1}),
    User_stations.create({userId: 2, stationId: 2}),
    User_stations.create({userId: 3, stationId: 3}),
    User_stations.create({userId: 4, stationId: 4}),
    User_stations.create({userId: 5, stationId: 5}),
    User_stations.create({userId: 6, stationId: 6}),
    User_stations.create({userId: 7, stationId: 7}),
    User_stations.create({userId: 8, stationId: 8}),
    User_stations.create({userId: 2, stationId: 1}),
    User_stations.create({userId: 3, stationId: 2}),
    User_stations.create({userId: 4, stationId: 3}),
    User_stations.create({userId: 5, stationId: 4}),
    User_stations.create({userId: 6, stationId: 5}),
    User_stations.create({userId: 7, stationId: 6}),
    User_stations.create({userId: 8, stationId: 7}),
    User_stations.create({userId: 1, stationId: 8}),
    User_stations.create({userId: 3, stationId: 1}),
    User_stations.create({userId: 4, stationId: 2}),
    User_stations.create({userId: 5, stationId: 3}),
    User_stations.create({userId: 6, stationId: 4}),
    User_stations.create({userId: 7, stationId: 5}),
    User_stations.create({userId: 8, stationId: 6}),
    User_stations.create({userId: 1, stationId: 7}),
    User_stations.create({userId: 2, stationId: 8})
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${stations.length} Stations`);
  console.log(`seeded ${broadcasts.length} Broadcasts`);
  console.log(`seeded ${userStations.length} Join Relations Between Users And Stations`);
  console.log(`seeded successfully`);
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
  ------- Seed Templates -------
User.create({
  userName: '',
  email: '',
  password: '',
  profilePic: '',
  summary: ''
})

User.create({userName: '',email: '', password: '', profilePic: '', summary: ''})

Station.create({
  name: ,
  logoUrl: ,
  tags: {''},
  description: ''
})

Station.create({name: , logoUrl: , tags: [''], description: ''})

Broadcast.create({
  name: ,
  description: ,
  tags: {''},
  stationId: ,
  audioPath: null,
  isLive: false,
  isArchived: false
})

Broadcast.create({name: , description: , tags: {''}, stationId: ,audioPath: null, isLive: false, isArchived: false})  

User_station.create({
  userId: ,
  stationId:
})

User_stations.create({userId: , stationId: })
*/