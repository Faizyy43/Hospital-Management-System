import { useState } from "react";

const Patients = () => {
    const [patients, setPatients] = useState([
        { id: 1, name: "John Doe", age: 30, disease: "Flu" },
        { id: 2, name: "Sarah Khan", age: 25, disease: "Fever" },
    ]);

    const [form, setForm] = useState({
        name: "",
        age: "",
        disease: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAdd = () => {
        if (!form.name) return;

        const newPatient = {
            id: Date.now(),
            ...form,
        };

        setPatients([...patients, newPatient]);
        setForm({ name: "", age: "", disease: "" });
    };

    const handleDelete = (id) => {
        setPatients(patients.filter((p) => p.id !== id));
    };

    return (
        <div className="space-y-6">

            <h1 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
  Patient Management
</h1>

            {/* 🔹 Form */}
            <div className="bg-white p-5 rounded-xl border border-gray-200">
                <h2 className="text-lg font-semibold mb-4">Add Patient</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="bg-white/60 backdrop-blur-md p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-200" />
                    <input
                        name="age"
                        value={form.age}
                        onChange={handleChange}
                        placeholder="Age"
className="bg-white/60 backdrop-blur-md p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-200"                    />
                    <input
                        name="disease"
                        value={form.disease}
                        onChange={handleChange}
                        placeholder="Disease"
className="bg-white/60 backdrop-blur-md p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-200"                    />
                    
                </div>

                <button
                    onClick={handleAdd}
className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition"                >
                    Add Patient
                </button>
            </div>

            {/* 🔹 Table */}
<div className="bg-white/70 backdrop-blur-md p-5 rounded-2xl shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Patient List</h2>

                <table className="w-full text-sm">
                    <thead className="text-gray-500 border-b">
<tr className="hover:bg-blue-50/50 transition">
                            <th>Name</th>
                            <th>Age</th>
                            <th>Disease</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {patients.map((p) => (
                            <tr key={p.id}  className="hover:bg-blue-50/50 transition">
                                <td>{p.name}</td>
                                <td>{p.age}</td>
                                <td>{p.disease}</td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(p.id)}
                                        className="text-red-500"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Patients;