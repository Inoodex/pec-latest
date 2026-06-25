// export const loginPost = async (body = { email: "", password: "" }) => {
//     const api_url = `${process.env.NEXT_PUBLIC_SITE_URL}${process.env.NEXT_PUBLIC_BASE_URL}/student/login`;
//     try {
//         const response = await fetch(api_url, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 email: body.email,
//                 password: body.password,
//             }),
//         });
//         return await response.json();
//     } catch (error) {
//         console.error("Error fetching data:", error);
//         throw error;
//     }
// };

// export const loginPost = async (body = { email: "", password: "" }) => {
//     // Login always uses absolute URL since NEXT_PUBLIC_SITE_URL contains the backend
//     // Also use /api/public prefix path for Next.js rewrite proxy
//     const api_url = `/api/auth/student-login`;

//     for (let i = 0; i < 3; i++) {
//         try {
//             const response = await fetch(api_url, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     email: body.email,
//                     password: body.password,
//                 }),
//             });

//             const text = await response.text();
//             let data;

//             try {
//                 data = text ? JSON.parse(text) : null;
//             } catch (e) {
//                 if (i < 2) {
//                     await new Promise(res => setTimeout(res, 1000));
//                     continue;
//                 }
//                 return { success: false, message: "Invalid response from server. Please try again." };
//             }

//             if (!response.ok) {
//                 if (response.status >= 500 && i < 2) {
//                     await new Promise(res => setTimeout(res, 1000));
//                     continue;
//                 }
//                 return data || { success: false, message: `Server error: ${response.status}` };
//             }

//             return data || { success: false, message: "Empty response from server" };
//         } catch (error) {
//             if (i < 2) {
//                 await new Promise(res => setTimeout(res, 1000));
//                 continue;
//             }
//             console.error("Error fetching data:", error);
//             throw error;
//         }
//     }
// };

// export const loginPost = async (body = { email: "", password: "" }) => {
//     const api_url = `${process.env.NEXT_PUBLIC_SITE_URL}${process.env.NEXT_PUBLIC_BASE_URL}/student/login`;
//     try {
//         const response = await fetch(api_url, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 email: body.email,
//                 password: body.password,
//             }),
//         });
//         return await response.json();
//     } catch (error) {
//         console.error("Error fetching data:", error);
//         throw error;
//     }
// };

export const loginPost = async (body = { email: "", password: "" }) => {
    const api_url = `https://apps.peceduglobal.com/api/auth/student-login`;
    try {
        const response = await fetch(api_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                email: body.email,
                password: body.password,
            }),
        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {
            return (
                data || {
                    success: false,
                    message: `Server error: ${response.status}`,
                }
            );
        }
        return (
            data || { success: false, message: "Empty response from server" }
        );
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            success: false,
            message:
                "Network error. Please check your connection and try again.",
        };
    }
};
