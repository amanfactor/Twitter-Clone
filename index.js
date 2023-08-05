import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
  
import { tweetsData } from "./data.js";

const tweetInputEl=document.getElementById('tweet-input');
const tweetBtnEl=document.getElementById('tweet-btn');
const feedEl=document.getElementById('feed');


document.addEventListener('click',function(e){
    if(e.target.dataset.like){
       handleLikeClick(e.target.dataset.like)
    }
    else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply);
    }
    else if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if(e.target.id === 'tweet-btn'){
        handleTweetBtn()
    }
})
  function handleTweetBtn(){
    const newObject={
        handle: "@AmanTripathi",
        likes: 0,
        retweets: 0,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        profilePic: "images/scrimbalogo.png",
        tweetText:`${tweetInputEl.value}`,
        uuid:`${uuidv4()}`,
    }
    if(newObject.tweetText){
    tweetsData.unshift(newObject);
    console.log(tweetsData)
    render();
    console.log(newObject)
    tweetInputEl.value=""; 
    }
    
 }


function handleReplyClick(tweetId){
    const commentTweetEl=document.getElementById(`replies-${tweetId}`)
    const classArray=commentTweetEl.classList;
    console.log(classArray)
    commentTweetEl.classList.toggle('hidden')
    /* if(classArray[0]==="hidden"){
        commentTweetEl.classList.remove('hidden')

    }
    else{
        commentTweetEl.classList.add('hidden')
    }
} */
}




function handleLikeClick(tweetId){
    const targetTweetObj=tweetsData.filter(function(obj){
                         return obj.uuid=== tweetId;

    })[0];
          if(targetTweetObj.isLiked){
            targetTweetObj.likes--;
          }
          else{
          targetTweetObj.likes+=1;
          }
         targetTweetObj.isLiked= !targetTweetObj.isLiked;
          render();
}
 
function handleRetweetClick(tweetId){
    const targetTweetObj=tweetsData.filter(function(obj){
                         return obj.uuid === tweetId;

    })[0];
            if(targetTweetObj.isRetweeted){
                targetTweetObj.retweets--;
            
            }
            else{
                targetTweetObj.retweets++;
            }
    targetTweetObj.isRetweeted=!targetTweetObj.isRetweeted;
    render();

}



function getFeedHTML(){
    let feedHtml="";
    
    tweetsData.forEach(function(object){
        let likedClass='';
        let retweetedClass='';
        if(object.isRetweeted){
            retweetedClass='retweeted'
        }
        if(object.isLiked){
            likedClass='liked'
        }
         let repliesHTML='';
        if(object.replies.length > 0){
           object.replies.forEach(function(tweetsReply){
           repliesHTML+=` <div class="tweet-reply">
            <div class="tweet-inner">
                <img src="${tweetsReply.profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${tweetsReply.handle}</p>
                        <p class="tweet-text">${tweetsReply.tweetText}</p>
                    </div>
                </div>
        </div>
        `
           })
        }
        
            feedHtml +=`<div class="tweet">
            <div class="tweet-inner">
                <img src="${object.profilePic}" class="profile-pic">
                <div>
                    <p class="handle">${object.handle}</p>
                    <p class="tweet-text">${object.tweetText}</p>
                    <div class="tweet-details">
                        <span class="tweet-detail">
                        <i class="fa-regular fa-comment-dots" data-reply="${object.uuid}"></i>
                        ${object.replies.length}
                        </span>
                        <span class="tweet-detail" >
                        <i class="fa-solid fa-heart ${likedClass}" data-like="${object.uuid}" ></i>
                        ${object.likes}
                        </span>
                        <span class="tweet-detail">
                        <i class="fa-solid fa-retweet ${retweetedClass}" data-retweet="${object.uuid}"></i>
                        ${object.retweets}
                        </span>
                    </div>   
                </div>            
             </div>
             <div class="hidden" id="replies-${object.uuid}">
             ${repliesHTML}
          </div>   
          </div>
        `
        /* if(object.replies.length > 0){
            document.getElementById(`replies-${object.uuid}`).style.display="none"
        } */

    })
    return feedHtml;
}
function render(){
         feedEl.innerHTML=getFeedHTML();    
  
}
render();
/* tweetsData.forEach(function(tweet){
    if(tweet.replies.length >0){
        document.getElementById(`replies-${tweet.uuid}`).style.display="none";
    }
})
 */

//${(Number(e.target.innerText)+1)}