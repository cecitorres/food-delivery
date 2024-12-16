import { useState } from "react";

function useDelete(url) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteItem = async (id) => {
        setIsLoading(true);
        setError(false);

        try {
            const deleteUrl = `${url}/${id}`;
            const response = await fetch(deleteUrl, {
                method: "DELETE",
                headers: { "Content-Type": "application/json"},
            });

            if (!response.ok) {
                throw new Error ("Failed to delete");
            }

            const result = await response.json();
            setData(result);
            return result;
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, error, deleteItem };
}

export default useDelete;