
'use client'
  import React from 'react'
  import Card from "@/components/ui/dashboard/card/card";
  const cards = [
    {
      id: 1,
      title: "Services daily",
      title2: "محتسبات اليوم ",
      number: 10.928,
      change: 12,
    },
    {
      id: 2,
      title: "Services Created",
      title2: "المحتسبات الجديده",
      number: 10.928,
      change: 12,
    },
    {
      id: 3,
      title: "Services pending",
      title2: "تحت المراجعة",
      number: 8.236,
      change: -2,
    },
    {
      id: 4,
      title: "Services done",
      title2: "الارشيف",
      number: 6.642,
      change: 18,
    },
  ];
  const CardsTot = ({created,
    done,
    canceled,
    daily,
    type,
    pending,setType}:{created:number,
      done:number,
      canceled:number,
      daily?:number,
      type:string,
      pending:number,setType:any}) => {
    cards[0].number=daily?daily:0;
    cards[1].number=created;
    cards[2].number=pending;
    cards[3].number=done+canceled;
    let Cards = daily!==undefined?cards:cards.slice(1)
    return (
      Cards.map((item) => (
        <Card item={item}  type={type}
        setType={setType} key={item.id} />
      ))
    )
  }
  
  export default CardsTot