"use client";

import { useEffect, useState } from 'react';
import styles from './chart.module.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, FunnelChart, Funnel, LabelList } from 'recharts';


const Chart = ({data}:{data:any}) => {
console.log(data)
  return (
    <div className={styles.container}>
        <h2 className={styles.title}>حالات الخدمة الشهرية</h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}
          >
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip contentStyle={{background:"#151c2c", border:"none"}}/>
          <Legend />
          <Line type="bump" dataKey="جديد" stroke="#8884d8" />
          <Line type="bump" dataKey="تمت" stroke="#82ca9d" />
          <Line type="bump" dataKey="جاريه" stroke="#ffc658" />
          <Line type="bump" dataKey="رُفضت" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>
    </div>


  );
}

export default Chart;
