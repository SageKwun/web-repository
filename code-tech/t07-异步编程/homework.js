/**
 * 获得某个城市-地区的天气信息
 * 天气获取渠道：https://dev.qweather.com/
 * 写一个函数，满足：
 *   1. 使用async await来异步请求数据
 *   2. 根据传入的城市-城区自动获取天气信息
 *   3. 打印对应地区的实时气温、天气、风向
 *   4. 打印对应地区的明、后天气的最高温和最低温
 *
 * 温馨提醒：
 * 1. 获取天气需要城市的id或者经纬度，请根据和风天气的api自行查询
 * 2. 有部分地区可能查询不到，注意测试
 * 3. 请将代码提交到自己的分支上！！！
 */

async function getWeather(city, region) {
  const KEY = "e2b426dfd936449d8c21a80a644cec49";
  const CITY_URL = "https://geoapi.qweather.com/v2/city/lookup?";
  const WEATHER_NOW = "https://devapi.qweather.com/v7/weather/now?";

  let res = await fetch(`${CITY_URL}location=${region}&adm=${city}&key=${KEY}`);
  console.log(res);
  let resJSON = await res.json();
  console.log(resJSON);
  let cityID = resJSON.location[0].id;
  console.log(cityID);

  resJSON = await (
    await fetch(`${WEATHER_NOW}location=${cityID}&key=${KEY}`)
  ).json();

  //   const now = resJSON.now;
  now = { temp: "17", windDir: "东南风" };

  let { temp, windDir } = now;

  console.log("temp: ", temp);
}

// 测试
getWeather("杭州市", "上城区");






