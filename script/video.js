
function loadCategory() {
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => display(data.categories))
}


function activeButton(id){
 const buttonList=document.getElementsByClassName('btn-list');

 for(x of buttonList){
  x.classList.remove('bg-green-400')

 }
 document.getElementById(`btn-${id}`).classList.add('bg-green-400');
}

function display(data) {
  const categoryContainer = document.getElementById('container')

  data.forEach(element => {
    let btnContainer = document.createElement('div');
    btnContainer.innerHTML = `
    <button class="btn-list btn" id="btn-${element.category_id}" onclick='loadCategoryVideos(${element.category_id})'>${element.category}</button>

    `

    categoryContainer.append(btnContainer)
  });
}

function loadCategoryVideos(id) {
// a task is rest here.
activeButton(id);
  // document.getElementById(`btn-${id}`).classList.add('bg-green-400');
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data => displayVideos(data.category))
}


function showDetails(video_id){
  fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${video_id}`)
  .then(res=>res.json())
  .then(data=>showModal(data.video))
}


function showModal(data){
  
  document.getElementById('modal-content').innerHTML=
  `

  <img src="${data.thumbnail}" width="100" height="100">
 
   <p>${data.title}</p>
   <p>${data.authors[0].profile_name}</p>
  `;

  document.getElementById('customModalData').click();
}





function getTimeString(time) {
  const year = parseInt(time / 31536000);

  if (year !== 0) return `${year}y ago`
  let remainingSecond = time % 31536000;
  const months = parseInt(remainingSecond / 2592000);

  if (months != 0) return `${months}mon ago`
  remainingSecond = remainingSecond % 2592000;
  const days = parseInt(remainingSecond / 86400);
  if (days != 0) return `${days}d ago`


  remainingSecond = remainingSecond % 86400;
  const hours = parseInt(remainingSecond / 3600);
  if (hours !== 0) return `${hours}h ago`


  remainingSecond = remainingSecond % 3600;
  const minutes = parseInt(remainingSecond / 60)
  if (minutes != 0) return `${minutes}min ago`
  remainingSecond = remainingSecond % 60;


  return `${remainingSecond}s ago`;
}


function loadVideos(title = "") {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${title}`)
    .then(res => res.json())
    .then(data => displayVideos(data.videos))
}


function displayVideos(videos) {
  let videoContainer = document.getElementById('videoContainer');

  if (videos.length==0) {
    videoContainer.classList.remove('grid');
    videoContainer.innerHTML =
      `
       
       <div class=" flex justify-center items-center mt-9"> <img src="./ph-tube-resources/Icon.png"> </div>
       `
  }

  else {
    videoContainer.innerHTML = '';
    videoContainer.classList.add('grid');
    videos.forEach(video => {
      const div = document.createElement('div');
      div.innerHTML = `
       
        <div class="card bg-base-100  shadow-xl p-4 ">
            <figure class="h-[200px] relative">
                <img
                  src="${video.thumbnail}"
                  alt="Shoes" class=" w-full object-cover" />
                  ${video.others.posted_date?.length == 0 ? "" : `<span class=" absolute bottom-8 right-4 text-yellow-400">${getTimeString(video.others.posted_date)}</span>`}
                 
              </figure>

              <div class="px-0 py-2 flex gap-5">
                <div>
                <img src="${video.authors[0].profile_picture}" class="w-10 h-10 rounded-full">
                </div>
                <div>
                  <p class=" font-bold">${video.title}</p>

                  <div class="flex gap-4">
                    <p class="">${video.authors[0].profile_name}</p>
                    <p>${video.authors[0].verified == true ? '<img src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" class="w-5 h-5 rounded-full">' : ""}</p>
                  </div>
                  <p><button onclick='showDetails("${video.video_id}")' class="btn btn-error">details</button></p>
                </div>
                
              </div>

                
              
        </div>
    `;
      videoContainer.appendChild(div);

    })
  }
}

document.getElementById('search-input').addEventListener('keyup',(e)=>{
  loadVideos(e.target.value);
})



loadVideos();

loadCategory();