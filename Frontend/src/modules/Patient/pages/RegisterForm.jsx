import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Building2, MapPin, Stethoscope, PhoneCall, UploadCloud, ArrowRight, X } from "lucide-react";

/* ================= MAIN ================= */

export default function RegisterForm() {
  const { role: routeRole } = useParams();

  const [role, setRole] = useState(
    routeRole || localStorage.getItem("role") || "",
  );
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [location, setLocation] = useState(null);
  const navigate = useNavigate();

  /* ================= HANDLE ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value, // ✅ dynamic update (correct way)
    }));
  };

  /* ================= VALIDATION ================= */

  const validate = () => {
    let newErrors = {};

    if (role === "patient") {
      const requiredFields = [
        "firstName",
        "lastName",
        "mobile",
        "email",
        "dob",
        "gender",
        "blood",
        "emergencyName",
        "emergencyPhone",
      ];

      requiredFields.forEach((field) => {
        if (!form[field] || form[field].toString().trim() === "") {
          newErrors[field] = "This field is required";
        }
      });
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
      ];

      requiredFields.forEach((field) => {
        if (!form[field] || form[field].toString().trim() === "") {
          newErrors[field] = "This field is required";
        }
      });

      // 🔥 Special fields
      if (!form.specialities || form.specialities.length === 0) {
        newErrors.specialities = "Add at least one speciality";
      }

      if (!form.insurance || form.insurance.length === 0) {
        newErrors.insurance = "Add at least one insurance provider";
      }

      if (form.emergency === undefined) {
        newErrors.emergency = "Select emergency availability";
      }
    }

    // 🔥 Address required for both
    ["city", "state", "pin"].forEach((field) => {
      if (!form[field]) {
        newErrors[field] = "Location required (select from map)";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= GEO ================= */

  const fetchAddress = async (lat, lng) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
    );
    const data = await res.json();

    if (!data.address) return;

    const a = data.address;

    setForm((prev) => ({
      ...prev,
      city: a.city || a.town || "",
      state: a.state || "",
      pin: a.postcode || "",
    }));
  };

  /* ================= SUBMIT ================= */

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
    if (routeRole) {
      setRole(routeRole);
    }
  }, [routeRole]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden py-12">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-300/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-300/20 rounded-full blur-[100px] pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden relative z-10"
      >
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 bg-white sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-3">
             <div className={`p-2.5 rounded-xl ${role === 'patient' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'}`}>
                {role === "patient" ? <User className="w-6 h-6" /> : <Building2 className="w-6 h-6" />}
             </div>
             <div>
               <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                 {role === "patient" ? "Patient Registration" : "Hospital Registration"}
               </h2>
               <p className="text-sm text-gray-500 font-medium">Please fill in the details securely.</p>
             </div>
          </div>
        </div>

        <div className="p-8">
          {/* ================= PATIENT ================= */}
          {role === "patient" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <Section title="Personal Information" icon={<User className="w-4 h-4" />}>
                <FloatingInput name="firstName" label="First Name" value={form.firstName} onChange={handleChange} error={errors.firstName} />
                <FloatingInput name="lastName" label="Last Name" value={form.lastName} onChange={handleChange} error={errors.lastName} />
                <FloatingInput name="mobile" label="Mobile Number" value={form.mobile} onChange={handleChange} error={errors.mobile} />
                <FloatingInput name="email" label="Email Address" value={form.email} onChange={handleChange} error={errors.email} />
                <FloatingInput type="date" name="dob" label="Date of Birth" value={form.dob} onChange={handleChange} error={errors.dob} />
              </Section>

              <Section title="Medical Profile" icon={<Stethoscope className="w-4 h-4" />}>
                <Select name="gender" value={form.gender} onChange={handleChange} error={errors.gender} options={["Male", "Female", "Other"]} />
                <Select name="blood" value={form.blood} onChange={handleChange} error={errors.blood} options={["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]} />
                <FloatingInput name="insurance" label="Insurance Policy Number" value={form.insurance} onChange={handleChange} />
              </Section>

              <Section title="Emergency Contact" icon={<PhoneCall className="w-4 h-4" />}>
                <FloatingInput name="emergencyName" label="Contact Person Name" value={form.emergencyName} onChange={handleChange} error={errors.emergencyName} />
                <FloatingInput name="emergencyPhone" label="Contact Mobile Number" value={form.emergencyPhone} onChange={handleChange} error={errors.emergencyPhone} />
              </Section>
            </motion.div>
          )}

          {/* ================= HOSPITAL ================= */}
          {role === "hospital" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <Section title="Basic Details" icon={<Building2 className="w-4 h-4" />}>
                <FloatingInput name="hospitalName" label="Legal Hospital Name" value={form.hospitalName} onChange={handleChange} error={errors.hospitalName} />
                <FloatingInput name="registrationNumber" label="MCI Registration No." value={form.registrationNumber} onChange={handleChange} error={errors.registrationNumber} />
                <Select name="type" value={form.type} onChange={handleChange} error={errors.type} options={["Government", "Private", "Trust", "Clinic"]} />
                <div>
                   <TagInput label="Add out Specialities (Press Enter)" onChange={(v) => setForm((prev) => ({ ...prev, specialities: v }))} />
                   {errors.specialities && <p className="text-xs font-medium text-red-500 mt-1.5 ml-1">{errors.specialities}</p>}
                </div>
              </Section>

              <Section title="Contact Info" icon={<PhoneCall className="w-4 h-4" />}>
                <FloatingInput name="phone" label="Main Phone Number" value={form.phone} onChange={handleChange} error={errors.phone} />
                <FloatingInput name="email" label="Official Email Address" value={form.email} onChange={handleChange} error={errors.email} />
                <FloatingInput name="website" label="Website URL (Optional)" value={form.website} onChange={handleChange} />
              </Section>

              <Section title="Hospital Facilities" icon={<Stethoscope className="w-4 h-4" />}>
                <FloatingInput name="generalBeds" label="General Ward Beds" type="number" value={form.generalBeds} onChange={handleChange} error={errors.generalBeds} />
                <FloatingInput name="icuBeds" label="ICU & Critical Care Beds" type="number" value={form.icuBeds} onChange={handleChange} error={errors.icuBeds} />
                <div>
                  <TagInput label="Accepted Insurances" onChange={(v) => setForm((prev) => ({ ...prev, insurance: v }))} />
                  {errors.insurance && <p className="text-xs font-medium text-red-500 mt-1.5 ml-1">{errors.insurance}</p>}
                </div>
                <div>
                   <Toggle label="Emergency Services 24x7" onChange={(v) => setForm((prev) => ({ ...prev, emergency: v }))} />
                   {errors.emergency && <p className="text-xs font-medium text-red-500 mt-1.5 ml-1">{errors.emergency}</p>}
                </div>
              </Section>

              <Section title="Documents" icon={<UploadCloud className="w-4 h-4" />}>
                <div className="md:col-span-2">
                   <label className="block text-sm font-medium text-gray-700 mb-2 mt-1">Upload Certificates & MCI Documents</label>
                   <input type="file" multiple className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-gray-200 rounded-xl bg-gray-50 p-1.5 outline-none transition-colors" />
                </div>
              </Section>
            </motion.div>
          )}

          {/* SHARED ADDRESS / MAP */}
          {role && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 space-y-8">
              <Section title="Address" icon={<MapPin className="w-4 h-4" />}>
                {/* <div className="md:col-span-2">
                  <div className="relative group rounded-xl overflow-hidden shadow-sm border border-gray-200 h-[260px]">
                    <div className="absolute top-3 right-3 z-[1000] bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-700 shadow-sm border border-white flex items-center gap-1.5 pointer-events-none">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" />
                      Click on map to pick location
                    </div>
                    <MapContainer center={[23.0225, 72.5714]} zoom={13} className="h-full w-full z-0">
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      <LocationPicker setLocation={setLocation} fetchAddress={fetchAddress} />
                      {location && <Marker position={location} />}
                    </MapContainer>
                  </div>
                </div> */}

                <FloatingInput name="city" label="City" value={form.city} onChange={handleChange} error={errors.city} />
                <FloatingInput name="state" label="State" value={form.state} onChange={handleChange} error={errors.state} />
                <FloatingInput name="pin" label="Postal/ZIP Code" value={form.pin} onChange={handleChange} error={errors.pin} />
              </Section>
            </motion.div>
          )}

          {/* SUBMIT */}
          {role && (
            <div className="mt-10 pt-8 border-t border-gray-100 flex justify-end">
              <button
                onClick={handleSubmit}
                className={`flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all active:scale-[0.98] shadow-md hover:shadow-lg`}
              >
                Submit Registration
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

const Section = ({ title, icon, children }) => (
  <div className="bg-white">
    <div className="flex items-center gap-2 mb-5 pb-2 border-b border-gray-100/60">
      <div className="p-1.5 bg-blue-50 rounded-md text-blue-500">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-gray-800 tracking-tight">{title}</h3>
    </div>
    <div className="grid md:grid-cols-2 gap-x-5 gap-y-4">{children}</div>
  </div>
);

/* FLOAT INPUT */
const FloatingInput = ({ label, error, value, type="text", ...props }) => (
  <div className="relative group">
    <input
      {...props}
      type={type}
      value={value || ""}
      placeholder=" "
      autoComplete="off"
      className={`peer w-full px-4 py-3.5 bg-gray-50 border rounded-xl outline-none text-gray-900 transition-all font-medium text-sm
      ${error ? "border-red-300 focus:bg-red-50/30" : "border-gray-200 focus:bg-white"}
      focus:ring-2 ${error ? "focus:ring-red-500/20 focus:border-red-500" : "focus:ring-blue-500/20 focus:border-blue-500"}`}
    />
    <label
      className={`absolute left-3 px-1 text-sm transition-all pointer-events-none rounded-sm
      ${value ? "-top-2.5 text-xs font-semibold bg-white" : "top-3.5 font-medium bg-transparent"}
      ${error ? (value ? "text-red-500" : "text-red-400") : "text-gray-500 peer-focus:text-blue-600"}
      peer-focus:-top-2.5 peer-focus:text-xs peer-focus:font-semibold peer-focus:bg-white`}
    >
      {label}
    </label>
    {error && <p className="text-xs font-medium text-red-500 mt-1.5 ml-1">{error}</p>}
  </div>
);

/* SELECT */
const Select = ({ options, value, error, ...props }) => (
  <div className="relative">
    <select
      {...props}
      value={value || ""}
      className={`w-full px-4 py-3.5 bg-gray-50 border rounded-xl outline-none text-gray-900 transition-all font-medium text-sm appearance-none
      ${error ? "border-red-300 focus:ring-red-500/20 focus:border-red-500 focus:bg-red-50/30" : "border-gray-200 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white"} focus:ring-2`}
    >
      <option value="" disabled hidden>Select {props.name.charAt(0).toUpperCase() + props.name.slice(1)}</option>
      {options.map((o, i) => (
        <option key={i} value={o}>{o}</option>
      ))}
    </select>
    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
    </div>
    {error && <p className="text-xs font-medium text-red-500 mt-1.5 ml-1">{error}</p>}
  </div>
);

/* TAG INPUT */
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
    <div className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 focus-within:bg-white transition-all min-h-[50px] flex flex-wrap gap-2 items-center">
      {tags.map((t, i) => (
        <span
          key={i}
          className="flex items-center gap-1.5 bg-blue-50 border border-blue-100 text-blue-700 px-2.5 py-1 rounded-lg text-xs font-semibold tracking-wide"
        >
          {t}
          <button
            type="button"
            onClick={() => removeTag(i)}
            className="text-blue-400 hover:text-red-500 hover:bg-red-50 rounded-full p-0.5 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={addTag}
        placeholder={tags.length === 0 ? label : "Add more..."}
        className="outline-none p-1 flex-1 min-w-[120px] bg-transparent text-sm font-medium text-gray-700 placeholder-gray-400"
      />
    </div>
  );
};

/* TOGGLE */
const Toggle = ({ label, onChange }) => {
  const [on, setOn] = useState(false);

  return (
    <div
      onClick={() => {
        setOn(!on);
        onChange(!on);
      }}
      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl cursor-pointer transition-all border font-medium text-sm
      ${on ? "bg-green-50 border-green-200 text-green-800 shadow-sm" : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"}`}
    >
      <span>{label}</span>
      <div className={`relative w-11 h-6 rounded-full transition-colors ${on ? "bg-green-500" : "bg-gray-300"}`}>
         <div className={`absolute top-1 bg-white w-4 h-4 rounded-full shadow transition-transform ${on ? "translate-x-6 left-1" : "translate-x-1 left-0"}`}></div>
      </div>
    </div>
  );
};

/* MAP PICKER */
function LocationPicker({ setLocation, fetchAddress }) {
  useMapEvents({
    click(e) {
      setLocation(e.latlng);
      fetchAddress(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}
