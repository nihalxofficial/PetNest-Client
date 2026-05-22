"use server"

import { revalidatePath } from "next/cache";

const Api = process.env.NEXT_PUBLIC_API;


export const updatePetData = async (id, data)=> {
    const res = await fetch(`${Api}/pets/${id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    const result = await res.json();
    if(result.modifiedCount>0){
        revalidatePath(`${Api}/pets/${id}`)
    }
    return data;
}

export const requestAdoption = async(id, adoptionData)=> {
    const res = await fetch(`${Api}/adoptions/${id}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(adoptionData)
    })
    const data = await res.json();
    if(data.insertedId){
        revalidatePath(`${Api}/pets/${id}`)
    }
    return data;
}