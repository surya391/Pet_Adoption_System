import { useState } from 'react';
import axios from 'axios';

export default function Register() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [clientErrors, setClientErrors] = useState({});
    const [serverErrors, setServerErrors] = useState(null);

    const isEmail = (email) => /\S+@\S+\.\S+/.test(email);
    const isNumeric = (value) => /^\d+$/.test(value); // 
    const isStrongPassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{5,}$/.test(password); 

    const runClientValidation = () => {
        const errors = {};

       
        if (form.email.trim().length === 0) {
            errors.email = "Email field cannot be empty";
        } else if (!isEmail(form.email)) {
            errors.email = "Enter a valid email address";
        }
       
        if (form.password.trim().length === 0) {
            errors.password = "Password field cannot be empty";
        } else if (!isStrongPassword(form.password)) {
            errors.password = "Password must include at least 5 characters, one lowercase letter, one uppercase letter, one number, and one special character.";
        }
        setClientErrors(errors);
        return Object.keys(errors).length === 0; 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (runClientValidation()) {
            try {
                const response = await axios.post('http://localhost:3001/api/auth/signIn', form);
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

                
              

                <label htmlFor="password">Password: </label>
                <input
                    type="password"
                    id="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                {clientErrors.password && <span style={{ color: 'red' }}>{clientErrors.password}</span>}
                <br />


                <button type="submit">Register</button>
            </form>
        </div>
    );
}
