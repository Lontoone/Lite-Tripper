import axios from "axios";
async function getTpiActivity() {
  const today = new Date();
  let beginTime = new Date().setMonth(today.getMonth()); //今天yyyy-mm-dd
  let endTime = new Date().setMonth(today.getMonth() + 5); //結束: 3個月後
  endTime = new Date(endTime).toISOString().slice(0, 10);
  beginTime = new Date(beginTime).toISOString().slice(0, 10); //結束: 3個月後

  const tpiNewsUrl =
    "https://www.travel.taipei/open-api/zh-tw/Events/Activity?";
  var url = new URL(tpiNewsUrl);
  url.searchParams.append("begin", beginTime);
  url.searchParams.append("end", endTime);
  url.searchParams.append("page", 1);
  console.log(url.href);

  return await axios.get(url.href).then((res) => {
    //console.log(res.data);
    return res.data;
  });
}

export { getTpiActivity };
