# CCI-Diploma-Show

The tiniest MMORPG. Choose an avatar and hang out with your friends while attending the end of year (2020) show for the [UAL Creative Computing Institute](https://www.arts.ac.uk/creative-computing-institute)'s [Diploma in Creative Computing](https://www.arts.ac.uk/subjects/creative-computing/undergraduate/ual-creative-computing-institute-diploma).

<a href="https://cci.arts.ac.uk" target="_blank">>>>Try it here<<<</a>

The project was based on an earlier project - [LIKELIKE Online](https://github.com/molleindustria/likelike-online) by [Molleindustria](http://molleindustria.org/).

You can mod it to create your own virtual exhibitions, multi-user environments or games.  
It's designed to be extensible by just editing the data.js file and a few settings at the beginning of server.js and client.js.

CCI-Diploma-Show was built with [node.js](https://nodejs.org/), [socket.io](https://socket.io/), [p5.js](https://p5js.org/), and the p5.js add-on [p5.play](https://molleindustria.github.io/p5.play/).

Licensed under a GNU Lesser General Public License v2.1.

# Team

CCI-Diploma-Show was created by students from the Diploma: [Bea](https://github.com/bats1996), [Zhiqin](https://github.com/bettyluzhiqin), [Eunah](https://github.com/eunah-lee), [Jessie](https://github.com/jessieziyun) and [Max](https://github.com/MaximilianUAL2020).

## The .env file

.env is a text file in the root folder that contains private variables, in this case admin usernames and passwords and the port used by the project. It's not published on github and it's not automatically published on glitch so you may have to create it manually and/or copy paste the content in the glitch editor and/or in your code editor if you are running is as a local project.

An example of .env file for LIKELIKE online is:

```javascript
(ADMINS = adminname1 | pass1), adminname2 | pass2;
PORT = 3000;
```

The admin names are reserved. Logging in as "adminname|pass" (nickname and password separated by a "|") will grant the user admin priviledges such as banning IP or sending special messages.

## Editing

First make sure you sure you have [git](https://git-scm.com/) installed

### Running CCI Diploma Show locally

* Make sure you have [Node.js](https://nodejs.org/en/) installed
* Fork this repository then click on the **Clone or download** button to get its url
* Clone using `git clone "url"`on your command line
* Navigate to the repository on your command line then type in `node server.js` to run.
* Navigate to **localhost:3000** to view

### Update CCI Diploma Show with your changes

* Save your changes and commit:  
`git add .` (adds all your updated files to the staging area)  
`git commit -m "Your message here"` (commits your changes with a message)  
* Push your local commits to GitHub  
`git push`
* Make a pull request on GitHub