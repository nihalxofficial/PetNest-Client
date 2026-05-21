const Api = process.env.NEXT_PUBLIC_API;
// export const getPets = async(searchValue="")=>{
//     const res = await fetch(`${Api}/pets/?search=${searchValue}`);
//     const pets = await res.json();
//     return pets;
// }


export const getPets = async ({ search = "" } = {}) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);

    const res = await fetch(`${Api}/pets?${params.toString()}`, {
        cache: "no-store"
    });
    return res.json();
};