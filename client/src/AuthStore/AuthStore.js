import {create} from 'zustand'
import axios from 'axios';
export const userAuth = create((set) => ({
    currentUser : null,
    loading : false,
    error : null,
    isAuthenticated : false,

    login : async(userCredWithRole) => {
        let {role,...userCredObj} = userCredWithRole;
        try{
            set({
                loading : true,
                error : null
            })
            let res = await axios.post(`${import.meta.env.VITE_API_URL}/common-api/login`,userCredObj,{ withCredentials : true });
            console.log("res is ",res.data);
            set({
                loading : false,
                error : null,
                isAuthenticated : true,
                currentUser : res.data.payload
            })
        }catch(err){
            console.log("err is",err.response?.data);
            set({
                loading : false,
                isAuthenticated : false,
                currentUser : null,
                error : err.response?.data?.error || "Login Failed"
            })
        }
        console.log(role);
    },
    logout : async() => {
        try{
            // setLoading is true
            set({
            loading:true,
            error : null
        })
        let res = await axios.get(`${import.meta.env.VITE_API_URL}/common-api/logout`,{ withCredentials : true});
        console.log("res is",res);
        set({
            currentUser : null,
            isAuthenticated : false
        })

        }catch(err){
            set({
            loading : false,
            error : err.response?.data?.error || "Logout Failed",
            currentUser : null,
            isAuthenticated : false
            })
        }
    },
    checkUser: async () => {
        try {
            set({ loading: true });
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/common-api/check-auth`, { withCredentials: true });
            console.log('res in store', res.data);
            set({
                currentUser: res.data.payload,
                isAuthenticated: true,
                loading: false,
            });
        } catch (err) {
        // If user is not logged in → do nothing
            if (err.response?.status === 401) {
                set({
                    currentUser: null,
                    isAuthenticated: false,
                    loading: false,
                });
            return;
            }

      // other errors
        console.error("Auth check failed:", err);
            set({ loading: false });
        }
    },
}));