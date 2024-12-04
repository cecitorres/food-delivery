import { useState } from "react";

function usePost(url) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const post = async (body) => {
        setIsLoading(true);
        setError(false);

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData?.message ||"Failed to post data";
                throw new Error (errorMessage);
            }

            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, error, post }

}

export default usePost;