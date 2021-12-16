
function search() {
    let city = document.getElementById("s_city").value;
    let region = document.getElementById("s_region").value;
    getweather(city, region);
}

async function getweather(city, region) {
    try {
        const key = "dc90185b75584908b01fb7d2692b0677";
        const CITY_URL = "https://geoapi.qweather.com/v2/city/lookup?";
        const WEATHER_NOW = "https://devapi.qweather.com/v7/weather/now?";


        let res = await fetch(`${CITY_URL}location=${region}&adm=${city}&key=${key}`);
        let resJSON = await res.json();
         //console.log(resJSON);

        let cityID = resJSON.location[0].id;

        //地区
        let _position = '查询地区：' + resJSON.location[0].adm1 + ' ' + resJSON.location[0].name;

        resJSON = await (
            await fetch(`${WEATHER_NOW}location=${cityID}&key=${key}`)
        ).json();
        console.log(resJSON);

        //时间
        var d = new Date();
        let time = d.getFullYear() + '/' + d.getMonth() + '/' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes();

        //天气
        let { temp, feelsLike, text, humidity, windDir, icon } = resJSON.now;
        let _time = '时间：' + time;
        let _temp = '温度：' + temp + '℃';
        let _feelsLike = '体感温度：' + feelsLike + '℃';
        let _text = '气候：' + text;
        let _humidity = '相对湿度：' + humidity + '%';
        let _windDir = '风向：' + windDir;

        document.getElementById('position').innerHTML = _position;
        document.getElementById('time').innerHTML = _time;
        document.getElementById('temp').innerHTML = _temp;
        document.getElementById('feelsLike').innerHTML = _feelsLike;
        document.getElementById('text').innerHTML = _text;
        document.getElementById('humidity').innerHTML = _humidity;
        document.getElementById('windDir').innerHTML = _windDir;

        //图标
        
        var w_img = document.createElement('img') ;
        w_img.src = `icons/${icon}.svg` ;
        document.getElementById('w_img').appendChild(w_img) ;
        

    }
    catch (err) {
        console.log('未能查询到相关天气！请检查输入地名是否正确');
    }
}