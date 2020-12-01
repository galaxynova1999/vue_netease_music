import { get } from "@/util/axios";

function getSingerInfo(id) {
  return get("/artists", {
    id,
  });
}

function getSingerMV(id) {
  return get("/artist/mv", {
    id,
  });
}

function getSingerAlbum(id) {
  return get("/artist/album", {
    id,
    limit: 8,
  });
}

function getSingerDes(id) {
  return get("/artist/desc", {
    id,
  });
}

export { getSingerAlbum, getSingerDes, getSingerInfo, getSingerMV };
