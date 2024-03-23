
const search = sessionStorage.getItem("search")
// console.log(search)


// let api_key = "AIzaSyC9Jdf7e6g-8_c21p_lucNFKLjfN4HKqTE"
// let api_key = "AIzaSyDGOf781Eu4ZBcHNqh-IDrKF7QoCSdlMlg"
// let api_key = "AIzaSyCX6rIEsjxisyUKdeStlyNoJsox713Ie6o"
let api_key = "AIzaSyAOth-ZSPGf2gVeBrhOmf7NdmNnB1YNdxc"

const video_box = document.querySelector(".videos-box");

const fetch_data = async(cID)=>{
    video_box.innerHTML = ""
    // console.log(cID)
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&chart=relevance&key=${api_key}&q=${search}`);
    data = await response.json()
    // console.log(data)
    
    for(i = 0 ; i < data.items.length; i++){
        createVid(data.items[i])

    }
}

fetch_data(0)



function createVid(data){
  let thumb_url ; 
    if(!data.snippet.thumbnails.maxres){
      thumb_url = (data.snippet.thumbnails.high.url);
    }else{
      thumb_url = (data.snippet.thumbnails.maxres.url);
    }
    const title = (data.snippet.title)
    const channel_name = (data.snippet.channelTitle); // channel
    const id = data.id.videoId
    const ago = (timeSince(data.snippet.publishedAt))
    let viewsformatted = 0 ; 

    let fetched_stats;

    fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${id}&key=${api_key}`)
        .then(res=> res.json())
        .then(fetched_stats=>{
            // console.log(fetched_stats);
            formatViews(fetched_stats); 
        })
        .catch(error => {
            console.error(error);
            viewsformatted = 0;
        });

    function formatViews(fetched_stats) {
        viewsformatted = 0;
        if (fetched_stats.items.length > 0) {
            let views = parseInt(fetched_stats.items[0].statistics.viewCount); 
            if (views > 1000000) {
                viewsformatted = Math.floor(views / 1000000) + "M";
            } else if (views > 1000) {
                viewsformatted = Math.floor(views / 1000) + "K";
            } else {
                viewsformatted = views; 
            }
        } else {
            viewsformatted = 0;
        }

        // console.log("Formatted views:", viewsformatted);
        createVideoElement(thumb_url, title, channel_name, id, ago, viewsformatted);
    }

    function createVideoElement(thumb_url, title, channel_name, id, ago, viewsformatted) {
        fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${data.snippet.channelId}&key=${api_key}`)
            .then(response => response.json())
            .then(channelData => {
                const channelLogoUrl = channelData.items[0].snippet.thumbnails.default.url;

                const newdiv = document.createElement("a");
                newdiv.setAttribute("href" , "video.html")
                newdiv.setAttribute("onclick" , "videoClicked(event)"  )
                newdiv.classList.add("video")
                newdiv.innerHTML = `<div class="top"><img class="top_img" src=${thumb_url}></div>
                    <div class="bottom">
                        <div class="left">
                            <div class="channel_logo">
                            <img class="channel_logo_img" src="${channelLogoUrl}">
                            </div>
                        </div>
                        <div class="right">
                            <div class="top2">
                                <span class="titile-span">${title}</span>
                            </div>
                            <div class="bottom">
                                <span class="channel-name">${channel_name}</span>
                                <span class="metrics">${viewsformatted} <span style="display: inline-block; font-size: 14px; color: hsl(0, 0%, 18.82%); background: none; border-radius: 6px; padding-top : 8px">•</span> ${ago}</span>

                            </div>
                        </div>
                    </div>`
                newdiv.setAttribute("yt_id", `${id}`);
                video_box.appendChild(newdiv);

            })
            .catch(error => console.error(error));
    }
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

function videoClicked(e){
  // console.log(e.target);
  let video ; 
  if(e.target.classList.contains("top_img")){
    video = (e.target.parentElement.parentElement)
  }else if(e.target.classList.contains("titile-span")){
    video = e.target.parentElement.parentElement.parentElement.parentElement
  }
 
  id = (video.getAttribute('yt_id'));
  sessionStorage.setItem("id" , id)
  
}







