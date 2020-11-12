import {formatSongDuration} from "@/util/convenience";
import {checkMusic, getSongDetailData, getSongLyric, getSongURL} from "@/api/network/Music";
import {getSimiSong} from "@/api/network/Similar";
import {getSearchHistory, initSearchHistory} from "@/api/local/searchHistory";
import {getPlayRecord, initPlayRecord} from "@/api/local/localPlayRecord";

async function getSong(id) {
    let song={};

    let response = await checkMusic(id);
    if(!response.success){
        //createError(response.data.message);
        return null;
    }

    let res = await getSongDetailData(id);
    let data = res.songs[0];
    song.id = data.id;
    song.name = data.name;
    song.author = data.ar[0].name;
    song.totaltime = formatSongDuration(data.dt);
    song.pic = data.al.picUrl;
    let res_url = await getSongURL(id);
    song.src = res_url.data[0].url;

    return song;
}
async function getSongDetail(id) {
    let song = {};
    let lyric = await getSongLyric(id);
    if(lyric.data.nolyric){
        song.lyric = null;
        song.tlyric = null;
    }
    else {
        song.lyric = lyric.data.lrc.lyric;
        if(lyric.data.tlyric.lyric){
            song.tlyric = lyric.data.tlyric.lyric
        }
        else {
            song.tlyric = null;
        }

    }
    let simi = await getSimiSong(id);
    song.simi = simi.data.songs;
    return song;
}

function getSongByTrackID(tracks) {
    return getSongDetailData(tracks.join(','))
}

function initialLocalData() {
    if(!getSearchHistory()) {
        initSearchHistory();
    }
    if(!getPlayRecord()) {
        initPlayRecord();
    }
}

export {
    getSongDetail,
    getSong,
    getSongByTrackID,
    initialLocalData
}
