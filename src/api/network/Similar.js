import {get} from "@/util/axios";

function getSimiSinger(id) {
    return get("/simi/artist",{
        id
    });
}
function getRelatedPlayList(id) {
    return get("/simi/playlist",{
        id
    });
}
function getSimiMV(id) {
    return get("/simi/mv",{
        mvid:id
    });
}
function getSimiVideo(id) {
    return get("/related/allvideo",{
        id
    });
}
function getSimiSong(id) {
    return get('/simi/song',{
        id
    })
}

export {
    getSimiSinger,
    getRelatedPlayList,
    getSimiMV,
    getSimiVideo,
    getSimiSong
}
