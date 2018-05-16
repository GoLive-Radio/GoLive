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
const db = require('../server/db');
const {User} = require('../server/db/models');
const {Station} = require('../server/db/models');
const {Broadcast} = require('../server/db/models');
const {User_stations} = require('../server/db/models');
const fs = require('fs');
const path = require('path');

function getAudioFile (filePath, broadcastId) {
  filePath = path.join(__dirname, '..', 'public/audio', filePath);
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, audioData) => {
      if (err) {
        reject(err);
      } else {
        resolve(audioData);
      }
    });
  })
  .then(audioData => {
    Broadcast.findById(broadcastId)
    .then(broadcast => {
      return broadcast.update({
        blob: audioData
      });
    });
  })
  .catch(console.error);
}

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123', userName: 'Cody', broadcasterRating: 4, callerRating: 3}),
    User.create({email: 'murphy@email.com', password: '123', userName: 'Murphy', broadcasterRating: 4, callerRating: 3}),
    User.create({email: 'fake@emailcom', password: '123', userName: 'Terry', broadcasterRating: 4, callerRating: 3}),
    User.create({email: 'billMurphy@email.com', password: '234', userName: 'Bill', broadcasterRating: 4, callerRating: 3}),
    User.create({email: 'thomas@email.com', password: '234', userName: 'Thomas', broadcasterRating: 4, callerRating: 3}),
    User.create({email: 'delilah@email.com', password: '234', userName: 'Delilah', broadcasterRating: 4, callerRating: 3}),
    User.create({email: 'jonathon@email.com', password: '234', userName: 'John', broadcasterRating: 4, callerRating: 3}),
    User.create({email: 'william@email.com', password: '234', userName: 'William', broadcasterRating: 4, callerRating: 3}),
    User.create({email: 'richard@email.com', password: '234', userName: 'Richard', broadcasterRating: 4, callerRating: 3}),
    User.create({email: 'kelly@email.com', password: '234', userName: 'Kelly', broadcasterRating: 4, callerRating: 3}),
    User.create({email: 'timothy@email.com', password: '234', userName: 'Timothy', broadcasterRating: 4, callerRating: 3}),
    User.create({email: 'david@email.com', password: '234', userName: 'David', broadcasterRating: 4, callerRating: 3}),
    User.create({email: 'amy@email.com', password: '234', userName: 'Amy', broadcasterRating: 4, callerRating: 3}),
    User.create({email: 'naomi@email.com', password: '234', userName: 'Naomi', broadcasterRating: 4, callerRating: 3}),
    User.create({email: 'ivan@email.com', password: '234', userName: 'Ivan', broadcasterRating: 4, callerRating: 3}),
    User.create({email: 'lois@email.com', password: '234', userName: 'Lois', broadcasterRating: 4, callerRating: 3}),
    User.create({email: 'alison@email.com', password: '234', userName: 'Alison', broadcasterRating: 4, callerRating: 3}),
    User.create({email: 'youngG@email.com', password: '234', userName: 'Young', broadcasterRating: 4, callerRating: 3}),
    User.create({email: 'brian@email.com', password: '234', userName: 'Brian', broadcasterRating: 4, callerRating: 3}),
    User.create({email: 'karen@email.com', password: '234', userName: 'Karen', broadcasterRating: 4, callerRating: 3}),
    User.create({email: 'james@email.com', password: '234', userName: 'RHCP', broadcasterRating: 4, callerRating: 3}),
    User.create({email: 'upfirst@email.com', password: '234', userName: 'UpFirst', broadcasterRating: 5, callerRating: 5}),
    User.create({email: 'techdout@email.com', password: '234', userName: 'Techd-Out', broadcasterRating: 5, callerRating: 5})
  ])

  const stations = await Promise.all([
    Station.create({name: 'Web Design 418', logoUrl: 'https://gotechtown.org/wp-content/uploads/2018/04/Web-Design-Image-1.jpg', description: 'Test Description', tags: ['Tech'] }),
    Station.create({name: 'Tech\'d Out', logoUrl: 'https://s3-us-west-2.amazonaws.com/anchor-generated-image-bank/production/podcast_uploaded_nologo/433449/433449-1524787291548-e60fdacc9a1c2.jpg', tags: ['Tech'], description: 'Test Description' }),
    Station.create({name: 'The Script Crypt', logoUrl: 'https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', tags: ['Nerd Stuff'] , description: 'Test Description'}),
    Station.create({name: 'Life On Earth', logoUrl: 'https://images.pexels.com/photos/695299/pexels-photo-695299.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', tags: ['random'] , description: 'Test Description'}),
    Station.create({name: 'New Stock Trends', logoUrl: 'https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350', tags: ['consumer'] , description: 'Test Description'}),
    Station.create({name: 'How to re-use literally anything', logoUrl: 'https://images.pexels.com/photos/1055712/pexels-photo-1055712.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350', tags: ['Life Hacks'] , description: 'Test Description'}),
    Station.create({name: 'How to build a "Hackintosh for under $100"', logoUrl: 'https://images.pexels.com/photos/196658/pexels-photo-196658.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350', tags: ['Tech Hacks'] , description: 'Test Description'}),
    Station.create({name: 'Chrome Extensions to increase build proficiency', logoUrl: 'https://images.pexels.com/photos/218717/pexels-photo-218717.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350', tags: ['Dev Tips'] , description: 'Test Description'}),
    Station.create({name: 'Day in the life of a developer', logoUrl: 'https://images.pexels.com/photos/7375/startup-photos.jpg?auto=compress&cs=tinysrgb&dpr=2&h=350', tags: ['Lifestyle'] , description: 'Test Description'}),
    Station.create({name: 'Experience', logoUrl: 'https://images.pexels.com/photos/534263/pexels-photo-534263.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350', tags: ['Consumer'], description: 'Conversations about all things that interest the broadcaster, Including guest interatctions and interviews of all types.'}),
    Station.create({name: 'By the Book', logoUrl: 'https://is2-ssl.mzstatic.com/image/thumb/Music128/v4/1f/f9/dc/1ff9dce4-208f-b59b-2bdc-cbf6ea0b50b9/source/170x170bb.jpg?auto=compress&cs=tinysrgb&dpr=2&h=350', tags: ['LifeStyle'], description: 'On each episode, an enthusiastic Jolenta Greenberg and a skeptical Kristen Meinzer pledge to live their lives according to the rules of a new self-help book for two weeks.'}),
    Station.create({name: 'PeopleCast', logoUrl: 'https://images.pexels.com/photos/398532/pexels-photo-398532.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350', tags: ['Lifestyle'], description: 'Of the people, for the people.'}),
    Station.create({name: 'Game Night', logoUrl: 'https://images.pexels.com/photos/776654/pexels-photo-776654.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350', tags: ['Game'], description: 'Game reviews of all kinds, board digital, sport.'}),
    Station.create({name: 'Red Hot Chili Peppers', logoUrl: 'https://yt3.ggpht.com/a-/AJLlDp0VxNB9AWWpNbXvmG8izm_Y655heq61QO1Inw=s900-mo-c-c0xffffffff-rj-k-no', tags: ['Music'], description: `Red Hot Chili Peppers are an American funk rock band formed in Los Angeles in 1983. The group's musical style primarily consists of rock with an emphasis on funk, as well as elements from other genres such as punk rock and psychedelic rock.`}),
    Station.create({name: 'Up First', logoUrl: 'https://media.npr.org/assets/img/2017/03/21/upfirst_sq-ffcb53c89446b62b66fefb97b9356ad49b31bc5d-s700-c85.png', tags: ['News'], description: `NPR's Up First is the news you need to start your day. The biggest stories and ideas — from politics to pop culture — in 10 minutes. Hosted by Rachel Martin, David Greene and Steve Inskeep, with reporting and analysis from NPR News. Available weekdays by 6 a.m. ET. Subscribe and listen, then support your local NPR station at donate.npr.org.`}),
  ])

  const broadcasts = await Promise.all([
    Broadcast.create({name: 'This is a test', description: 'Test Broadcast', tags: ['Test Cast'], stationId: 1, userId: 1}),
    Broadcast.create({name: "This is fake", description: "News", tags: ['Tech'], stationId: 2, userId: 2}),
    Broadcast.create({name: "Our first Broadcast", description: "Trial Run", tags: ['Newbies'], stationId: 3, userId: 3}),
    Broadcast.create({name: "This week in Silicon Valley", description: "Walmart goes head-to-head with amazon on big deals", tags: ['Clickbait'], stationId: 4, userId: 4}),
    Broadcast.create({name: "This Week in Nature Valley", description: "Still making Ranch Dressing", tags: ['Ranch'], stationId: 5, userId: 5}),
    Broadcast.create({name: "Let's talk, Google Assistant", description: "Touching on the recently unveiled 'Google Assistant'", tags: ['AI'], stationId: 6, userId: 6}),
    Broadcast.create({name: "Css Grid Vs FlexBox", description: "Which to learn first", tags: ['Tech Talch'], stationId: 7, userId: 7}),
    Broadcast.create({name: "Linux Vs Mac Development", description: "Which is the better enviornment", tags: ['consumer'], stationId: 8, userId: 8}),
    Broadcast.create({name: "Tabs Or Spaces", description: "Little things in development, that end up being a BIG deal", tags: ['Dev Tips'], stationId: 9, userId: 9}),
    Broadcast.create({name: "Nvidia GeForece 1180", description: "Will it be worth the wait, should I just spend thirteen grand on a max spec iMac pro??", tags: ['Nerd Stuff'], stationId: 5, userId: 3}),
    Broadcast.create({name: 'Game of Thrones', description: 'A recap/analysis of the popular show.', tags: ['Analysis'], stationId: 5,audioPath: null, isLive: false, isArchived: false, userId: 2}),
    Broadcast.create({name: '20 Questions', description: '20 Questions to ask someone to get a better understanding of who they are and how they think.', tags: ['Mind Games'], stationId: 4,audioPath: null, isLive: false, isArchived: false, userId: 1}),
    Broadcast.create({name: '60 Seeconds', description: 'Second By second recap of the real life news situations, Journalism at it\'s best', tags: ['Lifestyle'], stationId: 4,audioPath: null, isLive: false, isArchived: false, userId: 4}),
    Broadcast.create({name: 'The Illusion', description: 'Step by step \'talk-throughs\' of the oldest magic tricks in the book. With the addition of some of the more popular tricks done by famous magicians.', tags: ['Magic'], stationId: 12,audioPath: null, isLive: false, isArchived: false, userId: 5}),
    Broadcast.create({name: 'Book club', description: 'Tune in to hear recaps of the book of the week. By two notorious book worms, and intermittent special guests.', tags: ['Reading'], stationId: 3,audioPath: null, isLive: false, isArchived: false, userId: 6}),
    Broadcast.create({name: 'Food Is Rad.io', description: 'Rotating Host\'s talking about the best unknown spots in their boroughs.', tags: ['Food', 'Lifestyle'], stationId: 12,audioPath: null, isLive: false, isArchived: false, userId: 10}),
    Broadcast.create({name: 'This week in science', description: 'All the breakthroughs you heard and missed, recapped in a two hour cast.', tags: ['Science', 'Earth Science', 'Learning'], stationId: 4,audioPath: null, isLive: false, isArchived: false, userId: 11}),
    Broadcast.create({name: 'Choosing the right parts for the build.', description: 'Episode 4 of the build a hackintosh for under $100 dollars series.', tags: ['Tech'], stationId: 7, audioPath: null, isLive: false, isArchived: false, userId: 12}),
    Broadcast.create({name: 'Californication', description: '', tags: ['Music'], stationId: 14, audioPath: null, isLive: false, isArchived: true, userId: 21}),
    Broadcast.create({name: 'Dark Necessities', description: '', tags: ['Music'], stationId: 14, audioPath: null, isLive: false, isArchived: true, userId: 21}),
    Broadcast.create({name: '5-11-18', description: '', tags: ['News'], stationId: 15, audioPath: null, isLive: false, isArchived: true, userId: 22}),
    Broadcast.create({name: '5-14-18', description: '', tags: ['News'], stationId: 15, audioPath: null, isLive: false, isArchived: true, userId: 22}),
    Broadcast.create({name: '5-15-18', description: '', tags: ['News'], stationId: 15, audioPath: null, isLive: false, isArchived: true, userId: 22}),
    Broadcast.create({name: '5-16-18', description: '', tags: ['News'], stationId: 15, audioPath: null, isLive: false, isArchived: true, userId: 22}),
    Broadcast.create({name: `1. The Internet, Browsers, and How JavaScript Became Trendy`, description: `Corey and Geoff break down the internet. What allows us to just type a few words in the URL bar of our browser and, like magic, we're looking at a million cute puppies? How did browsers come about and how did JavaScript become so dang important?`, tags: ['Coding'], stationId: 2, audioPath: null, isLive: false, isArchived: true, userId: 23}),
    Broadcast.create({name: `2. Understanding Data: Bits to Bytes to Paul Revere's Lights`, description: `Corey and Geoff dive into data. What exactly is data? How do our devices store that very necessary photo you took of yourself when you started your new workout routine? #DayOne #NewYearNewMe`, tags: ['Coding'], stationId: 2, audioPath: null, isLive: false, isArchived: true, userId: 23}),
    Broadcast.create({name: `3. Algorithms: Problem Solving and Logical Conniving`, description: `Corey and Geoff discuss algorithms in modern computing, the ways they are commonly designed, as well as some of their well-known limitations. These two accomplish this in a non-technical way by addressing Geoff's "obsession" with carnivals.`, tags: ['Coding', 'Algorithms'], stationId: 2, audioPath: null, isLive: false, isArchived: true, userId: 23}),
    Broadcast.create({name: `4. Performance: The Art of Making Software Faster`, description: `Corey and Geoff discuss the performance of our logic. How is it possible that checking if you put "apples" on a shopping list of 1-million items could take less time than sifting through a list of just 100 items?`, tags: ['Coding'], stationId: 2, audioPath: null, isLive: false, isArchived: true, userId: 23}),
  ])
  //

  const audioSeed = await Promise.all([
    getAudioFile('californication.mp3', 19),
    getAudioFile('dark-necessities.mp3', 20),
    getAudioFile('upfirst-5-11-18.mp3', 21),
    getAudioFile('upfirst-5-14-18.mp3', 22),
    getAudioFile('upfirst-5-15-18.mp3', 23),
    getAudioFile('upfirst-5-16-18.mp3', 24),
    getAudioFile('techd-out-1.m4a', 25),
    getAudioFile('techd-out-2.m4a', 26),
    getAudioFile('techd-out-3.m4a', 27),
    getAudioFile('techd-out-4.m4a', 28),
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
  summary: '',
  broadCasterRating: ,
  callerRating:
})

User.create({userName: '',email: '', password: '', profilePic: '', summary: '', broadcasterRating: , callerRating: })

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
