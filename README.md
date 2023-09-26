Live at: https://shuffle-playlist.vercel.app/

# Playlist Shuffle - A web application to Shuffle your Youtube Playlist

Playlist Shuffle - A web application with a better algorithm than YouTube's for playlist shuffling. Shuffle your music and videos in a smarter way and enjoy an improved listening experience.

## How to combine multiple playlist

The maximum playlist size is "12000"
To combine multiple playlist you need to separate the playlist with a comma and add ", name:" at the end with the name you want the playlist to be called.
These are valid ways to mix playlists on the Search Bar:

# With the full playlist URL

https://www.youtube.com/playlist?list=PLH9twT5faHZX6hcW5fl-_WtsV2lMWbtjX, https://www.youtube.com/playlist?list=PL_dT1kMRpJEQyewQehX8LWYxve3iktijD, https://www.youtube.com/playlist?list=PLi06ybkpczJBvFfOhfqDyKMl1Lp2tDkTb, name:new playlist MIX with URL's

# With playlist ID's.

PLH9twT5faHZX6hcW5fl-\_WtsV2lMWbtjX, PL_dT1kMRpJEQyewQehX8LWYxve3iktijD, PLi06ybkpczJBvFfOhfqDyKMl1Lp2tDkTb, name:new playlist MIX with ID's

# Or with ID's and URL's

- After that you can shuffle the playlist
- If you put the wrong ID or URL it will ignore it and combine the others, so check the URL or ID
- If you sort the playlist by default the first video of each playlist will go first, PLA1, PLB1, PLC1, PLA2, PLB2, PLC3 and so on

## Key shortcuts

- "1", "2", "3", "4", "5", "6", "7", "8", "9" keys to seek at a different percentage of the video.
- "S" toggle to activate and deactivate shuffle on a playlist.
- "R" toggle to repeat the video until is deactivated again.
- "M" toggle to mute and unmute the video
- "Space" to pause and play the video.
- "ArrowLeft" to play the previous video.
- "ArrowRight" to play the next video.
- "ArrowUp" to turn the volume up by a 1/20
- "ArrowDown" to turn the volume down by a 1/20

## Uses mersenne-twister to randomize the videos

https://www.npmjs.com/package/mersenne-twister
