const AuthLayout = ({
    children 
} : {
        children: React.ReactNode;
    })=> {
    return(
        <div className=" flex items-center justify-center pt-48 h-full ">{children}</div>
    );
}

export default AuthLayout;