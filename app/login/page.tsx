// "use client";

// import { useState } from "react";
// import { auth } from "../firebase/config";
// import {
//   RecaptchaVerifier,
//   signInWithPhoneNumber,
//   ConfirmationResult,
// } from "firebase/auth";

// export default function LoginPage() {
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [confirmationResult, setConfirmationResult] =
//     useState<ConfirmationResult | null>(null);

//   const sendOTP = async () => {
//     try {
//       const recaptcha = new RecaptchaVerifier(
//         auth,
//         "recaptcha-container",
//         { size: "invisible" }
//       );

//       const result =await signInWithPhoneNumber(
//         auth,
//         phone,
//         recaptcha
//       );

//       setConfirmationResult(result);
//       alert("OTP sent successfully");
//     } catch (err) {
//       console.error(err);
//       alert("Error sending OTP");
//     }
//   };

//   const verifyOTP = async () => {
//   try {
//     if (!confirmationResult) {
//       console.log("No confirmation result");
//       return;
//     }

//     const result = await confirmationResult.confirm(otp);
//     console.log("User:", result.user);

//     const token = await result.user.getIdToken();
//     console.log("Firebase Token:", token);

//   } catch (error) {
//     console.error("Verification error:", error);
//   }
// };


//   return (
//     <div style={{ padding: "40px" }}>
//       <h2>Phone Login</h2>

//       <input
//         type="text"
//         placeholder="+91XXXXXXXXXX"
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//       />

//       <br /><br />

//       <button onClick={sendOTP}>Send OTP</button>

//       <div id="recaptcha-container"></div>

//       <br /><br />

//       <input
//         type="text"
//         placeholder="Enter OTP"
//         value={otp}
//         onChange={(e) => setOtp(e.target.value)}
//       />

//       <br /><br />

//       <button onClick={verifyOTP}>Verify OTP</button>
//     </div>
//   );
// }
