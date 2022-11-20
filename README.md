# 台灣空氣品質查詢器

## 功能介紹

使用經緯度查詢台灣環保局開放資料距離最近的監測點資料

## 執行

```bash
$ git clone https://github.com/c0w0c/Taiwan_Air_Quality_Index_Checker.git

$ cd Taiwan_Air_Quality_Index_Checker

$ npm i

$ npm run start 

> 請輸入緯度(latitude): 25.02485641
> 請輸入經度(longitude): 121.9182466

========= 資料 ==========
縣市: 基隆市
觀測站名: 基隆
空氣質量指數: 28
污染物: 無
狀態: 良好
資料發佈時間: 2022/11/20 15:00:00
與觀測站直線距離: 19.7 km
==========================
```

## 資料來源

- [政府資料開放平臺 空氣品質指標(AQI)](https://data.gov.tw/dataset/40448)
