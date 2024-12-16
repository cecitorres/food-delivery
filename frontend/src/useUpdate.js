import { useState } from "react";

function useUpdate(url) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const update = async (body) => {
        console.log(body, 123);
        setIsLoading(true);
        setError(false);

        try {
            const updateUrl = `${url}/${body.id}`;
            const response = await fetch(updateUrl + "/", {
                method: "PUT",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error ("Failed to update data");
            }

            const result = await response.json();
            setData(result);
            return result;
        } catch (err) {
            setError(err.message)
        } finally {
            setIsLoading(false);
        }
    };
    
    return {data, isLoading, error, update }
}

export default useUpdate;