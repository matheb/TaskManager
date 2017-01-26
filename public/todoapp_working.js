var List = document.querySelector('section');
var input = document.querySelector('input').value;
var addButton = document.querySelector('.add');

function askInputValue(){
  var newInput = document.querySelector('input').value;
  return newInput;
};
addButton.addEventListener('click', askInputValue);

function getList(){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', "https://mysterious-dusk-8248.herokuapp.com/todos", true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send();
  xhr.onreadystatechange = function (){
    if (xhr.readyState === XMLHttpRequest.DONE){
      var TodoList = JSON.parse(xhr.response);
      var Listlength = TodoList.length;
      drawList(TodoList, Listlength);
    }
  }
};
getList();
window.setInterval(getList, 5000);

function addTodoItem(){
  var req = new XMLHttpRequest();
  input = document.querySelector('input').value;
  task = {text: input};
  console.log(task);
  req.open('POST', "https://mysterious-dusk-8248.herokuapp.com/todos", true);
  req.setRequestHeader("Content-Type", "application/json");
  req.onreadystatechange = function (){
    if (req.readyState === XMLHttpRequest.DONE){
      console.log('ok');
      var TodoList = JSON.parse(req.response);
      var Listlength = TodoList.length;
      var texts = [];
      var state = [];
      for (var i = 0; i < Listlength; i++){
        texts.push(TodoList[i]['text']);
        state.push(TodoList[i]['completed']);
      }
      console.log(TodoList);
      console.log(texts);
      console.log(state);
      getList();
    }
  }
  req.send(JSON.stringify(task));
};
addButton.addEventListener('click', addTodoItem);
//addTodoItem();

function checkItem(item, callback){
  var req = new XMLHttpRequest();
  req.open('PUT', "https://mysterious-dusk-8248.herokuapp.com/todos/"+item.id, true );
  req.setRequestHeader("content-type", "application/json; charset=utf-8");
  req.onreadystatechange = function (){
    if (req.readyState === XMLHttpRequest.DONE){
      var TodoList = JSON.parse(req.response)
      var text = TodoList['text'];
      console.log(text)
      console.log(TodoList);
      console.log(JSON.stringify({id: item.id, text: item.text, completed: true}));
      callback();
    }
  }
  req.send(JSON.stringify({text: item.text, completed: !item.completed}));
};

function removeItem(item, callback){
  var req = new XMLHttpRequest();
  req.open('DELETE', "https://mysterious-dusk-8248.herokuapp.com/todos/"+item.id, true);
  req.setRequestHeader("Accept", "application/json; charset=utf-8");
  req.onreadystatechange = function (){
    if (req.readyState === XMLHttpRequest.DONE){
      console.log(req.response);
      callback();
    }
  }
  req.send();
};

function drawList(TodoList, Listlength){
  List.innerHTML = '';
  TodoList.forEach (function(item, index){
    var newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'todo_item');
    newDiv.setAttribute('data-index-Number', item.id);
    newDiv.setAttribute('data-id', item.complete);
    newDiv.dataset.indexNumber = item.id;

    var newLabel = document.createElement('label');
    newLabel.textContent =item.text.substring(0, 25);

    var newIcons = document.createElement('div');
    newIcons.setAttribute('class', 'checking');

    var newButton = document.createElement('button');
    newButton.setAttribute('class', 'del');
    newButton.addEventListener('click', function(e){
      removeItem(item, getList);
    });

    var newImg = document.createElement('img');
    newImg.setAttribute('class', 'del_icon');
    newImg.setAttribute('src', 'delete.svg');
    newImg.setAttribute('alt', 'delete');
    newImg.setAttribute('data-index-Number', index);


    var newPipe = document.createElement('div');
    newPipe.textContent = '✔';
    if (item.completed){
      newPipe.setAttribute('class', 'complete checked');
    } else {
      newPipe.setAttribute('class', 'complete');
    }
    newPipe.addEventListener('click', function(e){
      console.log(index);
      checkItem(item, getList);
    })

    newButton.appendChild(newImg);
    newIcons.appendChild(newButton);
    newIcons.appendChild(newPipe);
    newDiv.appendChild(newLabel);
    newDiv.appendChild(newIcons);
    List.appendChild(newDiv);
  })
};
