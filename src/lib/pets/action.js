"use server"

import { revalidatePath } from "next/cache";

const Api = process.env.NEXT_PUBLIC_API;

export const addPetData = async(data)=>{
    const res = await fetch(`${Api}/pets`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(data)
    })
    const result = await res.json();
    return result;
}


export const updatePetData = async (id, data)=> {
    const res = await fetch(`${Api}/pets/${id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    const result = await res.json();
    // if(result.modifiedCount>0){
    //     revalidatePath(`${Api}/pets/${id}`)
    // }
    return data;
}

export const deletePetData = async(id)=>{
    const res = await fetch(`${Api}/pets/${id}`,{
        method: "DELETE"
    })
    const data = res.json();
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


export const approveAdoption = async(id)=>{
    const res = await fetch(`${Api}/adoptions/approve/${id}`,{
        method: "PATCH"
    })
    const data = await res.json();
    if(data.result.modifiedCount>0){
        revalidatePath(Api+"/dashboard/my-listings")
    }
    return data;
}

export const rejectAdoption = async(id)=>{
    const res = await fetch(`${Api}/adoptions/reject/${id}`,{
        method: "PATCH"
    })
    const data = await res.json();
    if(data.result.modifiedCount>0){
        revalidatePath(Api+"/dashboard/my-listings")
    }
    return data;
}