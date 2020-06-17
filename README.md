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

# Editing locally: guide for dev team

First make sure you sure you have [git](https://git-scm.com/) installed

## Downloading and running

* Make sure you have [Node.js](https://nodejs.org/en/) installed
* Click on the **Clone or download** button in this repo to get its url
* Clone using `git clone "url"`on your command line
* Navigate to the repository on your command line then type in `node server.js` to run.
* Go to **localhost:3000** to view

## Branching: work on code without affecting the master branch

* To make a new **branch** and switch to it at the same time, run `git checkout -b branchName`
    * This is shorthand for:  
    `git branch branchName`  
    `git checkout branchName`
    * You can edit code and make changes here without affecting the master branch
* Save your changes and commit to this branch:  
`git add .` (adds all your updated files to the staging area)  
`git commit -m "Your message here"` (commits your changes with a message)  

For more detail visit the [official git documentation](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)

## Updating the remote repository on GitHub and making pull requests to merge

* Make sure your local repository is up to date
    * Navigate back to the master branch (or whichever branch you want to merge with)  
    `git checkout master/other`  
    * Update your local master\[/other\] branch by pulling any updates that may have been made to the remote repository to your local one  
    `git pull`  
    * Navigate back to your working branch  
    `git checkout branchName`  
* Merge the master\[/other\] branch into your branch (note: there may be merge conflicts if different people have worked on the same lines of code, so keep communicating!)  
`git merge master/other`  
* If you have made any changes since your last commit, commit them with a message  
`git commit -m "your message"`  
* Push your changes to GitHub. Your latest changes to your branch can now be viewed by other team members.  
`git push`  
* When your code is ready, it's time to make a **pull request** on GitHub. Got to your branch on GitHub and click on **New pull request**. Select the **base repository** (JGL/cci-diploma-show) with **base: master/other**. Add a short comment to describe the changes you've made and then click **Create pull request**
* The project manager or team member overseeing that branch will review your changes and decide whether to commit them. If further changes need to be made, you can add commits to your pull request after you have made them. If you want to address a specific team member, use their @ (like in any other social media site). Other team members can add comments to the code in your pull request if they have any, either directly to the line(s) in question, or as a general comment.
* If your pull request is accepted, the team member who has accepted it should delete the branch.
* To delete your branch locally, use `git branch -d branchName`

For more detail check out this [video](https://www.youtube.com/watch?v=oFYyTZwMyAg)