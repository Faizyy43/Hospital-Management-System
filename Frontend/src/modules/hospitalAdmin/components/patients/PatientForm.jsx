import { useState } from "react";
import { motion } from "framer-motion";
import InputField from "./InputField";
import PrimaryButton from "./PrimaryButton";

const PatientForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    disease: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onAdd(form);
    setForm({ name: "", age: "", disease: "" });
  };

  return (
    <motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.25, ease: "easeOut" }}
>
      <h2 className="text-lg font-semibold mb-4">Add Patient</h2>

      <div className="grid md:grid-cols-3 gap-4">
        <InputField name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <InputField name="age" value={form.age} onChange={handleChange} placeholder="Age" />
        <InputField name="disease" value={form.disease} onChange={handleChange} placeholder="Disease" />
      </div>

      <div className="mt-4">
        <PrimaryButton onClick={handleSubmit}>
          Add Patient
        </PrimaryButton>
      </div>
    </motion.div>
  );
};

export default PatientForm;