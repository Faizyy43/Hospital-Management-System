import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useNavigate, useParams } from "react-router-dom";
import { User, Building2, MapPin, Phone, Mail, ArrowRight, X } from "lucide-react";

export default function RegisterForm() {
  const { role: routeRole } = useParams();
  const [role, setRole] = useState(routeRole || localStorage.getItem("role") || "");
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [location, setLocation] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let newErrors = {};

    if (role === "patient") {
      const requiredFields = ["firstName", "lastName", "mobile", "email", "dob", "gender", "blood", "emergencyName", "emergencyPhone"];
      requiredFields.forEach((field) => {
        if (!form[field] || form[field].toString().trim() === "") {
          newErrors[field] = "Required";
        }
      });
    }

    if (role === "hospital") {
      const requiredFields = ["hospitalName", "registrationNumber", "type", "phone", "email", "generalBeds", "icuBeds"];
      requiredFields.forEach((field) => {
        if (!form[field] || form[field].toString().trim() === "") {
          newErrors[field] = "Required";
        }
      });
      if (!form.specialities || form.specialities.length === 0) newErrors.specialities = "Add speciality";
      if (!form.insurance || form.insurance.length === 0) newErrors.insurance = "Add insurance";
      if (form.emergency === undefined) newErrors.emergency = "Required";
    }

    ["city", "state", "pin"].forEach((field) => {
      if (!form[field]) newErrors[field] = "Required";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchAddress = async (lat, lng) => {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
    const data = await res.json();
    if (!data.address) return;
    const a = data.address;
    setForm((prev) => ({ ...prev, city: a.city || a.town || "", state: a.state || "", pin: a.postcode || "" }));
  };

  const handleSubmit = () => {
    if (!validate()) return;
    console.log("FINAL DATA", form);
    alert("Submitted Successfully 🚀");
    navigate("/login");
  };

  useEffect(() => {
    setForm({});
    setErrors({});
  }, [role]);

  useEffect(() => {
    if (routeRole) setRole(routeRole);
  }, [routeRole]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl border border-sky-200 shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-500 to-sky-600 px-6 sm:px-8 py-6">
          <div className="flex items-center gap-3">
            {role === "patient" ? <User className="w-6 h-6 text-white" /> : <Building2 className="w-6 h-6 text-white" />}
            <div>
              <h1 className="text-2xl font-bold text-white">{role === "patient" ? "Patient Registration" : "Hospital Registration"}</h1>
              <p className="text-sm text-sky-100">Complete your profile securely</p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {!role ? (
            <div className="text-center text-gray-500">Please select a role to continue</div>
          ) : (
            <div className="space-y-6">
              {/* Patient Form */}
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

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input label="Date of Birth" name="dob" type="date" value={form.dob} onChange={handleChange} error={errors.dob} required />
                    <Select name="gender" value={form.gender} onChange={handleChange} error={errors.gender} options={["Male", "Female", "Other"]} label="Gender" required />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Select name="blood" value={form.blood} onChange={handleChange} error={errors.blood} options={["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]} label="Blood Type" required />
                    <Input label="Insurance No." name="insurance" value={form.insurance} onChange={handleChange} />
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

              {/* Hospital Form */}
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
                    <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} required icon={<Mail className="w-4 h-4" />} />
                    <Input label="Website (Optional)" name="website" type="url" value={form.website} onChange={handleChange} />
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
                      <TagInput label="Add Specialities (Press Enter)" onChange={(v) => setForm((prev) => ({ ...prev, specialities: v }))} />
                      {errors.specialities && <p className="text-xs text-red-500 mt-1 ml-1">{errors.specialities}</p>}
                    </div>
                    <div>
                      <TagInput label="Accepted Insurances (Press Enter)" onChange={(v) => setForm((prev) => ({ ...prev, insurance: v }))} />
                      {errors.insurance && <p className="text-xs text-red-500 mt-1 ml-1">{errors.insurance}</p>}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-sky-50 border border-sky-300 rounded-lg p-4 cursor-pointer transition-all hover:bg-sky-100" onClick={() => { setForm((prev) => ({ ...prev, emergency: !prev.emergency })); }}>
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${form.emergency ? "bg-sky-500 border-sky-500" : "border-gray-300"}`}>
                      {form.emergency && <CheckIcon />}
                    </div>
                    <span className="text-sm font-medium text-gray-700">24/7 Emergency Services Available</span>
                  </div>
                  {errors.emergency && <p className="text-xs text-red-500 ml-1">{errors.emergency}</p>}
                </>
              )}

              {/* Address Section */}
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2"><MapPin className="w-4 h-4" /> Location</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <Input label="City" name="city" value={form.city} onChange={handleChange} error={errors.city} required />
                  <Input label="State" name="state" value={form.state} onChange={handleChange} error={errors.state} required />
                  <Input label="PIN Code" name="pin" value={form.pin} onChange={handleChange} error={errors.pin} required />
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95"
              >
                Complete Registration
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
      {options.map((o, i) => <option key={i} value={o}>{o}</option>)}
    </select>
    <div className="absolute top-3 right-3 pointer-events-none text-gray-500">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
    </div>
    {error && <p className="text-xs text-red-500 mt-1 ml-1">{error}</p>}
  </div>
);

const TagInput = ({ label, onChange }) => {
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState("");

  const addTag = (e) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      const newTags = [...tags, input.trim()];
      setTags(newTags);
      onChange(newTags);
      setInput("");
    }
  };

  const removeTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    onChange(newTags);
  };

  return (
    <div className="w-full bg-white border border-sky-200 rounded-lg p-3 focus-within:ring-1 focus-within:ring-sky-300 focus-within:border-sky-500 transition-all flex flex-wrap gap-2 items-center">
      {tags.map((t, i) => (
        <span key={i} className="flex items-center gap-1.5 bg-gradient-to-r from-sky-100 to-sky-200 border border-sky-300 text-sky-700 px-2.5 py-1 rounded-lg text-xs font-semibold">
          {t}
          <button type="button" onClick={() => removeTag(i)} className="hover:text-red-600 flex-shrink-0"><X className="w-3 h-3" /></button>
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


