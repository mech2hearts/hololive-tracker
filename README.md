## Who/What is Hololive? (https://en.hololive.tv/)
Hololive is a Japanese streaming group comprised of about 30 members, each utilizing a virtual persona
and participating in many activities such as playing video games, singing karaoke, and etc.
There popularity has grown to the point that they have achieved a widespread overseas audience, even within the United States.
![Members of Hololive](https://i.imgur.com/CzJkeLJ.png)  

## What is the purpose of this application?
Over the past couple of years, Hololive has recruited new members to the point where their numbers exceed 30. Almost each member
streams every day as well as uploading other videos. This application's intended function is to track live streams, upcoming streams,
and archive a list of all of their past videos?
![Test display of upcoming streams](https://i.imgur.com/WgXN0Sa.png)


## How does it work?
The application stays up to date by utilizing the Youtube Data API. An initial search of each Hololive members activity will be archived
in our database for future queries, and updates to their activities will (ideally) be conducted every hour. Multiple GET requests are used
with the Search:list function of the API, utilizing parameters such as eventType to stay up to date with each member's activities.


## Current Goals
1. Gain an increase on the upper limit of queries allowed for the Youtube Data API
1. Display accurate data and activities for each member of Hololive
1. Creating an appealing and functional web interface for users
1. Official deployment and public access to this application
