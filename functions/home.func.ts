import { apiUrl } from "@/constant/conn";
import { getToken } from "./auth"


export const getUserData = async () => {
    const token = await getToken();
    if (!token) {
        console.log("No token found");
        return;
    }
    try {
        const response = await fetch(`${apiUrl}/api/v1/users/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        const data = await response.json();
        return data;
    } catch(error : any) {
        console.log(error);
    }
}