import React, { useState } from "react";

const AuthForm = ({ isRegister, onSubmit }) => {
    const [employeeId, setEmployeeId] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isRegister) {
            onSubmit(employeeId, fullName, password);
        } else {
            onSubmit(employeeId, password);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-md w-80 space-y-4"
            >
                <h2 className="text-2xl font-bold text-center mb-4">
                    {isRegister ? "Register" : "Login"}
                </h2>

                {isRegister && (
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2"
                        required
                    />
                )}

                <input
                    type="text"
                    placeholder="Employee ID"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2"
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                >
                    {isRegister ? "Register" : "Login"}
                </button>
            </form>
        </div>
    );
};

export default AuthForm;
