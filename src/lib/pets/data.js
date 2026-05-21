const Api = process.env.NEXT_PUBLIC_API;
// export const getPets = async(searchValue="")=>{
//     const res = await fetch(`${Api}/pets/?search=${searchValue}`);
//     const pets = await res.json();
//     return pets;
// }

export const getPets = async ({ search = "", species = "", fee = "", sort = "price_low" } = {}) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (species) params.set("species", species);
    if (fee) params.set("fee", fee);
    params.set("sort", sort);

    const res = await fetch(`${Api}/pets?${params.toString()}`, { cache: "no-store" });
    return res.json();
};

export const getFeaturedPets = async ()=>{
    const res = await fetch(`${Api}/featured`)
    const pets = await res.json();
    return pets;
}

export const getPetById = async (id)=> {
    const res = await fetch(`${Api}/pets/${id}`);
    const pet = await res.json();
    return pet;
}