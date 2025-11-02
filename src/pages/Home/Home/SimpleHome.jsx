import { NavLink } from "react-router";

const SimpleHome = () => {

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-6">
            <div className="w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-8">
                <h1 className="text-2xl font-bold mb-6 text-center">Create Yki Questions</h1>

                <NavLink to="/generate/sw/?language=Swedish&module=Writing&task=All&topic=">
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="btn btn-primary w-full">
                            Generate Random Swedish Writing Question
                        </button>
                    </div>
                </NavLink>
                <NavLink to="/generate/sw/?language=Swedish&module=Speaking&task=All&topic=">
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="btn btn-primary w-full">
                            Generate Random Swedish Speaking Question
                        </button>
                    </div>
                </NavLink>
                <NavLink to="/all-sw-questions?module=Writing">
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="btn btn-primary w-full">
                            All Swedish Writing Questions
                        </button>
                    </div>
                </NavLink>
                <NavLink to="/all-sw-questions?module=Speaking">
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="btn btn-primary w-full">
                            All Swedish Speaking Questions
                        </button>
                    </div>
                </NavLink>
                <NavLink to="/generate/fin/?language=Finnish&module=Writing&task=All&topic=">
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="btn btn-secondary w-full">
                            Generate Random Finnish Writing Question
                        </button>
                    </div>
                </NavLink>
                <NavLink to="/generate/fin/?language=Finnish&module=Speaking&task=All&topic=">
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="btn btn-secondary w-full">
                            Generate Random Finnish Speaking Question
                        </button>
                    </div>
                </NavLink>
                <NavLink to="/all-fin-questions?module=Writing">
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="btn btn-secondary w-full">
                            All Finnish Writing Questions
                        </button>
                    </div>
                </NavLink>
                <NavLink to="/all-fin-questions?module=Speaking">
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="btn btn-secondary w-full">
                            All Finnish Speaking Question
                        </button>
                    </div>
                </NavLink>

            </div>
        </div>
    );
};

export default SimpleHome;
