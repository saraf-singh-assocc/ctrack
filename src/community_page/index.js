var firebaseConfig = {
    apiKey: "AIzaSyBaIwLYQionwFwlFCPtGmBNhg9JZ0_mqZA",
    authDomain: "corona-index-db.firebaseapp.com",
    databaseURL: "https://corona-index-db.firebaseio.com",
    projectId: "corona-index-db",
    storageBucket: "corona-index-db.appspot.com",
    messagingSenderId: "622446950632",
    appId: "1:622446950632:web:a6d2af3bda10eb97d4315d",
    measurementId: "G-HS31KZHBCP"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
const storage = firebase.storage();
const storageRef = storage.ref();

let __init__ = (id)=>{
    firebase.firestore().collection('user_communities').doc(id).get().then(qs=>{
        if(qs.data().followers.includes(localStorage.getItem('__CTRACK_USER_EMAIL__'))){
            document.getElementById('follow_btn').style.display = 'none';
            document.getElementById('unfollow_btn').style.display = 'block';
        }
    })
    firebase.firestore().collection('user_communities').doc(id).get().then(qs=>{
        if(qs.data().owner_email == localStorage.getItem('__CTRACK_USER_EMAIL__')){
            $('#main_btns').append(`
            <div class="form-group">
              <label class="custom-file">
                <input type="file" name="__nfile" id="__nfile" accept='video/*, image/*' onchange='$("#post_post").css("display","inline")' placeholder="Choose file" class="custom-file-input" aria-describedby="fileHelpId">
                <span class="custom-file-control btn btn-primary btn-lg" style='cursor:pointer'>Upload</span>
                </label>
                <br><br><br>
                <span class="btn btn-primary btn-lg display-none" id='post_post' style='cursor:pointer' onclick='__uploadPost(document.getElementById("__nfile").files[0],"${id}")'>Post</span>
            </div>
            <br>
            `)
        }
        $(".community_name").text(qs.data().community_name)
        $("#community_runners").html(`Created by ${qs.data().owner_email}<br>Run by ${qs.data().members.length} `+(qs.data().members.length == 1 ? "person":"people"))
        $("#community_info").text(qs.data().community_info)
        $("#comm-followers").text(`${qs.data().followers.length} `+(qs.data().followers.length == 1 ? "follower":"followers"))
    })
}

let __addFollower = (id)=>{
    firebase.firestore().collection('user_communities').doc(id).get().then(qs=>{
        if(qs.data().followers.includes(localStorage.getItem('__CTRACK_USER_EMAIL__'))){
            return;
        }
        else{
            firebase.firestore().collection('user_communities').doc(id).update({
                followers:firebase.firestore.FieldValue.arrayUnion(localStorage.getItem('__CTRACK_USER_EMAIL__'))
            }).then(()=>{
                alert(`Follow request successful`)
            })
        }
    })
}

let __removeFollower = (id)=>{
    firebase.firestore().collection('user_communities').doc(id).get().then(qs=>{
        if(!(qs.data().followers.includes(localStorage.getItem('__CTRACK_USER_EMAIL__')))){
            return;
        }
        else{
            firebase.firestore().collection('user_communities').doc(id).update({
                followers:firebase.firestore.FieldValue.arrayRemove(localStorage.getItem('__CTRACK_USER_EMAIL__'))
            }).then(()=>{
                alert(`Unfollowed`)
            })
        }
    })
}

let __uploadPost = (fileObj, id)=>{
    storageRef.child(`community_post/${localStorage.getItem('__CTRACK_USER_EMAIL__')}/${fileObj.name}`).put(fileObj).then(()=>{
        alert("Post successful")
    }).then(()=>{
        firebase.firestore().collection('user_communities').doc(id).update({
            user_posts:firebase.firestore.FieldValue.arrayUnion(fileObj.name)
        }).then(()=>{
            alert("Post successful")
        })
    })
}

let __getPosts = (id)=>{
    firebase.firestore().collection('user_communities').doc(id).get().then(qs=>{
        if(qs.data().followers.includes(localStorage.getItem('__CTRACK_USER_EMAIL__'))){
                qs.data().user_posts.forEach(doc=>{
                    storageRef.child(`community_post/${qs.data().owner_email}/${doc}`).getMetadata().then(data=>{
                    storageRef.child(`community_post/${qs.data().owner_email}/${doc}`).getDownloadURL().then(dat=>{
                        if(data.contentType.substr(0,5) == 'image'){
                            $("#post_center").append(`
                            <div class="col-xs-1-12">
                                <div class="card">
                                <div class="card-body">
                                <img class='img-thmbnail' src='${dat}' width='200' height='200' />
                                </div>
                                </div>
                            </div>   
                            `)
                        }
                        else if(data.contentType.substr(0,5) == 'video'){
                            $("#post_center").append(`
                            <div class="col-xs-1-12">
                                <div class="card">
                                    <div class="card-body">
                                        <video width='200' name='hi' height='200' loop autoplay muted onclick='this.muted = !this.muted' controlsList='nodownload'>
                                            <source src='${dat}' type='${data.contentType}'>
                                            Video is not supported
                                        </video>
                                        <br>
                                    <!--<center><button class='btn btn-primary btn-lg'><i>Fullscreen</i></button></center>-->
                                    </div>
                                </div>
                            </div>   
                            `)
                        }
                    })
                })
            })
        }
        else{
            $("#post_center").html(`<h1 class='text-center'>Follow this community to see their posts</h1>`)
        }
    })
}