import { createContext, useState, useContext, useEffect } from "react";


function Link({to, children}: {to: string, children: React.ReactNode}) {
    const {setPathname} = useContext(RouterContext);

    function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();
        window.history.pushState({by: 'link', url: to}, '', to);
        setPathname(to);
    }

    return <a onClick={handleClick} href={to}>{children}</a>;
}


function Route({path, element}: {path: string, element: React.ReactNode}) {
    const {pathname} = useContext(RouterContext);
    return <>{pathname === path ? element : null}</>;
}

const RouterContext = createContext({
    pathname: '/',
    setPathname: (pathname: string) => {}
});

function BrowserRouter({children}: {children: React.ReactNode}) {
    const [pathname, setPathname] = useState('/');   
    useEffect(() => {
        const navigationHandler = (e: PopStateEvent) => {
            setPathname(new URL(window.location.href).pathname || '');
        };
        window.addEventListener('popstate', navigationHandler);
        return () => window.removeEventListener('popstate', navigationHandler);
    }, []);
    return <RouterContext.Provider value={{pathname, setPathname}}>{children}</RouterContext.Provider>;
}

export { BrowserRouter, Link, Route };