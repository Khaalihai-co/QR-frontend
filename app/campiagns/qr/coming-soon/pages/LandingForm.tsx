"use client";

import { useEffect, useState, useRef } from "react";
import Heading from "./Heading";
import SuccessMessage from "./SuccessMessage";
import Button from "@/app/component/Button";
import { submitLead } from "@/app/services/lead.service";
import { LeadPayload } from "@/app/types/lead";
import InputField from "@/app/component/InputField";

export default function LandingForm() {
  const [area, setArea] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isUpdate, setUpdate] = useState(false);

  // 🔥 Location states
  const [locationQuery, setLocationQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const locations = [
    "Sangam-Vihar",
    "Devli",
    "Tara-Apartment",
    "Prahladpur",
    "Tughlakabad",
    "Govindpuri",
    "Other",
  ];

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    location: "",
  });

  const [formData, setFormData] = useState<LeadPayload>({
    name: "",
    phone: "",
    location: "",
    area: "",
    source: "qr",
    userType: "",
  });

  // ✅ URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const areaParam = params.get("area") || "Your Area";
    const sourceParam = params.get("source");

    setFormData((prev) => ({
      ...prev,
      area: areaParam,
      source: sourceParam === "qr" ? "qr" : "link",
    }));

    setArea(areaParam);
  }, []);

  // ✅ Click outside close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ✅ Validation
  const validateForm = () => {
    if (!formData.name || !formData.phone || !formData.location) {
      return "Please fill in all required fields.";
    }

    if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      return "Invalid name.";
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      return "Invalid phone number.";
    }

    if (!/^[a-zA-Z\s,-]+$/.test(formData.location)) {
      return "Invalid location.";
    }

    if (!formData.userType) {
      return "Please select Owner or Renter.";
    }

    return "";
  };

  // ✅ Input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let error = "";

    if (name === "name" && value && !/^[a-zA-Z\s]+$/.test(value)) {
      error = "Only letters allowed";
    }

    if (name === "phone") {
      if (value && !/^\d+$/.test(value)) {
        error = "Only numbers allowed";
      } else if (value.length > 10) {
        error = "Max 10 digits";
      }
    }

    if (name === "location" && value && !/^[a-zA-Z\s,-]+$/.test(value)) {
      error = "Invalid location";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errorMsg = validateForm();
    if (errorMsg) {
      alert(errorMsg);
      return;
    }

    try {
      setLoading(true);

      const result = await submitLead(formData);
      const data = result.data;

      const isUpdate =
        new Date(data.updatedAt).getTime() >
        new Date(data.createdAt).getTime();

      setUpdate(isUpdate);
      setSubmitted(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted)
    return <SuccessMessage area={area} isUpdate={isUpdate} />;

  return (
    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
      <div className="shadow-xl rounded-2xl p-8 w-full max-w-md">
        <Heading area={area} />

        <form onSubmit={handleSubmit} className="space-y-3">
          
          <InputField
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}

          <InputField
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="text-xs text-red-400">{errors.phone}</p>}

          {/* 🔥 LOCATION FIELD */}
          <div ref={dropdownRef} className="relative">
            <input
              type="text"
              placeholder="Search your location"
              value={locationQuery}
              onChange={(e) => {
                const value = e.target.value;
                setLocationQuery(value);
                setShowDropdown(true);

                setFormData((prev) => ({
                  ...prev,
                  location: value,
                }));
              }}
              onFocus={() => setShowDropdown(true)}
              className="w-full border p-3 rounded-xl bg-white/5 text-gray-300"
            />

            {showDropdown && (
              <div className="absolute w-full bg-black border border-white/10 rounded-xl mt-1 max-h-40 overflow-y-auto hide-scrollbar z-10">
                {locations
                  .filter((loc) =>
                    loc.toLowerCase().includes(locationQuery.toLowerCase())
                  )
                  .map((loc, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setLocationQuery(loc);
                        setFormData((prev) => ({
                          ...prev,
                          location: loc,
                        }));
                        setShowDropdown(false);
                      }}
                      className="p-3 cursor-pointer hover:bg-white/10"
                    >
                      {loc}
                    </div>
                  ))}
              </div>
            )}
          </div>

          {errors.location && (
            <p className="text-xs text-red-400">{errors.location}</p>
          )}

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, userType: "owner" }))
              }
              className={`flex-1 py-3 rounded-xl ${
                formData.userType === "owner"
                  ? "bg-white text-black"
                  : "bg-white/10 text-gray-300"
              }`}
            >
              Owner
            </button>

            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, userType: "tenant" }))
              }
              className={`flex-1 py-3 rounded-xl ${
                formData.userType === "tenant"
                  ? "bg-white text-black"
                  : "bg-white/10 text-gray-300"
              }`}
            >
              Renter
            </button>
          </div>

          <Button loading={loading}>Join Waitlist</Button>
        </form>
      </div>
    </div>
  );
}