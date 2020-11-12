import * as moment from "moment";


function setNewPlayRecord(list) {
    localStorage.setItem("localPlayRecord",JSON.stringify(list));
}

function getPlayRecord() {
    if(!localStorage.getItem("localPlayRecord")) {
        return null;
    }
    return JSON.parse(localStorage.getItem("localPlayRecord"))
}
function getLastSong() {

    if(!getPlayRecord()) {
        initPlayRecord();
    }
    let playList = getPlayRecord();
    return playList[playList.length - 1];
}
function getFirstSong() {
    let playList = getPlayRecord();
    return playList[0];
}

function addNewSong(song) {
    let playList = getPlayRecord();
    song.time = moment().format("YYYY-MM-DD");
    playList.push(song);
    let array = playList.reduce(function(prev,element){
        if(!prev.find(el => el.id === element.id)) {
            prev.push(element)
        }
        return prev;
    },[]);

    let index = 0;
    for(let i = 0; i < array.length; i++) {
        if(array[i].id === song.id){
            index = i;
            break;
        }
    }
    setNewPlayRecord(array);
    return index;
}
function initPlayRecord() {
     let array=[
         {
             id:"431085465",
             name:"Graduate",
             time:"2020-06-01"
         }];
     localStorage.setItem("localPlayRecord",JSON.stringify(array));
}

function getNextSong() {
  /* let playlist = getPlayRecord();
   if(songState.currentIndexInPlayList === playlist.length - 1) {
       songState.currentIndexInPlayList = 0;
       return playlist[0].id;
   }
   else{
       songState.currentIndexInPlayList++;
       return playlist[songState.currentIndexInPlayList].id;
   }*/
}

function getPrevSong() {
   /* let playlist = getPlayRecord();

    if(songState.currentIndexInPlayList === 0) {
        songState.currentIndexInPlayList = playlist.length - 1;
        return playlist[songState.currentIndexInPlayList].id;
    }
    else {
        songState.currentIndexInPlayList--;
        return playlist[songState.currentIndexInPlayList].id;
    }
*/
}



export {
    getPlayRecord,
    setNewPlayRecord,
    initPlayRecord,
    addNewSong,
    getLastSong,
    getFirstSong,
    getNextSong,
    getPrevSong,
}

