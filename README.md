# Heart Projector Online

This is a fork of the lovely LIKELIKE Online, which you should 100% check out.

To run the project locally, add a `.env` file (see below) and the run the following commands:

```
yarn install
yarn start
```

This will start the server and watch local files for changes. When you make a change you will need to refresh the browser, but you will not need to restart the server.

---

The tiniest MMORPG. Choose an avatar and hang out with your friends in a virtual version of [LIKELIKE](http://likelike.org/shows) a videogame gallery in Pittsburgh, PA.

<a href="https://likelike.glitch.me/" target="_blank">>>>Try it here<<<</a>

This project was created during the COVID-19 quarantine and was meant to evoke the social aspect of LIKELIKE's exhibitions.  
You can mod it to create your own virtual exhibitions, multi-user environments or games.  
It's designed to be extensible by just editing the data.js file and a few settings at the beginning of server.js and client.js.  

The code is extensively commented but it was put together very quickly (about a 10 days) so it's not meant to be a robust, beginner-friendly tool. You'll need some node.js and javascript knowledge to adapt it to your needs. Use at your own risk.

LIKELIKE Online is built with node.js, socket.io, [p5.js](https://p5js.org/), and the add-on [p5.play](https://molleindustria.github.io/p5.play/), it's hosted on [glitch.com](https://glitch.com/).  

LIKELIKE Online is a project by [Molleindustria](http://molleindustria.org/).  

Licensed under a GNU Lesser General Public License v2.1.

![](promo.gif)

## Publishing on Glitch

**Glitch** is a community and a suite of online tools to develop web applications.
Glitch provides free hosting for node.js projects. Most web hosts don't give you that degree of access. Another popular platform is heroku.
Glitch offers a code editor, file storage, and an intergrated terminal. You can create node applications from scratch via browser.
Glitch allows you to browse and remix other people projects.

LIKELIKE Online is already structured for glitch deployment with a server.js and a package.json on the root, and a "public" folder.
You can deploy this app to Glitch via github or [other git repositories](https://medium.com/glitch/import-code-from-anywhere-83fb60ea4875)

You can clone LIKELIKE online by creating a Glitch account and remixing it from the web interface <a href="https://glitch.com/edit/#!/likelike" target="_blank">>>> here <<<</a>

Alternatively you can follow this process to deploy it starting from a zip of the project folder:

* Create a ZIP file of the project.
* Upload it to the assets folder in your project, click it and click **Copy Url**
* Starting from an empty or existing glitch project, navigate to **Settings > Advance Options > Open Console**
* In the console, pull the zip file from the url (keep file.zip name, it's just a temporary file)  
`wget -O file.zip https:///url-to-your-zip`  

* Extract it to the root folder
`unzip file.zip -d .`  

* Remove the zip file
`rm file.zip`  

* Refresh our app so the new files are shown in the editor and published
`refresh`  

**Warning** A free Glitch account has a limit of 4000 requests per hour, this projects loads a lot of individual image assets so you can go over the limit pretty easily. Consider purchasing a paid account for a public-facing project.

## The .env file

.env is a text file in the root folder that contains private variables, in this case admin usernames and passwords and the port used by the project. It's not published on github and it's not automatically published on glitch so you may have to create it manually and/or copy paste the content in the glitch editor and/or in your code editor if you are running is as a local project.

An example of .env file for LIKELIKE online is:

```javascript
ADMINS=adminname1|pass1,adminname2|pass2  
PORT = 3000
```

Admin names are reserved. Logging in as "adminname|pass" (nickname and password separated by a "|") will grant the user admin priviledges such as banning IP or sending special messages.
