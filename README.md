# Music-Discovery-Application
Code Platoon personal project | Full Stack Application



Project Title: Lucid Streaming

Project Description:

Lucid Streaming is a music discovery application designed to enhance your musical journey. The application offers an innovative way to curate playlists based on user input. Here's how it works:

  Genre Selection: Users start by selecting two genres from a list. These genres serve as the foundation for playlist generation.
  
  Artist Selection: The application then generates artists who share similarities with the chosen genres. Users can pick three artists to refine their music search.
  
  Music Customization: Users are prompted to specify their preferences for music based on factors such as danceability, speechiness, popularity, instrumental content, beats per minute, and more.
  
  Lucid Streaming broadens your musical horizons by introducing you to a diverse range of music, tailored to your mood and preferences. It's an ideal platform for discovering new artists and expanding your musical palette.


Tech Stack:

Lucid Streaming leverages a robust tech stack for its development:

  Backend: Django Rest Framework
  
  Database: PostgreSQL for storing user data and authentication
  
  Frontend: React.js with a touch of Bootstrap for CSS
  
  Languages: Python for backend and JavaScript for frontend
  
  API Integration: Utilizes the Spotify API to source music data
  
  API Operations: Implements CRUD operations for its API functionality

Challenges:

While building Lucid Streaming, several challenges were encountered, including:

  Spotify Authentication: Integrating Spotify authentication proved to be a significant challenge. Initially, i attempted to handle all authentication internally, but it was later discovered that Spotify's authentication was necessary. Navigating the intricacies of the Spotify API and choosing the most suitable approach for authentication required time and effort.

  Complexity of Spotify API: The Spotify API presented complexities that were not immediately straightforward. Multiple solutions existed for addressing the same problem, necessitating careful consideration to determine the most effective approach.

Walkthrough of the Application:

Homescreen:

  The first page is the Homescreen which holds a very simple navigation bar prompting you to either sign in or sign up if you are not a user. There is also a Home button that will return you back to this page

![homepage](https://github.com/rdelagarza12/music-discovery-app/assets/119212006/3c809233-31c6-47cc-b8b9-4a144ad49bbb)

Sign In / Sign Up:

The Sign-In and Sign-Up pages may appear quite similar in their visual design, but it's the underlying functionality that sets them apart. Here's how they differ:

Sign-Up:
When a user is signing up for the first time, the application collects their input data. This data is then sent to the backend, where a series of important actions take place:

User Creation: The backend creates a new user account and generates a user profile based on the provided input.

Authentication Token: An authentication token is generated for the newly created user. This token is crucial for securing and verifying the user's identity during their interactions with the application.

Spotify Authentication: The user is redirected to the Spotify login website, where they authenticate themselves. As a result, the user receives an access token and a refresh token from Spotify.

This multi-step process ensures that a new user's account is set up correctly and securely.

Sign-In:
For returning users attempting to sign in, a slightly different process occurs:

User Verification: The input data provided by the user during the sign-in attempt is cross-referenced with the backend to confirm the user's existence and validity.

Token Assignment: Upon successful verification, the user is assigned a token. This token is used to authenticate the user for their current session.

In summary, while the Sign-In and Sign-Up pages may look alike, they each perform distinct operations behind the scenes to either establish new user accounts or verify the identities of returning users, all while ensuring the security and integrity of the authentication process.

![signin](https://github.com/rdelagarza12/music-discovery-app/assets/119212006/5d77eeb7-cb68-457c-9f0f-15e0c39d5aa8)

User Profile:
After successful authentication, the user is seamlessly redirected to their personalized profile, where they gain access to a robust set of CRUD (Create, Read, Update, Delete) capabilities handled by the backend. Within their profile, users can:

View Existing Playlists: Users can effortlessly explore their library, which contains all their existing playlists, making it easy to access their favorite music collections.

Create New Playlists: The application empowers users to create entirely new playlists, providing them with a dynamic and customizable music experience.

Delete Playlists: If users wish to declutter their library or no longer need a playlist, they have the option to delete playlists, ensuring their library remains organized and tailored to their preferences.

These comprehensive CRUD capabilities offer users complete control over their music library, allowing them to curate, manage, and enjoy their music in a way that best suits their tastes and preferences.

![profile](https://github.com/rdelagarza12/music-discovery-app/assets/119212006/19a61543-adc8-400c-ab8c-333ff36ba382)

Creating a playlist:

Selecting Genres:
  If the user decides to create a new playlist he is redirected to the playlist Generator where the first thing he is prompted with is to select two Genres

![selectgenre](https://github.com/rdelagarza12/music-discovery-app/assets/119212006/3484b2e3-f6a6-4f9c-85c7-7bf7ae1836e6)

Selecting Artists
  After selected his desired Genres, the application makes an axios call to the Spotify API using the genres selected as input and returns a lists of artists sharing the same genres

![selectartists](https://github.com/rdelagarza12/music-discovery-app/assets/119212006/ae438a8b-acc9-47f3-a68b-9ebfb7a76ec7)

Fine Tuning your Search:
  If the two genres and 3 artists are selected the user can fine tune their search by a variety of factors:

![selectfinetune](https://github.com/rdelagarza12/music-discovery-app/assets/119212006/3239bf49-b033-407a-86e4-fdfa69dde3ca)

Receiving your new playlist:
  If the user has made it up to this point, their new playlist is now displayed and they can decide whether they want to save the playlist or not

![personalizedplaylist](https://github.com/rdelagarza12/music-discovery-app/assets/119212006/697a718c-f84c-4d5b-9482-042a70be0772)

Saving The Playlist:
  Depending on whether the user decides to move forward with saving the playlist, he will either be redirected back or his new playlist will be saved into our backend for future use. While everything is being saved a loading screen while take its place on the screen

![savingplaylist](https://github.com/rdelagarza12/music-discovery-app/assets/119212006/3b2470d5-247d-4ac9-842b-502f30b70532)

Finally the user is returned back to their profile where they will be able to listen to their new playlist. Clicking the title of their Playlist they are shown the list of songs this list holds and can decide to choose play. If Play is selected they are redirected to the Music Player where they can enjoy their new music

![singleplaylist](https://github.com/rdelagarza12/music-discovery-app/assets/119212006/d73e1649-69bf-4f36-a2e9-70f692d623d1)

![musicplayer](https://github.com/rdelagarza12/music-discovery-app/assets/119212006/82ca4639-137d-4f9b-bf56-3ac054a1a060)













