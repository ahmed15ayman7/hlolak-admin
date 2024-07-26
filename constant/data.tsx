
'use client'
  import React from 'react'
  import Card from "@/components/ui/dashboard/card/card";
  const cards = [
    {
      id: 1,
      title: "Services Created",
      number: 10.928,
      change: 12,
    },
    {
      id: 2,
      title: "Services pending",
      number: 8.236,
      change: -2,
    },
    {
      id: 3,
      title: "Services done",
      number: 6.642,
      change: 18,
    },
  ];
  const CardsTot = ({created,
    done,
    canceled,
    type,
    pending,setType}:{created:number,
      done:number,
      canceled:number,
      type:string,
      pending:number,setType:any}) => {
    cards[0].number=created;
    cards[1].number=pending;
    cards[2].number=done+canceled;
    return (
      cards.map((item) => (
        <Card item={item}  type={type}
        setType={setType} key={item.id} />
      ))
    )
  }
  
  export default CardsTot