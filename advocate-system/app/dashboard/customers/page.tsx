import React from "react";
import { Metadata } from 'next';

export default function Page(){
    console.log("Customer");
    return <p>Customers Page</p>;
}

export const metadata: Metadata = {
    title: 'Customer',
  };