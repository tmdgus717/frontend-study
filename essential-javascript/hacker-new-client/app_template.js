const container = document.getElementById('root');
const ajax = new XMLHttpRequest();
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json'; //마킹

function getData(url){
  ajax.open('GET', url, false);
  ajax.send();

  return JSON.parse(ajax.response);
}

const store = {
  currentPage : 1,
}

//글 목록 화면
function newsFeed(){
  const newsFeed = getData(NEWS_URL);
  const newsList = [];
  newsList.push('<ul>');
  
  for(let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
  
    newsList.push(`
      <li>
        <a href="#/show/${newsFeed[i].id}">
          ${newsFeed[i].title} (${newsFeed[i].comments_count})  
        </a>
      </li>
    `)
  }
  

  newsList.push(
    `
    <div>
      <a href="#/page/${store.currentPage > 1 ? store.currentPage - 1 : 1}">이전 페이지</a>
      <a href="#/page/${store.currentPage + 1}">다음 페이지</a>
    </div>
    `
  )

  newsList.push('</ul>');
  
  container.innerHTML = newsList.join('');
}

function newsDetail() {
  console.log("change hash")
  //location : 주소와 관련된 정보를 제공하는 객체
  //#자르고 아이디값만 가져오기
  console.log(location.hash)
  const id = location.hash.substring(7);
  const newsContent = getData(CONTENT_URL.replace('@id', id));

  container.innerHTML = `
    <h1>${newsContent.title}</h1>
    <div>
      <a href = "#/page/${store.currentPage}">목록으로</a>
    </div>
  `;
}

function router(){
  //location : 주소와 관련된 정보를 제공하는 객체
  const routePath = location.hash;
  console.log(routePath);

  if(routePath === '') newsFeed();
  else if(routePath.indexOf('#/page/') >= 0) {
    store.currentPage = Number(routePath.substring(7));
    newsFeed();
  }else{
    newsDetail();
  }
}

//브라우저가 제공해주는 event system
//ui 요소가 / 이벤트가발생했을때 / 함수를 호출해줘..
// # : 해시 -> 북마크 -> hashchange 이벤트
window.addEventListener('hashchange', router);

router();
