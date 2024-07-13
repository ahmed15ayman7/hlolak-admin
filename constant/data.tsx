
  import React from 'react'
  import Card from "@/components/ui/dashboard/card/card";
import { fetchUsersCount } from '@/lib/actions/user.actions';
  const cards = [
    {
      id: 1,
      title: "Total Employee",
      number: 10.928,
      change: 12,
    },
    {
      id: 2,
      title: "Services",
      number: 8.236,
      change: -2,
    },
    {
      id: 3,
      title: "Services Done",
      number: 6.642,
      change: 18,
    },
  ];
  const CardsTot = async({services,done}:{services:number,done:number}) => {
    const  users  = await fetchUsersCount();
    cards[0].number=users;
    cards[1].number=services;
    cards[2].number=done;
    return (
      cards.map((item) => (
        <Card item={item} key={item.id} />
      ))
    )
  }
  
  export default CardsTot