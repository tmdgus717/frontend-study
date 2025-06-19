const container = document.getElementById('root');
const ajax = new XMLHttpRequest();
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json'; //마킹

function getData(url){
  ajax.open('GET', url, false);
  ajax.send();

  return JSON.parse(ajax.response);
}

const newsFeed = getData(NEWS_URL);
const ul = document.createElement('ul');

//브라우저가 제공해주는 event system
//ui 요소가 / 이벤트가발생했을때 / 함수를 호출해줘..
// # : 해시 -> 북마크 -> hashchange 이벤트
window.addEventListener('hashchange', function() {
  console.log("change hash")
  //location : 주소와 관련된 정보를 제공하는 객체
  //#자르고 아이디값만 가져오기
  const id = location.hash.substr(1);
  const newsContent = getData(CONTENT_URL.replace('@id', id));
  
  const title = document.createElement('h1');
  title.innerHTML = newsContent.title;

  content.appendChild(title);
});

for(let i = 0; i < 10; i++) {
  const div = document.createElement('div');//temp tag
  const li = document.createElement('li');
  const a = document.createElement('a');

  div.innerHTML = `
    <li>
      <a href="#${newsFeed[i].id}">
        ${newsFeed[i].title} (${newsFeed[i].comments_count})  
      </a>
    </li>
  `

  ul.appendChild(div.firstElementChild);
}

container.appendChild(ul);
container.appendChild(content);
