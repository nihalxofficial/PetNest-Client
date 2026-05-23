
const Api = process.env.NEXT_PUBLIC_API;

// export const getPets = async(searchValue="")=>{
//     const res = await fetch(`${Api}/pets/?search=${searchValue}`);
//     const pets = await res.json();
//     return pets;
// }

export const getPets = async ({
  search = "",
  species = "",
  fee = "",
  sort = "price_low",
} = {}) => {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (species) params.set("species", species);
  if (fee) params.set("fee", fee);
  params.set("sort", sort);

  const res = await fetch(`${Api}/pets?${params.toString()}`, {
    cache: "no-store",
  });
  return res.json();
};

export const getFeaturedPets = async () => {
  const res = await fetch(`${Api}/featured`);
  const pets = await res.json();
  return pets;
};

export const getPetById = async (id, token) => {
  const res = await fetch(`${Api}/pets/${id}`, {
    headers: {
      authorization: `Bearer ${token}` || "",
    },
  });
  const pet = await res.json();
  return pet;
};

export const getUserById = async (id, token) => {
  const res = await fetch(`${Api}/users/${id}`, {
    headers: {
      authorization: `Bearer ${token}` || "",
    },
  });
  const user = await res.json();
  return user;
};

export const getAdoptionByPet = async (id, token) => {

  const res = await fetch(`${Api}/adoptions/${id}`,{
    headers: {
      authorization: `Bearer ${token}` || "",
    },
  } );

  if (!res.ok) {
    console.error("Failed to fetch adoptions:", res.status);
    return [];
  }

  const adoption = await res.json();
  return Array.isArray(adoption) ? adoption : [];
};
export const getPetByOwner = async (id, token) => {
  const res = await fetch(`${Api}/listings/${id}`, {
    headers: {
      authorization: `Bearer ${token}` || "",
    },
  });
  const pets = await res.json();
  return pets;
};

export const geRequestsById = async (id, token) => {
  const res = await fetch(`${Api}/requests/${id}` , {
    headers: {
      authorization: `Bearer ${token}` || "",
    },
  });
  const requests = await res.json();
  return requests;
};
