import { get } from "@/util/axios";

function getHotSearch() {
  return get("/search/hot/detail");
}

function Search(keyword, type, limit = 30) {
  return get("/search", {
    keyword,
    type,
    limit,
  });
}
function searchSuggest(keywords) {
  return get("/search/suggest", {
    keywords,
  });
}

export { getHotSearch, Search, searchSuggest };
