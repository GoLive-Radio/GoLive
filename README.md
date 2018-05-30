# GoLive Radio - live broadcasting for all

## Introduction

GoLive Radio is an 1802-FSA-NY capstone project created by Jared Jackson, Ruta Kruliauskaite, Nick Milazzo, and Alex Sobiloff.

We developed a live audio streaming platform that allows people around the world to connect over common interests. Our platform makes it easy for anyone to live broadcast their voice at a moment's notice. It is a free platform and requires nothing more than a computer and mic to generate content.

Anybody can listen to live and archived broadcasts, but in order to create a broadcast, one must log in or sign up and create a station. Once you've created a station you can then create a broadcast and go live! After you've finished broadcasting, broadcasts are automatically archived. Your previous broadcasts can be found on your station page or on the all broadcasts page. 

GoLive Radio will be undergoing continuous development, so feel check in now and then to see what new developments we've rolled out.

## Use

GoLive Radio uses a library built off of WebRTC and utilizing Socket.io called RTCMulticonnection. Socket.io is used to form a peer-to-peer connection taking the broadcasting burden off of the server. Each broadcast is capable of hosting up to 1000 connections. 

## Future goals for this project:
  - call-in system
  - broadcaster/caller rating system
  - station/broadcast rating system
  - soundboard
  - station, broadcast and user profile editing
  - scheduling
  - custom image uploads for broadcasts and stations
  - station subscriptions

Check out our app on [heroku](https://goliveradio.herokuapp.com).
You can see us talking about GoLive Radio on [Youtube](https://www.youtube.com/watch?v=0xPotLtyRX0).
