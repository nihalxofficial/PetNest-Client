"use server"

import { revalidatePath } from "next/cache";

const Api = process.env.NEXT_PUBLIC_API;

export const addPetData = async(data, token)=>{
    const res = await fetch(`${Api}/pets`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            authorization: `Bearer ${token}` || "",
        },
        body: JSON.stringify(data)
    })
    const result = await res.json();
    return result;
}


export const updatePetData = async (id, data, token)=> {
    const res = await fetch(`${Api}/pets/${id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}` || "",
        },
        body: JSON.stringify(data)
    });
    const result = await res.json();
    if(result.modifiedCount>0){
        revalidatePath(`${Api}/pets/${id}`)
    }
    return data;
}

export const deletePetData = async (id, token) => {
    const res = await fetch(`${Api}/pets/${id}`, {
        method: "DELETE",
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data;
}

export const requestAdoption = async(id, adoptionData,token)=> {
    const res = await fetch(`${Api}/adoptions/${id}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(adoptionData)
    })
    const data = await res.json();
    if(data.insertedId){
        revalidatePath(`${Api}/pets/${id}`)
    }
    return data;
}


export const approveAdoption = async(id, token)=>{
    const res = await fetch(`${Api}/adoptions/approve/${id}`,{
        method: "PATCH",
        headers: {
            authorization: `Bearer ${token}`,
        },
    })
    const data = await res.json();
    if(data.result.modifiedCount>0){
        revalidatePath(Api+"/dashboard/my-listings")
        revalidatePath(`${Api}/all-pets/${id}`)
    }
    return data;
}

export const rejectAdoption = async(id, token)=>{
    const res = await fetch(`${Api}/adoptions/reject/${id}`,{
        method: "PATCH",
        headers: {
            authorization: `Bearer ${token}`,
        },
    })
    const data = await res.json();
    if(data.result.modifiedCount>0){
        revalidatePath(Api+"/dashboard/my-listings")
    }
    return data;
}

export const deleteAdoption = async(id, token)=>{
    const res = await fetch(`${Api}/adoptions/${id}`,{
        method: "DELETE",
        headers: {
            authorization: `Bearer ${token}`,
        },
    })
    const data = await res.json();
    if(data.deletedCount>0){
        revalidatePath(Api+"/dashboard/my-requests")
    }
    return data;
}

