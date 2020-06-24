let __createCommunity = (cn, ci)=>{
    $.post('../newCommunityRequest',{
        comm_name:cn,
        comm_info:ci,
        comm_user:localStorage.getItem('__CTRACK_USER_EMAIL__'),
    },
    (data)=>{
        if(data == "Access granted"){
            alert('Community created. Go to dashboard to view it')
        }
        else{
            alert(data)
        }
    })
}