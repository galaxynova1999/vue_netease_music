import { get } from "@/util/axios";

function getMVDetails(id){
    return get("/mv/detail",{
        mvid:id
    });
}
function getMVVideoRealSrc(id) {
    return get("/mv/url",{
        id
    });
}

function getMVInfo(id) {
    return get("/mv/detail/info",{
        mvid:id
    });
}


function getVideoDetails(id) {
   return get("/video/detail",{
            id
      });
}

function getVideoInfo(id) {
   return get("/video/detail/info",{
       vid:id
   });
}

function getVideoRealSrc(id) {
   return get("/video/url",{
       id
    });
}

function getVideoTag() {
    return get("/video/group/list");
}
function getVideoCat() {
   return get("/video/category/list");
}

export  {
    getMVDetails,
    getMVVideoRealSrc,
    getMVInfo,
    getVideoDetails,
    getVideoInfo,
    getVideoRealSrc,
    getVideoCat,
    getVideoTag
}
