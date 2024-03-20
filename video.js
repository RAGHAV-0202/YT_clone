  // const api_key = "AIzaSyC9Jdf7e6g-8_c21p_lucNFKLjfN4HKqTE"
  const api_key = "AIzaSyDGOf781Eu4ZBcHNqh-IDrKF7QoCSdlMlg"



var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);



const title_area = document.querySelector(".title");
const channel_name_area = document.querySelector(".channel-name");
const like_count_area = document.querySelector(".like-count")
const views_area = document.querySelector(".views-count")
const published_area = document.querySelector(".date_data")
const desc_area = document.querySelector(".desc_data")



let videoId = sessionStorage.getItem("id")
getVideo(videoId);

async function getVideo(videoId) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet%2CcontentDetails%2Cstatistics&key=${api_key}`);
    const data = await response.json();
    if (data.items.length > 0) {
        const video = data.items[0]; 
        const views = video.statistics.viewCount

        let viewsformatted ; 
        if(views > 1000000){
            viewsformatted = Math.floor(views/1000000) + "M"
        }else if (views > 1000){
            viewsformatted = Math.floor(views/1000) + "K"
        }

        const title = video.snippet.title
        let like_counts = video.statistics.likeCount
        const published = timeSince(video.snippet.publishedAt)
        const description =  video.snippet.description
        const channel_name = video.snippet.channelTitle ;
        const channel_id = video.snippet.channelId
        // console.log(channel_id)
        // console.log(like_counts)
        if(like_counts > 10000){
          like_counts = Math.floor(like_counts / 1000) + "K"
        }else if (like_counts > 1000000){
          like_counts = Math.floor(like_counts / 1000000) + "M"
        }

        // const sub_count = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channel_id}&key=${api_key}`)
        // const sub_count2 = await sub_count.json()
        // console.log(sub_count2)


    fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${video.snippet.channelId}&key=${api_key}`)
        .then(response => response.json())
        .then(channelData => {
            let channelLogoUrl = channelData.items[0].snippet.thumbnails.default.url;

            channel_name_area.innerText = channel_name
            views_area.textContent = viewsformatted
            title_area.textContent = title
            like_count_area.textContent = like_counts
            published_area.textContent = published
            desc_area.textContent = description
            channel_name_area.textContent = channel_name 
            document.querySelector(".channel-logo").innerHTML = (`<img src="${channelLogoUrl}">`)
        })
        .catch(error => console.error(error));

    } else {
        console.log('Video not found');
    }
}




function onYouTubeIframeAPIReady() {
    var player = new YT.Player('player', {
      height: '100%',
      width: '100%',
      videoId: sessionStorage.getItem("id"), // Replace with your desired video ID
      playerVars: {
        'autoplay': 1, // Autoplay the video
        'controls': 1, // Hide player controls
        'modestbranding': 0, // Hide YouTube logo
        'rel': 0 ,// Prevent related videos from showing up after the video ends
        "showinfo" : 0 , 
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });

    function onPlayerReady(event) {
      event.target.playVideo();
      func()
    }

    function onPlayerStateChange(event) {
      if (event.data === YT.PlayerState.ENDED) {
        console.log('Video has ended');
      }
    }
  }

function onPlayerReady(event) {
  event.target.playVideo(); // Autoplay the video
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PAUSED) {
    document.getElementById('pause-overlay').style.display = 'none';
  } else {
    document.getElementById('pause-overlay').style.display = 'none';
  }
}

    function func(){
      const elem  = document.querySelector(".ytp-show-cards-title").
      elem.remove()
    }




function info_btn_click(e) {
    let elem = e.target.parentElement;
    let btn_pressed = elem.classList[0];
    

    if(e.target.parentElement.classList.contains("like-dislike")){
      elem = elem.children[0]
      btn_pressed = elem.classList[1]; 
    }

    elem = elem.children[0]
    btn_pressed = elem.classList[1]
    if(e.target.classList.contains("dislike2")){
      btn_pressed = "dislike"
    }

    if (elem.classList.contains("unfilled")) {
        document.querySelector("." + btn_pressed).style.fontVariationSettings = "'FILL' 1";
        elem.classList.remove("unfilled");
        elem.classList.add("filled");
    } else {
        document.querySelector("." + btn_pressed).style.fontVariationSettings = "'FILL' 0";
        elem.classList.remove("filled");
        elem.classList.add("unfilled");
    }
}




async function getVideos() {
        const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=53&regionCode=US&videoCategoryId=0&key=${api_key}`);
        const data = await response.json();
  for(var i = 0 ; i < data.items.length ; i++){
    createRVideos(data.items[i])
  }

}




function createRVideos(data){
  let thumb_url ; 
    if(!data.snippet.thumbnails.maxres){
      thumb_url = (data.snippet.thumbnails.high.url);
    }else{
      thumb_url = (data.snippet.thumbnails.maxres.url);
    }
    const title = (data.snippet.title)
    const channel_name = (data.snippet.channelTitle); // channel
    let views = (data.statistics.viewCount)//views
    let viewsformatted ; 
    if(views > 1000000){
        viewsformatted = Math.floor(views/1000000) + "M"
    }else if (views > 1000){
        viewsformatted = Math.floor(views/1000) + "K"
    }
    const ago = (timeSince(data.snippet.publishedAt))
    const id = data.id ; 
  const newDiv = document.createElement("div");
  newDiv.innerHTML = `<a onclick = "storeID(event)" yt_id = ${id} style="text-decoration: none; color: white;"" href='video.html' class="recommended-video">
                <div class="left">
                <img class="abcd" src="${thumb_url}">
                </div>
                <div class="right">
                    <p class="r_title">${title}</p>
                    <p class="r_channel_name">${channel_name}</p>
                    <p class="r_stats">${viewsformatted} Views · ${ago}</p>
                </div>
            </a>`
    
  document.querySelector(".vid-right").appendChild(newDiv)
}

function storeID(e){

  if(e.target.classList.contains("abcd")){
    elem = e.target.parentElement.parentElement
  }if(e.target.classList.contains("r_title")){
    elem = e.target.parentElement.parentElement
  }if (e.target.classList.contains("r_channel_name")){
    elem = e.target.parentElement.parentElement
  }if (e.target.classList.contains("r_stats")){
    elem = e.target.parentElement.parentElement
  }

  id = elem.getAttribute("yt_id");
  sessionStorage.setItem("id" , id);
}

function timeSince(dateString) {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date() - date) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
        return `${interval} years ago`;
    }

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return `${interval} months ago`;
    }

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        return `${interval} day${interval > 1 ? 's' : ''} ago`;
    }

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return `${interval} hour${interval > 1 ? 's' : ''} ago`;
    }

    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        return `${interval} minute${interval > 1 ? 's' : ''} ago`;
    }

    return `${Math.floor(seconds)} second${Math.floor(seconds) !== 1 ? 's' : ''} ago`;
}

document.querySelector(".desc").addEventListener("click" , extendDesc);
let count = 1 ; 
function extendDesc(){
  if(count % 2 == 0){
    document.querySelector(".desc").style.height = "160px"
  }else{
    document.querySelector(".desc").style.height = "min-content"
  }
  count ++ ; 
  
}