import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowRight, Building2, KeyRound, Mail, MapPin, Phone, User, X } from "lucide-react";

import { registerPatient, requestHospitalRegistration } from "../../../services/authService";

export default function RegisterForm() {
  const { role: routeRole } = useParams();
  const [role, setRole] = useState(routeRole || localStorage.getItem("role") || "");
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSubmitError("");
  };

  const handleTagChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setSubmitError("");
  };

  const validate = () => {
    const newErrors = {};

    if (role === "patient") {
      const requiredFields = [
        "firstName",
        "lastName",
        "mobile",
        "email",
        "password",
        "dob",
        "gender",
        "blood",
        "emergencyName",
        "emergencyPhone",
        "city",
        "state",
        "pin",
      ];

      requiredFields.forEach((field) => {
        if (!form[field] || form[field].toString().trim() === "") {
          newErrors[field] = "Required";
        }
      });

      if (form.password && form.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
    }

    if (role === "hospital") {
      const requiredFields = [
        "hospitalName",
        "registrationNumber",
        "type",
        "phone",
        "email",
        "generalBeds",
        "icuBeds",
        "adminName",
        "adminEmail",
        "adminPassword",
        "city",
        "state",
        "pin",
      ];

      requiredFields.forEach((field) => {
        if (!form[field] || form[field].toString().trim() === "") {
          newErrors[field] = "Required";
        }
      });

      if (!form.specialities || form.specialities.length === 0) newErrors.specialities = "Add speciality";
      if (!form.insurance || form.insurance.length === 0) newErrors.insurance = "Add insurance";
      if (form.emergency === undefined) newErrors.emergency = "Required";

      if (form.adminPassword && form.adminPassword.length < 6) {
        newErrors.adminPassword = "Password must be at least 6 characters";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildPatientPayload = () => ({
    name: `${form.firstName} ${form.lastName}`.trim(),
    email: form.email.trim(),
    password: form.password,
    role: "patient",
  });

  const buildHospitalPayload = () => ({
    hospitalName: form.hospitalName.trim(),
    hospitalEmail: form.email.trim(),
    address: `${form.city}, ${form.state} - ${form.pin}`,
    phone: form.phone.trim(),
    adminName: form.adminName.trim(),
    adminEmail: form.adminEmail.trim(),
    adminPassword: form.adminPassword,
  });

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      if (role === "patient") {
        await registerPatient(buildPatientPayload());
        localStorage.removeItem("role");
        navigate("/login", {
          state: {
            registeredEmail: form.email.trim(),
            successMessage: "Patient account created successfully. Please log in.",
          },
        });
        return;
      }

      await requestHospitalRegistration(buildHospitalPayload());
      localStorage.removeItem("role");
      navigate("/login", {
        state: {
          registeredEmail: form.adminEmail.trim(),
          successMessage: "Hospital request submitted. Login will work after master admin approval.",
        },
      });
    } catch (error) {
      setSubmitError(error.response?.data?.message || "Unable to submit registration right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setForm({});
    setErrors({});
    setSubmitError("");
  }, [role]);

  useEffect(() => {
    if (routeRole) setRole(routeRole);
  }, [routeRole]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl border border-sky-200 shadow-lg overflow-hidden">
        <div className={`${role === "patient" ? "bg-gradient-to-r from-emerald-600 to-emerald-600" : "bg-gradient-to-r from-sky-500 to-sky-600"} px-6 sm:px-8 py-6`}>
          <div className="flex items-center gap-3">
            {role === "patient" ? <User className="w-6 h-6 text-white" /> : <Building2 className="w-6 h-6 text-white" />}
            <div>
              <h1 className="text-2xl font-bold text-white">{role === "patient" ? "Patient Registration" : "Hospital Registration"}</h1>
              <p className={`text-sm ${role === "patient" ? "text-emerald-100" : "text-sky-100"}`}>
                {role === "patient" ? "Create your patient account" : "Submit your hospital request for approval"}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {!role ? (
            <div className="text-center text-gray-500">Please select a role to continue</div>
          ) : (
            <div className="space-y-6">
              {submitError && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {submitError}
                </div>
              )}

              {role === "patient" && (
                <>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input label="First Name" name="firstName" value={form.firstName} onChange={handleChange} error={errors.firstName} required />
                    <Input label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} error={errors.lastName} required />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input label="Mobile" name="mobile" type="tel" value={form.mobile} onChange={handleChange} error={errors.mobile} required icon={<Phone className="w-4 h-4" />} />
                    <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} required icon={<Mail className="w-4 h-4" />} />
                  </div>

                  <Input label="Password" name="password" type="password" value={form.password} onChange={handleChange} error={errors.password} required icon={<KeyRound className="w-4 h-4" />} />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input label="Date of Birth" name="dob" type="date" value={form.dob} onChange={handleChange} error={errors.dob} required />
                    <Select name="gender" value={form.gender} onChange={handleChange} error={errors.gender} options={["Male", "Female", "Other"]} label="Gender" required />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Select name="blood" value={form.blood} onChange={handleChange} error={errors.blood} options={["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]} label="Blood Type" required />
                    <Input label="Insurance No." name="insuranceId" value={form.insuranceId} onChange={handleChange} />
                  </div>

                  <div className="bg-sky-50 border border-sky-200 rounded-lg p-5">
                    <h3 className="text-sm font-semibold text-gray-800 mb-4">Emergency Contact</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input label="Contact Name" name="emergencyName" value={form.emergencyName} onChange={handleChange} error={errors.emergencyName} required />
                      <Input label="Contact Phone" name="emergencyPhone" type="tel" value={form.emergencyPhone} onChange={handleChange} error={errors.emergencyPhone} required icon={<Phone className="w-4 h-4" />} />
                    </div>
                  </div>
                </>
              )}

              {role === "hospital" && (
                <>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input label="Hospital Name" name="hospitalName" value={form.hospitalName} onChange={handleChange} error={errors.hospitalName} required />
                    <Input label="Registration No." name="registrationNumber" value={form.registrationNumber} onChange={handleChange} error={errors.registrationNumber} required />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Select name="type" value={form.type} onChange={handleChange} error={errors.type} options={["Government", "Private", "Trust", "Clinic"]} label="Hospital Type" required />
                    <Input label="Phone" name="phone" type="tel" value={form.phone} onChange={handleChange} error={errors.phone} required icon={<Phone className="w-4 h-4" />} />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input label="Hospital Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} required icon={<Mail className="w-4 h-4" />} />
                    <Input label="Website (Optional)" name="website" type="url" value={form.website} onChange={handleChange} />
                  </div>

                  <div className="bg-sky-50 border border-sky-200 rounded-lg p-5">
                    <h3 className="text-sm font-semibold text-gray-800 mb-4">Hospital Admin Account</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input label="Admin Name" name="adminName" value={form.adminName} onChange={handleChange} error={errors.adminName} required icon={<User className="w-4 h-4" />} />
                      <Input label="Admin Email" name="adminEmail" type="email" value={form.adminEmail} onChange={handleChange} error={errors.adminEmail} required icon={<Mail className="w-4 h-4" />} />
                    </div>
                    <div className="mt-4">
                      <Input label="Admin Password" name="adminPassword" type="password" value={form.adminPassword} onChange={handleChange} error={errors.adminPassword} required icon={<KeyRound className="w-4 h-4" />} />
                    </div>
                  </div>

                  <div className="bg-sky-50 border border-sky-200 rounded-lg p-5">
                    <h3 className="text-sm font-semibold text-gray-800 mb-4">Facilities</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input label="General Beds" name="generalBeds" type="number" value={form.generalBeds} onChange={handleChange} error={errors.generalBeds} required />
                      <Input label="ICU Beds" name="icuBeds" type="number" value={form.icuBeds} onChange={handleChange} error={errors.icuBeds} required />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <TagInput label="Add Specialities (Press Enter)" value={form.specialities} onChange={(value) => handleTagChange("specialities", value)} />
                      {errors.specialities && <p className="text-xs text-red-500 mt-1 ml-1">{errors.specialities}</p>}
                    </div>
                    <div>
                      <TagInput label="Accepted Insurances (Press Enter)" value={form.insurance} onChange={(value) => handleTagChange("insurance", value)} />
                      {errors.insurance && <p className="text-xs text-red-500 mt-1 ml-1">{errors.insurance}</p>}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-sky-50 border border-sky-300 rounded-lg p-4 cursor-pointer transition-all hover:bg-sky-100" onClick={() => handleTagChange("emergency", !form.emergency)}>
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${form.emergency ? "bg-sky-500 border-sky-500" : "border-gray-300"}`}>
                      {form.emergency && <CheckIcon />}
                    </div>
                    <span className="text-sm font-medium text-gray-700">24/7 Emergency Services Available</span>
                  </div>
                  {errors.emergency && <p className="text-xs text-red-500 ml-1">{errors.emergency}</p>}
                </>
              )}

              <div className="bg-sky-50 border border-sky-200 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2"><MapPin className="w-4 h-4" /> Location</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <Input label="City" name="city" value={form.city} onChange={handleChange} error={errors.city} required />
                  <Input label="State" name="state" value={form.state} onChange={handleChange} error={errors.state} required />
                  <Input label="PIN Code" name="pin" value={form.pin} onChange={handleChange} error={errors.pin} required />
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95 ${
                  role === "patient"
                    ? "bg-gradient-to-r from-emerald-600 to-emerald-600 hover:from-emerald-700 hover:to-emerald-700"
                    : "bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700"
                } ${isSubmitting ? "opacity-70 pointer-events-none" : ""}`}
              >
                {isSubmitting ? "Submitting..." : "Complete Registration"}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const Input = ({ label, name, error, value, type = "text", icon, required, onChange }) => (
  <div className="relative">
    <input
      name={name}
      type={type}
      value={value || ""}
      onChange={onChange}
      placeholder=" "
      className={`peer w-full px-4 py-2.5 bg-white border rounded-lg outline-none transition-all text-sm font-medium text-gray-900 ${icon ? "pl-11" : ""} ${type === "date" ? "pr-11" : ""}
      ${error ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-200" : "border-sky-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-200"}`}
    />
    <label className={`absolute text-xs font-semibold bg-white px-1 transition-all pointer-events-none ${icon ? "left-11" : "left-4"} ${value ? "-top-2.5 text-sky-600" : "top-3 text-gray-500 peer-focus:-top-2.5 peer-focus:text-sky-600"}`}>
      {label}{required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {icon && <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 flex items-center pointer-events-none">{icon}</div>}
    {type === "date" && <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 flex items-center pointer-events-none"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>}
    {error && <p className="text-xs text-red-500 mt-1 ml-1">{error}</p>}
  </div>
);

const Select = ({ name, value, error, options, label, required, onChange }) => (
  <div className="relative">
    <select
      name={name}
      value={value || ""}
      onChange={onChange}
      className={`w-full px-4 py-2.5 bg-white border rounded-lg outline-none transition-all text-sm font-medium text-gray-900 appearance-none cursor-pointer pr-10
      ${error ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-200" : "border-sky-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-200"}`}
    >
      <option value="" disabled hidden>{label} {required && "*"}</option>
      {options.map((option) => <option key={option} value={option}>{option}</option>)}
    </select>
    <div className="absolute top-3 right-3 pointer-events-none text-gray-500">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
    </div>
    {error && <p className="text-xs text-red-500 mt-1 ml-1">{error}</p>}
  </div>
);

const TagInput = ({ label, onChange, value = [] }) => {
  const [input, setInput] = useState("");
  const tags = value || [];

  const addTag = (e) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      if (tags.includes(input.trim())) return;
      onChange([...tags, input.trim()]);
      setInput("");
    }
  };

  const removeTag = (index) => {
    onChange(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full bg-white border border-sky-200 rounded-lg p-3 focus-within:ring-1 focus-within:ring-sky-300 focus-within:border-sky-500 transition-all flex flex-wrap gap-2 items-center">
      {tags.map((tag, index) => (
        <span key={`${tag}-${index}`} className="flex items-center gap-1.5 bg-gradient-to-r from-sky-100 to-sky-200 border border-sky-300 text-sky-700 px-2.5 py-1 rounded-lg text-xs font-semibold">
          {tag}
          <button type="button" onClick={() => removeTag(index)} className="hover:text-red-600 flex-shrink-0"><X className="w-3 h-3" /></button>
        </span>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={addTag}
        placeholder={tags.length === 0 ? label : "Add more..."}
        className="outline-none flex-1 min-w-[100px] bg-transparent text-sm text-gray-700 placeholder-gray-400"
      />
    </div>
  );
};

const CheckIcon = () => <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>;
