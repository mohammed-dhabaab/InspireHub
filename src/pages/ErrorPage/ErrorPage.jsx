import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <main className="w-screen h-screen flex justify-center items-center">
            <div className="text-center ">
                <div id="error-page">
                    <h1 className="text-3xl sm:text-4xl font-bold mx-auto text-center mb-8">Oops!</h1>
                    <p>Sorry, an unexpected error has occurred.</p>
                    <p>
                        <i>{error.statusText || error.message}</i>
                    </p>

                    {/* <Link to={"/home"} className="btn btn-primary mt-4" >Home</Link> */}
                </div>
            </div>
        </main>
    );
}