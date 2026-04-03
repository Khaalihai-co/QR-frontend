import LandingForm from "./campiagns/qr/coming-soon/components/LandingForm";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 
    bg-linear-to-br from-black via-gray-900 to-black relative overflow-hidden">

      {/* subtle glow */}
      <div className="absolute w-125 h-125 bg-yellow-400/20 blur-[120px] rounded-full -top-25 -left-25" />
      <div className="absolute w-100 h-100 bg-white/10 blur-[100px] rounded-full -bottom-25 -right-25" />

      <div className="relative z-10 w-full max-w-md">
        <LandingForm />
      </div>
    </div>
  );
}