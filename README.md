# Saraf Singh Assoc.

## Corona Tracker to keep a track of Corona Virus

* In the command line, write <code>npm start</code> to start the server (To stop it, just press <kbd>ctrl+c</kbd>).Then go to [http://localhost:8000/](https://localhost:8000/) to view your project.

* All the html files have been changed to .hbs for client-sever communication. Normal html can be written in it , so no prob;)
* * *
* Linking files cannot be done the normal way. If you have to link file <code>src/index/index.hbs</code> to <code>src/about_us/about-us.hbs</code>, then in <code>src/index/index.hbs</code> you have to write <a href=\'../about_us\'><br>
And if you want to link a css or js file, it must be written in the format <code>../images/*foldername*/*filename*</code>. For ex.<br>
<code>\<link rel='stylesheet' href='../images/index/index.css'>
<br>
Above line includes src/index/index.css to your website
<br>
\<script src='../images/index/index.js'></script>
Above line includes src/index/index.js to your website
</code>
* * * 
* All the urls which can be used inside \<a\> tag are:
* * src/community_page/community-page.hbs => ../community_page/
* * src/index/index.hbs => ../
* * src/about_us/about-us.hbs => ../about_us/
* * *
* To create a new file, follow the steps:
* * Make a new folder in <code>src/</code>
* * Make the desired file inside it
* * Goto **App.js**
* * Add to **App.js** (before the console.log portion), the following code:<br>
<code>
    app.get('/*foldername*',(req,res)=>{
        <br>
        &nbsp;&nbsp;&nbsp;&nbsp;app.render('*foldername*/*filename*',{none:null})
        <br>
    })
</code>
* * Replace *foldername* with your created folder and *filename* with your created file (***filename* must have an extension of .hbs and not .html**). That file can be accessed using <code>../*foldername*</code>
* * Make sure to stop the server(<kbd>ctrl+c</kbd>) to update the changes in **App.js**
* * *
## Thank You
