import { get } from "@/util/axios";

function checkMusic(id) {
    return get('/check/music',{
        id
    })
}
function getSongDetailData(ids) {
    return get('/song/detail',{
        ids
    })
}
function getSongURL(id) {
    return get('/song/url',{
        id
    })
}

function getSongLyric(id) {
    return get('/lyric',{
        id
    })
}



export {
    getSongDetailData,
    getSongLyric,
    getSongURL,
    checkMusic
}
