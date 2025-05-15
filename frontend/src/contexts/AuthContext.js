// import React, { createContext, useState, useContext, useEffect } from 'react';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     useEffect(() => {
//         // Check if user is logged in on mount
//         const storedUser = localStorage.getItem('user');
//         const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        
//         if (storedUser && token) {
//             setUser(JSON.parse(storedUser));
//             setIsAuthenticated(true);
//         }
//     }, []);

//     const login = (userData) => {
//         setUser({
//             id: userData.id,
//             username: userData.username,
//             email: userData.email,
//             fullName: userData.fullName,
//             phone: userData.phone,
//             role: userData.role 
//         });
//         setIsAuthenticated(true);
//     };

//     const logout = () => {
//         setUser(null);
//         setIsAuthenticated(false);
//         localStorage.removeItem('user');
//         localStorage.removeItem('token');
//         sessionStorage.removeItem('token');
//     };

//     return (
//         <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error('useAuth must be used within an AuthProvider');
//     }
//     return context;
// };
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if user is logged in on mount
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
    }, []);

    // Thêm hàm getToken để đảm bảo luôn lấy token mới nhất
    const getToken = () => {
        return localStorage.getItem('token') || sessionStorage.getItem('token');
    };

    const login = (userData, token, rememberMe = true) => {
        // Set user in state
        setUser({
            id: userData.id,
            username: userData.username,
            email: userData.email,
            fullName: userData.fullName || userData.full_name,
            phone: userData.phone,
            role: userData.role 
        });
        setIsAuthenticated(true);
        
        // Lưu user vào localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Lưu token vào localStorage hoặc sessionStorage tùy theo rememberMe
        if (rememberMe) {
            localStorage.setItem('token', token);
        } else {
            sessionStorage.setItem('token', token);
        }

        console.log('Token saved:', token); // Debug log
    };

    const logout = () => {
        // Clear state
        setUser(null);
        setIsAuthenticated(false);
        
        // Clear storage
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            isAuthenticated, 
            login, 
            logout,
            getToken // Xuất ra hàm getToken để các component con có thể sử dụng
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};