import { useState } from 'react';
import axios from 'axios';

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        role: "serviceProvider",
        password: "",
        confirmPassword: ""
    });

    const [clientErrors, setClientErrors] = useState({});
    const [serverErrors, setServerErrors] = useState(null);

    const isEmail = (email) => /\S+@\S+\.\S+/.test(email);
    const isNumeric = (value) => /^\d+$/.test(value); // 
    const isStrongPassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{5,}$/.test(password); 

    const runClientValidation = () => {
        const errors = {};

        if (form.name.trim().length === 0) {
            errors.name = "Name cannot be empty";
        }
        if (form.email.trim().length === 0) {
            errors.email = "Email field cannot be empty";
        } else if (!isEmail(form.email)) {
            errors.email = "Enter a valid email address";
        }
        if (form.phoneNumber.trim().length === 0) {
            errors.phoneNumber = "Phone number field cannot be empty";
        } else if (!isNumeric(form.phoneNumber)) {
            errors.phoneNumber = "Phone number should contain digits only";
        } else if (form.phoneNumber.trim().length !== 10) {
            errors.phoneNumber = "Phone number should be 10 digits";
        }
        if (form.password.trim().length === 0) {
            errors.password = "Password field cannot be empty";
        } else if (!isStrongPassword(form.password)) {
            errors.password = "Password must include at least 5 characters, one lowercase letter, one uppercase letter, one number, and one special character.";
        }
        if (form.confirmPassword.trim().length === 0) {
            errors.confirmPassword = "Confirm password field cannot be empty";
        } else if (form.password !== form.confirmPassword) {
            errors.confirmPassword = "Password and confirm password should match";
        }

        setClientErrors(errors);
        return Object.keys(errors).length === 0; 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (runClientValidation()) {
            try {
                const response = await axios.post('http://localhost:3001/api/auth/signUp', form);
                console.log(response.data); 
            } catch (err) {
                setServerErrors(err.response?.data?.error[0].msg || ["Server error occurred"]);
                console.log(err)
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {serverErrors && (
                    <div>
                        <h3>Server Errors</h3>
                        <ul>
                            {serverErrors.map((error, i) => (
                                <li key={i}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <label htmlFor="name">Name: </label>
                <input
                    type="text"
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                {clientErrors.name && <span style={{ color: 'red' }}>{clientErrors.name}</span>}
                <br />

                <label htmlFor="email">Email: </label>
                <input
                    type="text"
                    id="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                {clientErrors.email && <span style={{ color: 'red' }}>{clientErrors.email}</span>}
                <br />

                <label htmlFor="phoneNumber">Phone Number: </label>
                <input
                    type="text"
                    id="phoneNumber"
                    value={form.phoneNumber}
                    onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                />
                {clientErrors.phoneNumber && <span style={{ color: 'red' }}>{clientErrors.phoneNumber}</span>}
                <br />

                <label>Role: </label>
                <input
                    type="radio"
                    name="role"
                    value="owner"
                    checked={form.role === "owner"}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                />
                <label htmlFor="owner">Owner</label>
                <input
                    type="radio"
                    name="role"
                    value="serviceProvider"
                    checked={form.role === "serviceProvider"}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                />
                <label htmlFor="serviceProvider">Service Provider</label>
                <br />

                <label htmlFor="password">Password: </label>
                <input
                    type="password"
                    id="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                {clientErrors.password && <span style={{ color: 'red' }}>{clientErrors.password}</span>}
                <br />

                <label htmlFor="confirmPassword">Confirm Password: </label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                />
                {clientErrors.confirmPassword && <span style={{ color: 'red' }}>{clientErrors.confirmPassword}</span>}
                <br />

                <button type="submit">Register</button>
            </form>
        </div>
    );
}
