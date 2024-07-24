"use client";

import { useEffect, useState } from 'react';
import styles from './chart.module.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const Chart = ({data}:{data:any}) => {


  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Monthly Service States</h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip contentStyle={{background:"#151c2c", border:"none"}}/>
          <Legend />
          <Line type="monotone" dataKey="created" stroke="#8884d8" />
          <Line type="monotone" dataKey="done" stroke="#82ca9d" />
          <Line type="monotone" dataKey="pending" stroke="#ffc658" />
          <Line type="monotone" dataKey="canceled" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
