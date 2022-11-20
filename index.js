import { createInterface } from 'readline';
import fetch from 'node-fetch';

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

// NOTE: 開放資料金鑰 限制單一API 300次/日
const epaApiKey = 'e8dd42e6-9b8b-43f8-991e-b3dee723a52d';

/**
 * 計算兩點經緯度距離
 *
 * @param {number} originLatitude 來源緯度
 * @param {number} originLongitude 來源經度
 * @param {number} targetLatitude 目標緯度
 * @param {number} targetLongitude 目標經度
 *
 * @returns {number} 距離/km
 */
const distanceCalculation = (originLatitude, originLongitude, targetLatitude, targetLongitude) => {
  // eslint-disable-next-line max-len, prefer-exponentiation-operator, no-restricted-properties
  const coordinate = Math.asin(Math.sqrt(Math.pow(Math.sin(((originLatitude - targetLatitude) / 2) * (Math.PI / 180)), 2) + Math.cos(originLatitude * (Math.PI / 180)) * Math.cos(targetLatitude * (Math.PI / 180)) * Math.pow(Math.sin(((originLongitude - targetLongitude) / 2) * (Math.PI / 180)), 2)));
  const distance = 2 * 6378.137 * coordinate;
  return distance;
};

const quryAQI = () => {
  readline.question('請輸入緯度(latitude): ', (answer1) => {
    readline.question('請輸入經度(longitude): ', async (answer2) => {
      const latitude = Number(answer1);
      const longitude = Number(answer2);

      if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
        console.log('資料異常請重新輸入\r\n');
        quryAQI();
        return;
      }

      const response = await fetch(`https://data.epa.gov.tw/api/v2/aqx_p_432?api_key=${epaApiKey}`);
      const data = await response.json();

      let shortestDistance = 100000;
      let aqiDate = {};

      // eslint-disable-next-line no-restricted-syntax
      for (const object of data.records) {
        // eslint-disable-next-line max-len
        const distance = distanceCalculation(latitude, longitude, object.latitude, object.longitude);
        // NOTE: 取距離最短的監測站資料使用
        if (distance < shortestDistance) {
          shortestDistance = distance;
          aqiDate = object;
          aqiDate.distance = distance;
        }
      }

      console.log('\r\n========= 資料 ==========');
      console.log('縣市:', aqiDate.county);
      console.log('觀測站名:', aqiDate.sitename);
      console.log('空氣質量指數:', aqiDate.aqi);
      console.log('污染物:', aqiDate.pollutant ? aqiDate.pollutant : '無');
      console.log('狀態:', aqiDate.status);
      console.log('資料發佈時間:', aqiDate.publishtime);
      console.log('與觀測站直線距離:', aqiDate.distance.toFixed(1), 'km');
      console.log('==========================\r\n');

      quryAQI();
    });
  });
};

quryAQI();
