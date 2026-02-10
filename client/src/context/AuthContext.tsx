import { createContext,useContext,useEffect,useState} from "react";
import type { IUser } from "../assets/assets";
import api from "../configs/api";
import toast from "react-hot-toast";

/** Shape of the authentication context values and methods */
interface AuthContextProps{
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    user: IUser | null;
    setUser:(user: IUser | null) => void;
    login:(user:{email:string,password:string})=>Promise<void>;
    signUp : (user:{name:string,email:string,password:string})=>Promise<void>;
    logout:()=>Promise<void>;
}

/** Create context with default no-op values for type safety */
const AuthContext = createContext<AuthContextProps>({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    user: null,
    setUser: () => {},
    login: async () => {},
    signUp: async () => {},
    logout: async () => {},
})

/**
 * AuthProvider - Wraps the app to provide global authentication state.
 * Manages user login, signup, logout, and session verification on mount.
 */
export const AuthProvider = ({children}:{children:React.ReactNode})=>{

    // Current authenticated user object (null when logged out)
    const [user,setUser] = useState<IUser | null>(null);
    // Boolean flag indicating whether the user is logged in
    const [isLoggedIn,setIsLoggedIn] = useState<boolean>(false);

    /** Register a new user and update auth state on success */
    const signUp = async ({name,email,password}:{name:string,email:string,password:string}) => {
        try {
            const {data} = await api.post('/api/auth/register',{name,email,password});
            if(data.user){
                setUser(data.user as IUser);
                setIsLoggedIn(true);
            }
            toast.success(data.message);
        } catch (error) {
            console.log(error);
        }
    }

    /** Log in an existing user and update auth state on success */
    const login = async ({email,password}:{email:string,password:string}) => {
        try {
            const {data} = await api.post('/api/auth/login',{email,password});
            if(data.user){
                setUser(data.user as IUser);
                setIsLoggedIn(true);
            }
            toast.success(data.message);
        } catch (error) {
            console.log(error);
        }
    }

    /** Log out the current user, clear state, and show a toast */
    const logout = async () => {
        try {
            const {data} = await api.post('/api/auth/logout');
            setUser(null);
            setIsLoggedIn(false);
            toast.success(data.message);
        } catch (error) {
            console.log(error);
        }
    }

    /** Verify the user's session on mount via the /api/auth/verify endpoint */
    const fetchUser = async () => {
        try {
            const {data} = await api.get('/api/auth/verify');
            if(data.user){
                setUser(data.user as IUser);
                setIsLoggedIn(true);   
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    // On mount, verify if the user has an active session
    useEffect(() => {
        (async () => {
            await fetchUser();
        })()
    },[]);

    // Provide auth state and methods to all child components
    const value = {
          user,setUser,
          isLoggedIn,setIsLoggedIn,signUp,
          login,logout
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

/** Custom hook to consume the AuthContext from any component */
export const useAuth = () => useContext(AuthContext);