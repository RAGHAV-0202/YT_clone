const api_key = "AIzaSyC9Jdf7e6g-8_c21p_lucNFKLjfN4HKqTE"

const video_box = document.querySelector(".videos-box");

const fetch_data = async()=>{
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=53&regionCode=US&videoCategoryId=0&key=${api_key}`);
    data = await response.json()
    console.log(data)
    
    for(i = 0 ; i < data.items.length; i++){
        createVid(data.items[i])

    }
}

fetch_data()

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


function createVid(data){
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
    const id = data.id
    const ago = (timeSince(data.snippet.publishedAt))
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

const categories = {
  "kind": "youtube#videoCategoryListResponse",
  "etag": "QteLrrS_X7rM7rlcU_e7qa0embQ",
  "items": [
    {
      "kind": "youtube#videoCategory",
      "etag": "grPOPYEUUZN3ltuDUGEWlrTR90U",
      "id": "1",
      "snippet": {
        "title": "Film & Animation",
        "assignable": true,
        "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
      }
    },
    {
      "kind": "youtube#videoCategory",
      "etag": "Q0xgUf8BFM8rW3W0R9wNq809xyA",
      "id": "2",
      "snippet": {
        "title": "Autos & Vehicles",
        "assignable": true,
        "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
      }
    },
    {
      "kind": "youtube#videoCategory",
      "etag": "qnpwjh5QlWM5hrnZCvHisquztC4",
      "id": "10",
      "snippet": {
        "title": "Music",
        "assignable": true,
        "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
      }
    },
    {
      "kind": "youtube#videoCategory",
      "etag": "HyFIixS5BZaoBdkQdLzPdoXWipg",
      "id": "15",
      "snippet": {
        "title": "Pets & Animals",
        "assignable": true,
        "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
      }
    },
    {
      "kind": "youtube#videoCategory",
      "etag": "PNU8SwXhjsF90fmkilVohofOi4I",
      "id": "17",
      "snippet": {
        "title": "Sports",
        "assignable": true,
        "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
      }
    },
    {
      "kind": "youtube#videoCategory",
      "etag": "5kFljz9YJ4lEgSfVwHWi5kTAwAs",
      "id": "18",
      "snippet": {
        "title": "Short Movies",
        "assignable": false,
        "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
      }
    },
    {
      "kind": "youtube#videoCategory",
      "etag": "ANnLQyzEA_9m3bMyJXMhKTCOiyg",
      "id": "19",
      "snippet": {
        "title": "Travel & Events",
        "assignable": true,
        "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
      }
    },
    {
      "kind": "youtube#videoCategory",
      "etag": "0Hh6gbZ9zWjnV3sfdZjKB5LQr6E",
      "id": "20",
      "snippet": {
        "title": "Gaming",
        "assignable": true,
        "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
      }
    },
    {
      "kind": "youtube#videoCategory",
      "etag": "q8Cp4pUfCD8Fuh8VJ_yl5cBCVNw",
      "id": "21",
      "snippet": {
        "title": "Videoblogging",
        "assignable": false,
        "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
      }
    },
    {
      "kind": "youtube#videoCategory",
      "etag": "cHDaaqPDZsJT1FPr1-MwtyIhR28",
      "id": "22",
      "snippet": {
        "title": "People & Blogs",
        "assignable": true,
        "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
      }
    },
    {
      "kind": "youtube#videoCategory",
      "etag": "3Uz364xBbKY50a2s0XQlv-gXJds",
      "id": "23",
      "snippet": {
        "title": "Comedy",
        "assignable": true,
        "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
      }
    },
    {
      "kind": "youtube#videoCategory",
      "etag": "0srcLUqQzO7-NGLF7QnhdVzJQmY",
      "id": "24",
      "snippet": {
        "title": "Entertainment",
        "assignable": true,
        "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
      }
    },
    {
      "kind": "youtube#videoCategory",
      "etag": "bQlQMjmYX7DyFkX4w3kT0osJyIc",
      "id": "25",
      "snippet": {
        "title": "News & Politics",
        "assignable": true,
        "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
      }
    },
    {
      "kind": "youtube#videoCategory",
      "etag": "Y06N41HP_WlZmeREZvkGF0HW5pg",
      "id": "26",
      "snippet": {
        "title": "Howto & Style",
        "assignable": true,
        "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
      }
    },
    {
      "kind": "youtube#videoCategory",
      "etag": "yBaNkLx4sX9NcDmFgAmxQcV4Y30",
      "id": "27",
      "snippet": {
        "title": "Education",
        "assignable": true,
        "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
      }
    },
    {
      "kind": "youtube#videoCategory",
      "etag": "Mxy3A-SkmnR7MhJDZRS4DuAIbQA",
      "id": "28",
      "snippet": {
        "title": "Science & Technology",
        "assignable": true,
        "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
      }
    },
    {
      "kind": "youtube#videoCategory",
      "etag": "p3lEirEJApyEkuWpaGEHoF-m-aA",
      "id": "29",
      "snippet": {
        "title": "Nonprofits & Activism",
        "assignable": true,
        "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
      }
    },
    {
      "kind": "youtube#videoCategory",
      "etag": "4pIHL_AdN2kO7btAGAP1TvPucNk",
      "id": "30",
      "snippet": {
        "title": "Movies",
        "assignable": false,
        "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
      }
    },
    {
      "kind": "youtube#videoCategory",
      "etag": "Iqol1myDwh2AuOnxjtn2AfYwJTU",
      "id": "31",
      "snippet": {
        "title": "Anime/Animation",
        "assignable": false,
        "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
      }
    },
    {
      "kind": "youtube#videoCategory",
      "etag": "tzhBKCBcYWZLPai5INY4id91ss8",
      "id": "32",
      "snippet": {
        "title": "Action/Adventure",
        "assignable": false,
        "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
      }
    },
    {
      "kind": "youtube#videoCategory",
      "etag": "ii8nBGYpKyl6FyzP3cmBCevdrbs",
      "id": "33",
      "snippet": {
        "title": "Classics",
        "assignable": false,
        "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
      }
    },
    {
      "kind": "youtube#videoCategory",
      "etag": "Y0u9UAQCCGp60G11Arac5Mp46z4",
      "id": "34",
      "snippet": {
        "title": "Comedy",
        "assignable": false,
        "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
      }
    },
    {
      "kind": "youtube#videoCategory",
      "etag": "_YDnyT205AMuX8etu8loOiQjbD4",
      "id": "35",
      "snippet": {
        "title": "Documentary",
        "assignable": false,
        "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
      }
    },
    {
      "kind": "youtube#videoCategory",
      "etag": "eAl2b-uqIGRDgnlMa0EsGZjXmWg",
      "id": "36",
      "snippet": {
        "title": "Drama",
        "assignable": false,
        "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
      }
    },
    {
      "kind": "youtube#videoCategory",
      "etag": "HDAW2HFOt3SqeDI00X-eL7OELfY",
      "id": "37",
      "snippet": {
        "title": "Family",
        "assignable": false,
        "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
      }
    },
    {
      "kind": "youtube#videoCategory",
      "etag": "QHiWh3niw5hjDrim85M8IGF45eE",
      "id": "38",
      "snippet": {
        "title": "Foreign",
        "assignable": false,
        "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
      }
    },
    {
      "kind": "youtube#videoCategory",
      "etag": "ztKcSS7GpH9uEyZk9nQCdNujvGg",
      "id": "39",
      "snippet": {
        "title": "Horror",
        "assignable": false,
        "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
      }
    },
    {
      "kind": "youtube#videoCategory",
      "etag": "Ids1sm8QFeSo_cDlpcUNrnEBYWA",
      "id": "40",
      "snippet": {
        "title": "Sci-Fi/Fantasy",
        "assignable": false,
        "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
      }
    },
    {
      "kind": "youtube#videoCategory",
      "etag": "qhfgS7MzzZHIy_UZ1dlawl1GbnY",
      "id": "41",
      "snippet": {
        "title": "Thriller",
        "assignable": false,
        "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
      }
    },
    {
      "kind": "youtube#videoCategory",
      "etag": "TxVSfGoUyT7CJ7h7ebjg4vhIt6g",
      "id": "42",
      "snippet": {
        "title": "Shorts",
        "assignable": false,
        "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
      }
    },
    {
      "kind": "youtube#videoCategory",
      "etag": "o9w6eNqzjHPnNbKDujnQd8pklXM",
      "id": "43",
      "snippet": {
        "title": "Shows",
        "assignable": false,
        "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
      }
    },
    {
      "kind": "youtube#videoCategory",
      "etag": "mLdyKd0VgXKDI6GevTLBAcvRlIU",
      "id": "44",
      "snippet": {
        "title": "Trailers",
        "assignable": false,
        "channelId": "UCBR8-60-B28hp2BmDPdntcQ"
      }
    }
  ]
}
